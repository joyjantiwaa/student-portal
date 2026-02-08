// src/features/dashboard/EmptyDashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Layout, Input, Typography, Button, message, Alert, Modal, Tag } from "antd"; 
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from "@/features/components/Sidebar";
import MenuBar from "@/features/components/MenuBar";
import AppFooter from "@/features/components/Footer";
import CourseCard from "@/features/components/CourseCard";
import empty from "@/assets/images/empty-img-gray.png";
import { useShortlist } from '@/features/contexts/ShortlistContext';
import mainImage from "@/assets/images/mainImage.svg";
import colors from "@/features/designsystem/colors";
import "antd/dist/antd.css";
import '@/App.css';

const { Title, Text } = Typography;
const { Search } = Input;

const usePreDashboardStatus = () => {
  const [hasSeenPreDashboard, setHasSeenPreDashboard] = useState(
      sessionStorage.getItem('hasSeenPreDashboard') === 'true'
  );
  const setSeen = useCallback(() => {
      sessionStorage.setItem('hasSeenPreDashboard', 'true');
      setHasSeenPreDashboard(true);
  }, []);
  return { hasSeenPreDashboard, setSeen };
};

export default function EmptyDashboard() {
    const [screenSize, setScreenSize] = useState("desktop");
    const navigate = useNavigate();
    const { shortlist, toggleShortlist, handleCourseApply: contextHandleApply } = useShortlist();
    const { hasSeenPreDashboard, setSeen } = usePreDashboardStatus();
    const [isOfferModalVisible, setIsOfferModalVisible] = useState(false);
    const [latestOfferCourse, setLatestOfferCourse] = useState(null);
    const [profileComplete, setProfileComplete] = useState(
        localStorage.getItem('isProfileCompleted') === 'true'
    ); 
    const [messageApi, contextHolder] = message.useMessage();

    // ------------------------------------------------------------------
    // Handler สำหรับสมัครคอร์ส
    // ------------------------------------------------------------------
    const handleCourseApply = (course) => {
        // ⭐ 1. เรียก Context Function เพื่ออัปเดต State 'applied: true'
        contextHandleApply(course); 
        
        const hasAppliedBefore = localStorage.getItem('hasAppliedCourse') === 'true';
        messageApi.success(`Applying for ${course.title}...`);
        
        if (!hasAppliedBefore) {
            localStorage.setItem('hasAppliedCourse', 'true');
            setLatestOfferCourse(course);

            // ... Modal Logic
            setTimeout(() => {
                setIsOfferModalVisible(true);
                const offerEvent = new CustomEvent('newOfferNotification', { 
                    detail: { course: course.title } 
                });
                window.dispatchEvent(offerEvent);
            }, 10000); 
        }
    };

    // ตรวจสอบสถานะ Profile Complete
    useEffect(() => {
        const checkProfileStatus = () => {
            const isCompleted = localStorage.getItem('isProfileCompleted') === 'true';
            if (isCompleted !== profileComplete) setProfileComplete(isCompleted);
        };
        checkProfileStatus();
        window.addEventListener('storage', checkProfileStatus);
        return () => window.removeEventListener('storage', checkProfileStatus);
    }, [profileComplete]);

    // Responsive Layout Hook
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

    const handleSearch = (value) => {
        if (value) {
            setSeen();
            navigate(`/search-courses?query=${value}`);
        }
    };

    // ------------------------------------------------------------------
    // PreDashboard / ShortlistContent / EmptyState
    // ------------------------------------------------------------------
    const PreDashboard = () => (
        <div style={{display:'flex', flexDirection:'column', alignItems: 'center', gap:'24px'}}>
            <Title level={2} style={{ color: colors.character.primary, margin: 0, textAlign: 'center' }}>
                Welcome to SI-APPLICATION
            </Title>     
            <img src={mainImage} alt="mainImage" style={{ width: '220px', height: '145px', objectFit: 'cover' }} />
            <Text style={{ fontSize: '16px', lineHeight: '1.5', color: colors.character.primary, textAlign: 'center' }}>
                Welcome to our Education Platform! Discover, learn, and <br /> 
                succeed with us. Let's start your educational journey together.
            </Text>
            <Button
                type="primary"
                size="medium"
                style={{ alignSelf: 'center', marginTop: '12px' }}
                onClick={() => { setSeen(); navigate('/update-profile'); }}
            >
                Update my profile
            </Button>
        </div>
    );

    const ShortlistContent = () => (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start', width:'100%' }}>
            {shortlist.map(course => (
                <CourseCard
                key={course.id}
                course={course}
                isShortlisted={true}
                onToggleShortlist={toggleShortlist}
                isDashboard={true}
                hideCompareBox={true}   // ← เพิ่มบรรทัดนี้
                profileComplete={profileComplete}
                isAppliedStatus={course.applied || false}
                onSuccessfulApply={handleCourseApply}
                />
            ))}
        </div>
    );

    const EmptyState = () => (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap: '24px' }}>
            <img src={empty} alt="Empty State Illustration" style={{ width: 'auto', objectFit: 'contain', display: 'block' }} />
            <Text style={{ fontSize: '14px', lineHeight: '1.5', textAlign: 'center' }}>
                <p style={{color: colors.character.primary, margin: 0, fontWeight: '600'}}>No Data <br /></p>
                <p style={{color: colors.conditional.text, margin: 0}}>Request apply application on Shortlisted page</p>
            </Text>
            <Search
                placeholder="Search course"
                allowClear
                enterButton="Search"
                size="large"
                style={{ width: isMobile ? '100%' : '300px' }}
                onSearch={handleSearch}
            />
        </div>
    );

    // เลือก Content ที่จะ Render
    let contentToRender;
    if (shortlist.length > 0) contentToRender = <ShortlistContent />;
    else if (hasSeenPreDashboard) contentToRender = <EmptyState />;
    else contentToRender = <PreDashboard />;

    // ------------------------------------------------------------------
    return (
        <Layout style={{ minHeight: "100vh", position: "relative" }}>
            {contextHolder}

            {/* Offer Modal */}
            <Modal
                title="🎉 Congratulations! Offer Received!"
                open={isOfferModalVisible}
                onOk={() => setIsOfferModalVisible(false)}
                onCancel={() => setIsOfferModalVisible(false)}
                footer={[
                    <Button key="ok" type="primary" onClick={() => setIsOfferModalVisible(false)}>
                        Great!
                    </Button>,
                ]}
            >
                <p>We are excited to inform you that you have received an offer for the following course:</p>
                <h3 style={{color: colors.polarGreen[7]}}>{latestOfferCourse?.title || 'Your Applied Course'}</h3>
                <p>Check your email for full details and next steps.</p>
            </Modal>

            {!isMobile && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    width: 47,
                    background: colors.primary[7] || "#096DD9",
                    zIndex: 3000,
                }}>
                    <Sidebar mobileMode={false} />
                </div>
            )}

            <Layout
                style={{
                    marginLeft: isMobile ? 0 : 47,
                    transition: "margin-left 0.3s",
                    width: "100%",
                    overflowX: "hidden",
                    backgroundColor: colors.neutral[1],
                }}
            >
                <MenuBar isMobile={isMobile} />
                <div style={{ flexGrow: 1 }}>
                    <div style={{ background: 'white' }}>
                        <div style={{ margin: "0 auto", padding: isMobile ? "24px 24px 12px 24px":"24px 24px 0px 40px" }}>
                            <div style={{  display: 'flex', flexDirection: "column", gap: 12 }}>
                                <div style={{ display: 'flex', flexDirection: "row", gap: 12, alignItems: 'center' }}>
                                    <Title level={4} style={{ color: colors.character.primary, margin: 0 }}>Dashboard</Title>
                                    <a href="/status-detail" style={{ textDecoration: 'none' }}>
                                        <Tag color="gold" style={{ borderRadius: '15px' }}>Status</Tag>
                                    </a>
                                </div>
                                <div style={{ display: "flex", flexDirection: isMobile ? "column":"row", gap: isMobile ? "0px": "4px" }}>
                                    <p>We assist student to complete application by SI-APPLICATION platform.</p>
                                    <Link to="/Blogs" style={{ color: colors.primary[6] }}>
                                        How to use the SI-Applications platform?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        minHeight: 'calc(100vh - 120px)',
                        margin: "0 auto",
                        justifyContent: 'center',
                        alignItems: 'left',
                        width: '100%',
                        backgroundColor: colors.conditional.pageBackground
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            padding: '24px',
                            gap: '24px',
                            textAlign: 'left',
                            width: '100%',
                        }}>
                            {/* Persistent Alert for Incomplete Profile */}
                            {(!profileComplete && shortlist.length > 0) && (
                                <Alert
                                    description={
                                        <>
                                            You cannot apply for courses until you have completed your
                                            <Link to="/update-profile" style={{ marginLeft: 8 }}>
                                                profile.
                                            </Link>
                                        </>
                                    }
                                    type="warning"
                                    showIcon
                                    closable={false}
                                    style={{ marginBottom: 16, width: '100%' }}
                                />
                            )}
                            {contentToRender}
                        </div>
                    </div>
                </div>
                <AppFooter />
            </Layout>
        </Layout>
    );
}
