// src/features/pages/CourseSearch.jsx
import React, { useState, useEffect } from "react";
import { Layout, Input, Tabs, Typography, Select, Badge, message, Button, Modal } from "antd";
import Sidebar from "@/features/components/Sidebar";
import MenuBar from "@/features/components/MenuBar";
import AppFooter from "@/features/components/Footer";
import CourseFilter from "@/features/components/CourseFilter";
import CourseCard from "@/features/components/CourseCard";
import CustomPagination from "@/features/components/Pagination";
import CourseCompare from "@/features/components/CourseCompare";
import { useShortlist } from '@/features/contexts/ShortlistContext';
import colors from "@/features/designsystem/colors";
import courseCover1 from "@/assets/images/course1.jpg";
import courseCover2 from "@/assets/images/course2.jpg";
import courseCover3 from "@/assets/images/course3.jpg";
import courseCover4 from "@/assets/images/course4.jpg";
import courseCover5 from "@/assets/images/course5.jpg";
import courseCover6 from "@/assets/images/course6.jpg";
import courseCover7 from "@/assets/images/course7.jpg";
import courseCover8 from "@/assets/images/course8.jpg";
import courseCover9 from "@/assets/images/course9.jpg";
import courseCover10 from "@/assets/images/course10.jpg";
import uniLogo1 from "@/assets/images/uniLogo1.jpg";
import uniLogo2 from "@/assets/images/uniLogo2.jpg";
import uniLogo3 from "@/assets/images/uniLogo3.jpg";
import uniLogo4 from "@/assets/images/uniLogo4.jpg";
import uniLogo5 from "@/assets/images/uniLogo5.jpg";
import uniLogo6 from "@/assets/images/uniLogo6.jpg";
import uniLogo7 from "@/assets/images/uniLogo7.jpg";
import uniLogo8 from "@/assets/images/uniLogo8.jpg";
import uniLogo9 from "@/assets/images/uniLogo9.jpg";
import uniLogo10 from "@/assets/images/uniLogo10.jpg";
import Logo1 from "@/assets/images/Logo1.jpg";
import Logo2 from "@/assets/images/Logo2.jpg";
import Logo3 from "@/assets/images/Logo3.jpg";
import Logo4 from "@/assets/images/Logo4.jpg";
import Logo5 from "@/assets/images/Logo5.jpg";
import Logo6 from "@/assets/images/Logo6.jpg";
import Logo7 from "@/assets/images/Logo7.jpg";
import Logo8 from "@/assets/images/Logo8.jpg";
import Logo9 from "@/assets/images/Logo9.jpg";
import Logo10 from "@/assets/images/Logo10.jpg";
import empty from "@/assets/images/empty-img-gray.png";
import "antd/dist/antd.css";
import '@/App.css';

const COURSE_COVERS = [
    courseCover1, courseCover2, courseCover3, courseCover4, 
    courseCover5, courseCover6, courseCover7, courseCover8, 
    courseCover9, courseCover10
];


const UNIVERSITY_LOGOS = [
    uniLogo1, uniLogo2, uniLogo3, uniLogo4, uniLogo5, uniLogo6, 
    uniLogo7, uniLogo8, uniLogo9, uniLogo10
];

const LOGOS = [
    Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, 
    Logo7, Logo8, Logo9, Logo10
]; 

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

export default function CourseSearch() {
    const [screenSize, setScreenSize] = useState("desktop");
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [compareList, setCompareList] = useState([]);
    const [activeTab, setActiveTab] = useState("1");
    const [pageSize, setPageSize] = useState(10);
    const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    // ⭐ เพิ่ม State สำหรับ Filter และ Sort
    const [currentFilters, setCurrentFilters] = useState({
        level: [], // e.g., ['Master Degree', 'Bachelor Degree']
        tuition: [0, 5000], // e.g., [1000, 3000]
        scholarship: false,
        startDate: null,
    });
    const [sortOrder, setSortOrder] = useState('rank_asc'); // 'rank_asc', 'a-z', 'university_courses'

    const { shortlist, toggleShortlist } = useShortlist();

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
    const isDesktop = screenSize === "desktop";

    const getShortlistedCourse = (id) => shortlist.find(c => c.id === id);
    // --- 🌟 MOCK DATA 12 รายการ ที่มีการปรับปรุง ---
    const allCourses = [
        {
            id: 1,
            title: "Accounting",
            level: "Master's Degree",
            tuition: "$1,800 / semester",
            intake: "2026-09-01",
            entry: "A lower to upper second class honors degree, or international equivalent IELTS: Overall score of 7.0 with minimum 6.0 in each element",
            rank: "4",
            faculty: "Engineering",
            ieltsWaiver: "80% in 12th English. MOI also accepted on case-to-case basis.",
            university: "London Business School", 
            location: "London, United Kingdom",
            coverImage: COURSE_COVERS[0],
            universityLogo: UNIVERSITY_LOGOS[0],
            logo: LOGOS[0],
            hasScholarship: true, // หรือ false
            applicationStatus: "Not Applied", // สถานะเริ่มต้น
        },
        {
            id: 2,
            title: "Accounting and Finance",
            level: "Bachelor's Degree",
            tuition: "$1,500 / semester",
            intake: "2026-07-01",
            entry: "A minimum lower second class Honours degree, or equivalent. 90 IELTS: 6.5 (with at least 6.0 in all skills)",
            rank: "3",
            faculty: "Business",
            ieltsWaiver: "Accepted boards: Andhra Pradesh, Central Board Secondary Education, CISCE, Maharashtra and Tamil Nadu 65% (course requiring IELTS 6.0 overall), 70% (Course requiring IELTS 6.5 overall). 80% (Course requiring IELTS 7.0 overall)",
            university: "Imperial College London", 
            location: "London, United Kingdom",
            coverImage: COURSE_COVERS[1],
            universityLogo: UNIVERSITY_LOGOS[1],
            logo: LOGOS[1],
            hasScholarship: true, // หรือ false
            applicationStatus: "Not Applied", // สถานะเริ่มต้น
        },
        {
            id: 3,
            title: "Accounting",
            level: "Bachelor's Degree",
            tuition: "$1,200 / semester",
            intake: "2026-04-01",
            entry: "3 years Bachelor’s degree from an accredited university with a minimum overall average of 60% IELTS: 6:0 overall and minimum of 5.5 in each component",
            rank: "2",
            faculty: "Arts",
            ieltsWaiver: "-",
            university: "University College London (UCL)", 
            location: "London, United Kingdom",
            coverImage: COURSE_COVERS[2],
            universityLogo: UNIVERSITY_LOGOS[2],
            logo: LOGOS[2],
            hasScholarship: true, // หรือ false
            applicationStatus: "Not Applied", // สถานะเริ่มต้น
        },
        {
            id: 4,
            title: "Accounting and Finance",
            level: "Bachelor's and Master's",
            tuition: "$2,000 / semester",
            intake: "2026-05-01",
            entry: "A lower to upper second class honours degree, or international equivalent IELTS: Overall score of 7.0 minimum 6.0 in each element",
            rank: "1",
            faculty: "Engineering",
            ieltsWaiver: "-",
            university: "University of Oxford", 
            location: "Oxford, United Kingdom",
            coverImage: COURSE_COVERS[3],
            universityLogo: UNIVERSITY_LOGOS[3],
            logo: LOGOS[3],
            hasScholarship: true, // หรือ false
            applicationStatus: "Not Applied", // สถานะเริ่มต้น
        },
        {
            id: 5,
            title: "Accounting",
            level: "Master's Degree",
            tuition: "$1,450 / semester",
            intake: "Mar / Oct",
            entry: "A lower to upper second class honours degree, or international equivalent IELTS: Overall score of 7.0 with minimum 6.0 in each element",
            rank: "6",
            faculty: "Business",
            ieltsWaiver: "IELTS waiver for 12th English score of 60% and above in Central, Maharashtra, Kerala, Tamil, Nadu, Andhra Pradesh and Uttrarakhand",
            university: "University of Cambridge", 
            location: "Cambridge, United Kingdom",
            coverImage: COURSE_COVERS[4],
            universityLogo: UNIVERSITY_LOGOS[4],
            logo: LOGOS[4],
            hasScholarship: true, // หรือ false
            applicationStatus: "Not Applied", // สถานะเริ่มต้น
        },
        {
            id: 6,
            title: "Accounting and Finance ",
            level: "Bachelor's and Master's",
            tuition: "$1,000 / semester",
            intake: "2026-06-01",
            entry: "High School Diploma",
            rank: "8",
            faculty: "Arts",
            ieltsWaiver: "80% in 12th English. MOI also accepted on case-to-case basis.",
            university: "London School of Economics and Political Science (LSE)", 
            location: "London, United Kingdom",
            coverImage: COURSE_COVERS[5],
            universityLogo: UNIVERSITY_LOGOS[5],
            logo: LOGOS[5],
            hasScholarship: true, // หรือ false
            applicationStatus: "Not Applied", // สถานะเริ่มต้น
        },
        {
            id: 7,
            title: "Accounting and Finance",
            level: "Bachelor's and Master's",
            tuition: "$1,950 / semester",
            intake: "2026-09-01",
            entry: "Master's Degree",
            rank: "7",
            faculty: "Engineering",
            ieltsWaiver: "Accepted boards: Andhra Pradesh, Central Board Secondary Education, CISCE, Maharashtra and Tamil Nadu.65% (course requiring IELTS 6.0 overall), 70% (Course requiring IELTS 6.5 overall). 80% (Course requiring IELTS 7.0 overall)",
            university: "University of Manchester", 
            location: "Manchester, Uniteed Kingdom",
            coverImage: COURSE_COVERS[6],
            universityLogo: UNIVERSITY_LOGOS[6],
            logo: LOGOS[6],
            hasScholarship: true, // หรือ false
            applicationStatus: "Not Applied", // สถานะเริ่มต้น
        },
        {
            id: 8,
            title: "Accounting and Finance ",
            level: "Associate Degree",
            tuition: "$1,600 / semester",
            intake: "2026-07-01",
            entry: "Bachelor's Degree",
            rank: "9",
            faculty: "Business",
            ieltsWaiver: "Not Available",
            university: "University of Bristol", 
            location: "Bristol, United Kingdom",
            coverImage: COURSE_COVERS[7],
            universityLogo: UNIVERSITY_LOGOS[7],
            logo: LOGOS[7],
            hasScholarship: true, // หรือ false
            applicationStatus: "Not Applied", // สถานะเริ่มต้น
        },
        {
            id: 9,
            title: "Accounting and Finance ",
            level: "Doctoral Degree",
            tuition: "$1,100 / semester",
            intake: "2026-10-01",
            entry: "High School Diploma",
            rank: "10",
            faculty: "Arts",
            ieltsWaiver: "Conditional",
            university: "University of Warwick", 
            location: "Coventry, United Kingdom",
            coverImage: COURSE_COVERS[8],
            universityLogo: UNIVERSITY_LOGOS[8],
            logo: LOGOS[8],
            hasScholarship: true, // หรือ false
            applicationStatus: "Not Applied", // สถานะเริ่มต้น
        },
        {
            id: 10,
            title: "Accounting and Finance ",
            level: "Bachelor's and Master's",
            tuition: "$2,100 / semester",
            intake: "2026-11-01",
            entry: "Master's Degree",
            rank: "5",
            faculty: "Engineering",
            ieltsWaiver: "IELTS waiver for 12th English score of 60% and above in Central, Maharashtra, Kerala, Tamil, Nadu, Andhra Pradesh and Uttrarakhand",
            university: "University of Edinburgh", 
            location: "Edinburgh, United Kingdom",
            coverImage: COURSE_COVERS[9],
            universityLogo: UNIVERSITY_LOGOS[9],
            logo: LOGOS[9],
            hasScholarship: true, // หรือ false
            applicationStatus: "Not Applied", // สถานะเริ่มต้น
        },
    ];
    // --- 🌟 สิ้นสุด Mock Data ---
     
    // 1. ⚙️ Handler สำหรับการเปลี่ยนค่า Filter (ส่งลงไปที่ CourseFilter)
    const handleFilterChange = (newFilters) => {
        setCurrentFilters(newFilters);
        setCurrentPage(1); // รีเซ็ตหน้าเมื่อมีการเปลี่ยน Filter
    };

    // 2. ⚙️ Handler สำหรับการเปลี่ยนค่า Sort (ส่งลงไปที่ Select)
    const handleSortChange = (value) => {
        setSortOrder(value);
        setCurrentPage(1); // รีเซ็ตหน้าเมื่อมีการเปลี่ยน Sort
    };


    // 3. ⚙️ Logic การกรองและการเรียงลำดับ
    const applyFiltersAndSort = () => {
        let result = [...allCourses]; // ใช้ข้อมูลคอร์สทั้งหมดเป็นจุดเริ่มต้น

        // A. 🔎 APPLY SEARCH TERM
        if (searchTerm) {
            result = result.filter(course =>
                course.title.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
        }
        
        // B. 🔎 APPLY FILTERS (จาก currentFilters)
        // 🚨 แก้ไข: เพิ่ม startDate เข้ามาใน Destructuring เพื่อให้ Logic กรองวันที่ทำงาน
        const { level, tuition, scholarship, startDate } = currentFilters;

        result = result.filter(course => {
            const isLevelMatch = level.includes(course.level);

            // 🌟 Logic เพิ่มเติม: ตรวจสอบว่าคอร์สนี้เป็นคู่ แต่ Filter Array มีชื่อคู่ที่ต่างกัน
            const isComboCourse = course.level === "Bachelor's and Master's" || course.level === "Master's and Bachelor's";
            
            // หากมีการเลือก Master/Bachelor และคอร์สปัจจุบันคือคอร์สคู่ที่ชื่อต่างกัน ให้ถือว่า Match
            if (isComboCourse && 
                (level.includes("Master's Degree") || level.includes("Bachelor's Degree")) && 
                !isLevelMatch) {
                
                return true; 
            }

            if (level.length > 0 && !isLevelMatch) {
                return false;
            }

            // กรอง Tuition (ต้องแปลง tuition string ให้เป็นตัวเลขเพื่อเปรียบเทียบ)
            // เช่น "$1,800 / semester" -> 1800. สมมติว่า tuition มีแต่ตัวเลขแรกที่สำคัญ
            const tuitionMatch = course.tuition.match(/[\d,.]+/);
            const courseTuition = tuitionMatch ? parseFloat(tuitionMatch[0].replace(/,/g, '')) : 0;

            if (courseTuition < tuition[0] || courseTuition > tuition[1]) {
                return false;
            }

            // กรอง Scholarship
            if (scholarship && !course.hasScholarship) {
                return false;
            }

            // ⭐ NEW: Logic การกรองตามวันที่เริ่มเรียน (Intake Date)
            if (startDate) {
                try {
                    // 1. แปลงวันที่ที่เลือก (Moment Object) เป็น JavaScript Date Object
                    // Ant Design DatePicker ส่ง Moment Object, เราใช้ .toDate() เพื่อดึง Date Object
                    const selectedDate = startDate.toDate(); 

                    // 2. แปลงวันที่ของคอร์ส (String "YYYY-MM-DD") เป็น Date Object
                    const courseDate = new Date(course.intake);
                    
                    // เพื่อให้การเปรียบเทียบเป็นไปตาม 'วัน' เท่านั้น ไม่ใช่เวลาที่แน่นอน
                    selectedDate.setHours(0, 0, 0, 0); 
                    courseDate.setHours(0, 0, 0, 0); 
                    
                    // กรอง: แสดงเฉพาะคอร์สที่มีวันเริ่มเรียน >= วันที่ที่ผู้ใช้เลือก
                    if (courseDate < selectedDate) {
                        return false;
                    }
                } catch (e) {
                    // หากการแปลงวันที่เกิดข้อผิดพลาด (เช่น intake format ไม่ถูกต้อง) ให้ Log และไม่กรอง
                    console.error("Date filtering error:", e, "for course:", course.id);
                    // ในกรณีนี้ เราอนุญาตให้คอร์สผ่านไป (return true)
                }
            }
            // ⭐ END: Logic การกรองตามวันที่

            return true;
        });

        // C. 📝 APPLY SORTING (จาก sortOrder)
        result.sort((a, b) => {
            switch (sortOrder) {
                case 'rank_asc':
                    // เรียงตาม Rank ตัวเลขน้อยไปมาก
                    return parseInt(a.rank) - parseInt(b.rank); 
                case 'a-z':
                    // เรียงตามชื่อคอร์ส A-Z
                    return a.title.localeCompare(b.title);
                case 'university_courses':
                    // เรียงตามชื่อมหาวิทยาลัย A-Z (เนื่องจากไม่มี 'Number of Courses' field)
                    return a.university.localeCompare(b.university);
                default:
                    return 0;
            }
        });

        return result;
    };

    // ⭐ เรียกใช้ฟังก์ชันเพื่อรับผลลัพธ์ที่กรองและเรียงแล้ว
    const finalFilteredCourses = applyFiltersAndSort();

    // เปลี่ยนชื่อตัวแปรนี้จาก filteredCourses เป็น finalFilteredCourses
    const pagedCourses = finalFilteredCourses.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handleAddCompare = (course) => {
        setCompareList(prev => {
            if (prev.some(c => c.id === course.id)) {
                message.info(`${course.title} removed from Compare.`);
                return prev.filter(c => c.id !== course.id);
            } else if (prev.length >= 4) {
                message.warning("You can only compare up to 4 courses.");
                return prev;
            } else {
                message.success(`${course.title} added to Compare.`);
                return [...prev, course];
            }
        });
    };

    const handleRemoveFromCompare = (id) => {
        setCompareList(prev => prev.filter(c => c.id !== id));
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
                        background: colors.primary[7] || "#096DD9",
                        zIndex: 3000,
                    }}
                >
                    <Sidebar mobileMode={false} />
                </div>
            )}

            <Layout
                style={{
                    marginLeft: isMobile ? 0 : 47,
                    transition: "0.3s",
                    width: "100%",
                    overflowX: "hidden",
                }}
            >
                <MenuBar isMobile={isMobile} />

                {/* Header */}
                <div style={{ background: colors.neutral[1], padding: isMobile ? "16px" : "0px 24px" }}>
                    <div style={{ maxWidth: "100%", margin: "0 auto", padding: isMobile ? "0px" : "24px 24px 0px 24px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <Title level={4} style={{ color: colors.character.primary, margin: 0 }}>Search Courses</Title>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Search
                                    placeholder="Accounting and Finance"
                                    allowClear
                                    onSearch={(v) => { setSearchTerm(v || ""); setCurrentPage(1); }}
                                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                    enterButton
                                    size="middle"
                                    style={{ width: "100%", maxWidth: 776 }}
                                />
                            </div>

                            <Tabs activeKey={activeTab} onChange={setActiveTab} size="middle" tabBarGutter={24}>
                                <TabPane tab="Courses" key="1" />
                                <TabPane
                                    tab={
                                        <span>
                                            Compare {compareList.length > 0 && <Badge count={compareList.length} style={{ backgroundColor: colors.character.danger, marginLeft: 6 }} />}
                                        </span>
                                    }
                                    key="2"
                                />
                            </Tabs>
                        </div>
                    </div>
                </div>

                {activeTab === "2" && (
                    <div
                        style={{
                            background: colors.neutral[1],
                            border: `1px solid ${colors.neutral[4]}`,
                            padding: isMobile ? "24px" : "24px 48px",
                            margin: "0",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 12,
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: isMobile ? 4 : 0 }}>
                            <Title level={5} style={{ color: colors.character.primary, margin: 0 }}>Course compare</Title>
                            <div style={{ fontSize: 14, color: colors.character.primary }}>To compare</div>
                        </div>
                        <Button type="primary" size="middle">Download all</Button>
                    </div>
                )}

                {/* Main Content */}
                <div style={{ background: colors.conditional.pageBackground, padding: isMobile ? "24px 0px" : "32px 48px" }}>
                    <div style={{
                        maxWidth: "100%",
                        margin: "0 auto",
                        display: "flex",
                        flexDirection: isDesktop ? "row" : "column",
                        gap: 24
                    }}>
                        {activeTab === "1" ? (
                            <>
                                {/* Sidebar Filter */}
                                <div style={{ flex: isDesktop ? "0 0 307px" : "0 0 100%", flexDirection: isDesktop ? "row" : "column" }}>
                                    <CourseFilter 
                                     // ⭐ Props ที่เพิ่ม
                                     currentFilters={currentFilters}
                                     onFilterChange={handleFilterChange}
                                     />
                                </div>

                                {/* Courses Grid */}
                                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16, order: isTablet || isMobile ? 2 : 0 }}>
                                    {/* Top bar */}
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        marginBottom: 12,
                                        padding: isMobile ? "0px 24px" : "0px",
                                        gap: 12,
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{ fontSize: 14, color: colors.character.primary }}>Sort result by</span>
                                            <Select 
                                         // ⭐ Props ที่เพิ่ม/แก้ไข
                                         value={sortOrder} 
                                         onChange={handleSortChange} 
                                         style={{ width: 180 }}
                                         >
                                         <Option value="rank_asc">Rank (Top First)</Option> {/* แก้ชื่อให้ชัดเจน */}
                                         <Option value="a-z">A-Z (Course Name)</Option>
                                         <Option value="university_courses">A-Z (University Name)</Option> {/* แก้ชื่อให้สอดคล้องกับ logic */}
                                         </Select>
                                        </div>
                                        <div style={{ fontSize: 14, display: "flex", alignItems: "center", gap: 4 }}>
                                            <span>Can't find your course?</span>
                                            <a
                                                onClick={() => setIsSubmitModalOpen(true)}
                                                style={{ color: colors.primary[6], fontWeight: 500, cursor: "pointer" }}
                                            >
                                                Click here to submit a course
                                            </a>
                                        </div>
                                    </div>

                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(300px, 1fr))",
                                        gap: "24px"
                                    }}>
                                        {searchTerm === "" ? (
                                            <div style={{ gridColumn: "1/-1", textAlign: "center", color: colors.character.secondary, padding: 40 }}>
                                                <img src={empty} alt="Empty Search Illustration" style={{ width: 105, marginBottom: 16 }} />
                                                <div style={{ fontSize: 16 }}>Start searching for courses to see results here.</div>
                                            </div>
                                        ) : finalFilteredCourses.length === 0 ? (
                                            <div style={{ gridColumn: "1/-1", textAlign: "center", color: colors.neutral[5], padding: 40 }}>
                                                No courses found for "{searchTerm}".
                                            </div>
                                        ) : (
                                                    pagedCourses.map(course => {

                                            // ⭐ 1. ดึงคอร์ส Shortlist ตัวเต็ม
                                            const shortlistedItem = getShortlistedCourse(course.id);
                                            
                                            // ⭐ 2. คำนวณสถานะ Applied
                                            const isAppliedStatus = shortlistedItem ? shortlistedItem.applied : false;

                                            const courseProfilePath = `/course-profile/${course.id}`;

                                            return (
                                                    <CourseCard
                                                        key={course.id}
                                                        course={course}
                                                        onAddCompare={handleAddCompare}
                                                        isCompared={compareList.some(c => c.id === course.id)}
                                                        isShortlisted={!!shortlistedItem} // 👈 ใช้ !! เพื่อแปลงเป็น boolean
                                                        isAppliedStatus={isAppliedStatus} // 👈 ส่งสถานะ Applied ที่คำนวณได้
                                                        onToggleShortlist={toggleShortlist}
                                                        allowShortlistRemove={true}
                                                    />
                                            );
                                        }) // สิ้นสุด map
                                        )}
                                    </div>

                                    {/* Pagination */}
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 8, gap: 12 }}>
                                        <CustomPagination
                                         totalCourses={finalFilteredCourses.length}
                                            currentPage={currentPage}
                                            pageSize={pageSize}
                                            onChange={setCurrentPage}
                                            onPageSizeChange={(value) => { setPageSize(value); setCurrentPage(1); }}
                                            isMobile={isMobile}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <CourseCompare compareList={compareList} onRemove={handleRemoveFromCompare} />
                        )}
                    </div>
                </div>
                <AppFooter />
                <Modal
                    title="Submit a Course / Degree / University"
                    open={isSubmitModalOpen}
                    onCancel={() => setIsSubmitModalOpen(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setIsSubmitModalOpen(false)}>
                            Cancel
                        </Button>,
                        <Button 
                        key="submit" 
                        type="primary" 
                        onClick={() => message.success("Thank you for submitting a new course. We will contact you soon.")}>
                        Submit
                        </Button>
                    ]}
                >
                    <p>Please provide the details of the course you want to submit.</p>

                    <Input placeholder="Course name" style={{ marginBottom: 12 }} />
                    <Input placeholder="University name" style={{ marginBottom: 12 }} />
                    <Input placeholder="Degree level (e.g., Bachelor, Master)" style={{ marginBottom: 12 }} />
                    <Input placeholder="Tuition fee" style={{ marginBottom: 12 }} />
                </Modal>
            </Layout>
        </Layout>
    );
}