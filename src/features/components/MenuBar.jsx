import React, { useState, useCallback, useEffect } from "react";
import { Layout, Menu, Badge, Button, Dropdown, message } from "antd"; 
import { 
    BellOutlined, 
    MessageOutlined, 
    MenuFoldOutlined,
    UserOutlined, 
    GlobalOutlined 
} from "@ant-design/icons"; 
import colors from "@/features/designsystem/colors";
import Sidebar from "@/features/components/Sidebar"; 
import ChatWindow from "@/features/components/Chat"; 
// 🔑 IMPORT AUTH CONTEXT
import { useAuth } from "@/features/auth/AuthContext"; 
import { useNavigate } from "react-router-dom"; // 🔑 Import useNavigate เพื่อใช้ในการนำทาง

const { Header } = Layout;

// ⭐ รายการสกุลเงิน 10 ประเทศ
const CURRENCIES = [
    { key: "THB", label: "🇹🇭 Thai Baht (THB)" },
    { key: "USD", label: "🇺🇸 US Dollar (USD)" },
    { key: "EUR", label: "🇪🇺 Euro (EUR)" },
    { key: "GBP", label: "🇬🇧 British Pound (GBP)" },
    { key: "JPY", label: "🇯🇵 Japanese Yen (JPY)" },
    { key: "AUD", label: "🇦🇺 Australian Dollar (AUD)" },
    { key: "CAD", label: "🇨🇦 Canadian Dollar (CAD)" },
    { key: "CHF", label: "🇨🇭 Swiss Franc (CHF)" },
    { key: "INR", label: "🇮🇳 Indian Rupee (INR)" },
    { key: "SGD", label: "🇸🇬 Singapore Dollar (SGD)" },
];


const MenuBar = () => { 
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0); 
    const [unreadMessageCount, setUnreadMessageCount] = useState(0);
    const [currentCurrency, setCurrentCurrency] = useState('USD');
    
    // 🔑 ดึงฟังก์ชัน logout จาก AuthContext
    const { logout } = useAuth();
    const navigate = useNavigate(); // ใช้สำหรับนำทางไปยังหน้าอื่นนอกเหนือจากการ Log out


    // ------------------------------------------------------------------
    // ⚙️ Logic Responsive & Handlers 
    // ------------------------------------------------------------------
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        // Mock notifications and unread counts
        setNotifications([
            { key: 1, message: "Your application status has been updated.", time: "2 hours ago" },
            { key: 2, message: "New event added: UK University Fair.", time: "1 day ago" },
        ]);
        setUnreadCount(2); // Set initial unread count
    }, []); 
    
    useEffect(() => {
        setUnreadMessageCount(3);
    }, []);

    const handleDropdownOpen = (open) => {
        if (!open) {
            setUnreadCount(0);
        }
    };

    const handleMessageClick = () => {
        setUnreadMessageCount(0);
        setIsChatOpen(prev => !prev);
    };

    const handleCurrencySelect = ({ key }) => {
        setCurrentCurrency(key);
        message.success(`Currency changed to ${key}`);
    };
    
    // 🎯 NEW HANDLER: จัดการการ Log out ที่ถูกต้อง
    const handleLogout = () => {
        // 1. เรียก Context function เพื่อเคลียร์สถานะ Auth Token/User Data
        logout(); 
        // 2. แสดงข้อความแจ้งเตือน
        message.success("Logged out successfully! Redirecting to login...");
        // 3. Router (ใน App.jsx) จะตรวจพบว่า isAuthenticated = false และ Redirect ไปที่ /login โดยอัตโนมัติ
        // หากต้องการให้แน่ใจ 100% สามารถเรียก navigate('/login') ได้ แต่ตาม logic Protected Route แล้วไม่จำเป็น
    }

    // ------------------------------------------------------------------
    // 🟢 Dropdown Menu Content
    // ------------------------------------------------------------------
    
    // 1. Notification Menu (ไม่เปลี่ยนแปลง)
    const notificationMenu = (
        <Menu style={{ width: 300 }}>
            {notifications.length > 0 ? (
                notifications.map((item) => (
                    <Menu.Item key={item.key} style={{ whiteSpace: 'normal', height: 'auto', lineHeight: '1.5', padding: '10px 12px' }}>
                        <div style={{ fontWeight: 'normal' }}>{item.message}</div>
                        <div style={{ fontSize: 12, color: colors.character.secondary }}>{item.time}</div>
                    </Menu.Item>
                ))
            ) : (
                <Menu.Item key="no-notif">No new notifications</Menu.Item>
            )}
        </Menu>
    );

    // 2. User Menu (แก้ไข onClick สำหรับ Logout)
    const userMenu = (
        <Menu style={{ width: 180 }}>
            <Menu.Item 
            key="password" 
            onClick={() => navigate("/update-password")} // ใช้ navigate แทน window.location.href
        >
            Change Password
        </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" onClick={handleLogout}> {/* 🎯 เรียกใช้ handleLogout ใหม่ */}
                Logout
            </Menu.Item>
        </Menu>
    );
    
    // 3. Currency Dropdown Menu Content (ไม่เปลี่ยนแปลง)
    const currencyMenu = (
        <Menu 
            style={{ width: 200 }}
            selectedKeys={[currentCurrency]} 
            onClick={handleCurrencySelect} 
        >
            <Menu.ItemGroup title="Select Base Currency">
                {CURRENCIES.map(item => (
                    <Menu.Item key={item.key}>
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu.ItemGroup>
        </Menu>
    );


    // ✅ เมนูหลัก (บน Desktop)
    const items = [
        {
            key: "guide",
            label: "Guide",
            onClick: () => navigate("/blogs"), // ใช้ navigate แทน window.location.href
        },
    ];


    return (
        <Header
            style={{
                background: colors.neutral[1],
                padding: "0 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: 48, 
                position: "relative",
                borderBottom: `1px solid ${colors.neutral[4]}`,
            }}
        >
            {/* ซ้าย (MenuFold มือถือ + Desktop Menu) */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                {isMobile && (
                    <Button
                        type="text"
                        icon={<MenuFoldOutlined style={{ fontSize: 20 }} />}
                        onClick={() => setMenuOpen(!menuOpen)}
                    />
                )}


                {/* Desktop Menu */}
                {!isMobile && (
                    <Menu
                        mode="horizontal"
                        items={items}
                        style={{
                            border: "none",
                            background: "transparent",
                            minWidth: 120,
                        }}
                    />
                )}
            </div>


            {/* Toolbar ขวาสุด */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                
                {/* 🔔 Notification Icon with Badge */}
                <Dropdown 
                    overlay={notificationMenu} 
                    trigger={['click']} 
                    placement="bottomRight"
                    onOpenChange={handleDropdownOpen}
                >
                    <Badge count={unreadCount} overflowCount={99} size="small" offset={[-4, 4]}>
                        <BellOutlined style={{ fontSize: 18, cursor: "pointer", color: colors.character.primary }} /> 
                    </Badge>
                </Dropdown>

                {/* 💬 Message Icon with Badge */}
                <Badge count={unreadMessageCount} size="small" offset={[-4, 4]}>
                    <MessageOutlined 
                        style={{ fontSize: 18, cursor: "pointer", color: colors.character.primary }} 
                        onClick={handleMessageClick}
                    />
                </Badge>
                
                {/* 🟢 Currency Selector Dropdown */}
                <Dropdown 
                    overlay={currencyMenu} 
                    trigger={['click']} 
                    placement="bottomRight"
                >
                    <GlobalOutlined 
                        style={{ fontSize: 18, cursor: "pointer", color: colors.character.primary }} 
                    />
                </Dropdown>

                {/* 👤 User Profile Dropdown */}
                <Dropdown 
                    overlay={userMenu} 
                    trigger={['click']} 
                    placement="bottomRight"
                >
                    <UserOutlined 
                        style={{ fontSize: 18, cursor: "pointer", color: colors.character.primary }} 
                    />
                </Dropdown>
            </div>


            {/* Sidebar เต็มจอบนมือถือ */}
            {isMobile && menuOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 48, 
                        left: 0,
                        width: "100%",
                        height: "calc(100vh - 48px)",
                        background: colors.character.primary,
                        zIndex: 1200,
                        overflowY: "auto",
                    }}
                >
                    {/* Note: Sidebar component still needs fixing if it relies on auth/nav */}
                    <Sidebar mobileMode onClose={() => setMenuOpen(false)} />
                </div>
            )}

            {/* 🆕 4. Render Chat Component */}
            {isChatOpen && (
                <ChatWindow 
                    onClose={() => setIsChatOpen(false)} 
                />
            )}
        </Header>
    );
};


export default MenuBar;