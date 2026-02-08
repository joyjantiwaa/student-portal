import React, { useState, useRef, useEffect } from "react";
import { 
    Layout, Typography, Button, Grid, Collapse, 
    Tabs, Modal, Carousel, Divider, Avatar, Card,
} from "antd";
import { 
    ArrowLeftOutlined, ArrowRightOutlined, ArrowDownOutlined, ArrowUpOutlined, 
    EnvironmentOutlined, PhoneOutlined, PlusCircleOutlined , MinusCircleOutlined, 
    RightCircleOutlined ,LeftCircleFilled, RightCircleFilled, DownOutlined, UpOutlined,
} from "@ant-design/icons";
import avatar1 from "@/assets/images/Avatar1.jpg";
import avatar2 from "@/assets/images/Avatar2.jpg";
import avatar3 from "@/assets/images/Avatar.jpg";
import avatar4 from "@/assets/images/last-avatar.jpg";
import img1 from "@/assets/images/Rectangle 1654-1.jpg";
import img2 from "@/assets/images/Rectangle 1654.jpg";
import img3 from "@/assets/images/Rectangle 1655-1.jpg";
import img4 from "@/assets/images/Rectangle 1655.jpg";
import img5 from "@/assets/images/Rectangle 1656.jpg";
import img6 from "@/assets/images/Rectangle 1656.jpg";
import img7 from "@/assets/images/Rectangle 1656.jpg";
import img8 from "@/assets/images/Rectangle 1656.jpg";
import colors from "@/features/designsystem/colors"; 
import MenuBar from "@/features/components/MenuBar";
import SideBar from "@/features/components/SideBar";
import UpcomingEvents from "@/features/components/UpcomingEvents";
import AppFooter from "@/features/components/Footer";
import { useNavigate } from 'react-router-dom';
import "antd/dist/antd.css"; 
import '@/App.css';

const { Title, Text } = Typography;
const { Content } = Layout;
const { useBreakpoint } = Grid;
const { Panel } = Collapse;

// Mock Data และ Constants
const universityName = "University of Aberdeen";
const sections = [
    { key: 'overview', title: 'University Overview' },
    { key: 'services', title: 'Services' },
    { key: 'entry', title: 'Entry requirements' },
    { key: 'fee', title: 'Fee and funding' },
    { key: 'scholarships', title: 'Scholarships' },
    { key: 'visa', title: 'Visa Information' },
];
const imageMocks = [
    { id: 1, url: img1, alt: 'University building exterior' },
    { id: 2, url: img2, alt: 'University interior view' },
    { id: 3, url: img3, alt: 'Library reading room' },
    { id: 4, url: img4, alt: 'Student life' },
    { id: 5, url: img5, alt: 'Classroom or lecture hall' },
    { id: 6, url: img6, alt: 'Campus green space' },
    { id: 7, url: img7, alt: 'Student activity' },
    { id: 8, url: img8, alt: 'University close-up' },
];

const GallerySection = () => {
    // 1. State และ Refs
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0); 

    const carouselRef = useRef(null); 
    const modalCarouselRef = useRef(null); 

    // 2. ฟังก์ชันควบคุม
    const next = () => carouselRef.current && carouselRef.current.next();
    const prev = () => carouselRef.current && carouselRef.current.prev();

    const nextModal = () => modalCarouselRef.current && modalCarouselRef.current.next();
    const prevModal = () => modalCarouselRef.current && modalCarouselRef.current.prev();

    // 3. Effect สำหรับซิงค์ Modal
    useEffect(() => {
        if (isModalVisible && modalCarouselRef.current) {
            modalCarouselRef.current.goTo(selectedIndex, true); 
        }
    }, [isModalVisible, selectedIndex]); 

    const showModal = (index) => {
        setSelectedIndex(index); 
        setIsModalVisible(true); 
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 4. Settings
    const settings = {
        dots: false, infinite: false, speed: 500, slidesToShow: 4, slidesToScroll: 1, draggable: true,
        responsive: [
            { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };

    // 5. Style สำหรับปุ่มลูกศร (ต้องเพิ่ม Style ให้ปุ่มหลักด้วย)
    const arrowStyle = {
        fontSize: '40px',
        color: colors.neutral[4] || 'gray', // ใช้สีที่กำหนด
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 5, // zIndex ต่ำกว่า Modal
        cursor: 'pointer',
        opacity: 0.8,
        transition: 'opacity 0.2s',
    };

    return (
        <div style={{ padding: '0', position: 'relative' }}>
            
            {/* Carousel หลัก (Thumbnail) */}
            <LeftCircleFilled
                style={{ ...arrowStyle, left: '16px' }} // 🟢 เพิ่ม Style
                onClick={prev}
            />
            <Carousel ref={carouselRef} {...settings}>
                {imageMocks.map((img, index) => (
                    <div key={img.id} style={{ padding: '0 8px' }}> 
                        <img 
                            src={img.url} 
                            alt={img.alt} 
                            style={{ 
                                width: '100%', 
                                height: '200px', 
                                objectFit: 'cover', 
                                gap: '8px',
                                cursor: 'pointer' 
                            }}
                            onClick={() => showModal(index)} 
                        />
                    </div>
                ))}
            </Carousel>
            <RightCircleFilled
                style={{ ...arrowStyle, right: '16px' }} // 🟢 เพิ่ม Style
                onClick={next}
            />
            
            {/* Modal Lightbox */}
            <Modal
                title={null} 
                open={isModalVisible} 
                onCancel={handleCancel}
                footer={null} 
                centered={true}
                width={'80vw'} 
                bodyStyle={{ padding: 0 }} 
                maskClosable={true}
                destroyOnClose={true} 
                zIndex={1050} // 🟢 ตั้ง zIndex ให้สูงกว่าค่า default (1000) ของ Antd
            >
                <div style={{ position: 'relative' }}>
                    
                    {/* Carousel ภายใน Modal (ภาพใหญ่) */}
                    <Carousel 
                        ref={modalCarouselRef} 
                        dots={false} 
                        infinite={true} 
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        draggable={true}
                    >
                        {imageMocks.map((img) => (
                            <div key={img.id}>
                                <img
                                    src={img.url}
                                    alt={img.alt}
                                    style={{ 
                                        width: '100%', 
                                        height: '70vh', 
                                        objectFit: 'contain', // ทำให้ภาพไม่ถูกตัด
                                        display: 'block' 
                                    }}
                                />
                                <div style={{textAlign: 'center', padding: '10px', color: colors.character.secondary}}>{img.alt}</div>
                            </div>
                        ))}
                    </Carousel>

                    {/* ปุ่มซ้ายใน Modal */}
                    <LeftCircleFilled
                        // 🟢 ใช้ Style เดียวกับปุ่มหลัก แต่เพิ่ม zIndex 
                        style={{ ...arrowStyle, left: '12px', zIndex: 11 }} 
                        onClick={prevModal}
                    />

                    {/* ปุ่มขวาใน Modal */}
                    <RightCircleFilled
                        // 🟢 ใช้ Style เดียวกับปุ่มหลัก แต่เพิ่ม zIndex
                        style={{ ...arrowStyle, right: '12px', zIndex: 11 }}
                        onClick={nextModal}
                    />
                </div>
            </Modal>
        </div>
    );
};
// -----------------------------------------------------------
// 📌 Content Section Component (กล่องสาม)
// -----------------------------------------------------------
const ContentSection = () => {
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const [activeKey, setActiveKey] = useState('overview');

    // Sidebar/Tab Content
    const SidebarContent = (
        <div style={{ 
            width: isMobile ? '100%' : '170px', 
            flexShrink: 0, 
            order: isMobile ? 0 : 2 // กล่องย่อยแรกอยู่ขวาใน Laptop
        }}>
            {isMobile ? (
                // Mobile: Tabs
                <Tabs 
                    activeKey={activeKey} 
                    onChange={setActiveKey} 
                    tabPosition="top"
                    style={{ marginBottom: 24 }}
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
                        position: 'sticky', top: 20, // ให้ Sidebar ติดด้านบนเมื่อ Scroll
                    }}
                >
                    {sections.map(sec => (
                        <a 
                            key={sec.key} 
                            href={`#${sec.key}`} // Link ไปยัง id ใน Main Content
                            onClick={() => setActiveKey(sec.key)}
                            style={{
                                padding: '12px 8px',
                                background: activeKey === sec.key ? colors.neutral[2] : 'transparent',
                                borderRadius: 8,
                                color: activeKey === sec.key ? colors.character.primary : colors.character.secondary,
                                fontWeight: 600, // semibold
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
                order: isMobile ? 1 : 1, // กล่องย่อยสองอยู่กลางเสมอ
                padding: "24px"
            }}
        >
            {/* University Overview */}
            <div id="overview" style={{ scrollMarginTop: 20 }}>
                <Title level={3} style={{ marginBottom: 8, color: colors.character.primary }}>University overview</Title>
                <Text style={{ fontSize: 14, color: colors.character.secondary, display: 'block' }}>A overview of the project, goals and outcomes.</Text>
                <Divider style={{ margin: '16px 0', borderColor: colors.conditional.divider }} />
                
                <div style={{ padding: 16, background: colors.neutral[2], marginBottom: 24 }}>
                    <Text style={{ fontSize: 14, color: colors.character.secondary }}>
                        The University of Aberdeen is a prestigious institution in Scotland known for its academic excellence, diverse programs, and supportive environment.
                    </Text>
                </div>
                
                <Title level={4} style={{ fontSize: 16, fontWeight: 500, color: colors.character.primary, marginBottom: 16 }}>About the company</Title>
                <Text style={{ display: 'block', marginBottom: 16, color: colors.neutral[8], fontSize: 16 }}>
                    The University of Aberdeen was founded in 1495, making it the third oldest university in Scotland and fifth oldest in the UK. Five Nobel Prize winners are associated with the University and students electing to study at Aberdeen would be joining a varied and thriving community of around 12,000 students from around the world.
                </Text>
                <Text style={{ display: 'block', marginBottom: 16, color: colors.neutral[8], fontSize: 16 }}>
                    The University of Aberdeen was founded in 1495, making it the third oldest university in Scotland and fifth oldest in the UK. Five Nobel Prize winners are associated with the University and students electing to study at Aberdeen would be joining a varied and thriving community of around 12,000 students from around the world.
                </Text>
                <Text style={{ display: 'block', marginBottom: 24, color: colors.neutral[8], fontSize: 16 }}>
                    Roughly half of University of Aberdeen students study medicine, science or engineering, with arts and social sciences also popular. A cosmopolitan atmosphere of Scottish and English students alongside 120 different nationalities ensures an exciting multi-cultural atmosphere, with Aberdeen’s remote location attractive to students from all over the world. University of Aberdeen graduates also enjoy some of the highest starting salaries in Scotland and was named as Scotland's safest university city by the Complete University Guide.
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

            {/* Program Collapse */}
            <div style={{ background: colors.neutral[2], borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', background: colors.neutral[2] }}>
                    <Title level={4} style={{ margin: 0, color: colors.primary[6] }}>Master's Programmes</Title>
                </div>
                
                <div style={{ padding: '0 16px 16px' }}>
                    {/* 🟢 Collapse สำหรับรายการย่อยแต่ละอัน */}
                    <Collapse 
                        bordered={false} 
                        expandIconPosition="right" 
                        style={{ background: 'transparent' }}
                        // 🟢 ใช้ Icon Logic แบบ Arrow Up/Down
                        expandIcon={({ isActive }) => (
                            isActive 
                                ? <UpOutlined style={{ fontSize: 14, color: colors.primary[6] || '#999' }} /> 
                                : <DownOutlined style={{ fontSize: 14, color: colors.primary[6] || '#999' }} />
                        )}
                    >
                        {[
                            'Social Sciences (63)', 'Education & Training (40)', 'Computer Science & IT (38)', 
                            'Business & Management (34)', 'Natural Sciences & Mathematics (24)', 'Engineering & Technology (23)', 
                            'Medicine & Health (21)', 'Humanities (20)', 'Applied Sciences & Professions (14)', 
                            'Arts, Design & Architecture (14)', 'Environmental Studies & Earth Sciences (12)', 'Hospitality, Leisure & Sports (4)', 
                            'Law (3)', 'Journalism & Media (1)'
                        ].map(item => (
                            <Panel 
                                header={<Title level={5} style={{ margin: 0, fontSize: 16, fontWeight:500, color: colors.primary[6] }}>{item}</Title>} 
                                key={item} 
                                style={{ padding:"0",background: colors.neutral[2], borderBottom: `1px solid ${colors.conditional.divider}` }}
                            >
                                <Text style={{ display: 'block', color: colors.neutral[8] }}>
                                    รายละเอียดของโปรแกรม **{item.split(' (')[0]}** เช่น ระยะเวลา, หน่วยกิต, หรือคำอธิบายโดยย่อ
                                </Text>
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            </div>

            {/* 🟢 ลบ Collapse หลักออก และเปลี่ยนเป็น div ธรรมดาสำหรับ Pre-Master's Programmes */}
            <div style={{ background: colors.neutral[2], borderRadius: 8, overflow: 'hidden', marginTop: 16 }}>
                <div style={{ padding: '12px 16px', background: colors.neutral[2] }}>
                    <Title level={4} style={{ margin: 0, color: colors.primary[6] }}>Pre-Master's Programmes</Title>
                </div>

                <div style={{ padding: '0 16px 16px' }}>
                    {/* Collapse สำหรับรายการย่อยแต่ละอัน */}
                    <Collapse 
                        bordered={false} 
                        expandIconPosition="right" 
                        style={{ background: 'transparent' }}
                        // 🟢 ใช้ Icon Logic แบบ Arrow Up/Down
                        expandIcon={({ isActive }) => (
                            isActive 
                                ? <UpOutlined style={{ fontSize: 14, color: colors.primary[6] || '#999' }} /> 
                                : <DownOutlined style={{ fontSize: 14, color: colors.primary[6] || '#999' }} />
                        )}
                    >
                        {[
                            'Computer Science & IT (29)', 'Social Sciences (27)', 'Business & Management (21)', 
                            'Engineering & Technology (16)', 'Natural Sciences & Mathematics (16)', 'Education & Training (12)', 
                            'Environmental Studies & Earth Sciences (10)', 'Applied Sciences & Professions (6)', 
                            'Humanities (6)', 'Medicine & Health (6)', 'Arts, Design & Architecture (4)', 
                            'Hospitality, Leisure & Sports (2)', 'Journalism & Media (2)', 'Law (2)'
                        ].map(item => (
                            <Panel 
                                header={<Title level={5} style={{ margin: 0, fontSize: 16, fontWeight:500, color: colors.primary[6] }}>{item}</Title>} 
                                key={item} 
                                style={{ padding:"0",background: colors.neutral[2], borderBottom: `1px solid ${colors.conditional.divider}` }}
                            >
                                <Text style={{ display: 'block', color: colors.neutral[8] }}>
                                    รายละเอียดของโปรแกรม **{item.split(' (')[0]}** เช่น ระยะเวลา, หน่วยกิต, หรือคำอธิบายโดยย่อ
                                </Text>
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            </div>
                

            
        </div>
    );
    
    // Right Sidebar / Recommended Courses
    const RightSidebar = (
        <div style={{ 
            width: isMobile ? '100%' : '300px', // กำหนดความกว้าง 
            flexShrink: 0,
            order: isMobile ? 2 : 3, // กล่องย่อยสามอยู่ล่างสุดใน Mobile/ขวาใน Laptop
        }}>
            <div style={{ position: 'sticky', top: 20,  }}> {/* ให้กล่องนี้เลื่อนตาม */}
                
                {/* See More Information Box */}
                <Card style={{ padding: 0, background: colors.neutral[2], borderRadius: 12, marginBottom: 24, border: 'none' }} >
                    <Title level={4} style={{ fontSize: 18, fontWeight: 500, color: colors.character.primary, marginBottom: 24 }}>See more information</Title>
                    <Button type="primary" size="large" block>Visit university website</Button>
                </Card>

                {/* Recommended Courses Box */}
                <div style={{ background: colors.geekBlue[1], padding: 0, borderRadius: 12 }}>
                    <Title level={4} style={{ padding: 24, margin: 0, color: colors.character.primary }}>Recommended Courses</Title>
                    <Divider style={{ margin: '0 0 0 0', borderColor: colors.conditional.divider }} />
                    
                    {[
                        { name: "Master of Business Administration (MBA)", uni: universityName },
                        { name: "Master of Science (MSc) in Petroleum Engineering", uni: universityName },
                        { name: "Master of Arts (MA) in International Relations", uni: universityName },
                    ].map((course, index) => (
                        <div key={index} style={{ padding: '16px 24px' }}>
                            <Text style={{ fontSize: 16, color: colors.neutral[9], display: 'block', fontWeight: 500 }}>{course.name}</Text>
                            <Text style={{ fontSize: 14, color: colors.neutral[8] }}>{course.uni}</Text>
                            <Divider style={{ margin: '16px 0 0', borderColor: colors.conditional.divider }} />
                        </div>
                    ))}
                    
                    <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Title level={5} style={{ margin: 0, fontSize: 16, color: colors.primary[6], cursor: 'pointer' }}>
                            See more courses
                        </Title>
                        <RightCircleOutlined style={{ fontSize: 16, color: colors.primary[6], marginLeft: 8 }} />
                    </div>
                </div>
            </div>
        </div>
    );


    return (
        <div style={{ padding: '24px', backgroundColor: colors.neutral[1] }}>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 0, alignItems: 'flex-start' }}>
                {/* Mobile Tab is rendered inside MainContent on mobile, but here for structural clarity */}
                {isMobile && SidebarContent}

                {/* 2. Sidebar Area (Right in Laptop) */}
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 48 }}>
                    {/* Navigation/Tabs (Box 1 in Mobile / Right-most in Laptop) */}
                    {!isMobile && SidebarContent}
                </div>
                {/* 1. Main Content Area (Left/Center in Laptop) */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {/* Main Content (Box 2) */}
                    {MainContent} 
                </div>
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 48 }}>
                    {/* Right Sidebar (Box 3) */}
                    {RightSidebar}
                </div>

            </div>

        </div>
    );
};


// -----------------------------------------------------------
// 📌 Main Profile Component
// -----------------------------------------------------------
export default function UniversityProfile() {
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const paddingMobile = "96px 24px";
    const paddingDesktop = "96px 48px";
    
    // ✅ ประกาศ Hook สำหรับ Navigation
    const navigate = useNavigate();

    // ✅ ฟังก์ชันสำหรับกลับไปหน้าก่อนหน้า
    const handleBack = () => {
        navigate(-1); // สั่งให้ Router กลับไป 1 ขั้นใน History Stack
    };
    // -----------------------------------------------------------
    // กล่องแรก (Header Info)
    // -----------------------------------------------------------
    const HeaderInfo = (
        <div style={{ padding: '16px 24px', gap: 8, display: 'flex', flexDirection: 'column', background: 'white' }}>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: colors.character.secondary }}>University /</Text>
                <Text style={{ fontSize: 14, color: colors.character.primary, fontWeight: 500 }}>University of Aberdeen</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <ArrowLeftOutlined 
                style={{ 
                color: colors.character.primary, 
                fontSize: 18, 
                cursor: 'pointer' 
                }} 
                onClick={handleBack} // ⬅️ ผูก onClick เข้ากับฟังก์ชัน handleBack
                />
                <Title level={4} style={{ margin: 0, color: colors.character.primary }}>{universityName}</Title>
                <Text style={{ fontSize: 14, color: colors.character.secondary, display: isMobile ? 'none' : 'block', }}>
                The University of Aberdeen is a public research university in Aberdeen, Scotland.
                </Text>
            </div>
        </div>
    );

    // -----------------------------------------------------------
    // กล่องสี่ (FAQ)
    // -----------------------------------------------------------
    const FAQSection = (
        <div style={{ padding: isMobile ? paddingMobile : paddingDesktop, background: colors.neutral[3] ? colors.neutral[1] : '#f9f9f9' }}>
            <div style={{ marginBottom: 48, textAlign: 'center' }}>
                <Title level={1} style={{ margin: 0, color: colors.character.primary }}>Frequently asked questions</Title>
                <Title level={5} style={{ marginTop: 8, color: colors.neutral[8] }}>Everything you need to know about the product and billing.</Title>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: 768, display: 'flex', flexDirection: 'column', gap: 32 }}>
                    <Collapse 
                        bordered={false} 
                        expandIconPosition="right" 
                        defaultActiveKey={['1']} // โชว์ข้อแรกขยาย
                        style={{ background: 'transparent' }}
                        expandIcon={({ isActive }) => (
                            isActive 
                                ? <MinusCircleOutlined style={{ color: colors.neutral[6] || '#999', fontSize: 18 }} /> 
                                : <PlusCircleOutlined style={{ color: colors.neutral[6] || '#999', fontSize: 18 }} />
                        )}
                    >
                        <Panel header={<Title level={4} style={{ margin: 0, color: colors.character.primary }}>How do I apply to the University of Aberdeen?</Title>} key="1">
                            <Text style={{ color: colors.neutral[8], fontSize: 16 }}>
                                To apply to the University of Aberdeen, you can submit your application online through the official university website. The application process typically involves filling out an application form, providing necessary documents such as academic transcripts and personal statements, and paying the application fee.
                            </Text>
                        </Panel>
                        <Panel header={<Title level={4} style={{ margin: 0, color: colors.character.primary }}>Are there any scholarships available for international students?</Title>} key="2">
                            <Text style={{ color: colors.neutral[8], fontSize: 16 }}>[Content for scholarships]</Text>
                        </Panel>
                        <Panel header={<Title level={4} style={{ margin: 0, color: colors.character.primary }}>What is the campus like? Are there on-campus accommodation options?</Title>} key="3">
                            <Text style={{ color: colors.neutral[8], fontSize: 16 }}>[Content for campus]</Text>
                        </Panel>
                        <Panel header={<Title level={4} style={{ margin: 0, color: colors.character.primary }}>Can I work part-time while studying at the University of Aberdeen?</Title>} key="4">
                            <Text style={{ color: colors.neutral[8], fontSize: 16 }}>[Content for work-part-time]</Text>
                        </Panel>
                        <Panel header={<Title level={4} style={{ margin: 0, color: colors.character.primary }}>What support services are available for students, such as academic support or counseling?</Title>} key="5">
                            <Text style={{ color: colors.neutral[8], fontSize: 16 }}>[Content for support services]</Text>
                        </Panel>
                        <Panel header={<Title level={4} style={{ margin: 0, color: colors.character.primary }}>Does the University of Aberdeen have partnerships with other institutions or study abroad opportunities?</Title>} key="6">
                            <Text style={{ color: colors.neutral[8], fontSize: 16 }}>[Content for study abroad]</Text>
                        </Panel>
                    </Collapse>
                </div>
            </div>

            {/* Still have questions? Box */}
            <div style={{ padding: 32, background: colors.neutral[3], marginTop: 48, borderRadius: 12, textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                    <Avatar.Group maxCount={4} size="large">
                        <Avatar src={avatar1} />
                        <Avatar src={avatar2} />
                        <Avatar src={avatar3} />
                        <Avatar src={avatar4} />
                    </Avatar.Group>
                </div>
                <Title level={3} style={{ margin: 0, fontSize: 20, color: colors.neutral[10] }}>Still have questions?</Title>
                <Text style={{ fontSize: 18, color: colors.neutral[7], display: 'block', marginBottom: 24 }}>Can’t find the answer you’re looking for? Please chat to our friendly team.</Text>
                <Button type="primary" size="large">Ask questions</Button>
            </div>
        </div>
    );
    
    // -----------------------------------------------------------
    // กล่องห้า (Contact)
    // -----------------------------------------------------------
    const ContactSection = (
        <div style={{ 
            padding: '96px 48px 48px 48px', 
            background: 'white',
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            gap: isMobile ? 32 : 96,
            alignItems: 'flex-start'
        }}>
            {/* กล่องซ้าย: Text */}
            <div style={{ flex: 1 }}>
                <Title level={5} style={{ margin: 0, color: colors.character.primary }}>Contact us</Title>
                <Title level={1} style={{ margin: '8px 0', color: colors.character.primary }}>Our locations</Title>
                <Title level={5} style={{ margin: 0, color: colors.neutral[8] }}>Come visit our friendly team at one of our offices.</Title>
            </div>

            {/* กล่องขวา: Contact Details */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
                
                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ 
                        width: 48, height: 48, background: colors.primary[6], borderRadius: 8, 
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        flexShrink: 0
                    }}>
                        <PhoneOutlined style={{ color: colors.primary[6] ? colors.neutral[1] : 'white', fontSize: 20 }} />
                    </div>
                    <div>
                        <Title level={4} style={{ margin: 0, color: colors.character.primary }}>Phone</Title>
                        <Title level={5} style={{ margin: 0, color: colors.character.secondary, fontWeight: 400 }}>+44 1224 272000</Title>
                    </div>
                </div>

                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{ 
                        width: 48, height: 48, background: colors.primary[6], borderRadius: 8, 
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        flexShrink: 0
                    }}>
                        <EnvironmentOutlined style={{ color: colors.primary[6] ? colors.neutral[1] : 'white', fontSize: 20 }} />
                    </div>
                    <div>
                        <Title level={4} style={{ margin: 0, color: colors.character.primary }}>Location</Title>
                        <Title level={5} style={{ margin: 0, color: colors.character.secondary, fontWeight: 400 }}>King's College, Aberdeen AB24 3FX, United Kingdom</Title>
                    </div>
                </div>
            </div>
        </div>
    );

    // -----------------------------------------------------------
    // กล่องหก (Map)
    // -----------------------------------------------------------
    const MapSection = (
        <div style={{ background: 'white', padding: '0 48px 96px 48px' }}>
            <div style={{ 
                height: 400, 
                width: '100%', 
                overflow: 'hidden' // ซ่อนขอบ iframe
            }}>
                {/* 🟢 แทนที่ด้วย Google Maps Embed iframe */}
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
    <Layout style={{ minHeight: "100vh", position: "relative" }}>
    {/* ⭐ SIDEBAR Desktop */}
    {!isMobile && (
      <Layout.Sider
        width={47}
        style={{
          position: "fixed",
          height: "100vh",
          background: colors.primary[7],
          zIndex: 3000,
        }}
      >
        <SideBar mobileMode={false} />
      </Layout.Sider>
    )}

    {/* ⭐ Layout หลัก */}
    <Layout style={{ marginLeft: !isMobile ? 47 : 0, transition: "0.3s", width: "100%", overflowX: "hidden" }}>
      {/* MenuBar บนสุด */}
      <MenuBar isMobile={isMobile} />

      {/* Content หลักทั้งหมด */}
      <Content>
        {HeaderInfo}
        <GallerySection />
        <ContentSection />
        {FAQSection}
        {ContactSection}
        {MapSection}

        {/* Upcoming Events ล่างสุด */}
        <UpcomingEvents />
      </Content>

      {/* Footer */}
      <AppFooter />
    </Layout>
  </Layout>
);
}
