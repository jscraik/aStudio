import { HostProvider, createEmbeddedHost, ensureMockOpenAI } from "@chatui/runtime";
import { AppsSDKUIProvider } from "@chatui/ui";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../styles.css";

// Mock for standalone development
if (import.meta.env.DEV) {
  ensureMockOpenAI({
    toolOutput: {
      data: [
        { id: 1, name: "Pizza Margherita", price: "$12", rating: 4.5 },
        { id: 2, name: "Pizza Pepperoni", price: "$14", rating: 4.8 },
        { id: 3, name: "Pizza Quattro Stagioni", price: "$16", rating: 4.3 }
      ]
    }
  });
}

function PizzazTableWidget() {
  const host = createEmbeddedHost();
  const data = (host.toolOutput as any)?.data || [];
  
  return (
    <HostProvider host={host}>
      <AppsSDKUIProvider linkComponent="a">
        <div className="p-4">
          <h1 className="text-lg font-semibold mb-4">Pizzaz Table</h1>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-3 py-2 text-left">Name</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Price</th>
                  <th className="border border-gray-200 px-3 py-2 text-left">Rating</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: any) => (
                  <tr key={item.id}>
                    <td className="border border-gray-200 px-3 py-2">{item.name}</td>
                    <td className="border border-gray-200 px-3 py-2">{item.price}</td>
                    <td className="border border-gray-200 px-3 py-2">{item.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AppsSDKUIProvider>
    </HostProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PizzazTableWidget />
  </StrictMode>
);