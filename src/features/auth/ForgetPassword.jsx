// src/features/auth/ForgetPassword.jsx
import React from "react";
import { Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import colors from "@/features/designsystem/colors.js";
import "@/features/auth/Login.css";

const ForgetPassword = () => {
  const navigate = useNavigate();

  return (
    <div
      className="page-background"
      style={{ backgroundColor: colors.conditional.pageBackground }}
    >
      <div className="login-container">
        <img src="/logo.png" alt="Logo" className="login-logo" />

        <div className="form-row" style={{ gap: 16, display: "flex", flexDirection: "column" }}>
          {/* Input email */}
          <div className="form-item">
            <Input placeholder="Email" size="large" />
          </div>

          {/* Back button ชิดซ้าย */}
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <Button
              size="small"
              className="standard"
              type="link"
              onClick={() => navigate(-1)}
            >
              Back?
            </Button>
          </div>

          {/* Send button full width */}
          <Button
            size="large"
            className="standard"
            type="primary"
            block
            style={{ backgroundColor: colors.primary[6] }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
