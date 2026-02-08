import React, { useState } from "react";
import { Tabs, Button, Input, Checkbox, message } from "antd"; // 💡 เพิ่ม message
import { GoogleOutlined } from "@ant-design/icons";
import colors from "@/features/designsystem/colors.js";
import "@/features/auth/Login.css";
import { Link, useNavigate } from "react-router-dom";
import silogo from "@/assets/images/silogo.svg";
import "antd/dist/antd.css";
import '@/App.css';

// 🔑 Import Hook และฟังก์ชันที่แยกแล้วจาก Auth Context
import { useAuth } from "@/features/auth/AuthContext"; 

const { TabPane } = Tabs;

const Login = ({ registerMode = false }) => { 
  const [activeTab, setActiveTab] = useState(registerMode ? "signup" : "login");
  const [loginError, setLoginError] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const navigate = useNavigate();

  // 🔑 ดึงฟังก์ชัน login และ registerAndLogin
  const { login, registerAndLogin } = useAuth(); 

  const handleTabChange = (key) => {
    setActiveTab(key);
    setLoginError("");
    setSignUpError("");
  };

  const handleLogin = () => {
    // 🛑 Logic จริง: เรียก API Sign In
    const isSuccess = true; // Mock: สมมติว่าล็อกอินสำเร็จ
    
    if (isSuccess) {
      // 2. เมื่อสำเร็จ: เรียก login() เพื่ออัปเดต Auth Context
      login({}); // ⬅️ ใช้ login() 
      setLoginError(""); 
      // Router จะจัดการ Redirect ไปที่ Dashboard หรือ OnBoarding
    } else {
      // Mock ตัวอย่าง error
      setLoginError("Password is not correct");
    }
  };

  const handleSignUp = () => {
    // 🛑 Logic จริง: เรียก API Register
    const isSuccess = true; // Mock: สมมติว่าลงทะเบียนสำเร็จ
    
    if (isSuccess) {
      // 2. เมื่อสำเร็จ: เรียก registerAndLogin() 
      registerAndLogin({}); // ⬅️ ใช้ registerAndLogin()
      setSignUpError("");
      // Router จะจัดการ Redirect ไปที่ OnBoarding (เพราะ isFirstTime ถูกตั้งเป็น true)
      
    } else {
      // Mock ตัวอย่าง error
      setSignUpError("Password does not match");
    }
  };
  

  return (
    <div className="page-background">
      <div className="login-container" >
        <img 
        src={silogo} 
        alt="Logo" 
        style={{ 
            maxWidth: '244px', 
            display: 'block', // สำคัญ: ต้องเป็น block เพื่อให้ margin auto ทำงาน
            margin: '0 auto', // จัดกึ่งกลางแนวนอน
        }} 
    />

        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          className="login-tabs"
        >
          {/* ---------------- LOGIN TAB ---------------- */}
          <TabPane tab="Login" key="login">
            <div className="form-row">
              <Button
                icon={<GoogleOutlined />}
                size="large"
                block
                className="social-button"
              >
                Sign in with Google
              </Button>

              <div className="form-item">
                <Input placeholder="Email" size="large" />
              </div>

              <div className="form-item">
                <Input.Password placeholder="Password" size="large" />
                {loginError && (
                  <div
                    className="error-text"
                    style={{ color: colors.character.danger }}
                  >
                    {loginError}
                  </div>
                )}
              </div>

              <div className="login-options">
                <Checkbox>Remember me</Checkbox>
                <Link to="/forget-password" style={{ color: colors.primary[6] }}>
                  Forgot password?
                </Link>
              </div>

              <Button
                type="primary"
                size="large"
                className="standard"
                style={{ width: "100%", maxWidth: "420px" }}
                onClick={handleLogin} // 🎯 เรียก handleLogin
              >
                Login
              </Button>
              
              
            </div>
          </TabPane>

          {/* ---------------- SIGN UP TAB ---------------- */}
          <TabPane tab="Sign Up" key="signup">
            <div className="form-row">

              <Button
                icon={<GoogleOutlined />}
                size="large"
                block
                className="social-button"
              >
                Sign up with Google
              </Button>
              <div className="name-fields">
                <Input placeholder="First Name" size="large" />
                <Input placeholder="Family Name" size="large" />
              </div>

              <Input placeholder="Email" size="large" />

              <div className="form-item">
                <Input.Password placeholder="Password" size="large" />
              </div>

              <div className="form-item">
                <Input.Password placeholder="Confirm Password" size="large" />
                {signUpError && (
                  <div
                    className="error-text"
                    style={{ color: colors.character.danger }}
                  >
                    {signUpError}
                  </div>
                )}
              </div>

              <Input
                placeholder="Phone Number"
                size="large"
                addonBefore={
                  <select>
                    <option value="+66">+66</option>
                    <option value="+1">+1</option>
                  </select>
                }
              />

              <Checkbox>
                I have read and agree to{" "}
                <Link
                  to="/terms-and-conditions"
                  style={{ color: colors.primary[6] }}
                >
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-cookies-policy"
                  style={{ color: colors.primary[6] }}
                >
                  Privacy & Cookies Policy*
                </Link>
              </Checkbox>

              <Button
                type="primary"
                size="large"
                className="standard"
                style={{ width: "100%", maxWidth: "420px" }}
                onClick={handleSignUp} // 🎯 เรียก handleSignUp
              >
                Sign Up
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;