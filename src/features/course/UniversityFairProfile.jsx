import React, { useState } from "react";
import { Layout, Typography, Input, Button, Checkbox, Select, Grid } from "antd";
import { 
    MinusCircleOutlined, PlusCircleOutlined, 
    CalendarFilled, ClockCircleFilled, EnvironmentFilled, 
    FacebookFilled, TwitterSquareFilled, LinkedinFilled 
} from "@ant-design/icons";
import colors from "@/features/designsystem/colors"; 
import heroImage from "@/assets/images/headimage.jpg"; 
import serviceImage from "@/assets/images/Our-services-ENG.jpg"; 
import "antd/dist/antd.css"; 

// ✅ NEW IMPORTS: นำเข้าคอมโพเนนต์ส่วนประกอบ
import Sidebar from "@/features/components/Sidebar"; 
import MenuBar from "@/features/components/MenuBar"; 
import AppFooter from "@/features/components/Footer"; 
import UpcomingEvents from "@/features/components/UpcomingEvents"; 
// 🌟 เพิ่ม UniversityFairBottom
import UniversityFairBottom from "@/features/components/UniversityFairBottom"; 

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;
const { Option } = Select;
const { useBreakpoint } = Grid;


// Mock Data (เก็บไว้เผื่อใช้ในอนาคต)
const mockEvents = [
    { id: 1, name: "UK & Ireland Study Exhibition" },
    { id: 2, name: "USA Study Fair 2024" },
    { id: 3, name: "Canada University Info Session" },
    { id: 4, name: "Australia Postgrad Fair" },
];


const CustomCollapse = ({ title, content, isExpanded, onToggle }) => {
    const boxStyle = {
        background: isExpanded ? colors.geekBlue[1] : colors.neutral[1], 
        padding: '24px 32px',
        borderRadius: 8,
        transition: "background 0.3s, border 0.3s",
    };

    const icon = isExpanded ? (
        <MinusCircleOutlined style={{ fontSize: 24, color: colors.geekBlue[6] }} />
    ) : (
        <PlusCircleOutlined style={{ fontSize: 24, color: colors.geekBlue[6] }} />
    );

    // ⭐️ การแปลง content ให้เป็นกล่องแยกตามเครื่องหมายลูกน้ำ (,)
    const universities = content.split(',').map(item => item.trim()).filter(item => item.length > 0);

    const universityBoxStyle = {
        padding: 24, 
        borderBottom: `1px solid ${colors.neutral[4] ? colors.neutral[3] : '#e8e8e8'}`,
    };

    const RenderContent = () => (
        <div style={{ padding: "24px 0 0 0" }}>
            <div
                style={{
                    borderTop: `1px solid ${colors.conditional.divider}`, 
                    borderBottom: "colors.neutral[4]",
                }}
            >
                {/* 📌 แสดงผลเป็นกล่องแยกรายการมหาวิทยาลัย */}
                {universities.map((name, idx) => (
                    <div key={idx} style={universityBoxStyle}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block' }}>
                            {name}
                        </Text>
                    </div>
                ))}
            </div>
        </div>
    );

    // *************

    return (
        <div style={boxStyle} onClick={onToggle}>
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    cursor: "pointer",
                    gap: 24,
                }}
            >
                <div style={{ padding: 4 }}>{icon}</div>
                <div style={{ flex: 1 }}>
                    <Title level={4} style={{ color: colors.geekBlue[6], margin: 0 }}>
                        {title}
                    </Title>
                    {isExpanded && <RenderContent />}
                </div>
            </div>
        </div>
    );
};


// -----------------------------------------------------------
// 📌 Main Component: UniversityFairProfile
// -----------------------------------------------------------
export default function UniversityFairProfile() {
    const screens = useBreakpoint();
    // ใช้ screens.lg เพื่อกำหนด Mobile View 
    const isMobile = !screens.lg; 
    const [activeKey, setActiveKey] = useState(null); 
    
    const handleToggle = (key) => {
        setActiveKey(activeKey === key ? null : key); 
    };

    return (
        <Layout style={{ minHeight: "100vh", position: "relative" }}>
            
            {/* 1. SIDEBAR (Fixed) */}
            {!isMobile && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: "100vh",
                        width: 47,
                        background: colors.primary[7],
                        zIndex: 3000,
                    }}
                >
                    <Sidebar mobileMode={false} />
                </div>
            )}

            <Layout
                style={{
                    // ปรับ margin ตาม Sidebar
                    marginLeft: isMobile ? 0 : 47,
                    width: "100%",
                    overflowX: "hidden",
                }}
            >
                {/* 2. MENU BAR (Header) */}
                <MenuBar isMobile={isMobile} />

                {/* 3. MAIN CONTENT */}
                <Content style={{ background: colors.neutral[1] }}>
                    
                    {/* Section 0: Breadcrumb/Search */}
                    <div style={{ 
                        background: colors.neutral[1], 
                        padding: "16px 24px", 
                        borderBottom: `1px solid ${colors.neutral[3]}` 
                    }}>
                        <Text style={{ fontSize: 14, color: colors.character.secondary }}>
                            Search / <span style={{ color: colors.character.primary }}>Fairs</span>
                        </Text>
                        <Title level={4} style={{ color: colors.character.primary }}>Education Fairs</Title>
                    </div>

                    {/* Section 0.1: Hero Image */}
                    <div style={{ 
                        width: '100%', 
                        height: isMobile ? 'auto' : 300, 
                        aspectRatio: isMobile ? '16/9' : 'auto',
                        overflow: 'hidden'
                    }}>
                        <img 
                            src={heroImage} 
                            alt="University Fair Hero" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                    </div>

                    {/* --- Main Content Container --- */}
                    <div style={{ padding: isMobile ? "64px 24px" : "64px 20%" }}>

                        {/* Section 1: Main Title & Quick Info */}
                        <Title 
                            level={1} 
                            style={{ 
                                margin: 0, 
                                color: colors.character.primary, 
                                marginBottom: 32, 
                                fontSize: isMobile ? 32 : 48 
                            }}
                        >
                            The UK & Ireland Study Exhibition 2023 – The Largest UK and Ireland Education Exhibition in Thailand
                        </Title>
                        
                        {/* 📌 Quick Info & Share */}
                        <div 
                            style={{ 
                                display: "flex", 
                                flexDirection:"column",
                                justifyContent: "space-between",
                                alignItems:"flex-start",
                                gap:"12px",
                                marginBottom: 48,
                            }}
                        > 
                            
                            {/* Quick Info (Left) */}
                            <div style={{ 
                                width: isMobile ? "100%" : "auto", 
                                display: "flex", 
                                flexWrap: "wrap", 
                                gap: 24, 
                                alignItems: 'flex-start', 
                                flexDirection: isMobile ? "column" : "row" 
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <CalendarFilled style={{ fontSize: 16, color: colors.geekBlue[3] }} />
                                    <Text style={{ fontSize: 14, color: colors.character.primary }}>14 January 2023 - 15 January 2023</Text>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <ClockCircleFilled style={{ fontSize: 16, color: colors.geekBlue[3] }} />
                                    <Text style={{ fontSize: 14, color: colors.character.primary }}>12:00 - 18:00</Text>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <EnvironmentFilled style={{ fontSize: 16, color: colors.geekBlue[3] }} />
                                    <Text style={{ fontSize: 14, color: colors.character.primary }}>Sofitel Bangkok Sukhumvit</Text>
                                </div>
                            </div>

                            {/* Share (Right) */}
                            <div style={{ 
                                width: isMobile ? "100%" : "auto", 
                                marginTop: isMobile ? "24px" : "0", 
                                display: "flex", 
                                justifyContent: isMobile ? 'flex-start' : 'flex-end'
                            }}>
                                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                                    <Text style={{ color: colors.neutral[7], whiteSpace: 'nowrap' }}>Share this:</Text>
                                    <FacebookFilled style={{ fontSize: 32, color: "#3B5998" }} />
                                    <TwitterSquareFilled style={{ fontSize: 32, color: "#1DA1F2" }} />
                                    <LinkedinFilled style={{ fontSize: 32, color: "#0077B5" }} />
                                </div>
                            </div>
                        </div>

                        
                        {/* Section 3: Detailed Info */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            <div style={{ display: "flex", flexDirection: "column", color: colors.character.primary }}>
                                
                                {/* 1. Date */}
                                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
                                    <Title level={5} style={{ margin: 0, fontWeight: 600, whiteSpace: "nowrap" }}>Date:</Title>
                                    <Text style={{ fontSize: 16 }}>
                                        Saturday 14th & Sunday 15th January 2023
                                    </Text>
                                </div>
                                
                                {/* 2. Time */}
                                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 16, marginBottom: 8 }}>
                                    <Title level={5} style={{ margin: 0, fontWeight: 600, whiteSpace: "nowrap" }}>Time:</Title>
                                    <Text style={{ fontSize: 16 }}>
                                        12:00 – 18:00
                                    </Text>
                                </div>
                                
                                {/* 3. Venue */}
                                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 16, marginBottom: 8 }}>
                                    <Title level={5} style={{ margin: 0, fontWeight: 600, whiteSpace: "nowrap" }}>Venue:</Title>
                                    <Text style={{ fontSize: 16 }}>
                                        Sofitel Bangkok Sukhumvit, 7th Floor Grand Ballroom
                                    </Text>
                                </div>
                                
                                {/* 4. How to get there */}
                                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 16, marginBottom: 32 }}>
                                    <Title level={5} style={{ margin: 0, fontWeight: 600, whiteSpace: "nowrap" }}>How to get there:</Title>
                                    <Text style={{ fontSize: 16 }}>
                                        BTS Asoke exit 5 / MRT Sukhumvit exit 3 (Free parking at the Hotel)
                                    </Text>
                                </div>
                            </div>
                        </div>

                        
                        {/* Section 4: About */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                            <Title level={4} style={{ color: colors.geekBlue[6], margin: 0, fontWeight: 600 }}>
                                About
                            </Title>
                            <Paragraph style={{ fontSize: 14, color: colors.character.primary, margin: 0 }}>
                                The UK & Ireland Study Exhibition is the largest UK and Ireland education exhibition happening this January solely focused on leading universities from England, Scotland, Wales, Northern Ireland, and Ireland – with over 60 UK and Ireland universities in attendance. Hosted by Hands On Education Consultants, the leading UK education agency in Thailand, this event is for anyone interested in studying in the UK, whether it be for an undergraduate, postgraduate or research programme. Admission to this event is entirely free, and we recommend that you pre-register online to save queuing time on the day.
                            </Paragraph>
                        </div>

                        {/* Section 5: Our services */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 64 }}>
                            <Title level={4} style={{ color: colors.geekBlue[6], margin: 0, fontWeight: 600 }}>
                                Our services
                            </Title>
                            <div 
                                style={{ 
                                    borderBottom: `1px solid ${colors.neutral ? colors.neutral[3] : '#e8e8e8'}`,
                                }}
                            >
                                <Paragraph style={{ fontSize: 14, color: colors.character.primary, margin: 0 }}>
                                    Thailand’s official representative of universities in the UK, Ireland, USA, Canada, Australia and New Zealand. Helping students from Thailand through the application process to further their studies at Bachelor’s, Master’s and Doctorate level, as well on English language courses, completely free of charge.
                                </Paragraph>
                            </div>
                            {/* Image Full Width */}
                            <img 
                                src={serviceImage} 
                                alt="Our Services" 
                                style={{ width: '98%', height: '100%', objectFit: 'cover', margin: 12 }} 
                            />
                        </div>
                    
                        {/* Section 6: Accordion/Collapse */}
                        <div style={{ display: "flex", flexDirection: "column", marginBottom: 48 }}>
                            <CustomCollapse
                                title="University lists"
                                content="England University, University of Oxford, University of Cambridge, Imperial College London, University College London (UCL), London School of Economics and Political Science (LSE), University of Manchester, University of Bristol, University of Warwick, University of Edinburgh, University of Leeds"
                                isExpanded={activeKey === 'list'}
                                onToggle={() => handleToggle('list')}
                            />
                            <CustomCollapse
                                title="Seminars and IELTS Activities at the event"
                                content="This section will contain details about seminar schedules and IELTS practice sessions."
                                isExpanded={activeKey === 'seminars'}
                                onToggle={() => handleToggle('seminars')}
                            />
                            <CustomCollapse
                                title="What to bring"
                                content="We recommend bringing your academic transcripts, IELTS/TOEFL score, passport copy, and CV/personal statement."
                                isExpanded={activeKey === 'bring'}
                                onToggle={() => handleToggle('bring')}
                            />
                        </div>
                    </div> 
                    {/* --- End Main Content Container --- */}

                    {/* Section 7: Contact Form & Map */}
                    <div 
                        style={{ 
                            display: "flex", 
                            width: "100%", 
                            flexDirection: isMobile ? "column" : "row", 
                            backgroundColor: colors.neutral[0], 
                        }}
                    >
                        {/* Form Section (ซ้าย) */}
                        <div style={{ 
                            width: isMobile ? "100%" : "50%",
                            padding: isMobile ? "32px 24px" : "96px 64px", 
                            backgroundColor: colors.geekBlue[1],
                        }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                                {/* First name & Lastname */}
                                <div style={{ display: "flex", gap: 16 }}>
                                    <div style={{ flex: 1 }}><Input placeholder="First name" size="middle" /></div>
                                    <div style={{ flex: 1 }}><Input placeholder="Lastname" size="middle" /></div>
                                </div>
                                <Input placeholder="Email" size="middle" />
                                <Input
                                    placeholder="Phone number"
                                    addonBefore={
                                        <Select defaultValue="TH" style={{ width: 80 }}>
                                            <Option value="TH">+66</Option>
                                            <Option value="UK">+44</Option>
                                            <Option value="US">+1</Option>
                                        </Select>
                                    }
                                    size="middle"
                                />
                                <Checkbox>
                                    <Text style={{ color: colors.character.secondary, fontSize: 14 }}>
                                        You agree to our friendly{" "}
                                        <span style={{ color: colors.primary[6], cursor: "pointer" }}>
                                            privacy policy.
                                        </span>
                                    </Text>
                                </Checkbox>
                                <Button type="primary" size="large" block>
                                    Submit
                                </Button>
                            </div>
                        </div>

                        {/* Map Section (ขวา) */}
                        <div style={{ 
                            width: isMobile ? "100%" : "50%",
                            height: isMobile ? 300 : 'auto', 
                            backgroundColor: "#eee",
                        }}>
                            <iframe
                                title="Sofitel Bangkok Sukhumvit Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.7601957288484!2d100.55627197475171!3d13.73800619280459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ed8b3014a01%3A0xc6c4f9f69b8d277!2sSofitel%20Bangkok%20Sukhumvit!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth" 
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>

                    {/* ✅ 4. UPCOMING EVENTS */}
                    <UpcomingEvents events={mockEvents} isMobile={isMobile} />
                    
                    {/* 🌟 5. UNIVERSITY FAIR BOTTOM COMPONENT (NEW) */}
                    <UniversityFairBottom isMobile={isMobile} />
                    
                </Content>
                
                {/* ✅ 6. FOOTER */}
                <AppFooter />
                
            </Layout>
        </Layout>
    );
}