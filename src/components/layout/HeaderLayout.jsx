import { Button, Flex, Layout, Tooltip } from "antd";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
const { Header } = Layout;

export default function HeaderLayout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Header style={{ padding: "0px 20px", background: "white" }}>
      <Flex justify="space-between" align="center">
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
      </Flex>
    </Header>
  );
}
