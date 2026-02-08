import React from "react";
import { Tag } from "antd";
import {
  EnvironmentOutlined,
  CheckCircleFilled,
  TrophyOutlined,
  BankOutlined,
} from "@ant-design/icons";
import colors from "@/features/designsystem/colors";


const UniversitySponsorCard = ({ university }) => {
  // ----------------------------------------------------
  // ✅ จำกัดตัวอักษรของ Famous Courses
  // ----------------------------------------------------
  const MAX_LENGTH = 128;

  const getLimitedText = (text) => {
    if (!text) return "";
    const cleanText = text.replace(/\n/g, " ");
    if (cleanText.length > MAX_LENGTH) {
      return cleanText.slice(0, MAX_LENGTH) + "...";
    }
    return cleanText;
  };
  // ----------------------------------------------------

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: colors.neutral[1],
        width: "100%",
        maxWidth: 400,
        border: `1px solid ${colors.neutral[3]}`,
      }}
    >
      {/* Cover Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          backgroundImage: `url(${university.coverImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Sponsor Overlay */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 0,
            background: colors.primary[4],
            borderRadius: 2,
            padding: "1px 8px",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontSize: 12,
              fontWeight: 500,
              color: colors.neutral[1],
              textTransform: "uppercase",
              lineHeight: "normal",
            }}
          >
            Sponsor
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px" }}>
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
              backgroundImage: `url(${university.logo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Name & Location */}
          <div style={{ flex: "8" }}>
            <h5
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 600,
                color: colors.character.primary,
              }}
            >
              {university.name}
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
              <span>{university.location}</span>
            </div>
          </div>
        </div>

        {/* Famous Courses */}
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
                fontSize: 16,
                fontWeight: 500,
                color: colors.primary[6],
                marginBottom: 8,
              }}
            >
              <p style={{ margin: "4px 4px 4px 0" }}>
                {getLimitedText(university.famousCourses)}
              </p>
            </div>
          </div>
        </div>

        {/* Info Row: Type, Scholarship, Rank */}
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
            <span>{university.type} University</span>
          </div>
          <div
            style={{
              width: 1,
              height: 16,
              background: colors.character.secondary,
              opacity: 0.4,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <CheckCircleFilled style={{ color: colors.character.success }} />
            <span>{university.hasScholarship ? "Scholarships" : "No Scholarship"}</span>
          </div>
          <div
            style={{
              width: 1,
              height: 16,
              background: colors.character.secondary,
              opacity: 0.4,
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <TrophyOutlined />
            <span>{university.rank}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversitySponsorCard;
