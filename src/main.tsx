import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import "./global.scss";
import { SnackbarProvider } from "notistack";
import { Suspense } from "react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <SnackbarProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </SnackbarProvider>
  </QueryClientProvider>,
);
