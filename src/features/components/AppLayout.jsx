import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "@/features/components/Sidebar";
import MenuBar from "@/features/components/MenuBar";
import AppFooter from "@/features/components/Footer"; // ✅ import Footer
import "antd/dist/antd.css";

const { Content } = Layout;

function AppLayout() {
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", position: "relative" }}>
      {/* ✅ Desktop Sidebar */}
      {!isMobile && (
        <Sidebar
          mobileMode={false}
          style={{
            zIndex: 1000, // อยู่เหนือ MenuBar
          }}
        />
      )}

      <Layout
        style={{
          marginLeft: isMobile ? 0 : 47, // ✅ เว้นจาก Sidebar
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* ✅ Menu Bar */}
        <MenuBar isMobile={isMobile} setMenuOpen={setMenuOpen} />

        {/* ✅ Sidebar มือถือ */}
        {isMobile && menuOpen && (
          <div
            style={{
              position: "fixed",
              top: 48,
              left: 0,
              width: "80%",
              height: "calc(100vh - 48px)",
              background: "#096DD9",
              transition: "left 0.3s ease",
              zIndex: 2000,
            }}
          >
            <Sidebar mobileMode={true} onClose={() => setMenuOpen(false)} />
          </div>
        )}

        {/* ✅ Overlay มือถือ */}
        {isMobile && menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              top: 48,
              left: 0,
              width: "100vw",
              height: "calc(100vh - 48px)",
              background: "rgba(0,0,0,0.4)",
              zIndex: 1500,
            }}
          />
        )}

        {/* ✅ Content */}
        <Content
          style={{
            padding: "24px",
            background: "#fff",
            minHeight: "calc(100vh - 48px - 64px)", // ✅ ลบ Footer height ด้วย
          }}
        >
          <h1>Hello world</h1>
          <p>
            • Desktop: Sidebar ซ้าย 47px, MenuBar อยู่ด้านขวา  
            • Mobile: MenuBar อยู่บน, Sidebar toggle ด้วย MenuFold  
          </p>
        </Content>

        {/* ✅ Footer */}
        <AppFooter />
      </Layout>
    </Layout>
  );
}

export default AppLayout;
