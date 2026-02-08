import React from "react";
// นำเข้า Card, Typography, Tag, และ Grid เพื่อใช้ใน Ant Design 
import { Card, Typography, Tag, Grid } from 'antd'; 
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import colors from "@/features/designsystem/colors";

const { Title, Text, Paragraph } = Typography;
const { useBreakpoint } = Grid; 

const MAX_LENGTH = 88;

// -----------------------------------------------------------
// 📌 Component: UniversityFairCard (ปรับใช้ Ant Design Components)
// -----------------------------------------------------------
const UniversityFairCard = ({ eventData }) => {
    // 💡 ปรับให้รับ 'eventData' prop เพื่อให้สอดคล้องกับ UpcomingEvents.jsx
    const { 
        name, 
        location, 
        date, 
        description, 
        coverImage 
    } = eventData || {}; // ใช้ Destructuring และ Default object เพื่อป้องกัน Error

    const screens = useBreakpoint();
    const isMobile = !screens.lg; 

    // แปลงวันที่ให้เป็นรูปแบบ readable
    const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
          })
        : "N/A";
    
    // หากไม่มี eventData ให้แสดง Loading
    if (!eventData) {
        return <Card loading style={{ width: '100%', height: 392 }} />;
    }

    return (
        <Card
            hoverable
            style={{ 
                width: '100%', 
                height: '100%', 
                borderRadius: 0, 
                overflow: 'hidden', 
                backgroundColor: colors.neutral[0],
                // ปรับ border ให้ดูสวยงามขึ้น
                boxShadow: isMobile ? 'none' : `0 4px 12px rgba(0, 0, 0, 0.05)`,
            }}
            // ปรับ bodyStyle ให้ใช้ Flexbox จัดการพื้นที่
            bodyStyle={{ padding: 16, flex: 1, display: 'flex', flexDirection: 'column' }}
            cover={
                <div style={{ 
                    height: 200, 
                    overflow: 'hidden', 
                    position: 'relative' 
                }}>
                    <img
                        alt={name || "University Fair Image"}
                        src={coverImage} 
                        style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover' 
                        }}
                    />
                </div>
            }
        >
            {/* --- Card Content --- */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ marginBottom: 12 }}>
                    <Title level={4} style={{ margin: 0, color: colors.character.primary, fontSize: 18 }}>
                        {name || "Event Title Missing"}
                    </Title>
                    <Paragraph 
                        style={{ 
                            color: colors.character.secondary, 
                            fontSize: 14, 
                            marginTop: 8,
                        }} 
                        ellipsis={{ rows: 2, expandable: false }} // ใช้งาน ellipsis ของ Ant Design แทนการตัดข้อความด้วยตนเอง
                    >
                        {description || "Explore programs and scholarships offered by this university."}
                    </Paragraph>
                </div>

                {/* Info Footer */}
                <div style={{ paddingTop: 12, borderTop: `1px solid ${colors.neutral[3]}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <CalendarOutlined style={{ color: colors.primary[6] }} /> 
                        <Text style={{ fontSize: 14, color: colors.character.primary }}>
                            {formattedDate}
                        </Text>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <EnvironmentOutlined style={{ color: colors.primary[6] }} />
                        <Text style={{ fontSize: 14, color: colors.primary[6] }}>
                            {location || "Location not specified"}
                        </Text>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default UniversityFairCard;