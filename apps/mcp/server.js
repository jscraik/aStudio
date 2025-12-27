import { existsSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const widgetHtmlPath = path.resolve(__dirname, "../web/dist/widget.html");
const widgetsDistPath = path.resolve(__dirname, "../../packages/widgets/dist/src");

function readWidgetHtml() {
  return readFileSync(widgetHtmlPath, "utf8");
}

function readWidgetBundle(widgetId) {
  const widgetPath = path.join(widgetsDistPath, widgetId, "index.html");
  if (!existsSync(widgetPath)) {
    throw new Error(`Widget bundle not found: ${widgetId}`);
  }
  return readFileSync(widgetPath, "utf8");
}

// Tool input schemas with detailed descriptions per Apps SDK guidelines
const displayChatInputSchema = {
  seedMessage: z
    .string()
    .optional()
    .describe("Optional initial message to seed the chat conversation"),
};

const displaySearchResultsInputSchema = {
  query: z
    .string()
    .describe("The search query that was performed"),
  results: z
    .array(z.object({
      id: z.union([z.string(), z.number()]).describe("Unique identifier for the result"),
      title: z.string().describe("Title of the search result"),
      description: z.string().optional().describe("Brief description of the result"),
      url: z.string().optional().describe("URL to the full content"),
      tags: z.array(z.string()).optional().describe("Tags or categories for the result"),
    }))
    .describe("Array of search results to display"),
};

const displayTableInputSchema = {
  title: z
    .string()
    .optional()
    .describe("Optional title for the table"),
  columns: z
    .array(z.string())
    .describe("Column headers for the table"),
  rows: z
    .array(z.record(z.any()))
    .describe("Array of row objects with keys matching column names"),
};

function createChatUiServer() {
  const server = new McpServer({ 
    name: "chatui", 
    version: "1.0.0",
  });

  // Widget resources
  const widgetConfigs = [
    { id: "chat-view", name: "Chat View" },
    { id: "search-results", name: "Search Results" },
    { id: "pizzaz-table", name: "Data Table" },
    { id: "kitchen-sink-lite", name: "Kitchen Sink Demo" },
  ];

  // Widget resources with enhanced metadata
  widgetConfigs.forEach(({ id, name }) => {
    server.registerResource(
      `${id}-widget`,
      `ui://widget/${id}.html`,
      {},
      async () => ({
        contents: [
          {
            uri: `ui://widget/${id}.html`,
            mimeType: "text/html+skybridge",
            text: readWidgetBundle(id),
            _meta: { 
              "openai/widgetPrefersBorder": true,
              "openai/widgetDescription": `Interactive ${name} component for displaying structured data`,
              "openai/widgetCSP": {
                connect_domains: [],
                resource_domains: ["web-sandbox.oaiusercontent.com"],
              },
            },
          },
        ],
      })
    );
  });

  // Main ChatUI widget resource with enhanced metadata
  server.registerResource(
    "chatui-widget",
    "ui://widget/chatui.html",
    {},
    async () => ({
      contents: [
        {
          uri: "ui://widget/chatui.html",
          mimeType: "text/html+skybridge",
          text: readWidgetHtml(),
          _meta: { 
            "openai/widgetPrefersBorder": true,
            "openai/widgetDescription": "Interactive chat interface with Apps SDK UI components",
            "openai/widgetCSP": {
              connect_domains: [],
              resource_domains: ["web-sandbox.oaiusercontent.com"],
            },
          },
        },
      ],
    })
  );

  /**
   * Tool: display_chat
   * Purpose: Display an interactive chat interface
   * Type: Read-only (displays UI, no external side effects)
   */
  server.registerTool(
    "display_chat",
    {
      title: "Display Chat Interface",
      description: 
        "Displays an interactive chat interface widget. Use this when the user wants " +
        "to have a conversation-style interaction or needs a dedicated chat view. " +
        "This tool only renders a UI and does not modify any external data.",
      inputSchema: displayChatInputSchema,
      annotations: {
        // Per Apps SDK guidelines: mark read-only tools correctly
        readOnlyHint: true,      // This tool only displays UI, no side effects
        destructiveHint: false,  // Does not delete or modify data
        openWorldHint: false,    // Does not interact with external systems
      },
      _meta: {
        "openai/outputTemplate": "ui://widget/chat-view.html",
        "openai/toolInvocation/invoking": "Opening chat interface...",
        "openai/toolInvocation/invoked": "Chat interface ready",
      },
    },
    async (args, { _meta } = {}) => {
      const seedMessage = args?.seedMessage?.trim?.() ?? "";
      
      // Extract client metadata per Apps SDK guidelines
      const locale = _meta?.["openai/locale"] ?? "en";
      const userAgent = _meta?.["openai/userAgent"];
      const userLocation = _meta?.["openai/userLocation"];
      
      return {
        content: [{ 
          type: "text", 
          text: seedMessage 
            ? `Chat interface opened with message: "${seedMessage}"` 
            : "Chat interface opened" 
        }],
        structuredContent: { 
          seedMessage,
          locale,
        },
        _meta: {
          // Widget-specific metadata (hidden from model)
          clientInfo: {
            userAgent,
            location: userLocation,
          },
        },
      };
    }
  );

  /**
   * Tool: display_search_results
   * Purpose: Display search results in a structured, scannable format
   * Type: Read-only (displays data, no external side effects)
   */
  server.registerTool(
    "display_search_results",
    {
      title: "Display Search Results",
      description:
        "Displays search results in a visually structured card layout with titles, " +
        "descriptions, and optional tags. Use this when presenting multiple search " +
        "results, recommendations, or lists of items that users need to scan and " +
        "choose from. This tool only renders results and does not perform searches.",
      inputSchema: displaySearchResultsInputSchema,
      annotations: {
        readOnlyHint: true,      // Only displays data
        destructiveHint: false,  // Does not modify data
        openWorldHint: false,    // Does not interact with external systems
      },
      _meta: {
        "openai/outputTemplate": "ui://widget/search-results.html",
        "openai/toolInvocation/invoking": "Preparing search results...",
        "openai/toolInvocation/invoked": "Search results displayed",
      },
    },
    async (args, { _meta } = {}) => {
      const { query, results } = args;
      const count = results?.length ?? 0;
      
      // Extract client metadata
      const locale = _meta?.["openai/locale"] ?? "en";
      const userLocation = _meta?.["openai/userLocation"];
      
      return {
        content: [{ 
          type: "text", 
          text: `Displaying ${count} result${count !== 1 ? "s" : ""} for "${query}"` 
        }],
        structuredContent: { 
          query, 
          results,
          locale,
        },
        _meta: {
          // Widget-specific metadata
          searchContext: {
            location: userLocation,
            timestamp: new Date().toISOString(),
          },
        },
      };
    }
  );

  /**
   * Tool: display_table
   * Purpose: Display tabular data in a structured table format
   * Type: Read-only (displays data, no external side effects)
   */
  server.registerTool(
    "display_table",
    {
      title: "Display Data Table",
      description:
        "Displays data in a structured table format with columns and rows. Use this " +
        "when presenting structured data, comparisons, or lists that benefit from " +
        "tabular layout. Ideal for showing prices, specifications, schedules, or " +
        "any data with consistent fields across items.",
      inputSchema: displayTableInputSchema,
      annotations: {
        readOnlyHint: true,      // Only displays data
        destructiveHint: false,  // Does not modify data
        openWorldHint: false,    // Does not interact with external systems
      },
      _meta: {
        "openai/outputTemplate": "ui://widget/pizzaz-table.html",
        "openai/toolInvocation/invoking": "Preparing table...",
        "openai/toolInvocation/invoked": "Table displayed",
      },
    },
    async (args, { _meta } = {}) => {
      const { title, columns, rows } = args;
      const rowCount = rows?.length ?? 0;
      
      // Extract client metadata
      const locale = _meta?.["openai/locale"] ?? "en";
      
      return {
        content: [{ 
          type: "text", 
          text: title 
            ? `Displaying "${title}" with ${rowCount} row${rowCount !== 1 ? "s" : ""}` 
            : `Displaying table with ${rowCount} row${rowCount !== 1 ? "s" : ""}` 
        }],
        structuredContent: { 
          title,
          columns,
          data: rows,
          locale,
        },
        _meta: {
          // Widget-specific metadata
          tableContext: {
            generatedAt: new Date().toISOString(),
          },
        },
      };
    }
  );

  /**
   * Tool: display_demo
   * Purpose: Display the kitchen sink demo widget for testing
   * Type: Read-only (displays UI, no external side effects)
   */
  server.registerTool(
    "display_demo",
    {
      title: "Display Demo Widget",
      description:
        "Displays a demonstration widget showcasing various Apps SDK capabilities. " +
        "Use this for testing or demonstrating the widget system. This is primarily " +
        "for development and testing purposes.",
      inputSchema: {},
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
      },
      _meta: {
        "openai/outputTemplate": "ui://widget/kitchen-sink-lite.html",
        "openai/toolInvocation/invoking": "Loading demo...",
        "openai/toolInvocation/invoked": "Demo widget ready",
      },
    },
    async () => {
      return {
        content: [{ type: "text", text: "Demo widget displayed" }],
        structuredContent: { demo: true },
      };
    }
  );

  return server;
}

const port = Number(process.env.PORT ?? 8787);
const MCP_PATH = "/mcp";

const httpServer = createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "OPTIONS" && url.pathname === MCP_PATH) {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, mcp-session-id",
      "Access-Control-Expose-Headers": "Mcp-Session-Id",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/") {
    res
      .writeHead(200, { "content-type": "text/plain" })
      .end("ChatUI MCP server - Apps SDK compliant");
    return;
  }

  const MCP_METHODS = new Set(["POST", "GET", "DELETE"]);
  if (url.pathname === MCP_PATH && req.method && MCP_METHODS.has(req.method)) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");

    const server = createChatUiServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    res.on("close", () => {
      transport.close();
      server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error("Error handling MCP request:", error);
      if (!res.headersSent) {
        res.writeHead(500).end("Internal server error");
      }
    }

    return;
  }

  res.writeHead(404).end("Not Found");
});

httpServer.listen(port, () => {
  console.log(`ChatUI MCP server listening on http://localhost:${port}${MCP_PATH}`);
  console.log(`Widget source: ${widgetHtmlPath}`);
  console.log(`Widget bundles: ${widgetsDistPath}`);
});
