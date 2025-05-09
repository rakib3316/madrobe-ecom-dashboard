import "@ant-design/v5-patch-for-react-19";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { ConfigProvider } from "antd";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#6EC0F0", // your custom primary color
          fontFamily: "Poppins, sans-serif",
        },
      }}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
          <Toaster richColors />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  </StrictMode>
);
