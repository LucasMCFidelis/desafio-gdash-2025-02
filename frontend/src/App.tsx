import { createRouter, RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";

import { CurrentUserProvider } from "./providers/current-user-provider";
import ReactQueryProvider from "./providers/react-query";
import { ThemeProvider } from "./providers/theme-provider";
import { WeatherLogsProvider } from "./providers/weather-logs-provider";
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
        <CurrentUserProvider>
          <ThemeProvider>
            <WeatherLogsProvider>
              <RouterProvider router={router} />
              <Toaster richColors />
            </WeatherLogsProvider>
          </ThemeProvider>
        </CurrentUserProvider>
      </ReactQueryProvider>
    </>
  );
}

export default App;
