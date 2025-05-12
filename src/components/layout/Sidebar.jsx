import { Layout, Menu } from "antd";
import { routeSources } from "../../routes/source.routes";
import { sidebarRoutesGenerator } from "../../utils/sidebarRoutesGenerator";
const { Sider } = Layout;

export default function Sidebar() {
  return (
    <Sider
      width={250}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={() => {}}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{ backgroundColor: "white" }}
    >
      {/* Logo */}
      <div
        style={{
          width: "100%",
          height: "50px",
          color: "#009689",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
        }}
      >
        Logo
      </div>
      {/* Sidebar menu */}
      <Menu
        mode="inline"
        style={{ border: "none" }}
        defaultSelectedKeys={["dashboard"]}
        items={sidebarRoutesGenerator(routeSources)}
      />
    </Sider>
  );
}
