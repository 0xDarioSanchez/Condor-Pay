import { createRoot } from "react-dom/client";
// import "@stellar/design-system/build/styles.min.css";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  // <StrictMode>
  //   <NotificationProvider>
  //     <QueryClientProvider client={queryClient}>
  //       <WalletProvider>
  //         <BrowserRouter>
  <div>
    <App />
  </div>,
  /* </BrowserRouter>
</WalletProvider>
</QueryClientProvider>
</NotificationProvider>
</StrictMode>, */
);
