import React from "react";
import { Pagination, Select, InputNumber } from "antd";
import colors from "@/features/designsystem/colors";

const { Option } = Select;

/**
 * 📘 CustomPagination (เรียงใหม่จริง)
 * ✅ Desktop: Total → Pagination → Select (10/page) → Jumper
 * ✅ Mobile: เหลือแค่ Pagination
 */
export default function CustomPagination1({
  totalCourses = 0,
  currentPage = 1,
  pageSize = 10,
  onChange,
  onPageSizeChange,
  isMobile = false,
}) {
  const totalPages = Math.ceil(totalCourses / pageSize);

  const handleJump = (value) => {
    if (value && value >= 1 && value <= totalPages) {
      onChange(value);
    }
  };

  return (
    <div
      style={{
        background: colors.neutral[1],
        padding: isMobile ? "8px 12px" : "12px 24px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: isMobile ? "wrap" : "nowrap",
        gap: "12px",
        width: "100%",
        marginTop: 24,
      }}
    >
      {/* 🧾 จำนวนรายการทั้งหมด */}
      {!isMobile && (
        <div
          style={{
            fontSize: 14,
            color: colors.neutral[7],
            whiteSpace: "nowrap",
          }}
        >
          Total {totalCourses} items
        </div>
      )}

      {/* 📄 Pagination + Select + Jumper */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {/* 📊 Pagination */}
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalCourses}
          showSizeChanger={false}
          showQuickJumper={false} // ❌ ปิด Jumper ในตัว Pagination
          onChange={onChange}
          size="middle"
        />

        {/* 📋 Select จำนวนต่อหน้า */}
        <Select
          value={pageSize}
          style={{ width: 130 }}
          onChange={(value) => {
            if (onPageSizeChange) onPageSizeChange(value);
          }}
        >
          <Option value={12}>12 / page</Option>
          <Option value={24}>24 / page</Option>
          <Option value={36}>36 / page</Option>
          <Option value={48}>48 / page</Option>
          <Option value={60}>60 / page</Option>
        </Select>

        {/* 🔢 Jumper (ไปหน้าที่) */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 14, color: colors.neutral[7] }}>
              Go to page:
            </span>
            <InputNumber
              min={1}
              max={totalPages}
              defaultValue={currentPage}
              onPressEnter={(e) => handleJump(Number(e.target.value))}
              onBlur={(e) => handleJump(Number(e.target.value))}
              style={{ width: 60 }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
