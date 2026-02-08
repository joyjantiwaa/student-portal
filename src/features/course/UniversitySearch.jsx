import React, { useState, useEffect } from "react";
import { Layout, Input, Typography, Select, message, Button } from "antd";
import Sidebar from "@/features/components/Sidebar";
import MenuBar from "@/features/components/MenuBar";
import AppFooter from "@/features/components/Footer";
import UniversityCard from "@/features/components/UniversityCard";
import CustomPagination1 from "@/features/components/Pagination1";
import UniversitySponsorCard from "@/features/components/UniversitySponsorCard";
import colors from "@/features/designsystem/colors";
import { SearchOutlined } from "@ant-design/icons";
import empty from "@/assets/images/empty-img-gray.png";
import { Link } from "react-router-dom";
import lego1 from "@/assets/images/lego1.jpg";
import lego2 from "@/assets/images/lego2.jpg";
import lego3 from "@/assets/images/lego3.jpg";
import lego4 from "@/assets/images/lego4.jpg";
import lego5 from "@/assets/images/lego5.jpg";
import lego6 from "@/assets/images/lego6.jpg";
import lego7 from "@/assets/images/lego7.jpg";
import lego8 from "@/assets/images/lego8.jpg";
import lego9 from "@/assets/images/lego9.jpg";
import lego10 from "@/assets/images/lego10.jpg";
import lego11 from "@/assets/images/lego11.jpg";
import lego12 from "@/assets/images/lego12.jpg";
import UniImg1 from "@/assets/images/UniImg1-min.jpg";
import UniImg2 from "@/assets/images/UniImg2-min.jpg";
import UniImg3 from "@/assets/images/UniImg3-min.jpg";
import UniImg4 from "@/assets/images/UniImg4-min.jpg";
import UniImg5 from "@/assets/images/UniImg5-min.jpg";
import UniImg6 from "@/assets/images/UniImg6-min.jpg";
import UniImg7 from "@/assets/images/UniImg7-min.jpg";
import UniImg8 from "@/assets/images/UniImg8-min.jpg";
import UniImg9 from "@/assets/images/UniImg9-min.jpg";
import UniImg10 from "@/assets/images/UniImg10-min.jpg";
import UniImg11 from "@/assets/images/UniImg11-min.jpg";
import UniImg12 from "@/assets/images/UniImg12-min.jpg";
import "antd/dist/antd.css";
import "@/App.css";

const { Title } = Typography;
const { Option, OptGroup } = Select;

export default function UniversitySearch() {
  const [screenSize, setScreenSize] = useState("desktop");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [compareList, setCompareList] = useState([]);
  const [hasSearched, setHasSearched] = useState(false)

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


  // 🧠 Mock Universities (เอาไว้ตรงนี้เลย)
  const allUniversities = [
    {
      id: 1,
      name: "University of Melbourne",
      location: "Melbourne, Australia",
      rank: "QS 14",
      type: "Public",
      hasScholarship: true,
      famousCourses:
        "Business Analytics, Computer Science, Finance, Data Science, Medicine, Architecture",
      coverImg: UniImg1,
      logo: lego1,
    },
    {
      id: 2,
      name: "Monash University",
      location: "Clayton, Australia",
      rank: "QS 42",
      type: "Public",
      hasScholarship: true,
      famousCourses:
        "Pharmacy, Chemical Engineering, Nursing, Information Technology, Psychology",
      coverImg: UniImg2,
      logo: lego2,
    },
    {
      id: 3,
      name: "RMIT University",
      location: "Melbourne CBD, Australia",
      rank: "QS 123",
      type: "Public",
      hasScholarship: false,
      famousCourses:
        "Design, Fashion, Architecture, Media Production, UX/UI, Engineering Technology",
      coverImg: UniImg3,
      logo: lego3,
    },
    {
      id: 4,
      name: "Deakin University",
      location: "Geelong & Melbourne, Australia",
      rank: "QS 233",
      type: "Public",
      hasScholarship: true,
      famousCourses:
        "Sport Science, Education, Cyber Security, Nutrition, Nursing",
      coverImg: UniImg4,
      logo: lego4,
    },
    {
      id: 5,
      name: "Swinburne University of Technology",
      location: "Hawthorn, Australia",
      rank: "QS 285",
      type: "Public",
      hasScholarship: false,
      famousCourses:
        "Aviation, Engineering Technology, IT, Business Innovation, Games Development",
      coverImg: UniImg5,
      logo: lego5,
    },
    {
      id: 6,
      name: "Torrens University Australia",
      location: "Sydney & Melbourne",
      rank: "QS 11",
      type: "Private",
      hasScholarship: true,
      famousCourses:
        "Design, Hospitality Management, Business, Health Science, UX/UI, Digital Media",
      coverImg: UniImg6,
      logo: lego6,
    },
    {
      id: 7,
      name: "Bond University",
      location: "Gold Coast, Australia",
      rank: "QS 426",
      type: "Private",
      hasScholarship: true,
      famousCourses:
        "Law, Business, Medicine, Biomedical Science, Architecture",
      coverImg: UniImg7,
      logo: lego7,
    },
    {
      id: 8,
      name: "La Trobe University",
      location: "Melbourne, Australia",
      rank: "QS 316",
      type: "Public",
      hasScholarship: false,
      famousCourses:
        "Biomedicine, Health Science, Journalism, Computer Science, Social Work",
      coverImg: UniImg8,
      logo: lego8,
    },
    {
      id: 9,
      name: "La Trobe University",
      location: "Melbourne, Australia",
      rank: "QS 316",
      type: "Public",
      hasScholarship: false,
      famousCourses:
        "Biomedicine, Health Science, Journalism, Computer Science, Social Work",
      coverImg: UniImg9,
      logo: lego9,
    },
    {
      id: 10,
      name: "La Trobe University",
      location: "Melbourne, Australia",
      rank: "QS 316",
      type: "Public",
      hasScholarship: false,
      famousCourses:
        "Biomedicine, Health Science, Journalism, Computer Science, Social Work",
      coverImg: UniImg10,
      logo: lego10,
    },
    {
      id: 11,
      name: "La Trobe University",
      location: "Melbourne, Australia",
      rank: "QS 316",
      type: "Public",
      hasScholarship: false,
      famousCourses:
        "Biomedicine, Health Science, Journalism, Computer Science, Social Work",
      coverImg: UniImg11,
      logo: lego11,
    },
    {
      id: 12,
      name: "La Trobe University",
      location: "Melbourne, Australia",
      rank: "QS 316",
      type: "Public",
      hasScholarship: false,
      famousCourses:
        "Biomedicine, Health Science, Journalism, Computer Science, Social Work",
      coverImg: UniImg12,
      logo: lego12,
    },
  ];

const filteredUniversities = (() => {
    // 🔍 1. ถ้ายังไม่เคยค้นหามาก่อน (โหลดหน้าครั้งแรก) ให้คืนค่า []
    if (!hasSearched && searchTerm.trim() === "" && !selectedLocation) {
        return [];
    }
    
    // 💡 2. ถ้ามีการค้นหา หรือกดปุ่มค้นหาไปแล้ว
    // และช่องค้นหาว่างเปล่า (แต่ hasSearched เป็น true) ให้แสดงทั้งหมด
    if (hasSearched && searchTerm.trim() === "" && !selectedLocation) {
        return allUniversities; // ✅ เงื่อนไขแสดงทั้งหมดเมื่อกด Search ว่างเปล่า
    }

    // 💡 3. ถ้ามีการป้อนค่าใดค่าหนึ่ง (หรือกด Search แล้วมีค่า) ให้ทำการ Filter
    return allUniversities.filter((u) => {
        // 1. เงื่อนไขการค้นหาด้วยชื่อ
        const nameMatch = 
            searchTerm.trim() === "" || 
            u.name.toLowerCase().startsWith(searchTerm.toLowerCase());

        // 2. เงื่อนไขการค้นหาด้วย Location 
        const locationMatch = 
            !selectedLocation || 
            (u.location && selectedLocation && u.location.toLowerCase().includes(selectedLocation.toLowerCase()));

        return nameMatch && locationMatch; 
    });
  })();
  // ✨ 3 อันแรกเป็นสปอนเซอร์
  const sponsorUniversities = filteredUniversities.slice(0, 3);
  const normalUniversities = filteredUniversities.slice(3);

  const pagedUniversities = normalUniversities.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // ✅ Add / Remove Compare
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
            Search University
          </Title>

          {/* Search Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Input.Group compact style={{ width: "100%", maxWidth: 776 }}>
              <Input
                placeholder="University"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // ✅ เพิ่ม: รีเซ็ตหน้าเมื่อมีการพิมพ์
                  setHasSearched(false);
                }}
                style={{
                  width: "45%",
                  borderRight: "none",
                }}
              />

              <Select
                placeholder="Location"
                allowClear
                style={{ width: "45%" }}
                // ✅ แก้ไข: เมื่อ Location เปลี่ยน ให้เก็บค่าและรีเซ็ตหน้า
                onChange={(value) => {
                  setSelectedLocation(value); 
                  setCurrentPage(1);
                  setHasSearched(false);
                }}
              >
                <OptGroup label="🇦🇺 Australia"> // ✅ เพิ่ม/ตรวจสอบตัวเลือกที่ตรงกับ Mock Data
                <Option value="Melbourne">Melbourne</Option>
                <Option value="Sydney">Sydney</Option>
                <Option value="Gold Coast">Gold Coast</Option>
                <Option value="Clayton">Clayton</Option>
                <Option value="Geelong">Geelong</Option>
                <Option value="Hawthorn">Hawthorn</Option>
                </OptGroup>
              </Select>

              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={() => {
                  setCurrentPage(1); // กด Search → รีเซ็ตหน้าแรก
                  setHasSearched(true);
                }}
              />
            </Input.Group>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            background: colors.conditional.pageBackground,
            padding: isMobile ? "24px 0px" : "32px 48px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filteredUniversities.length === 0 ? (
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
                <div style={{ fontSize: 16 }}>No universities found.</div>
              </div>
            ) : (
              <>
                {/* 🏆 Sponsor Section */}
                {sponsorUniversities.length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile
                        ? "1fr"
                        : isTablet
                        ? "repeat(2, 1fr)"
                        : "repeat(3, 1fr)",
                      gap: 24,
                      marginBottom: 24,
                    }}
                  >
                    {sponsorUniversities.map((uni) => (
                      <Link
                        key={uni.id}
                        to={`/university/${uni.id}`}
                        style={{ textDecoration: "none" }}
                      >
                      <UniversitySponsorCard key={uni.id} university={uni} />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Normal University Grid */}
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
                  {pagedUniversities.map((uni) => (
                    <Link
                      key={uni.id}
                      to={`/university/${uni.id}`}
                      style={{ textDecoration: "none" }}
                    >
                    <UniversityCard
                      key={uni.id}
                      university={uni}
                      onAddCompare={handleAddCompare}
                      isCompared={compareList.some((u) => u.id === uni.id)}
                    />
                    </Link>
                  ))}
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
                    onPageSizeChange={(v) => {
                      setPageSize(v);
                      setCurrentPage(1);
                    }}
                    isMobile={isMobile}
                    pageSizeOptions={[12, 24, 36, 48]}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <AppFooter />
      </Layout>
    </Layout>
  );
}
