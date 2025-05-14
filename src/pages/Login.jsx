import { Button, Checkbox, Form, Input } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";
import loginSvg from "../assets/login.svg";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import styles from "../styles/login.module.css";

export default function Login() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const onFinish = async (values) => {
    const toastId = toast.loading("Logging in ...");
    try {
      let res = await login(values).unwrap();

      dispatch(
        setUser({
          user: res.data.userDetails,
          token: res.data.accessToken,
        })
      );

      if (res.success) {
        toast.success("Login successfully!", { id: toastId, duration: 2000 });
        navigate("/");
      }
    } catch (err) {
      console.log("login error =>", err);
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  useEffect(() => {
    form.setFieldsValue({ remember: true });
  }, [form]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.svgContainer}>
        <div className={styles.svgImage}>
          <img src={loginSvg} alt="login" />
        </div>
      </div>
      <div className={styles.loginFromContainer}>
        <div className={styles.loginContentWrapper}>
          <div className={styles.title}>
            <h1>Welcome back!</h1>
            <p>Access your dashboard to manage products, orders, and users.</p>
          </div>
          <div className={styles.formContainer}>
            <Form
              name="login"
              layout="vertical"
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item label={null}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{ width: "100%" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <p className={styles.forgotPassword}>
              Can't remember your login details?{" "}
              <NavLink to="/forgot-password">Reset your password</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
