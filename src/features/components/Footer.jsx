import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import colors from "@/features/designsystem/colors";

const { Footer } = Layout;

const AppFooter = () => {
  const baseColor = colors.neutral[7]; // สีปกติ
  const hoverColor = colors.primary[6]; // สีเมื่อ hover
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const linkStyle = {
    color: baseColor,
    padding: 0,
    height: "auto",
    lineHeight: "inherit",
    fontSize: 12,
  };

  return (
    <Footer
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: isMobile ? "center" : "space-between",
        alignItems: "center",
        gap: isMobile ? 8 : 0,
        padding: "12px 24px",
        borderTop: `1px solid ${colors.neutral[5]}`,
        fontSize: 12,
        textAlign: isMobile ? "center" : "left",
      }}
    >
      {/* ซ้าย */}
      <p style={{ margin: 0, color: baseColor }}>{`© 2023 SI-applications`}</p>

      {/* ขวา */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 4 : 8,
          alignItems: "center",
          justifyContent: "center", // center บนมือถือ
        }}
      >
        <Button
          type="text"
          size="small"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
          onMouseLeave={(e) => (e.currentTarget.style.color = baseColor)}
        >
          All rights reserved
        </Button>

        {!isMobile && <span style={{ color: baseColor }}>|</span>}

        <Button
          type="text"
          size="small"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
          onMouseLeave={(e) => (e.currentTarget.style.color = baseColor)}
        >
          Privacy Policy
        </Button>

        {!isMobile && <span style={{ color: baseColor }}>|</span>}

        <Button
          type="text"
          size="small"
          style={linkStyle}
          onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
          onMouseLeave={(e) => (e.currentTarget.style.color = baseColor)}
        >
          Cookies
        </Button>
      </div>
    </Footer>
  );
};

export default AppFooter;
