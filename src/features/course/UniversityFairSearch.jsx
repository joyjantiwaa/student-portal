import React, { useState, useEffect } from "react";
import { Layout, Input, Typography, Select, message, Button, DatePicker } from "antd";
import Sidebar from "@/features/components/Sidebar";
import MenuBar from "@/features/components/MenuBar";
import AppFooter from "@/features/components/Footer";
import UniversityFairCard from "@/features/components/UniversityFairCard";
import CustomPagination1 from "@/features/components/Pagination1";
import colors from "@/features/designsystem/colors";
import { SearchOutlined } from "@ant-design/icons";
import empty from "@/assets/images/empty-img-gray.png";
import event1 from "@/assets/images/event1-min.jpg";
import event2 from "@/assets/images/event2-min.jpg";
import event3 from "@/assets/images/event3-min.jpg";
import event4 from "@/assets/images/event4-min.jpg";
import event5 from "@/assets/images/event5-min.jpg";
import event6 from "@/assets/images/event6-min.jpg";
import event7 from "@/assets/images/event7-min.jpg";
import event8 from "@/assets/images/event8-min.jpg";
import event9 from "@/assets/images/event9-min.jpg";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import "@/App.css";


// 🚀 UniversityFairBottom
import UniversityFairBottom from "@/features/components/UniversityFairBottom";


const { Title } = Typography;
const { Option, OptGroup } = Select;


export default function UniversityFairSearch() {
  const [screenSize, setScreenSize] = useState("desktop");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [compareList, setCompareList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();


  // 🧩 Responsive
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
  const isTablet = screenSize === "tablet";


  // 🧠 Mock Data
  const allUniversities = [
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


  const filteredUniversities = (() => {
    const isSearchTermEmpty = searchTerm.trim() === "";
    const isLocationEmpty = !selectedLocation;
    const isDateEmpty = !selectedDate; 

    // อนุญาตให้แสดงผลลัพธ์ทั้งหมดในสถานะเริ่มต้น (เมื่อทุก field ว่าง)
    // โดยปล่อยให้ filter ทำงาน
    // (หากทุก field ว่าง ทั้ง textMatch, locationMatch, dateMatch จะเป็น true)

    return allUniversities.filter((u) => {
        const q = searchTerm.toLowerCase().trim();
        
        // 1. ตรวจสอบ Match ของ Search Term
        const textMatch =
            u.name.toLowerCase().includes(q) ||
            u.location.toLowerCase().includes(q) ||
            u.description.toLowerCase().includes(q) ||
            u.date.includes(q) ||
            (Array.isArray(u.universities) &&
             u.universities.some((uni) => uni.toLowerCase().includes(q)));
             
        // 2. ตรวจสอบ Location ที่เลือก
        const locationMatch = isLocationEmpty || 
            (u.location && u.location.toLowerCase().includes(selectedLocation.toLowerCase()));

        
        // 🔑 3. LOGIC การกรองวันที่ (แก้ไขเพื่อ Exact Match)
        let dateMatch = isDateEmpty; // ถ้า DatePicker ว่าง ให้ถือว่า Match (true)

        if (!isDateEmpty) {
            dateMatch = false; // ถ้ามีการเลือกวันที่ ให้ตั้งค่าเริ่มต้นเป็น false 

            try {
                // 1. แปลงวันที่ที่เลือก (Moment/Day.js) เป็น JS Date 
                const filterDate = selectedDate.toDate(); 
                filterDate.setUTCHours(0, 0, 0, 0); // กำหนดเป็นเที่ยงคืน UTC
                
                // 2. แปลงวันที่ของคอร์ส (String "YYYY-MM-DD") เป็น Date Object
                const fairDate = new Date(u.date);
                fairDate.setUTCHours(0, 0, 0, 0); // กำหนดเป็นเที่ยงคืน UTC

                // 🌟 การแก้ไข: ใช้ === เพื่อให้ตรงกันพอดี
                if (fairDate.getTime() === filterDate.getTime()) {
                     dateMatch = true; 
                }
                
            } catch (e) {
                console.error("Date filtering error:", e, "for fair:", u.id);
                dateMatch = false; 
            }
        }
        
        // ผลลัพธ์ต้องผ่านทั้ง 3 เงื่อนไข
        return textMatch && locationMatch && dateMatch;
    });
})();


  const normalUniversities = filteredUniversities;


  const pagedUniversities = normalUniversities.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );


  const handleAddCompare = (uni) => {
    setCompareList((prev) => {
      if (prev.some((u) => u.id === uni.id)) {
        message.info(`${uni.name} removed from Compare.`);
        return prev.filter((u) => u.id !== uni.id);
      } else {
        message.success(`${uni.name} added to Compare.`);
        return [...prev, uni];
      }
    });
  };


  return (
    <Layout style={{ minHeight: "100vh", position: "relative" }}>
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
          marginLeft: isMobile ? 0 : 47,
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <MenuBar isMobile={isMobile} />


        {/* Header */}
        <div
          style={{
            background: colors.neutral[1],
            padding: isMobile ? "16px" : "24px 48px",
          }}
        >
          <Title
            level={4}
            style={{ color: colors.character.primary, marginBottom: 12 }}
          >
            University Fairs
          </Title>


          {/* Search Row */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Input.Group compact style={{ width: "100%", maxWidth: 800 }}> {/* ปรับ maxWidth ให้กว้างขึ้นเพื่อรองรับ 3 fields */}
              <Input
                placeholder="University, Event Name, or Description"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                style={{
                  width: "32%", // 🔑 ปรับความกว้าง
                  borderRight: "none",
                }}
              />

              <Select
                placeholder="Location"
                allowClear
                style={{ width: "32%" }} // 🔑 ปรับความกว้าง
                onChange={(value) => {
                  setSelectedLocation(value);
                  setCurrentPage(1);
                }}
              >
                <OptGroup label="🇬🇧 United Kingdom">
                  <Option value="London">London</Option>
                  <Option value="Manchester">Manchester</Option>
                  <Option value="Oxford">Oxford</Option>
                </OptGroup>
                <OptGroup label="🇺🇸 United States">
                  <Option value="Boston">Boston</Option>
                  <Option value="New York">New York</Option>
                  <Option value="Los Angeles">Los Angeles</Option>
                </OptGroup>
                <OptGroup label="🇨🇦 Canada">
                  <Option value="Toronto">Toronto</Option>
                  <Option value="Vancouver">Vancouver</Option>
                  <Option value="Montreal">Montreal</Option>
                </OptGroup>
              </Select>


              {/* ✅ NEW: DatePicker Field */}
              <DatePicker
                placeholder="Start Date Onwards"
                allowClear
                style={{ width: "32%" }} // 🔑 ปรับความกว้าง
                onChange={(date) => {
                  // date คือ Moment/Day.js Object หรือ null เมื่อกด clear
                  setSelectedDate(date);
                  setCurrentPage(1);
                }}
                format="MMM DD, YYYY"
              />

              <Button
                type="primary"
                icon={<SearchOutlined />}
                style={{ width: "4%" }} // 🔑 ปรับความกว้าง
                onClick={() => console.log("Search clicked:", { university: searchTerm })}
              />
            </Input.Group>
          </div>
        </div>


        {/* Main Content */}
        <div
          style={{
            background: colors.neutral[1],
            padding: isMobile ? "24px 0px" : "32px 48px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : isTablet
                  ? "repeat(2, 1fr)"
                  : "repeat(3, 1fr)",
                gap: 24,
              }}
            >
              {normalUniversities.length === 0 ? (
                <div
                  style={{
                    gridColumn: "1 / -1",
                    color: colors.neutral[5],
                    height: "50vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <img src={empty} alt="Empty" style={{ width: 105 }} />
                  <div style={{ fontSize: 16 }}>
                    {/* แยกข้อความสำหรับสถานะเริ่มต้น vs ไม่พบผลลัพธ์ */}
                    {searchTerm.trim() === "" && !selectedLocation
                        ? "Start searching for university fairs to see results here."
                        : "No university fairs found matching your criteria."}
                  </div>
                </div>
              ) : (
                pagedUniversities.map((uni) => (
                  <div
                      key={uni.id}
                      onClick={() => {
                          navigate(`/fair/${uni.id}`); 
                      }}
                      style={{ cursor: 'pointer' }} 
                  >
                  <UniversityFairCard
                      eventData={uni}
                  />
                  </div>
                ))
              )}
            </div>


            {/* Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 8,
                gap: 12,
              }}
            >
              <CustomPagination1
                totalCourses={normalUniversities.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onChange={setCurrentPage}
                onPageSizeChange={(value) => {
                  setPageSize(value);
                  setCurrentPage(1);
                }}
                isMobile={isMobile}
                pageSizeOptions={[12, 24, 36, 48]}
              />
            </div>
          </div>
        </div>
        <UniversityFairBottom />
        <AppFooter />
      </Layout>
    </Layout>
  );
}
