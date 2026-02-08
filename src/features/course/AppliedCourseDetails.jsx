import React from 'react'; // No useState/useEffect used
import { Layout, Typography, Card, Tag, Space, Grid, Button, message } from 'antd';
import { 
    FileTextOutlined, 
    AuditOutlined, 
    CheckCircleOutlined, 
    LoadingOutlined,
    ClockCircleOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import "antd/dist/antd.css"; 

// Simulate a colors object from Design System
const colors = {
    primary: { 0: '#E6F7FF', 5: '#1890FF', 6: '#096DD9', 7: '#0050B3' },
    neutral: { 0: '#FFFFFF', 1: '#F0F2F5', 3: '#D9D9D9', 5: '#8C8C8C' },
    character: { primary: '#262626', secondary: '#595959' },
    success: { 5: '#52C41A' },
    warning: { 5: '#FAAD14' },
    error: { 5: '#FF4D4F' },
};

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

// -----------------------------------------------------------
// 🧠 Mock Data: Course Details (applicationSteps removed)
// -----------------------------------------------------------
const mockCourseDetails = {
    courseName: "Global Master of Science in Data Science (2026)",
    university: "Imperial College London, UK",
    applicationDeadline: "2026-03-01",
    overview: "This is an intensive one-year Master's program in Data Science focusing on big data analysis and industrial application in high-tech sectors. Suitable for candidates with a strong background in mathematics and programming.",
};

// -----------------------------------------------------------
// 📌 Component: AppliedCourseDetails
// -----------------------------------------------------------
function AppliedCourseDetails() {
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const { courseName, university, applicationDeadline, overview } = mockCourseDetails;

    const containerPadding = isMobile ? "24px 16px" : "32px 48px";

    // Helper function to determine color and Tag for Timeline Status
    const getStatusTag = (status) => {
        switch (status) {
            case 'Completed':
                return <Tag color="success">Completed</Tag>;
            case 'In Progress':
                return <Tag color="processing" icon={<LoadingOutlined />}>In Progress</Tag>;
            case 'Pending':
            default:
                return <Tag color="default">Pending</Tag>;
        }
    };

    // 1. HARDCODED DATA: Define timelineItems directly following the Ant Design structure.
    const timelineItems = [
        {
            dot: <FileTextOutlined style={{ color: colors.success[5] }} />,
            color: 'green',
            children: (
                <div style={{ padding: '4px 0' }}>
                    <Title level={5} style={{ margin: 0 }}>
                        Application Submission
                    </Title>
                    <Space size="middle" style={{ margin: '4px 0' }}>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                            <ClockCircleOutlined />  2025-12-05
                        </Text>
                        {getStatusTag('Completed')}
                    </Space>
                    <Paragraph style={{ margin: 0, color: colors.character.secondary, marginTop: 4 }}>
                        You have successfully submitted your application and supporting documents.
                    </Paragraph>
                </div>
            ),
        },
        {
            dot: <LoadingOutlined style={{ color: colors.warning[5] }} />,
            color: 'blue',
            children: (
                <div style={{ padding: '4px 0' }}>
                    <Title level={5} style={{ margin: 0 }}>
                        Document Review Process
                    </Title>
                    <Space size="middle" style={{ margin: '4px 0' }}>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                            <ClockCircleOutlined />  2025-12-15
                        </Text>
                        {getStatusTag('In Progress')}
                    </Space>
                    <Paragraph style={{ margin: 0, color: colors.character.secondary, marginTop: 4 }}>
                        Application is currently undergoing qualification review by the committee (expected completion within 2 weeks).
                    </Paragraph>
                </div>
            ),
        },
        {
            dot: <AuditOutlined style={{ color: colors.neutral[5] }} />,
            color: 'gray',
            children: (
                <div style={{ padding: '4px 0' }}>
                    <Title level={5} style={{ margin: 0 }}>
                        Online Interview
                    </Title>
                    <Space size="middle" style={{ margin: '4px 0' }}>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                            <ClockCircleOutlined />  2026-01-10
                        </Text>
                        {getStatusTag('Pending')}
                    </Space>
                    <Paragraph style={{ margin: 0, color: colors.character.secondary, marginTop: 4 }}>
                        Awaiting interview scheduling (If selected for the next round,  Jan 10, 2026).
                    </Paragraph>
                </div>
            ),
        },
        {
            dot: <CheckCircleOutlined style={{ color: colors.neutral[5] }} />,
            color: 'gray',
            children: (
                <div style={{ padding: '4px 0' }}>
                    <Title level={5} style={{ margin: 0 }}>
                        Final Decision
                    </Title>
                    <Space size="middle" style={{ margin: '4px 0' }}>
                        <Text type="secondary" style={{ fontSize: 14 }}>
                            <ClockCircleOutlined />  2026-02-15
                        </Text>
                        {getStatusTag('Pending')}
                    </Space>
                    <Paragraph style={{ margin: 0, color: colors.character.secondary, marginTop: 4 }}>
                        The expected date for the official announcement of the selection results.
                    </Paragraph>
                </div>
            ),
        },
    ];

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: colors.neutral[1] }}>
            
            <div style={{ padding: containerPadding, maxWidth: 1200, margin: '0 auto', width: '100%' }}>

                <Button 
                    type="link" 
                    icon={<ArrowLeftOutlined />} 
                    style={{ marginBottom: 16, paddingLeft: 0 }}
                    onClick={() => message.info('Go back function not implemented in this demo.')}
                >
                    Back to Applications List
                </Button>

                {/* 1. Course Name and University Section */}
                <Card 
                    style={{ marginBottom: 32, borderRadius: 8 }}
                    bodyStyle={{ backgroundColor: colors.primary[0], borderLeft: `6px solid ${colors.primary[6]}` }}
                >
                    <Text style={{ fontSize: 16, color: colors.primary[7], fontWeight: 500, display: 'block', marginBottom: 8 }}>
                        Application Status for the Course
                    </Text>
                    <Title level={2} style={{ margin: 0, color: colors.character.primary }}>
                        {courseName}
                    </Title>
                    <Text type="secondary" style={{ fontSize: 16, color: colors.character.secondary }}>
                        {university}
                    </Text>
                </Card>

                {/* 2. Review Timeline Section (Manual List View) */}
                <div style={{ marginBottom: 32 }}>
                    <Title level={3} style={{ marginBottom: 24, borderBottom: `1px solid ${colors.neutral[3]}`, paddingBottom: 8 }}>
                        🗓️ Review Timeline and Status (List View)
                    </Title>
                    <Card style={{ padding: isMobile ? '16px' : '32px', borderRadius: 8 }}>
                        
                        {/* 🛑 Modification: Removed <Timeline> and used .map() to render Children directly */}
                        <div style={{ padding: isMobile ? '0 8px' : '0' }}>
                            {timelineItems.map((item, index) => (
                                <div 
                                    key={index} 
                                    // Add separator and spacing to resemble a list item
                                    style={{ 
                                        paddingBottom: 20, 
                                        marginBottom: 20, 
                                        borderBottom: index < timelineItems.length - 1 ? `1px solid ${colors.neutral[3]}` : 'none',
                                        display: 'flex', // Arrange icon and content
                                        alignItems: 'flex-start',
                                        gap: 16
                                    }}
                                >
                                    {/* Display icon (dot) and content (children) separately */}
                                    <div style={{ fontSize: 20, paddingTop: 4 }}>{item.dot}</div>
                                    <div style={{ flex: 1 }}>{item.children}</div>
                                </div>
                            ))}
                        </div>
                        {/* 🛑 End of Modification */}

                    </Card>
                </div>

                {/* 3. Course Overview Section */}
                <div>
                    <Title level={3} style={{ marginBottom: 16, borderBottom: `1px solid ${colors.neutral[3]}`, paddingBottom: 8 }}>
                        📚 Course Overview
                    </Title>
                    <Card style={{ borderRadius: 8 }}>
                        <Paragraph style={{ fontSize: 16 }}>
                            {overview}
                        </Paragraph>
                        <div style={{ marginTop: 24, borderTop: `1px dashed ${colors.neutral[3]}`, paddingTop: 16 }}>
                            <Space size="large" direction={isMobile ? 'vertical' : 'horizontal'}>
                                <Text strong style={{ color: colors.character.primary }}>
                                    Application Deadline:
                                </Text>
                                <Tag 
                                    color="error" 
                                    icon={<ClockCircleOutlined />} 
                                    style={{ padding: '4px 8px', fontSize: 14 }}
                                >
                                    {applicationDeadline}
                                </Tag>
                            </Space>
                        </div>
                    </Card>
                </div>

            </div>
        </Layout>
    );
}

// -----------------------------------------------------------
// Main App Component: Directly calls AppliedCourseDetails
// -----------------------------------------------------------
export default AppliedCourseDetails;