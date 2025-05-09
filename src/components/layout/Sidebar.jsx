import { Layout, Menu } from "antd";
import { sidebarRoutesGenerator } from "../../utils/sidebarRoutesGenerator";
import { routeSources } from "../../routes/source.routes";
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
    >
      {/* Logo */}
      <div
        style={{
          width: "100%",
          height: "50px",
          color: "white",
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
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={sidebarRoutesGenerator(routeSources)}
      />
    </Sider>
  );
}
