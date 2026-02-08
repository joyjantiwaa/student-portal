import React, { useState } from "react";
import colors from "@/features/designsystem/colors";
import { Tooltip, Input, Typography } from "antd"; 
import { UpOutlined } from "@ant-design/icons";
import Empty from "@/assets/images/empty-img-gray.png";

const { Title } = Typography; 

export default function CourseCompare({ compareList = [], onRemove }) {
  const [expandedId, setExpandedId] = useState(null);
  
  // โค้ดสำหรับกรณีไม่มีคอร์สเปรียบเทียบ
  if (compareList.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "40vh",
          width: "100%", 
          boxSizing: "border-box",
          textAlign: "center",
          gap: 14,
          padding: 24,
        }}
      >
        <img
          src={Empty}
          alt="Empty Compare"
          style={{
            width: 106,
            height: 100,
            objectFit: "contain",
            marginBottom: 24,
            opacity: 0.9,
          }}
        />
        <p style={{ color: colors.character.primary, fontSize: 14, fontWeight: 500, maxWidth: "100%", lineHeight: 1.4 }}>
          No course to compare
        </p>
        <p style={{ color: colors.character.secondary, fontSize: 14, fontWeight: 500, maxWidth: "100%", lineHeight: 1.4 }}>
          Add course to compare
        </p>
      </div>
    );
  }

  // ⭐ ข้อมูลแถวเปรียบเทียบ (ATTRIBUTES)
  const ATTRIBUTES = [
    { label: "University Logo", key: "logo", height: 80, bg: colors.neutral[1], maxLen: 40, isImage: true },
    { label: "Course Name", key: "title", height: 56, bg: colors.neutral[1], maxLen: 40 },
    { label: "University", key: "university", height: 56, bg: colors.neutral[2], maxLen: 40 },
    { label: "Location", key: "location", height: 56, bg: colors.neutral[1], maxLen: 30 },
    { label: "Degree", key: "level", height: 56, bg: colors.neutral[2], maxLen: 25 },
    { label: "Intake", key: "intake", height: 56, bg: colors.neutral[1], maxLen: 25 },
    { label: "Entry", key: "entry", height: 116, bg: colors.neutral[2], maxLen: 200 },
    { label: "Tuition fee", key: "tuition", height: 56, bg: colors.neutral[1], maxLen: 25 },
    { label: "Rank", key: "rank", height: 56, bg: colors.neutral[2], maxLen: 25 },
    { label: "Faculty", key: "faculty", height: 56, bg: colors.neutral[1], maxLen: 35 },
    { label: "IELTS Waiver", key: "ieltsWaiver", height: 180, bg: colors.neutral[2], maxLen: 300 },
  ];
  
  // ⭐ กำหนดความกว้างคอลัมน์แรก 100px และคอลัมน์ที่เหลือ 240px
  const COLUMN_WIDTH = 240;
  const GAP_SIZE = 12;
  const gridTemplateColumns = `100px repeat(${compareList.length}, ${COLUMN_WIDTH}px)`;
  
  // คำนวณความกว้างรวมเพื่อให้ Scroll ได้
  const totalWidth = 100 + (compareList.length * COLUMN_WIDTH) + (compareList.length * GAP_SIZE);
  
  return (
    <div
      style={{
        overflowX: "auto",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        width: "100%",
        marginBottom: 24,
      }}
    >
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridTemplateColumns,
          minWidth: `${totalWidth}px`,
          gap: `0px ${GAP_SIZE}px`, // แยก gap ระหว่างคอลัมน์ (12px)
          border: `1px solid ${colors.neutral[4]}`,
          borderRadius: 4,
          overflow: "hidden",
          boxSizing: 'border-box',
        }}
      >

        {/* ❌ ลบส่วน Header Row ที่มีชื่อคอร์สออกไปแล้ว */}

        {/* 1. แถวข้อมูล: Loop ผ่าน ATTRIBUTES */}
        {ATTRIBUTES.map((row, i) => (
          <React.Fragment key={row.key}>
            {/* 1a. กล่องหัวข้อ (ความกว้าง 100px) */}
            <div
              className="subject-column"
              style={{
                width: 100, 
                height: row.height,
                background: row.bg, // ✅ ใช้พื้นหลังตามแถว (row.bg)
                borderBottom: i !== ATTRIBUTES.length - 1 ? `1px solid ${colors.neutral[4]}` : "none",
                padding: "8px 12px",
                display: "flex",
                flexDirection: 'column',
                // ✅ จัดชิดขวา
                alignItems: "flex-end", // จัดเนื้อหาไปทางขวาของกล่อง (เฉพาะสำหรับโลโก้)
                justifyContent: row.isImage ? 'center' : 'flex-start', // จัดโลโก้อยู่ตรงกลางตามแนวตั้ง
                
                // ✅ จัดข้อความชิดขวา
                textAlign: 'right', 
                
                fontWeight: 500, // ลดความหนาลงเล็กน้อยให้เหมือนกล่องข้อมูล
                fontSize: 13,
                color: colors.character.primary,
                flexShrink: 0,
                boxSizing: 'border-box',
                borderRadius: i === 0 ? '4px 0 0 0' : (i === ATTRIBUTES.length - 1 ? '0 0 0 4px' : '0'), // โค้งมนเฉพาะมุมซ้ายบนและล่าง
              }}
            >
              <span style={{ 
                  width: '100%', 
                  textAlign: 'right', 
                  // ถ้าเป็นโลโก้ ไม่แสดง label แต่ปล่อยให้ว่าง
                  opacity: row.isImage ? 0 : 1,
                  display: row.isImage ? 'none' : 'block',
                }}>
                  {row.label}
              </span>
            </div>

            {/* 1b. กล่องข้อมูลคอร์ส */}
            {compareList.map((course, index) => {
              const rawValue = course[row.key] || "-";
              const isOverLimit = row.key !== 'logo' && rawValue.length > row.maxLen;
              const displayValue =
                expandedId === `${course.id}-${row.key}`
                  ? rawValue
                  : isOverLimit
                  ? rawValue.slice(0, row.maxLen) + "..."
                  : rawValue;

              return (
                <div
                  key={`${course.id}-${row.key}`}
                  style={{
                    width: COLUMN_WIDTH,
                    height: row.height,
                    background: row.bg,
                    borderBottom: i !== ATTRIBUTES.length - 1 ? `1px solid ${colors.neutral[4]}` : "none",
                    position: "relative",
                    padding: "8px 12px",
                    display: "flex",
                    flexDirection: 'column',
                    alignItems: row.isImage ? "center" : "flex-start",
                    justifyContent: row.isImage ? "center" : "flex-start",
                    textAlign: row.isImage ? "center" : "left",
                    fontSize: 13,
                    fontWeight: 500,
                    color: colors.neutral[9],
                    boxSizing: 'border-box',
                    // โค้งมนมุมขวา
                    borderRadius: i === ATTRIBUTES.length - 1 && index === compareList.length - 1 ? '0 0 4px 0' : (i === 0 && index === compareList.length - 1 ? '0 4px 0 0' : '0'),
                  }}
                >
                  {/* แสดงข้อมูลคอร์ส */}
                  {row.isImage ? (
                    <>
                      {/* ปุ่ม Remove สำหรับโลโก้ (แถวแรก) */}
                      <span
                        onClick={() => onRemove(course.id)}
                        style={{
                          position: "absolute",
                          top: 6,
                          right: 8,
                          cursor: "pointer",
                          fontSize: 16,
                          color: colors.character.secondary,
                          fontWeight: "normal",
                        }}
                        title="Remove"
                      >
                        ×
                      </span>
                      {/* โลโก้ */}
                      {course.logo && (
                        <img
                          src={course.logo}
                          alt={`${course.title} logo`}
                          style={{
                            width: 129,
                            height: 43,
                            objectFit: "contain",
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <span>{displayValue}</span>
                      {/* ปุ่มขยายข้อความ */}
                      {isOverLimit && (
                        <Tooltip title={expandedId === `${course.id}-${row.key}` ? "Hide full text" : "Show full text"}>
                          <UpOutlined
                            onClick={() =>
                              setExpandedId(
                                expandedId === `${course.id}-${row.key}`
                                  ? null
                                  : `${course.id}-${row.key}`
                              )
                            }
                            style={{
                                transform: expandedId === `${course.id}-${row.key}` ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s',
                                fontSize: 10,
                                color: colors.character.danger,
                                position: "absolute",
                                bottom: 6,
                                right: 8,
                                cursor: "pointer",
                            }}
                          />
                        </Tooltip>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}