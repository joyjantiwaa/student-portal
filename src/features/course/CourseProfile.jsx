// src/features/course/CourseProfile.jsx

import React, { useState, useEffect } from 'react';
import { Typography, Button, Divider, Card, Tabs, Grid, Layout } from 'antd'; // ⭐ เพิ่ม Layout
import { MailOutlined, PhoneOutlined, RightCircleOutlined } from '@ant-design/icons';
import Img from "@/assets/images/ImageWrap.jpg"; 
import colors from "@/features/designsystem/colors";
import "antd/dist/antd.css";
import "@/App.css";

// ⭐ Components ที่ต้อง Import เพิ่ม
import Sidebar from "@/features/components/Sidebar";
import MenuBar from "@/features/components/MenuBar";
import UpcomingEvents from "@/features/components/UpcomingEvents"; // สมมติว่าไฟล์นี้อยู่ที่นี่
import AppFooter from "@/features/components/Footer"; // เพิ่ม Footer ด้วย

const { useBreakpoint } = Grid; 
const { Title, Text } = Typography;
const { Content } = Layout; // ดึง Content จาก Layout มาใช้


// -----------------------------------------------------------
// 📌 Course Info Header (ส่วนภาพและรายละเอียดหลัก) - ไม่เปลี่ยนแปลง
// -----------------------------------------------------------
const CourseInfoHeader = ({ isMobile }) => {
    // โค้ด CourseInfoHeader... (ไม่เปลี่ยนแปลง)
    const courseStats = [
        { 
            main: 'Anytime', 
            sub: 'Apply date', 
            style: { subColor: colors.character.secondary } 
        },
        { 
            main: '800,000 THB', 
            sub: '/year', 
            note: 'Scholarships available', 
            style: { noteColor: colors.polarGreen[8], subColor: colors.character.primary } 
        },
        { 
            main: '1 year', 
            sub: 'Duration', 
            style: { subColor: colors.character.secondary } 
        },
        { 
            main: 'Oct 2023', 
            sub: 'Start date', 
            style: { subColor: colors.character.secondary } 
        },
    ];

    const StatCard = ({ main, sub, note, style }) => (
        <Card 
            style={{ 
                width: isMobile ? '100%' : '25%',
                minWidth: isMobile ? '100%' : '150px',
                padding: "0", 
                border: 'none',

            }} 
            bodyStyle={{ padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '56px', textAlign: 'center', }}
        >
            <div>
                <Text style={{ 
                    fontSize: 24, 
                    fontWeight: 'bold', 
                    color: colors.character.primary, 
                    display: 'block',
                }}>
                    {main}
                    {sub === '/year' && (
                         <Text style={{ fontSize: 16, fontWeight: 'normal', color: colors.character.primary, marginLeft: 4 }}>
                            {sub}
                        </Text>
                    )}
                </Text>
                {(sub !== '/year' && sub) && (
                    <Text style={{ 
                        fontSize: 16, 
                        fontWeight: 'normal', 
                        color: colors.character.secondary,
                        display: 'block',
                        marginTop: 4,
                    }}>
                        {sub}
                    </Text>
                )}
            </div>
            {note && (
                <Text style={{ 
                    fontSize: 12, 
                    color: colors.polarGreen[8], 
                    marginTop: 8, 
                    display: 'block',
                    fontWeight: 'regular'
                }}>
                    {note}
                </Text>
            )}
        </Card>
    );

    return (
        <div style={{ backgroundColor: colors.neutral[1] }}>
            {/* 1. Image Banner */}
            <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                <img 
                    src={Img}
                    alt="Course Banner"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            {/* 2. Header and Stats Box */}
            <div 
                style={{ 
                    padding: '48px 48px 24px 48px',
                }}
            >
                {/* Header (Title + Button) */}
                <div 
                    style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginBottom: 48,
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? 16 : 0,
                        borderBottom: `1px solid ${colors.conditional.divider}`,
                        paddingBottom: "24px",
                    }}
                >
                    <Title 
                        level={1} 
                        style={{ margin: 0, color: colors.character.primary,}}
                    >
                        Master in Accounting
                    </Title>
                    <Button 
                        type="primary" 
                        size="large" 
                    >
                        Apply now
                    </Button>
                </div>

                {/* Stat Boxes (Responsive Grid) */}
                <div 
                    style={{ 
                        display: 'flex', 
                        flexDirection: isMobile ? 'column' : 'row', 
                        gap: 16, 
                        alignItems: 'stretch',
                        padding: '24px',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                        borderRadius: '8px',
                    }}
                >
                    {courseStats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            </div>
        </div>
    );
};


// -----------------------------------------------------------
// 📌 Course Content Section - ไม่เปลี่ยนแปลง (แต่ย้ายการดึง Breakpoint ไปที่ Main Component)
// -----------------------------------------------------------
const sections = [
    { key: 'overview', title: 'Overview' },
    { key: 'curriculum', title: 'Curriculum' },
    { key: 'admission', title: 'Admission' },
    { key: 'fees', title: 'Fees & Funding' },
    { key: 'career', title: 'Career Path' },
];

const ContentSection = ({ isMobile }) => { // 💡 รับ isMobile เป็น prop
    const [activeKey, setActiveKey] = useState('overview');

    // Sidebar/Tab Content
    const SidebarContent = (
        <div style={{ 
            width: isMobile ? '100%' : '170px', 
            flexShrink: 0, 
            order: isMobile ? 0 : 2 
        }}>
            {isMobile ? (
                // Mobile: Tabs
                <Tabs 
                    activeKey={activeKey} 
                    onChange={setActiveKey} 
                    tabPosition="top"
                    style={{ marginBottom: 24, background: colors.neutral[1] }}
                    tabBarStyle={{ margin: '0 24px', padding: '0 24px' }}
                >
                    {sections.map(sec => (
                        <Tabs.TabPane tab={sec.title} key={sec.key} />
                    ))}
                </Tabs>
            ) : (
                // Laptop: Sidebar Menu
                <div 
                    style={{ 
                        display: 'flex', flexDirection: 'column', gap: 4, 
                        position: 'sticky', top: 20, 
                        marginLeft: 48, 
                    }}
                >
                    {sections.map(sec => (
                        <a 
                            key={sec.key} 
                            href={`#${sec.key}`} 
                            onClick={() => setActiveKey(sec.key)}
                            style={{
                                padding: '12px 8px',
                                background: activeKey === sec.key ? colors.neutral[2] : 'transparent',
                                borderRadius: 8,
                                color: activeKey === sec.key ? colors.character.primary : colors.character.secondary,
                                fontWeight: 600, 
                                fontSize: 14,
                                textDecoration: 'none',
                                transition: 'background 0.3s',
                            }}
                        >
                            {sec.title}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );


    // Main Content
    const MainContent = (
        <div 
            style={{ 
                flexGrow: 1, 
                gap: 24, 
                display: 'flex', 
                flexDirection: 'column', 
                order: isMobile ? 1 : 1, 
                padding: isMobile ? '0 24px 24px' : '0 24px 24px 0'
            }}
        >
            {/* University Overview */}
            <div id="overview" style={{ scrollMarginTop: 20 }}>
                <Title level={3} style={{ marginBottom: 8, color: colors.character.primary }}>Course Overview</Title>
                <Text style={{ fontSize: 14, color: colors.character.secondary, display: 'block' }}>A overview of the course, goals and outcomes.</Text>
                <Divider style={{ margin: '16px 0', borderColor: colors.conditional.divider }} />
                
                <div style={{ padding: 16, background: colors.neutral[2], marginBottom: 24 }}>
                    <Text style={{ fontSize: 14, color: colors.character.secondary }}>
                        The Master in Accounting programme provides an in-depth understanding of accounting principles, financial management, and taxation, preparing students for leadership roles in finance.
                    </Text>
                </div>
                
                <Title level={4} style={{ fontSize: 16, fontWeight: 500, color: colors.character.primary, marginBottom: 16 }}>Why this course?</Title>
                <Text style={{ display: 'block', marginBottom: 16, color: colors.neutral[8], fontSize: 16 }}>
                    This program is designed for aspiring accountants and financial professionals seeking a strong theoretical foundation and practical application skills. Graduates are highly sought after by top firms globally.
                </Text>
                <Text style={{ display: 'block', marginBottom: 24, color: colors.neutral[8], fontSize: 16 }}>
                    The curriculum includes advanced topics in auditing, corporate finance, and international financial reporting standards, ensuring you are prepared for the CPA or other professional certifications.
                </Text>
            </div>

            {/* Placeholders for other sections */}
            {sections.slice(1).map(sec => (
                <div key={sec.key} id={sec.key} style={{ height: 300, scrollMarginTop: 20 }}>
                     <Title level={3} style={{ color: colors.character.primary }}>{sec.title} Content</Title>
                     <p>Placeholder for {sec.title} details.</p>
                     <Divider style={{ margin: '16px 0', borderColor: colors.conditional.divider }} />
                </div>
            ))}
        </div>
    );

    const MapSection = (
        <div style={{  padding: isMobile ? '96px 24px':'96px 0px' }}>
            <div style={{  textAlign: 'center', padding: '96px 0px', width: '100%' }}>
                <Text 
                    style={{ 
                        fontSize: 16, 
                        color: colors.primary[6], 
                        display: 'block', 
                        marginBottom: 8
                    }}
                >
                    Contact university
                </Text>
                <Title 
                    level={1} 
                    style={{ 
                        margin: '0 0 24px 0',
                        color: colors.character.primary, 
                        fontSize: 48
                    }}
                >
                    London Business School
                </Title>
            </div>
            <div style={{ 
                height: 400, 
                width: '100%', 
                overflow: 'hidden'
            }}>
                <iframe
                    title="University of Aberdeen Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1430.7303706056586!2d-2.100914870008688!3d57.17833055990263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488408f62c82377b%3A0xcf95a0d31e9c2227!2sKing's%20College!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth"
                    allowFullScreen=""
                    aria-hidden="false"
                    tabIndex="0"
                ></iframe>
            </div>
        </div>
    );

    return (
        <div style={{ padding: isMobile ? '0' : '0 48px', backgroundColor: colors.neutral[1] }}>
            
            {/* 1. Mobile Tabs (Top of Content) */}
            {isMobile && SidebarContent}

            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 0 : 48, alignItems: 'flex-start' }}>

                {/* 2. Main Content Area */}
                {MainContent} 

                {/* 3. Sidebar (Tabs/Menu in Laptop) & Right Sidebar */}
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 48, marginTop: isMobile ? 0 : 24, padding: isMobile ? '0 24px' : 0 }}>
                    
                    {/* Navigation/Tabs (Sidebar Menu for Laptop) */}
                    {!isMobile && SidebarContent} 

                </div>

            </div>
            {MapSection}
        </div>
    );
};

// -----------------------------------------------------------
// 📌 Main Component Export (ปรับใช้ Layout)
// -----------------------------------------------------------
const CourseProfile = () => {
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const isTablet = screens.md && !screens.lg;

    return (
        <Layout style={{ minHeight: "100vh", position: "relative" }}>
            
            {/* ⭐ 1. SIDEBAR (Fixed for Desktop) */}
            {!isMobile && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: "100vh",
                        width: 47,
                        background: colors.primary[7] || "#096DD9",
                        zIndex: 3000,
                    }}
                >
                    <Sidebar mobileMode={false} />
                </div>
            )}

            <Layout
                style={{
                    marginLeft: isMobile ? 0 : 47, // ⭐ เว้นระยะห่าง Sidebar
                    transition: "0.3s",
                    width: "100%",
                    overflowX: "hidden",
                }}
            >
                {/* ⭐ 2. MENU BAR (Header) */}
                <MenuBar isMobile={isMobile} />

                <Content style={{ minHeight: 'calc(100vh - 70px)' }}> {/* กำหนด minHeight สำหรับ Content */}
                    
                    {/* Header Section (Image and Stats) */}
                    <CourseInfoHeader isMobile={isMobile} />
                    
                    {/* Main Content and Sidebars */}
                    <ContentSection isMobile={isMobile} />

                    {/* ⭐ 3. UPCOMING EVENTS (ล่างสุดของหน้า Content) */}
                    <div >
                        <UpcomingEvents isMobile={isMobile} />
                    </div>

                </Content>
                
                {/* 4. FOOTER */}
                <AppFooter />

            </Layout>
        </Layout>
    );
};

export default CourseProfile;