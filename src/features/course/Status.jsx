import React, { useState, useEffect } from 'react'; // ต้องเพิ่ม useState, useEffect
import { Layout, Card, Typography, Tag, Space } from 'antd'; // เพิ่ม Layout
import { 
    CheckCircleOutlined, 
    ClockCircleOutlined, 
    FileTextOutlined, 
    AuditOutlined,
    UserSwitchOutlined,
    WarningOutlined,
    CloseCircleOutlined,
    DollarCircleOutlined
} from '@ant-design/icons';
// ต้อง Import Component และ Style ที่เกี่ยวข้องกับ Layout
import Sidebar from "@/features/components/Sidebar";
import MenuBar from "@/features/components/MenuBar";
import AppFooter from "@/features/components/Footer";
import colors from "@/features/designsystem/colors"; 
import "antd/dist/antd.css"; 

const { Content } = Layout; // ดึง Content จาก Layout
const { Title, Text, Paragraph } = Typography;

// --- Color Definitions (Replaces Tailwind Colors for Inline Styles) ---
const STATUS_GROUPS = {
    PRIMARY_BLUE: '#3b82f6', 
    PRIMARY_GREEN: '#16a34a', 
    PRIMARY_RED: '#dc2626', 
    URGENT_TEXT: '#b91c1c', 
    NORMAL_TEXT: '#4b5563', 
    SECTION_HEADER: '#1f2937', 
};

// --- Helper function to determine color based on grouping ---
const getStatusColor = (statusName) => {
    // ... (ฟังก์ชันเดิม)
    switch (statusName) {
        case 'Submitted':
        case 'In Review':
        case 'Awaiting Documents':
        case 'Interview Required':
            return STATUS_GROUPS.PRIMARY_BLUE;
        case 'Waitlisted':
        case 'Conditional Offer':
        case 'Unconditional Offer':
        case 'Offer Accepted':
        case 'Deposit Paid':
            return STATUS_GROUPS.PRIMARY_GREEN;
        case 'Offer Declined':
            return STATUS_GROUPS.PRIMARY_RED;
        default:
            return STATUS_GROUPS.PRIMARY_BLUE;
    }
};

// -----------------------------------------------------------
// 🧠 Application Status Data (Translated to English) - (ข้อมูลเดิม)
// -----------------------------------------------------------
const STATUS_DATA = [
    // ... (ข้อมูล STATUS_DATA เดิม)
    {
        name: "Submitted",
        thaiName: "Submitted",
        icon: <FileTextOutlined />,
        color: "geekblue",
        description: "The application and all supporting documents have been successfully sent to the institution/organization system.",
        nextAction: "No further action is required at this time. Wait for the next status confirmation.",
    },
    {
        name: "In Review",
        thaiName: "In Review",
        icon: <AuditOutlined />,
        color: "geekblue",
        description: "Your application is being thoroughly checked and evaluated by the relevant committee or officers.",
        nextAction: "This status may take a long time. Applicants should follow up periodically.",
    },
    {
        name: "Awaiting Documents",
        thaiName: "Awaiting Documents",
        icon: <WarningOutlined />,
        color: "geekblue",
        description: "It was found that some essential documents are missing, incomplete, or do not meet the requirements.",
        nextAction: "Immediate action is required! Check which documents are missing and submit them as soon as possible.",
        isUrgent: true, // Keep this for special text color
    },
    {
        name: "Interview Required",
        thaiName: "Interview Required",
        icon: <UserSwitchOutlined />,
        color: "geekblue",
        description: "Your application has been called for an interview, a crucial step in assessing your skills and personality.",
        nextAction: "Prepare for the interview according to the scheduled date and time. Confirm your attendance.",
    },
    {
        name: "Waitlisted",
        thaiName: "Waitlisted",
        icon: <ClockCircleOutlined />,
        color: "green",
        description: "Qualifications meet criteria, but spots are full. You still have a chance if an accepted applicant declines the offer.",
        nextAction: "Check if you can submit any additional documents to increase your chances of consideration.",
    },
    {
        name: "Conditional Offer",
        thaiName: "Conditional Offer",
        icon: <CheckCircleOutlined />,
        color: "green",
        description: "The institution has accepted you, but there are **conditions** that must be met before acceptance is complete.",
        nextAction: "Fulfill all specified conditions within the designated timeframe and submit proof.",
    },
    {
        name: "Unconditional Offer",
        thaiName: "Unconditional Offer",
        icon: <CheckCircleOutlined />,
        color: "green",
        description: "This is a complete acceptance. All qualifications have been met, and no further conditions need to be fulfilled.",
        nextAction: "Accept the offer (Offer Accepted) and pay the deposit (if required) within the deadline.",
    },
    {
        name: "Offer Accepted",
        thaiName: "Offer Accepted",
        icon: <CheckCircleOutlined />,
        color: "green",
        description: "You have formally confirmed your intention to accept the offer for study/work.",
        nextAction: "Prepare for registration or the next steps towards starting your work/study.",
    },
    {
        name: "Deposit Paid",
        thaiName: "Deposit Paid",
        icon: <DollarCircleOutlined />,
        color: "green",
        description: "You have successfully paid the deposit to secure your seat/position. This is the final confirmation of acceptance.",
        nextAction: "Wait for the official enrollment confirmation documents.",
    },
    {
        name: "Offer Declined",
        thaiName: "Offer Declined",
        icon: <CloseCircleOutlined />,
        color: "red",
        description: "You have formally notified the institution/organization that you will not be accepting this offer.",
        nextAction: "If a deposit was paid, check the Refund Policy.",
    },
];


// Helper component to render the cards - (Component เดิม)
const StatusCards = ({ data }) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '40px' }}>
        {data.map((status, index) => {
            const groupColor = getStatusColor(status.name);
            const iconColor = status.isUrgent ? STATUS_GROUPS.PRIMARY_RED : groupColor; 
            
            return (
                <Card
                    key={index}
                    title={
                        <Space size="middle" style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontSize: '24px', color: iconColor }}>
                                {status.icon}
                            </span>
                            <Title level={4} style={{ margin: 0, color: '#111827' }}>
                                {status.name}
                            </Title>
                        </Space>
                    }
                    style={{
                        borderRadius: '12px', 
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', 
                        borderTop: `4px solid ${groupColor}`, 
                        flex: '0 0 365px', 
                        transition: 'box-shadow 0.3s ease-in-out', 
                    }}
                >
                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                        {/* Status Name Tag (English) */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid #f3f4f6' }}>
                            <Text strong style={{ fontSize: '16px', color: groupColor }}>
                                Status:
                            </Text>
                            <Tag color={status.color} style={{ borderRadius: '8px', fontWeight: '500',fontSize: '16px', padding: '4px 12px' }}>{status.thaiName}</Tag>
                        </div>
                        
                        {/* Description */}
                        <div>
                            <Text strong style={{ display: 'block', marginBottom: '4px', color: '#374151' }}>
                                Description:
                            </Text>
                            <Paragraph style={{ color: STATUS_GROUPS.NORMAL_TEXT, fontSize: '14px' }}>
                                {status.description}
                            </Paragraph>
                        </div>

                        {/* Next Action */}
                        <div>
                            <Text strong style={{ display: 'block', marginBottom: '4px', color: '#374151' }}>
                                Next Steps:
                            </Text>
                            <Paragraph 
                                style={{ 
                                    fontSize: '14px', 
                                    color: status.isUrgent ? STATUS_GROUPS.URGENT_TEXT : STATUS_GROUPS.NORMAL_TEXT, 
                                    fontWeight: status.isUrgent ? '600' : 'normal' 
                                }}
                            >
                                {status.nextAction}
                            </Paragraph>
                        </div>
                    </Space>
                </Card>
            );
        })}
    </div>
);

// -----------------------------------------------------------
// 📌 Main Component: ApplicationStatusGuide (ปรับใช้ Layout)
// -----------------------------------------------------------
const ApplicationStatusGuide = () => {

    // ⭐ NEW: Responsive Screen Size State & Logic
    const [screenSize, setScreenSize] = useState(() => {
        if (typeof window !== 'undefined') {
            const w = window.innerWidth;
            if (w < 768) return "mobile";
            if (w < 1200) return "tablet";
        }
        return "desktop";
    });

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            if (w < 768) setScreenSize("mobile");
            else if (w < 1200) setScreenSize("tablet");
            else setScreenSize("desktop");
        };
        handleResize(); 
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = screenSize === "mobile";

    // ⭐ ค่าสำรองสำหรับสี Sidebar (ใช้ Optional Chaining เพื่อความปลอดภัย)
    const sidebarBgColor = colors?.primary?.[7] || "#096DD9"; // ใช้ค่าสีจาก colors.primary[7] หรือค่าสำรอง

    // 1. Group 1: Submitted, In Review, Awaiting Documents, Interview Required (BLUE)
    const phase1Statuses = STATUS_DATA.filter(s => getStatusColor(s.name) === STATUS_GROUPS.PRIMARY_BLUE);
    
    // 2. Group 2: Waitlisted, Conditional Offer, Unconditional Offer, Offer Accepted, Deposit Paid (GREEN)
    const phase2Statuses = STATUS_DATA.filter(s => getStatusColor(s.name) === STATUS_GROUPS.PRIMARY_GREEN);

    // 3. Group 3: Offer Declined (RED)
    const phase3Statuses = STATUS_DATA.filter(s => getStatusColor(s.name) === STATUS_GROUPS.PRIMARY_RED);


    return (
        <Layout style={{ minHeight: "100vh", position: "relative" }}>

            {/* ⭐ SIDEBAR DESKTOP ONLY */}
            {!isMobile && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: "100vh",
                        background: sidebarBgColor,
                        width: 47,
                        zIndex: 3000,
                    }}
                >
                    <Sidebar mobileMode={false} />
                </div>
            )}

            <Layout
                style={{
                    marginLeft: isMobile ? 0 : 47, // กำหนด margin-left ให้เว้นช่องสำหรับ Sidebar
                    width: "100%",
                    transition: "0.3s",
                }}
            >

                {/* ⭐ TOP MENU BAR */}
                <MenuBar isMobile={isMobile} />

                <Content style={{ minHeight: "calc(100vh - 70px)" }}>

                    {/* ⭐ ORIGINAL CONTENT (ย้ายโค้ดเดิมเข้ามาที่นี่) */}
                    <div style={{ 
                        padding: '32px', 
                        backgroundColor: '#f9fafb', // ใช้สีพื้นหลังเดิม
                        minHeight: '100%', 
                        fontFamily: 'Inter, sans-serif' 
                    }}>
                        <div style={{ 
                            maxWidth: '1280px', 
                            margin: '0 auto' 
                        }}>
                            
                            {/* Main Header Section */}
                            <Title level={4} style={{ color: STATUS_GROUPS.SECTION_HEADER, marginBottom: '8px' }}>
                                Application Status Guide
                            </Title>
                            <Paragraph style={{ color: STATUS_GROUPS.NORMAL_TEXT, marginBottom: '32px', fontSize: '16px' }}>
                                Understand the meaning and required steps for each type of study or job application status.
                            </Paragraph>

                            {/* --- PHASE 1: APPLICATION & ASSESSMENT (BLUE) --- */}
                            <Title level={5} style={{ color: STATUS_GROUPS.PRIMARY_BLUE, borderBottom: `2px solid ${STATUS_GROUPS.PRIMARY_BLUE}`, paddingBottom: '8px', marginBottom: '24px' }}>
                                Phase 1: Application and Assessment
                            </Title>
                            <StatusCards data={phase1Statuses} />

                            {/* --- PHASE 2: SELECTION AND OFFER (GREEN) --- */}
                            <Title level={5} style={{ color: STATUS_GROUPS.PRIMARY_GREEN, borderBottom: `2px solid ${STATUS_GROUPS.PRIMARY_GREEN}`, paddingBottom: '8px', marginBottom: '24px' }}>
                                Phase 2: Selection and Offer
                            </Title>
                            <StatusCards data={phase2Statuses} />

                            {/* --- PHASE 3: DECISION FINALIZATION (RED) --- */}
                            <Title level={5} style={{ color: STATUS_GROUPS.PRIMARY_RED, borderBottom: `2px solid ${STATUS_GROUPS.PRIMARY_RED}`, paddingBottom: '8px', marginBottom: '24px' }}>
                                Phase 3: Decision Finalization
                            </Title>
                            <StatusCards data={phase3Statuses} />

                        </div>
                    </div>

                </Content>

                {/* ⭐ FOOTER */}
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default ApplicationStatusGuide;