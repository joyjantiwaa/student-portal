import React from "react";
import { Button, Typography, Grid } from "antd";
import { MessageOutlined, EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import colors from "@/features/designsystem/colors"; 
import backgroundbottom from "@/assets/images/backgroundbottom.jpg";
import "antd/dist/antd.css";

// ดึง useBreakpoint จาก Grid
const { useBreakpoint } = Grid;
const { Title, Text, Paragraph } = Typography;

export default function UniversityFairBottom() {
  // 💡 ประกาศตัวแปร ismobile โดยใช้ Ant Design Hook
  const screens = useBreakpoint();
  const ismobile = screens.sm === false; // ตรวจสอบว่าหน้าจอเล็กกว่า 'sm' (มือถือ) หรือไม่

  const officeLocations = [
    { city: "Bangkok", address: <>123 Main Street, Bangkok<br /> Thailand 10100</> },
    { city: "Sydney", address: <>100 George Street<br />Sydney NSW 2000 AU</> },
    { city: "Byron Bay", address: <>100 Jonson Street<br />Byron Bay NSW 2481 AU</> },
    { city: "London", address: <>100 Oxford Street London W1D 1LL UK</> },
    { city: "San Francisco Bay", address: <>100 Market Street <br />San Francisco, CA 94105 USA</> },
    { city: "Sweden", address: <>Drottninggatan 100<br /> 111 60 Stockholm SE</> },
  ];

  const half = Math.ceil(officeLocations.length / 2);
  const leftOffices = officeLocations.slice(0, half);
  const rightOffices = officeLocations.slice(half);

  const contactBoxes = [
    {
      icon: <MessageOutlined style={{ fontSize: 24, color: colors.neutral[1] }} />,
      title: "Chat to consultant",
      subtitle: "Speak to our friendly team.",
      detail: "consultant@abroadbride.com",
    },
    {
      icon: <EnvironmentOutlined style={{ fontSize: 24, color: colors.neutral[1] }} />,
      title: "Visit us",
      subtitle: "Visit our office HQ.",
      detail: "100 Smith Street Collingwood VIC 3066 AU",
    },
    {
      icon: <PhoneOutlined style={{ fontSize: 24, color: colors.neutral[1] }} />,
      title: "Call us",
      subtitle: "Mon-Fri from 8am to 5pm.",
      detail: "+1 (555) 000-0000",
    },
  ];

  return (
    <div>
      {/* 1️⃣ Our Locations Section */}
      <div
        style={{
          background: colors.neutral[2],
          padding: "96px 64px",
          display: "flex",
          flexDirection: "column",
          gap: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 32,
          }}
        >
          {/* กล่องแรก: Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              flex: "1 1 300px",
              minWidth: 280,
            }}
          >
            <Title level={5} style={{ color: colors.primary[6], margin: 0, fontWeight: 400 }}>Our locations</Title>
            <Title level={1} style={{ color: colors.character.primary, margin: 0 }}>Visit our offices</Title>
            <Title level={4} style={{ color: colors.character.secondary, margin: 0 }}>
              Find us at these locations.
            </Title>
          </div>

          {/* กล่องสอง: เมืองฝั่งซ้าย */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
              flex: "1 1 300px",
              minWidth: 280,
            }}
          >
            {leftOffices.map((office, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Title level={4} style={{ color: colors.character.primary, margin: 0 }}>{office.city}</Title>
                <Title 
                  level={5} 
                  style={{ 
                    color: colors.character.secondary, 
                    margin: 0,
                    // 🎯 แก้ไข Font Weight
                    fontWeight: 400
                  }}
                >
                  {office.address}
                </Title>
              </div>
            ))}
          </div>

          {/* กล่องสาม: เมืองฝั่งขวา */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
              flex: "1 1 300px",
              minWidth: 280,
            }}
          >
            {rightOffices.map((office, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Title level={4} style={{ color: colors.character.primary, margin: 0 }}>{office.city}</Title>
                <Title 
                  level={5} 
                  style={{ 
                    color: colors.character.secondary, 
                    margin: 0,
                    // 🎯 แก้ไข Font Weight
                    fontWeight: 400
                  }}
                >
                  {office.address}
                </Title>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2️⃣ Contact Details Section */}
      <div style={{ display: "flex", flexDirection: "column", padding: "96px 64px", gap: 64 }}>
        <div style={{ padding: "48px 0px", alignItems: "center",display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ 
            padding: "4px 12px", 
            borderRadius: 100, 
            background: colors.primary[1], 
            color: colors.primary[7], 
            fontSize: 16, 
            fontWeight: 500, 
            width: "fit-content" 
          }}>
            Contact us
          </div>
          <Title level={1} style={{ color: colors.character.primary, margin: 0 }}>
            We’d love to hear from you
          </Title>
          <Paragraph style={{ fontSize: 16, color: colors.character.secondary, margin: 0 }}>
            Chat to our friendly team.
          </Paragraph>
        </div>

        <img
          src={backgroundbottom}
          alt="Office"
          style={{ width: "100%", height: 400, objectFit: "cover", }}
        />

        {/* Contact Boxes */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
          {contactBoxes.map((box, idx) => (
            <div 
              key={idx} 
              style={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: 24, 
                alignItems: "flex-start", 
                padding: 24,
                flex: "1 1 300px",
                backgroundColor: colors.neutral[3],
              }}
            >
              <div style={{ 
                width: 48, height: 48, borderRadius: 10, background: colors.primary[6], display: "flex", alignItems: "center", justifyContent: "center" 
              }}>
                {box.icon}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <Text style={{ fontSize: 16, color: colors.character.primary, fontWeight: 600 }}>
                  {box.title}
                </Text>
                <Text style={{ fontSize: 16, color: colors.character.secondary, fontWeight: 400 }}>
                  {box.subtitle}
                </Text>
                {box.title.includes("Chat") && (
                  <a href={`mailto:${box.detail}`} style={{ fontSize: 16, color: colors.primary[6], textDecoration: "none" }}>{box.detail}</a>
                )}
                {box.title.includes("Call") && (
                  <a href={`tel:${box.detail.replace(/[^0-9+]/g, '')}`} style={{ fontSize: 16, color: colors.primary[6], textDecoration: "none" }}>{box.detail}</a>
                )}
                {!box.title.includes("Chat") && !box.title.includes("Call") && (
                  <Text style={{ fontSize: 16, color: colors.primary[6] }}>{box.detail}</Text>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3️⃣ Floating Call-to-Action Section (Text 80% Left, Button 20% Right) */}
      <div style={{ position: "relative", height: 500, margin: "0px", }}>
        <div style={{ height: "50%", background: colors.neutral[1], borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}></div>
        <div style={{ height: "50%", background: colors.neutral[10], borderTopLeftRadius: 0, borderTopRightRadius: 0 }}></div>

        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: colors.neutral[2],
          padding: 64,
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          width: '90%', 
        }}>
          {/* กล่อง Flexbox หลักที่ครอบข้อความและปุ่ม */}
          <div 
            style={{ 
              display: "flex", 
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "left",
              gap: 32, 
            }}
          >
            {/* 1. กล่องข้อความ (ชิดซ้าย, 80% width) */}
            <div style={{ 
              minWidth: 300, 
              textAlign: "left" 
            }}>
              <Title level={1} style={{ fontSize: 30, color: colors.character.primary, margin: 0 }}>
                Book a 30-Minute Call with Our Courses Consultant!
              </Title>
              <Paragraph style={{ fontSize: 18, color: colors.character.secondary, marginTop: 16, marginBottom: 0 }}>
                Get expert guidance tailored to your goals. Schedule your call now.
              </Paragraph>
            </div>
            
            {/* 2. กล่องปุ่ม (ชิดซ้ายเสมอ) */}
            <div style={{ 
              flex: "0 0 auto", 
              minWidth: 150, 
              textAlign: "left", // แก้ไขให้ชิดซ้าย
              // ลบ marginLeft: 'auto' ออก (เพราะคุณไม่ได้ใส่มาในโค้ดล่าสุดแล้ว)
            }}>
              <Button type="primary" size="large" style={{ height: 48, padding: "0 30px", fontWeight: 500 }}>
                Book now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}