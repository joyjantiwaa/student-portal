// src/features/auth/TermsAndConditions.jsx
import React from "react";
import { Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import colors from "@/features/designsystem/colors.js";
import "@/features/auth/Login.css";

const { Title, Paragraph, Text } = Typography;

const TermsAndConditions = () => {
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
            Terms and Conditions
        </Title>
        </div>

        {/* Content */}
        <Typography>
          <Paragraph style={{ color: colors.character.primary }}>
            Welcome to SI-Application (“we,” “our,” or “us”). By accessing or using our website and
            services (collectively, the “Services”), you agree to comply with and be bound by the
            following terms and conditions (“Terms”). Please read these Terms carefully before using
            our Services.
          </Paragraph>

          <Paragraph style={{ color: colors.character.primary }}>
            If you do not agree with any part of these Terms, you must not use our Services.
          </Paragraph>

          <Title level={4} style={{ color: colors.neutral[10] }}>1. Eligibility</Title>
          <Paragraph style={{ color: colors.character.primary }}>
            You must be at least 18 years old to use our Services. By using our Services, you
            represent and warrant that you have the legal capacity to enter into a binding agreement.
          </Paragraph>

          <Title level={4} style={{ color: colors.neutral[10] }}>2. Use of Services</Title>
          <Paragraph style={{ color: colors.character.primary }}>
            SI-Application provides a platform to assist students in applying to universities in the
            UK, Australia, New Zealand, and Ireland. You agree to use the Services only for lawful
            purposes and in a manner consistent with all applicable laws and regulations. You must
            not misuse or interfere with the operation of the Services, submit false, misleading, or
            fraudulent information, or attempt to access accounts, data, or systems of other users
            without permission.
          </Paragraph>

          <Title level={4} style={{ color: colors.neutral[10] }}>2. Use of Services</Title>
          <Paragraph style={{ color: colors.character.primary }}>
            SI-Application provides a platform to assist students in applying to universities in the
            UK, Australia, New Zealand, and Ireland. You agree to use the Services only for lawful
            purposes and in a manner consistent with all applicable laws and regulations. You must
            not misuse or interfere with the operation of the Services, submit false, misleading, or
            fraudulent information, or attempt to access accounts, data, or systems of other users
            without permission.
          </Paragraph>

          <Title level={4} style={{ color: colors.neutral[10] }}>3. User Account</Title>
          <Paragraph style={{ color: colors.character.primary }}>
            To access certain features, you may be required to create an account.
            You are responsible for maintaining the confidentiality of your account credentials.
            You agree to notify us immediately of any unauthorized use of your account.
            We reserve the right to suspend or terminate accounts that violate these Terms.
          </Paragraph>

          <Title level={4} style={{ color: colors.neutral[10] }}>4. Application Process</Title>
          <Paragraph style={{ color: colors.character.primary }}>
           SI-Application provides guidance, tools, and resources to help students apply to universities.
            All applications submitted through our Services are subject to the acceptance policies of the respective universities.
            We do not guarantee admission to any university.
            Users are responsible for providing accurate and complete information on their applications.
          </Paragraph>

          <Title level={4} style={{ color: colors.neutral[10] }}>5. Fees and Payments</Title>
          <Paragraph style={{ color: colors.character.primary }}>
            Some Services may require payment of fees.            
            All fees are non-refundable unless explicitly stated otherwise.
            Payments must be made through the payment methods provided on our website.
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

export default TermsAndConditions;
