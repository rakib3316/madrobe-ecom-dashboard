import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import "./index.css";
import { persistor, store } from "./redux/store";
import router from "./routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#005f5a", // your custom primary color
          fontFamily: "Poppins, sans-serif",
        },
        components: {
          Menu: {
            itemSelectedBg: "#005f5a",
            itemSelectedColor: "#ffffff",
          },
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
