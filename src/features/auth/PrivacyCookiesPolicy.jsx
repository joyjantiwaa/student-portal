// src/features/auth/PrivacyCookiesPolicy.jsx
import React from "react";
import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import colors from "@/features/designsystem/colors.js";
import "@/features/auth/Login.css";

const { Title, Paragraph, Text } = Typography;

const PrivacyCookiesPolicy = () => {
  const navigate = useNavigate();

  return (
    <div
      className="page-background"
      style={{
        backgroundColor: colors.conditional.pageBackground,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        padding: "40px 16px",
      }}
    >
      <div
        className=""
        style={{
          maxWidth: "776px",
          width: "100%",
        }}
      >
        {/* Header */}
        <div
        style={{
            marginBottom: "64px",
            textAlign: "center",
        }}
        >
        <Text style={{ color: colors.primary[6], display: "block", marginBottom: "8px" }}>
            Published 20 Jan 2022
        </Text>
        <Title
            level={1}
            style={{
            color: colors.neutral[10],
            margin: 0,
            }}
        >
            Privacy and Cookies Policy
        </Title>
        </div>

        {/* Content */}
        <Typography>
          <Paragraph style={{ color: colors.character.primary }}>
            SI-Application (“we,” “our,” or “us”) values your privacy and is committed to protecting your personal information. This Privacy and Cookies Policy explains how we collect, use, store, and share your information when you use our website and services (collectively, the “Services”). By using our Services, you consent to the practices described in this Policy.
          </Paragraph>

          <Title level={4} style={{ color: colors.neutral[10] }}>1. Information We Collect</Title>
          <Paragraph style={{ color: colors.character.primary }}>
            We may collect the following types of information from users:
          </Paragraph>
          <Title level={5} style={{ color: colors.neutral[10] }}>a) Personal Information:</Title>
          <Paragraph style={{ color: colors.character.primary }}>
            Name, date of birth, email address, phone number, and contact details
            Educational history, transcripts, certificates, and other application-related information
            Payment information when you make transactions through our Services
          </Paragraph>
          <Title level={5} style={{ color: colors.neutral[10] }}>b) Non-Personal Information:</Title>
          <Paragraph style={{ color: colors.character.primary }}>
            IP address, browser type, device information
            Pages visited, time spent on the site, and other usage data
            Cookies and similar technologies (see Section 6)
          </Paragraph>

          <Title level={4} style={{ color: colors.neutral[10] }}>2. How We Use Your Information</Title>
          <Paragraph style={{ color: colors.character.primary }}>
            We use your information to:
            Provide, manage, and improve our Services
            Process university applications and related documentation
            Communicate with you regarding your account, application status, and updates
            Send promotional or marketing information (you can opt out at any time)
            Comply with legal obligations and prevent fraud
          </Paragraph>

          <Title level={4} style={{ color: colors.neutral[10] }}>3. Sharing Your Information</Title>
          <Paragraph style={{ color: colors.character.primary }}>
            We do not sell your personal information. We may share information with:
            Universities and educational institutions to process your applications
            Service providers who assist us in operating the website, processing payments, or sending communications
            Legal authorities if required by law or to protect our rights
          </Paragraph>

          <Title level={4} style={{ color: colors.neutral[10] }}>4. Data Security</Title>
          <Paragraph style={{ color: colors.character.primary }}>
            We implement appropriate technical and organizational measures to protect your data against unauthorized access, loss, or misuse.
            While we strive to secure your information, no method of transmission over the internet or electronic storage is completely secure.
          </Paragraph>

          <Title level={4} style={{ color: colors.neutral[10] }}>5. Your Rights</Title>
          <Paragraph style={{ color: colors.character.primary }}>
            Depending on your jurisdiction, you may have the following rights:
            Access and obtain a copy of your personal information
            Correct or update your information
            Request deletion of your personal information
            Withdraw consent for certain data processing activities
            Object to or restrict certain processing of your data
          </Paragraph>
        </Typography>

        {/* Back Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <Button
            type="primary"
            size="large"
            className="standard"
            onClick={() => navigate(-1)} // กลับไปหน้า Sign Up
            style={{
              maxWidth: "420px",
              width: "100%",
            }}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyCookiesPolicy;
