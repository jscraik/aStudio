import { HostProvider, createEmbeddedHost, ensureMockOpenAI, useToolOutput } from "@chatui/runtime";
import { AppsSDKUIProvider } from "@chatui/ui";
import { Badge } from "@openai/apps-sdk-ui/components/Badge";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";

// Mock for standalone development
if (import.meta.env.DEV) {
  ensureMockOpenAI({
    toolOutput: {
      query: "React components",
      results: [
        {
          id: 1,
          title: "Building Reusable React Components",
          description: "Learn how to create modular, reusable React components with TypeScript",
          url: "https://example.com/react-components",
          tags: ["React", "TypeScript", "Components"]
        },
        {
          id: 2,
          title: "React Component Patterns",
          description: "Advanced patterns for building scalable React applications",
          url: "https://example.com/react-patterns", 
          tags: ["React", "Patterns", "Architecture"]
        },
        {
          id: 3,
          title: "Testing React Components",
          description: "Best practices for testing React components with Jest and Testing Library",
          url: "https://example.com/react-testing",
          tags: ["React", "Testing", "Jest"]
        }
      ]
    }
  });
}

function SearchResultsWidget() {
  const toolOutput = useToolOutput() as any;
  const results = toolOutput?.results || [];
  const query = toolOutput?.query || "";

  return (
    <div className="p-4 space-y-4">
      <div className="border-b pb-3">
        <h1 className="text-lg font-semibold">Search Results</h1>
        {query && (
          <p className="text-sm text-gray-600 mt-1">
            Results for: <span className="font-medium">"{query}"</span>
          </p>
        )}
      </div>

      <div className="space-y-3">
        {results.map((result: any) => (
          <div key={result.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-blue-600 hover:text-blue-800">
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
            </h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {result.description}
            </p>
            {result.tags && (
              <div className="flex flex-wrap gap-1 mt-2">
                {result.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No results found</p>
        </div>
      )}
    </div>
  );
}

function SearchResultsApp() {
  const host = createEmbeddedHost();
  
  return (
    <HostProvider host={host}>
      <AppsSDKUIProvider linkComponent="a">
        <SearchResultsWidget />
      </AppsSDKUIProvider>
    </HostProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SearchResultsApp />
  </StrictMode>
);