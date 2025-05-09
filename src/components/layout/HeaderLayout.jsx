import { Button, Layout, theme, Tooltip } from "antd";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
const { Header } = Layout;

export default function HeaderLayout() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Header
      style={{
        padding: "0 17px",
        display: "flex",
        justifyContent: "space-between",
        background: colorBgContainer,
      }}
    >
      <div>btn</div>
      <div>
        <Tooltip title="Logout" style={{ fontSize: "14px" }}>
          <Button
            onClick={handleLogout}
            icon={<LogOut size={14} />}
            type="primary"
          />
        </Tooltip>
      </div>
    </Header>
  );
}
