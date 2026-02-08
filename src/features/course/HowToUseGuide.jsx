import React, { useState, useEffect } from 'react';
import { Layout, Typography, Card, Steps, Divider, List } from 'antd';
import { 
    LoginOutlined, 
    SearchOutlined, 
    FormOutlined, 
    CheckSquareOutlined, 
    MailOutlined,
} from '@ant-design/icons';
import Sidebar from "@/features/components/Sidebar";
import MenuBar from "@/features/components/MenuBar";
import AppFooter from "@/features/components/Footer";
import colors from "@/features/designsystem/colors";
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";
import '@/App.css';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

// --- Inline Style Definitions (คงที่ด้านนอก) ---
const styles = {
    container: {
        padding: '32px',
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        fontFamily: 'Inter, sans-serif'
    },
    contentWrapper: {
        maxWidth: '1280px',
        margin: '0 auto'
    },
    headerTitle: {
        color: '#1f2937',
        marginBottom: '8px'
    },
    headerParagraph: {
        color: '#4b5563',
        marginBottom: '40px',
        fontSize: '18px'
    },
    sectionTitle: {
        color: '#3b82f6',
        borderBottom: '2px solid #3b82f6',
        paddingBottom: '8px',
        marginBottom: '24px'
    },
    stepCard: {
        marginBottom: '32px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.06)',
        borderLeft: '4px solid #16a34a',
    }
};

const HowToUseGuide = () => {

    // ⭐ NEW: Responsive Screen Size State
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
                        background: colors.primary[7],
                        width: 47,
                        zIndex: 3000,
                    }}
                >
                    <Sidebar mobileMode={false} />
                </div>
            )}

            <Layout
                style={{
                    marginLeft: isMobile ? 0 : 47,
                    width: "100%",
                    transition: "0.3s",
                }}
            >

                {/* ⭐ TOP MENU BAR */}
                <MenuBar />

                <Content style={{ minHeight: "calc(100vh - 70px)" }}>

                    {/* ⭐ ORIGINAL CONTENT */}
                    <div style={styles.container}>
                        <div style={styles.contentWrapper}>

                            <Title level={3} style={styles.headerTitle}>
                                How to Use the SI-Applications Platform
                            </Title>

                            <Paragraph 
                                style={{ 
                                    ...styles.headerParagraph, 
                                    fontSize: '16px',
                                }}
                            >
                                A complete step-by-step guide to successfully navigate your application journey.
                            </Paragraph>

                            {/* 🟢 กำหนด Items โดยตรงใน Component Steps */}
                            <Steps
                                direction="vertical"
                                size="default"
                                current={-1}
                                style={{ marginBottom: '40px' }}
                                items={[
                                    { 
                                        title: 'Access and Login', 
                                        icon: <LoginOutlined style={{ color: styles.sectionTitle.color }} />, 
                                        content: 'Establish your identity on the platform.', 
                                    },
                                    { 
                                        title: 'Browse Opportunities', 
                                        icon: <SearchOutlined style={{ color: styles.sectionTitle.color }} />, 
                                        content: 'Find the ideal program or position.', 
                                    },
                                    { 
                                        title: 'Complete Application Form', 
                                        icon: <FormOutlined style={{ color: styles.sectionTitle.color }} />, 
                                        content: 'Submit all required details and documents.', 
                                    },
                                    { 
                                        title: 'Track Status', 
                                        icon: <CheckSquareOutlined style={{ color: styles.sectionTitle.color }} />, 
                                        content: 'Monitor your application progress.', 
                                    },
                                    { 
                                        title: 'Final Decision & Action', 
                                        icon: <MailOutlined style={{ color: styles.sectionTitle.color }} />, 
                                        content: 'Respond to the final offer.', 
                                    }
                                ]}
                            />
                            {/* ------------------------------------------------ */}

                            <Divider style={{ margin: '40px 0' }} />

                            <Title level={4} style={styles.sectionTitle}>
                                Detailed Instructions
                            </Title>

                            {/* Step 1: Access and Login */}
                            <Card title={<Title level={5}>Step 1: Access and Login</Title>} style={styles.stepCard}>
                                <Paragraph>
                                    To begin, you must either <Text strong>Register for a new account</Text> or <Text strong>Log in</Text> using your existing credentials.
                                </Paragraph>
                                <List
                                    size="small"
                                    bordered={false}
                                    dataSource={[
                                        'Click the "Login / Register" button at the top right corner.',
                                        'If registering, follow the instructions to verify your email address.',
                                        'Keep your credentials safe for future status checks.'
                                    ]}
                                    renderItem={item => <List.Item style={{ padding: '4px 0', borderBottom: 'none' }}><Text type="secondary">• {item}</Text></List.Item>}
                                />
                            </Card>


                            {/* Step 2: Browse Opportunities */}
                            <Card title={<Title level={5}>Step 2: Browse Opportunities</Title>} style={{ ...styles.stepCard, borderLeft: '4px solid #3b82f6' }}>
                                <Paragraph>
                                    The platform provides a search function to filter programs or positions based on criteria like type, location, and deadline.
                                </Paragraph>
                                <List
                                    size="small"
                                    bordered={false}
                                    dataSource={[
                                        'Use the search bar and filters to narrow down options.',
                                        'Review the "Requirements" section of each opportunity carefully before proceeding.',
                                        'Save interesting opportunities to your "Watchlist" for quick access.'
                                    ]}
                                    renderItem={item => <List.Item style={{ padding: '4px 0', borderBottom: 'none' }}><Text type="secondary">• {item}</Text></List.Item>}
                                />
                            </Card>


                            {/* Step 3: Complete Application Form */}
                            <Card title={<Title level={5}>Step 3: Complete Application Form</Title>} style={{ ...styles.stepCard, borderLeft: '4px solid #ef4444' }}>
                                <Paragraph>
                                    Ensure all sections of the form are fully completed and required documents are uploaded in the specified format (e.g., PDF).
                                </Paragraph>
                                <List
                                    size="small"
                                    bordered={false}
                                    dataSource={[
                                        'Fill in personal, educational, and professional details accurately.',
                                        'Upload all necessary documents (e.g., CV, Transcript, Passport Copy).',
                                        'Review the entire form using the "Preview" button before submitting.'
                                    ]}
                                    renderItem={item => <List.Item style={{ padding: '4px 0', borderBottom: 'none' }}><Text type="secondary">• {item}</Text></List.Item>}
                                />
                            </Card>


                            {/* Step 4: Track Status */}
                            <Card title={<Title level={5}>Step 4: Track Status</Title>} style={{ ...styles.stepCard, borderLeft: '4px solid #2563eb' }}>
                                <Paragraph>
                                    After submission, visit the <Text strong>My Applications</Text> dashboard to monitor changes. Refer to the **Application Status Guide** for status meanings (e.g., *In Review*, *Awaiting Documents*).
                                </Paragraph>
                                <List
                                    size="small"
                                    bordered={false}
                                    dataSource={[
                                        'Check the dashboard frequently for status updates.',
                                        'Be prepared to submit additional information if the status changes to "Awaiting Documents".',
                                        'Respond promptly if an "Interview Required" status is received.'
                                    ]}
                                    renderItem={item => <List.Item style={{ padding: '4px 0', borderBottom: 'none' }}><Text type="secondary">• {item}</Text></List.Item>}
                                />
                            </Card>


                            {/* Step 5: Final Decision & Action */}
                            <Card title={<Title level={5}>Step 5: Final Decision & Action</Title>} style={{ ...styles.stepCard, borderLeft: '4px solid #16a34a' }}>
                                <Paragraph>
                                    Upon receiving an *Offer*, you must take action before the deadline.
                                </Paragraph>
                                <List
                                    size="small"
                                    bordered={false}
                                    dataSource={[
                                        'If receiving a Conditional Offer, fulfill all conditions immediately.',
                                        'Accept the Unconditional Offer by clicking the "Accept" button.',
                                        'Pay the required deposit (if any) to secure your position.'
                                    ]}
                                    renderItem={item => <List.Item style={{ padding: '4px 0', borderBottom: 'none' }}><Text type="secondary">• {item}</Text></List.Item>}
                                />
                            </Card>

                        </div>
                    </div>

                </Content>

                {/* ⭐ FOOTER */}
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default HowToUseGuide;