// src/features/components/CourseCard.jsx

import React, { useState, useCallback, useEffect } from "react";
import { Tag, Modal, Button, message } from "antd";
import {
    HeartFilled,
    HeartOutlined,
    EnvironmentOutlined,
    ReadOutlined,
    CheckCircleFilled,
    TrophyOutlined,
    HeartTwoTone // เพิ่ม HeartTwoTone หรือใช้ HeartFilled (ถ้าใช้ HeartFilled ต้องกำหนดสีใหม่ใน getStatusProps)
} from "@ant-design/icons";
import colors from "@/features/designsystem/colors";
import uniLogo from "@/assets/images/university-logo.png";
import { useShortlist } from "@/features/contexts/ShortlistContext";
import "@/features/components/CourseCard.css";
import { Link } from 'react-router-dom';

const FloatingHeart = () => (
    <div className="floating-heart-container">
        <HeartFilled
            className="floating-heart-icon"
            style={{ color: colors.polarGreen[7] }}
        />
    </div>
);

const MAX_LENGTH = 30;
const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

// ⭐ Helper function สำหรับกำหนดสี/ไอคอนตามสถานะ (ต้องอยู่ก่อน CourseCard)
const getStatusProps = (status) => {
    // 🎨 การจับคู่สถานะกับสีตามที่คุณกำหนด
    const blueStatuses = ["Submitted", "In Review", "Awaiting Documents", "Interview Required"];
    const greenStatuses = ["Waitlisted", "Conditional Offer", "Unconditional Offer", "Offer Accepted", "Deposit Paid"];
    const redStatuses = ["Offer Declined"];

    let colorKey, icon = null; // 💡 กำหนดให้เป็น null ตั้งแต่แรก

    if (blueStatuses.includes(status)) {
        colorKey = "geekBlue";
        // icon = <ReadOutlined style={{ marginRight: 4 }} />; // ❌ ลบบรรทัดนี้
    } else if (greenStatuses.includes(status)) {
        colorKey = "polarGreen";
        // icon = <CheckCircleFilled style={{ marginRight: 4 }} />; // ❌ ลบบรรทัดนี้
    } else if (redStatuses.includes(status)) {
        colorKey = "red";
        // icon = <HeartFilled style={{ marginRight: 4 }} />; // ❌ ลบบรรทัดนี้
    } else {
        colorKey = "neutral";
        // icon = null; // ✅ ไม่ต้องทำอะไร
    }

    return {
        color: colors[colorKey] ? colors[colorKey][6] : colors.character.secondary,
        bgColor: colors[colorKey] ? colors[colorKey][1] : colors.neutral[3],
        borderColor: colors[colorKey] ? colors[colorKey][3] : colors.neutral[5],
        icon: icon, // ✅ จะเป็น null
    };
};
// --------------------------------------------------------------------------

const CourseCard = ({
    course,
    onAddCompare,
    isCompared,
    isDashboard = false,
    isShortlisted = false,
    onToggleShortlist = () => {},
    onSuccessfulApply = () => {},
    hideCompareBox = false,
    profileComplete = false,
    isAppliedStatus = false,
    allowShortlistRemove = true
}) => {

    const [showHeart, setShowHeart] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [localShortlisted, setLocalShortlisted] = useState(isShortlisted);
    const courseProfilePath = `/course-profile/${course.id}`;

    useEffect(() => {
        setLocalShortlisted(isShortlisted);
    }, [isShortlisted]);

    // Double-click Logic (ตรวจสอบให้แน่ใจว่าไม่ได้ใช้ useCallback)
    const handleDoubleClick = () => {

        if (!isShortlisted) {
            // ตรรกะการเพิ่ม (ไม่เกี่ยวข้องกับปัญหาการลบ)
            onToggleShortlist(course);
            setShowHeart(true);
            setTimeout(() => setShowHeart(false), 1000);
            message.success(`Added "${course.title}" to Shortlist`);
        } else {
            // ตรรกะการลบ

            // 🛑 Guard Clause 1: ป้องกันการลบในหน้า Course Search (ถ้า allowShortlistRemove เป็น false)
            if (!allowShortlistRemove) {
                message.warning(`Shortlisted items cannot be removed from this page.`);
                return; // ⬅️ ต้องมี 'return' เพื่อหยุดการทำงานทันที
            }

            // 🛑 Guard Clause 2: ป้องกันการลบถ้าคอร์สถูก Applied แล้ว
            if (isAppliedStatus) {
                message.warning(`Cannot remove "${course.title}". Application is being processed.`);
                return; // ⬅️ ต้องมี 'return' เพื่อหยุดการทำงานทันที
            }

            // ถ้าผ่านการป้องกันทั้งหมด ค่อยเปิด Modal เพื่อยืนยันการลบ
            setIsModalVisible(true);
        }
    };

    // Heart icon click
    const handleHeartClick = (e) => {
        e.stopPropagation();
        if (localShortlisted) {
            // 🛑 Guard Clause 1: ป้องกันการลบในหน้า Course Search
            if (!allowShortlistRemove) {
                message.warning(`Shortlisted items cannot be removed from this page.`);
                return; // ⬅️ ต้องมี 'return'
            }

            // 🛑 Guard Clause 2: ป้องกันการลบถ้าคอร์สถูก Applied แล้ว
            if (isAppliedStatus) {
                message.warning(`Cannot remove "${course.title}". Application is being processed.`);
                return; // ⬅️ ต้องมี 'return'
            }

            // เปิด Modal หากผ่าน Guard Clauses ทั้งหมด
            setIsModalVisible(true);
        } else {
            onToggleShortlist(course);
            message.success(`Added "${course.title}" to Shortlist`);
        }
    };

    // Confirm remove shortlist
    const handleOk = () => {
        onToggleShortlist(course);
        setIsModalVisible(false);
        message.info(`Removed "${course.title}" from Shortlist`);
    };
    const handleCancel = () => setIsModalVisible(false);

    // Compare toggle
    const handleCompareToggle = (e) => {
        e.stopPropagation();
        if (hideCompareBox) return;
        onAddCompare(course);
    };

    // ⭐ Handler สำหรับการสมัครคอร์ส
    const handleApplyCourse = () => {
        if (profileComplete) {
            // message.success(`Application for ${course.title} submitted!`);
            onSuccessfulApply(course); // เรียก Context Function เพื่ออัปเดต State และสุ่มสถานะ
        } else {
            message.warning("Please complete your profile first!");
        }
    };

    // ⭐ กำหนดสถานะที่ใช้ในการแสดงผล
    const currentStatus = course.applicationStatus || "Awaiting Review";
    const statusProps = getStatusProps(currentStatus);

    // ⭐ เพิ่มตัวแปรสำหรับ Bottom Icons
    const courseLevel = course.level;
    const hasScholarship = course.hasScholarship; // สมมติว่ามี field boolean ชื่อ hasScholarship
    const courseRank = course.rank; // ใช้ Rank จาก course data

    return (
        <div
            style={{
                position: "relative",
                overflow: "hidden",
                background: colors.neutral[1],
                width: "100%",
                maxWidth: window.innerWidth < 768 ? "100%" : 375,
            }}
        >
            {/* Cover Image */}
            <div
                onDoubleClick={handleDoubleClick}
                style={{
                    position: "relative",
                    aspectRatio: "16/9",
                    backgroundImage: `url(${course.coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                }}
            >
                {showHeart && <FloatingHeart />}

                {/* Overlay: Compare + Heart */}
                <div
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    {/* Compare box — ซ่อนไปเมื่อนำไปใช้ใน empty dashboard */}
                    {!isDashboard && !hideCompareBox && (
                        <div className="compare-box"
                            onClick={handleCompareToggle}
                            style={{
                                height: 32,
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                background: `${colors.geekBlue[1]}B3`,
                                border: `1px solid ${colors.geekBlue[3]}`,
                                borderRadius: 15,
                                padding: "2px 10px",
                                cursor: "pointer",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={isCompared}
                                readOnly
                                style={{ accentColor: colors.geekBlue[6] }}
                            />
                            <span
                                style={{
                                    color: colors.geekBlue[6],
                                    fontWeight: 500,
                                }}
                            >
                                Compare
                            </span>
                        </div>
                    )}

                    {/* Heart Button: ซ่อนเมื่อสมัครแล้ว */}
                    {!isAppliedStatus && (
                        <div
                            onClick={handleHeartClick}
                            style={{
                                background: `${colors.polarGreen[1]}B3`,
                                borderRadius: "50%",
                                width: 40,
                                height: 40,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: 20,
                                    color: localShortlisted
                                        ? colors.polarGreen[7]
                                        : colors.neutral[1],
                                }}
                            >
                                {localShortlisted ? <HeartFilled /> : <HeartOutlined />}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: "16px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        marginBottom: 12,
                    }}
                >
                    {/* University Logo */}
                    <div
                        style={{
                            flex: 3,
                            aspectRatio: "3/1",
                            maxWidth: 75,
                            minWidth: 50,
                            overflow: "hidden",
                            backgroundImage: `url(${course.universityLogo})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            marginTop: '12px',
                        }}
                    />
                    <div style={{ flex: 8 }}>
                        <Link to={courseProfilePath} style={{ textDecoration: 'none' }}>
                        <h5
                            style={{
                                margin: 0,
                                fontSize: 16,
                                fontWeight: 600,
                                color: colors.character.primary,
                            }}
                        >
                            {truncateText(course.title, MAX_LENGTH)}
                        </h5>
                        </Link>
                        <p
                            style={{
                                margin: 0,
                                fontSize: 14,
                                color: colors.character.primary,
                            }}
                        >
                            {course.university || "University Name Missing"}
                        </p>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                color: colors.character.secondary,
                            }}
                        >
                            <EnvironmentOutlined />
                            <span>{course.location || "Location Missing"}</span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: 'column',
                                gap: 6,
                                marginTop: 4,
                                fontSize: 14,
                                color: colors.character.secondary,
                            }}
                        >

                            {/* ⭐ START: สลับการแสดงผลตรงนี้ */}
                            {isAppliedStatus ? (
                                <div>
                                    <div style={{ fontSize: 12, color: colors.character.secondary, marginBottom: '8px' }}>
                                        Status
                                    </div>
                                    <Tag
                                        style={{
                                            borderColor: statusProps.borderColor,
                                            background: statusProps.bgColor,
                                            color: statusProps.color,
                                            fontSize: 16,
                                            borderRadius: 8,
                                            padding: "4px 10px",
                                            fontWeight: 500,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 4
                                        }}
                                    >
                                        {currentStatus}
                                    </Tag>
                                </div>
                            ) : (
                                // 🔶 แสดง Tuition Fee และ Course Open (ก่อน Applied)
                                <>
                                    <div>
                                        <div style={{ fontSize: 12, color: colors.character.secondary }}>
                                            Tuition Fee
                                        </div>
                                        <div
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 500,
                                                color: colors.character.primary,
                                            }}
                                        >
                                            {course.tuition}
                                        </div>
                                    </div>

                                    <Tag
                                        style={{
                                            borderColor: colors.polarGreen[3],
                                            background: colors.polarGreen[1],
                                            color: colors.polarGreen[6],
                                            fontSize: 12,
                                            borderRadius: 8,
                                            padding: "2px 8px",
                                            width: '90px',
                                        }}
                                    >
                                        Course Open
                                    </Tag>
                                </>
                            )}
                            {/* ⭐ END: สลับการแสดงผล */}
                        </div>


                    </div>
                </div>

                {/* ⭐ START: Bottom icons (แก้ไขแล้ว) */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 14,
                        color: colors.character.secondary,
                    }}
                >
                    {/* 1. Degree Level (แสดงตามค่า course.level) */}
                    {courseLevel && (
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <ReadOutlined />
                            <span>{courseLevel}</span> {/* ✅ ใช้ค่าจริงจาก course.level */}
                        </div>
                    )}

                    {/* ❗ ตัวแบ่งที่ 1: แสดงเมื่อมี Level และตามด้วย Scholarship หรือ Rank */}
                    {(courseLevel && (hasScholarship || (courseRank))) && (
                        <div
                            style={{
                                width: 1,
                                height: 16,
                                background: colors.character.secondary,
                                opacity: 0.4,
                            }}
                        />
                    )}

                    {/* 2. Scholarship */}
                    {hasScholarship && (
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <CheckCircleFilled style={{ color: colors.character.success }} />
                            <span>Scholarships</span>
                        </div>
                    )}

                    {/* ❗ ตัวแบ่งที่ 2: แสดงเมื่อมี Scholarship และมี Rank */}
                    {/* ✅ แก้จาก (courseRank > 0) เป็น (courseRank) */}
                    {(hasScholarship && courseRank) && (
                        <div
                            style={{
                                width: 1,
                                height: 16,
                                background: colors.character.secondary,
                                opacity: 0.4,
                            }}
                        />
                    )}

                    {/* 3. Rank (แสดงเมื่อ courseRank มีค่า (ไม่ใช่ null, undefined, หรือ empty string) */}
                    {/* ✅ แก้จาก (courseRank > 0) เป็น (courseRank) */}
                    {courseRank && (
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <TrophyOutlined />
                            <span>{courseRank}</span> {/* ✅ แสดงค่า String เช่น "Top 10" */}
                        </div>
                    )}
                </div>
                {/* ⭐ END: Bottom icons */}

                {/* Apply button for dashboard: ซ่อนเมื่อ isAppliedStatus เป็น true */}
                {isDashboard && localShortlisted && !isAppliedStatus && (
                    <div style={{ marginTop: 16, textAlign: "center" }}>
                        <Button
                            type={profileComplete ? "primary" : "default"}
                            disabled={!profileComplete}
                            style={{ width: "100%" }}
                            onClick={handleApplyCourse}
                        >
                            Apply now
                        </Button>
                    </div>
                )}
            </div>

            {/* Modal for remove shortlist */}
            <Modal
                title="Remove Shortlisted Course"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        No
                    </Button>,
                    <Button key="submit" type="primary" danger onClick={handleOk}>
                        Yes
                    </Button>,
                ]}
            >
                <p>Do you want to remove "{course.title}" from shortlisted?</p>
                <p>You can add new courses anytime.</p>
            </Modal>
        </div>
    );
};

export default CourseCard;