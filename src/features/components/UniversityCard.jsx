import React from "react";
import { Tag, Button } from "antd";
import {
  EnvironmentOutlined,
  CheckCircleFilled,
  TrophyOutlined,
  BankOutlined,
} from "@ant-design/icons";
import colors from "@/features/designsystem/colors";
import coverImg from "@/assets/images/cover.jpg";
import uniLogo from "@/assets/images/university-logo.png";


/**
 * ✅ UniversityCard Component
 * - ใช้แสดงข้อมูลมหาวิทยาลัยแต่ละแห่ง
 * - แสดงรูป cover, โลโก้, ที่ตั้ง, คอร์สเด่น, และข้อมูลเสริม
 */
const UniversityCard = ({ university, onAddCompare, isCompared }) => {
  if (!university) return null;


  const {
    name,
    location,
    rank,
    hasScholarship,
    famousCourses,
    coverImage,
    logo,
  } = university;


  const MAX_LENGTH = 128;


  const getLimitedText = (text) => {
    if (!text) return "";
    const cleanText = text.replace(/\n/g, " ");
    return cleanText.length > MAX_LENGTH
      ? cleanText.slice(0, MAX_LENGTH) + "..."
      : cleanText;
  };


  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: colors.neutral[1],
        width: "100%",
        maxWidth: "100%",
        border: `1px solid ${colors.neutral[3]}`,
      }}
      className="hover:shadow-md"
    >
      {/* ✅ Cover Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          backgroundImage: `url(${coverImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />


      {/* ✅ Body */}
      <div style={{ padding: "16px" }}>
        {/* 🏫 Logo + Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          {/* Logo */}
          <div
            style={{
              flex: "3",
              aspectRatio: "3/1",
              maxWidth: 75,
              minWidth: 50,
              borderRadius: 8,
              overflow: "hidden",
              backgroundImage: `url(${uniLogo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />


          {/* University Info */}
          <div style={{ flex: "8" }}>
            <h5
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 600,
                color: colors.character.primary,
              }}
            >
              {name}
            </h5>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 4,
                fontSize: 14,
                color: colors.character.secondary,
              }}
            >
              <EnvironmentOutlined />
              <span>{location}</span>
            </div>
          </div>
        </div>


        {/* 🎓 Famous Courses */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 12,
            marginBottom: 12,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                color: colors.character.secondary,
              }}
            >
              Famous Courses
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: colors.primary[6],
                marginBottom: 8,
              }}
            >
              {getLimitedText(famousCourses)}
            </div>
          </div>
        </div>


        {/* 🧩 Info Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            fontSize: 14,
            color: colors.character.secondary,
            gap: 8,
            paddingBottom: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <BankOutlined />
            <span>Public University</span>
          </div>


          <div
            style={{
              width: 1,
              height: 16,
              background: colors.character.secondary,
              opacity: 0.4,
            }}
          />


          {hasScholarship && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <CheckCircleFilled style={{ color: colors.character.success }} />
                <span>Scholarships</span>
              </div>
              <div
                style={{
                  width: 1,
                  height: 16,
                  background: colors.character.secondary,
                  opacity: 0.4,
                }}
              />
            </>
          )}


          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <TrophyOutlined />
            <span>{rank}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UniversityCard;