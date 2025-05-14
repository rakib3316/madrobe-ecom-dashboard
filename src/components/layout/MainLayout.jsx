import { Layout } from "antd";
import { Outlet } from "react-router";
import HeaderLayout from "./HeaderLayout";
import Sidebar from "./Sidebar";
const { Content, Footer } = Layout;

export default function MainLayout() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout style={{ minHeight: "100vh", backgroundColor: "#f8fafc" }}>
        <HeaderLayout />
        <Content>
          <div
            style={{
              minHeight: "70vh",
              padding: "16px",
              borderRadius: "8px",
              overflow: "auto",
            }}
          >
            <Outlet />
          </div>
        </Content>
        {/* <Footer
          style={{
            textAlign: "center",
            padding: "13px 50px",
            backgroundColor: "#f0fdfa",
            zIndex: 99999,
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer> */}
      </Layout>
    </Layout>
  );
}
