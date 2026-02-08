import React, { useRef } from "react"; 
import { Layout, Typography, Button, Grid } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import colors from "@/features/designsystem/colors"; 
import "antd/dist/antd.css"; 
import UniversityFairCard from '@/features/components/UniversityFairCard'; 
import event1 from "@/assets/images/event1-min.jpg";
import event2 from "@/assets/images/event2-min.jpg";
import event3 from "@/assets/images/event3-min.jpg";
import event4 from "@/assets/images/event4-min.jpg";
import event5 from "@/assets/images/event5-min.jpg";
import event6 from "@/assets/images/event6-min.jpg";
import event7 from "@/assets/images/event7-min.jpg";
import event8 from "@/assets/images/event8-min.jpg";
import event9 from "@/assets/images/event9-min.jpg";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

// Mock Data (ใช้เพื่อจำลองการ์ด 9 ใบ)
const mockEvents = [
    {
      id: 1,
      name: "UK Business Education Fair 2025",
      universities: ["London Business School"],
      location: "London, UK",
      description: "Explore MBA, Global Management, and Business Analytics programs.",
      date: "2024-03-15",
      coverImage: event1,
    },
    {
      id: 2,
      name: "USA Ivy League Expo",
      universities: ["Harvard University"],
      location: "Boston, USA",
      description: "Learn about Computer Science, Data Science, AI Research programs.",
      date: "2024-04-10",
      coverImage: event2,
    },
    {
      id: 3,
      name: "Global Tech Masters Fair",
      universities: ["MIT", "Massachusetts Institute of Technology"],
      location: "Cambridge, USA",
      description: "Check Architecture, Design, Media Studies courses and campus info.",
      date: "2024-05-05",
      coverImage: event3,
    },
    {
      id: 4,
      name: "Canada Study Expo 2025",
      universities: ["Stanford University"],
      location: "Stanford, USA",
      description: "Engineering, Robotics, AI programs with scholarship info.",
      date: "2024-06-12",
      coverImage: event4,
    },
    {
      id: 5,
      name: "Medical Tech Masters Fair",
      universities: ["Oxford University"],
      location: "Oxford, UK",
      description: "Law, Politics, Philosophy courses and opportunities.",
      date: "2024-07-20",
      coverImage: event5,
    },
    {
      id: 6,
      name: "UK Business Education Fair 2026",
      universities: ["Cambridge University"],
      location: "Cambridge, UK",
      description: "Medicine, Biology, Neuroscience programs and info.",
      date: "2024-08-15",
      coverImage: event6,
    },
    {
      id: 7,
      name: "UK League Expo 2025",
      universities: ["Yale University"],
      location: "New Haven, USA",
      description: "Finance, Economics, Accounting courses and scholarships.",
      date: "2024-09-05",
      coverImage: event7,
    },
    {
      id: 8,
      name: "Global Marketing Education Fair 2026",
      universities: ["Columbia University"],
      location: "New York, USA",
      description: "Journalism, Media, Communication programs.",
      date: "2024-10-12",
      coverImage: event8,
    },
    {
      id: 9,
      name: "Global Science Education Fair 2026",
      universities: ["University College London", "UCL"],
      location: "London, UK",
      description: "Art, Design, Architecture courses and campus info.",
      date: "2024-11-08",
      coverImage: event9,
    },
    {
      id: 10,
      name: "Global IT Education Fair 2026",
      universities: ["Imperial College London", "ICL"],
      location: "London, UK",
      description: "Data Science, AI, Software Engineering programs.",
      date: "2024-12-01",
      coverImage: event1,
    },
    {
      id: 11,
      name: "Global Medical Education Fair 2026",
      universities: ["University of Toronto", "UofT"],
      location: "Toronto, Canada",
      description: "Business, Marketing, Entrepreneurship courses.",
      date: "2025-01-15",
      coverImage: event2,
    },
    {
      id: 12,
      name: "Global Marketing Education Fair 2027",
      universities: ["McGill University"],
      location: "Montreal, Canada",
      description: "Law, Political Science, Economics programs.",
      date: "2025-02-10",
      coverImage: event3,
    },
  ];

// -----------------------------------------------------------
// 📌 Main Component: UpcomingEvents
// -----------------------------------------------------------
export default function UpcomingEvents() {
    const screens = useBreakpoint();
    const isMobile = !screens.lg; 

    // 🎯 1. สร้าง Ref เพื่อควบคุมการเลื่อนของ Card Container
    const scrollContainerRef = useRef(null);

    // 🎯 2. ฟังก์ชันควบคุมการเลื่อนด้วยลูกศร
    const CARD_WIDTH = 384; 
    const CARD_GAP = 32; // ดึงค่า Gap มาจาก style ของ Card Container
    
    // 💡 SCROLL_AMOUNT: 384 + 32 = 416 (เลื่อนทีละ 1 กล่องพอดี)
    const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP; 

    const scroll = (scrollOffset) => {
        if (scrollContainerRef.current) {
            // ใช้ scrollBy เพื่อให้เลื่อนได้อย่างนุ่มนวล
            scrollContainerRef.current.scrollBy({
                left: scrollOffset,
                behavior: 'smooth'
            });
        }
    };
    // -----------------------------------------------------------

    const mainContainerStyle = {
        padding: isMobile ? "32px 24px" : "64px 48px",
        backgroundColor: colors.neutral[1],
    };

    return (
        <Layout>
            <div style={mainContainerStyle}>
                
                {/* 1. กล่องหลักบน: Header Section */}
                <div 
                    style={{
                        display: "flex", flexDirection: isMobile ? "column" : "row",
                        justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center",
                        gap: isMobile ? 32 : 72, marginBottom: 64, 
                    }}
                >
                    {/* กล่องซ้าย: Text Content */}
                    <div style={{ flex: 1 }}>
                        <Text style={{ fontSize: 16, color: colors.primary[6], fontWeight: 500, display: 'block', marginBottom: 8 }}>
                            Education Events 
                        </Text>
                        <Title level={1} style={{ margin: 0, color: colors.character.primary }}>
                            Upcoming Events
                        </Title>
                        <Title level={5} style={{ marginTop: 16, color: colors.character.secondary }}>
                            Don't miss events and exhibitions, the university interviews and visits.
                        </Title>
                    </div>

                    {/* กล่องขวา: Button */}
                    <div style={{ flexShrink: 0, width: "auto" }}>
                        <Button type="primary" size="large" block={isMobile}>
                            View all Fairs
                        </Button>
                    </div>
                </div>

                {/* 4. กล่อง Card Container */}
                <div 
                    ref={scrollContainerRef} 
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: CARD_GAP, // 👈 ใช้ CARD_GAP ที่ประกาศไว้
                        overflowX: "scroll", 
                        msOverflowStyle: 'none', 
                        scrollbarWidth: 'none',
                        paddingBottom: 20, 
                        marginBottom: 32, 
                    }}
                >
                    {/* CSS ซ่อน Scrollbar */}
                    <style global jsx>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>

                    {/* 5. 🔁 เรียกใช้ Card และกำหนด Style เฉพาะกิจ */}
                    {mockEvents.slice(0, 9).map(event => (
                        <div 
                            key={event.id}
                            style={{
                                width: CARD_WIDTH,          
                                minWidth: CARD_WIDTH,       
                                height: 392,         
                                flexShrink: 0,       
                            }}
                        >
                            <UniversityFairCard eventData={event} /> 
                        </div>
                    ))}
                </div>
                
                {/* 3. ส่วนควบคุมการเลื่อน (ลูกศร) - ด้านล่างซ้าย */}
                <div 
                    style={{ 
                        display: "flex", 
                        justifyContent: "flex-start", 
                        alignItems: "center",
                        gap: 24, 
                        paddingTop: 24, 
                    }}
                >
                    {/* Icon 1: Arrow Left */}
                    <div
                        onClick={() => scroll(-SCROLL_AMOUNT)} // 👈 ใช้ SCROLL_AMOUNT ใหม่
                        style={{
                            width: 56, height: 56, borderRadius: 28, border: `1px solid ${colors.neutral[5]}`, 
                            display: "flex", justifyContent: "center", alignItems: "center",
                            cursor: "pointer", transition: 'all 0.3s', backgroundColor: colors.neutral[0], 
                        }}
                    >
                        <ArrowLeftOutlined style={{ fontSize: 24, color: colors.neutral[7] }} />
                    </div>

                    {/* Icon 2: Arrow Right */}
                    <div
                        onClick={() => scroll(SCROLL_AMOUNT)} // 👈 ใช้ SCROLL_AMOUNT ใหม่
                        style={{
                            width: 56, height: 56, borderRadius: 28, border: `1px solid ${colors.neutral[5]}`, 
                            display: "flex", justifyContent: "center", alignItems: "center",
                            cursor: "pointer", transition: 'all 0.3s',
                            backgroundColor: colors.neutral[0], 
                        }}
                    >
                        <ArrowRightOutlined style={{ fontSize: 24, color: colors.neutral[7] }} />
                    </div>
                </div>

            </div>
        </Layout>
    );
}