import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";

import ReactQueryProvider from "./providers/react-query";
import { routeTree } from "./route-tree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <ReactQueryProvider>
        <RouterProvider router={router} />
        <Toaster richColors/>
      </ReactQueryProvider>
    </>
  );
}

export default App;
