import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import "./global.scss";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </QueryClientProvider>
);
