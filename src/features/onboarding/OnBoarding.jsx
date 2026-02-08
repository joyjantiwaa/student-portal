import React, { useState } from "react";
import { Button, Select, Typography, Checkbox, message } from "antd"; // 💡 เพิ่ม message
import colors from "@/features/designsystem/colors.js";
import "@/features/auth/Login.css";
import silogo from "@/assets/images/silogo.svg";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";


const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const OnBoarding = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  // 🔑 ดึงฟังก์ชัน completeOnboarding
  const { completeOnboarding } = useAuth(); 

  const handleNext = () => setStep(step + 1);
  
  // 🎯 ฟังก์ชันจัดการเมื่อเสร็จสิ้น Onboarding
  const handleSubmit = () => {
    // 1. 🛑 Logic จริง: บันทึกข้อมูล Onboarding ลงใน State/Database
    
    // 2. 🔑 เรียก completeOnboarding เพื่ออัปเดตสถานะใน AuthContext
    completeOnboarding();
    
    // 3. ➡️ นำทางไปยัง Dashboard
    navigate("/"); 
    
    message.success("Setup complete! Welcome to your Dashboard.");
  };

  return (
    <div
      className="page-background"
      style={{ backgroundColor: colors.conditional.pageBackground }}
    >
      <div className="login-container">
        {/* Logo ตรงกลาง */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <img src={silogo} alt="Logo" className="login-logo" style={{width: '244px'}} />
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <Paragraph
              style={{
                color: colors.character.secondary,
                fontSize: "16px",
                lineHeight: "1.6",
                marginBottom: "32px",
                textAlign: "left",
              }}
            >
              Before starting your applications with SI-Applications,
              please could you answer a few simple questions?
            </Paragraph>
            <Button
              type="primary"
              size="large"
              className="standard"
              onClick={handleNext}
              style={{ width: "100%", maxWidth: "420px" }}
            >
              Get started
            </Button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div style={{ textAlign: "left" }}>
            {/* Nationality */}
            <div style={{ marginBottom: "16px" }}>
              <Text style={{ display: "block", marginBottom: "8px" }}>
                What is your nationality
              </Text>
              <Select
                mode="multiple"
                placeholder="Select your nationality"
                style={{ width: "100%" }}
              >
                <Option value="thai">Thai</Option>
                <Option value="malaysian">Malaysian</Option>
                <Option value="indonesian">Indonesian</Option>
              </Select>
            </div>

            {/* Study Level */}
            <div style={{ marginBottom: "16px" }}>
              <Text style={{ display: "block", marginBottom: "8px" }}>
                What level you would like to study at?
              </Text>
              <Select
                mode="multiple"
                placeholder="Select study level"
                style={{ width: "100%" }}
              >
                <Option value="bachelor">Bachelor</Option>
                <Option value="master">Master</Option>
                <Option value="phd">PhD</Option>
              </Select>
            </div>

            {/* Subject */}
            <div style={{ marginBottom: "16px" }}>
              <Text style={{ display: "block", marginBottom: "8px" }}>
                Which subject would you like to study?
              </Text>
              <Select
                mode="multiple"
                placeholder="Select subject"
                style={{ width: "100%" }}
              >
                <Option value="business">Business</Option>
                <Option value="engineering">Engineering</Option>
                <Option value="design">Design</Option>
              </Select>
            </div>

            {/* Start Date */}
            <div style={{ marginBottom: "16px" }}>
              <Text style={{ display: "block", marginBottom: "8px" }}>
                When would you like to begin your studies abroad?
              </Text>
              <Select
                mode="multiple"
                placeholder="Select start date"
                style={{ width: "100%" }}
              >
                <Option value="2025">2025</Option>
                <Option value="2026">2026</Option>
              </Select>
            </div>

            {/* Countries */}
            <div style={{ marginBottom: "24px" }}>
              <Text style={{ display: "block", marginBottom: "8px" }}>
                Where do you want to study abroad?
              </Text>
              <Select
                mode="multiple"
                placeholder="Select countries"
                style={{ width: "100%" }}
              >
                <Option value="uk">UK</Option>
                <Option value="ireland">Ireland</Option>
                <Option value="newzealand">New Zealand</Option>
                <Option value="australia">Australia</Option>
              </Select>
            </div>

            <Button
              type="primary"
              size="large"
              className="standard"
              onClick={handleNext}
              style={{ width: "100%", maxWidth: "420px" }}
            >
              Next
            </Button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div style={{ textAlign: "left" }}>
            <Title
              level={4}
              style={{
                color: colors.character.primary,
                marginBottom: "16px",
                textAlign: "left",
              }}
            >
              Thank you
            </Title>

            <Paragraph
              style={{
                color: colors.character.secondary,
                marginBottom: "16px",
              }}
            >
              In order to process your applications, we need to share your
              information with the universities you select. We will never share
              your information with anyone else.
            </Paragraph>

            {/* Checkbox + text แถวเดียว */}
            <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "24px" }}>
              <Checkbox style={{ marginRight: "8px", marginTop: "2px" }} />
              <span style={{ lineHeight: "1.4", color: colors.character.secondary, }}>
                I authorise my information to be shared with SI-Applications and
                universities for the purpose of assisting with my application, and
                to email me with relevant information about their services.
              </span>
            </div>

            <Button 
              type="primary" 
              size="large"
              onClick={handleSubmit} // 💡 เปลี่ยนไปใช้ handleSubmit
              style={{width: "100%"}}
            >
              Apply
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnBoarding;