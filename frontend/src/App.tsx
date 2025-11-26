import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";

import ReactQueryProvider from "./providers/react-query";
import { ThemeProvider } from "./providers/theme-provider";
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
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster richColors />
        </ThemeProvider>
      </ReactQueryProvider>
    </>
  );
}

export default App;
