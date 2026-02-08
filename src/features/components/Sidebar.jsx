import React, { useState, useEffect } from "react";
import { Layout, Menu, message } from "antd";
import {
  HomeFilled,
  IdcardFilled,
  SearchOutlined,
  BankFilled,
  CalendarFilled,
  // ❌ ลบ LogoutOutlined ออก
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import colors from "@/features/designsystem/colors";
import logo from "@/assets/images/Logo.svg";


const { Sider } = Layout;

const Sidebar = ({ mobileMode = false, onClose }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ❌ ลบ handleSignout ออกไป

  // ฟังก์ชันจัดการคลิกเมนู
  const handleMenuClick = (key) => {
    switch (key) {
      case "0": // 💡 เพิ่ม case "0" (Logo) ให้ไปยัง Dashboard
      case "1":
        navigate("/");
        break;

      case "2":
        navigate("/update-profile");
        break;

      case "3":
        navigate("/search-courses");
        break;

      case "4":
        navigate("/universities");
        break;

      case "5":
        navigate("/events");
        break;

      // ❌ ลบ case "6" ออกไป

      default:
        break;
    }

    if (mobileMode && onClose) onClose(); // ปิด Sidebar บนมือถือ
  };

  const getSelectedKey = () => {
    // 1. ดึง Path ปัจจุบัน (เช่น '/', '/search-courses', '/update-profile')
    const path = location.pathname;
    
    // 2. แปลง Path เป็น Menu Key ที่ถูกต้อง
    switch (path) {
      case "/":
      case "/dashboard": // ใส่ Path ที่นำไปยัง Dashboard
        return ["1"];
      case "/update-profile":
        return ["2"];
      case "/search-courses":
        return ["3"];
      case "/universities":
        return ["4"];
      case "/events":
        return ["5"];
      default:
        // หาก Path ไม่ตรงกับอันไหน ให้ไม่มี Menu ไหนถูก Active (หรือกำหนดเป็น Key ที่ใกล้เคียงที่สุด)
        return []; 
    }
  };
  // ------------------------------------------------------------------
  // 🔨 Menu Items ที่ได้รับการปรับปรุง
  // ------------------------------------------------------------------
  const menuItems = [
    {
      key: "0", // Logo (ตอนนี้คลิกได้แล้ว)
      icon: (
        <img
          src={logo}
          alt="Logo"
          style={{ width: "auto", height: "24px" }}
        />
      ),
    },
    {
      key: "1",
      icon: <HomeFilled style={{ color: colors.neutral[1] }} />,
      label: "Dashboard",
    },
    {
      key: "2",
      icon: <IdcardFilled style={{ color: colors.neutral[1] }} />,
      label: "My Profile",
    },
    {
      key: "3",
      icon: <SearchOutlined style={{ color: colors.neutral[1] }} />,
      label: "Search",
    },
    {
      key: "4",
      icon: <BankFilled style={{ color: colors.neutral[1] }} />,
      label: "University",
    },
    {
      key: "5",
      icon: <CalendarFilled style={{ color: colors.neutral[1] }} />,
      label: "Event",
    },
    // ❌ ลบรายการเมนู Sign Out ออกไป
  ];

  return (
    <Sider
      collapsed={mobileMode ? false : collapsed}
      collapsedWidth={47}
      onMouseEnter={() => !mobileMode && setCollapsed(false)}
      onMouseLeave={() => !mobileMode && setCollapsed(true)}
      width={mobileMode ? "100%" : 200}
      trigger={null}
      style={{
        height: mobileMode ? "100%" : "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: colors.primary[7],
        transition: "all 0.3s ease-in-out",
        overflow: "auto",
      }}
    >
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectedKey()}
        style={{
          backgroundColor: colors.primary[7],
          borderRight: 0,
          color: colors.neutral[1],
          padding: "0",
        }}
        // ใช้งาน Menu Items ที่ปรับปรุงแล้ว
        items={menuItems} 
        onClick={(e) => handleMenuClick(e.key)}
      />
    </Sider>
  );
};

export default Sidebar;