import React, { useState, useEffect, useCallback } from "react";
import {
    Card,
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    InputNumber,
    Checkbox,
} from "antd";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import colors from "@/features/designsystem/colors";
import "antd/dist/antd.css";
import "@/App.css";

const { Option } = Select;

// ⭐ กำหนดค่าคงที่สำหรับ Degree Levels และ Universities
const DEGREE_LEVELS = {
    ASSOCIATE: "Associate Degree",
    BACHELOR: "Bachelor's Degree",
    MASTER: "Master's Degree",
    DOCTORAL: "Doctoral Degree",
    MASTER_BACHELOR_COMBO: "Master's and Bachelor's",
};

// ⭐ รายชื่อมหาวิทยาลัยที่ต้องการเพิ่ม
const UNIVERSITY_OPTIONS = [
    "London Business School",
    "Imperial College London",
    "University College London (UCL)",
    "University of Oxford",
    "University of Cambridge",
    // "London, United Kingdom" <-- ลบออก, เพราะนี่คือ Location ไม่ใช่ University
    "University of Manchester",
    "University of Bristol",
    "University of Warwick",
    "University of Edinburgh",
];

const CourseFilter = ({ currentFilters, onFilterChange }) => {
    const [academicOpen, setAcademicOpen] = useState(true);
    //const [educationOpen, setEducationOpen] = useState(false);
    const [advanceOpen, setAdvanceOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1200);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 💡 ตั้งค่า Initial Values/Default Values เมื่อ currentFilters เปลี่ยน
    useEffect(() => {
        form.setFieldsValue({
            level: currentFilters.level,
            university: currentFilters.university, // ⭐ เพิ่ม University
            minTuition: currentFilters.tuition[0],
            maxTuition: currentFilters.tuition[1],
            hasScholarship: currentFilters.scholarship,
        });
    }, [currentFilters, form]);

    // ⭐ Handler สำหรับการแสดงผล Level
    const getLevelDisplayValue = (selectedValues) => {
        if (!selectedValues || selectedValues.length === 0) {
            return "Postgraduate degree";
        }
        if (selectedValues.length === 1) {
            return selectedValues[0];
        }
        return `${selectedValues.length} Levels selected`;
    };

    // ⭐ Handler ใหม่: ส่งค่า Filter ทันทีที่มีการเปลี่ยนแปลง
    const handleValuesChange = useCallback((changedValues, allValues) => {
        let selectedLevels = allValues.level || [];
        let finalLevels = [...selectedLevels];

        // LOGIC การรวม Master's และ Bachelor's
        if (selectedLevels.includes(DEGREE_LEVELS.MASTER) ||
            selectedLevels.includes(DEGREE_LEVELS.BACHELOR)) {

            if (!finalLevels.includes(DEGREE_LEVELS.MASTER_BACHELOR_COMBO)) {
                finalLevels.push(DEGREE_LEVELS.MASTER_BACHELOR_COMBO);
            }
        }

        // ดึงเฉพาะค่าที่ต้องการส่งเป็น Filter ไปยัง Parent Component
        const updatedFilters = {
            level: finalLevels,
            university: allValues.university || [], // ⭐ ดึงค่า University
            tuition: [allValues.minTuition || 0, allValues.maxTuition || 5000],
            scholarship: allValues.hasScholarship || false,
            startDate: allValues.startDate,
        };
        // ⭐ ส่งค่า Filter ใหม่กลับไปทันที
        onFilterChange(updatedFilters);
    }, [onFilterChange]);

    // ⭐ Handler สำหรับปุ่ม Reset
    const handleReset = () => {
        form.resetFields();
        // ส่งค่าเริ่มต้นกลับไปที่ Parent
        onFilterChange({
            level: [],
            university: [], // ⭐ Reset University
            tuition: [0, 5000],
            scholarship: false,
            startDate: null,
        });
    };

    const showEducation = !isMobile || (isMobile && academicOpen);
    const showAdvance = !isMobile || (isMobile && academicOpen);

    return (
        <div
            className="coursefilter-container"
            style={{
                width: isMobile ? "100%" : 307,
                border: "1px solid #f0f0f0",
                overflow: "hidden",
            }}
        >
            <Form
                form={form}
                layout="vertical"
                size="middle"
                onValuesChange={handleValuesChange}
            >

                {/* 1️⃣ Academic Interest */}
                <Card
                    // ... (ส่วน Card header และ toggle)
                    size="medium"
                    title="Academic interest"
                    bordered={false}
                    headStyle={{ borderBottom: "1px solid #f0f0f0", padding: "0px 16px" }}
                    bodyStyle={{ padding: academicOpen ? "16px" : "0", display: academicOpen ? "block" : "none" }}
                    extra={
                        <span
                            style={{ cursor: "pointer", color: colors.character.primary }}
                            onClick={() => setAcademicOpen(!academicOpen)}
                        >
                            {academicOpen ? <UpOutlined /> : <DownOutlined />}
                        </span>
                    }
                >
                    <div style={{ display: academicOpen ? "block" : "none" }}>

                        {/* Level */}
                        <Form.Item label="Level" name="level">
                            <Select
                                mode="multiple"
                                placeholder={getLevelDisplayValue(form.getFieldValue('level'))}
                                style={{ width: "100%" }}
                                suffixIcon={<DownOutlined style={{ fontSize: 14 }} />}
                            >
                                <Option value={DEGREE_LEVELS.ASSOCIATE}>{DEGREE_LEVELS.ASSOCIATE}</Option>
                                <Option value={DEGREE_LEVELS.BACHELOR}>{DEGREE_LEVELS.BACHELOR}</Option>
                                <Option value={DEGREE_LEVELS.MASTER}>{DEGREE_LEVELS.MASTER}</Option>
                                <Option value={DEGREE_LEVELS.DOCTORAL}>{DEGREE_LEVELS.DOCTORAL}</Option>
                            </Select>
                        </Form.Item>

                        {/* ⭐ University - กำหนด name และเพิ่ม Options */}
                        <Form.Item label="University" name="university">
                            <Select
                                mode="multiple"
                                placeholder="Any"
                                style={{ width: "100%" }}
                                allowClear
                            >
                                {/* <Option value="all">All Universities</Option> */}
                                {UNIVERSITY_OPTIONS.map(uni => (
                                    <Option key={uni} value={uni}>{uni}</Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item label="Country">
                            <Select mode="multiple" placeholder="Select country" style={{ width: "100%" }}>
                                <Option value="uk">UK</Option>
                                <Option value="london">London</Option>
                                <Option value="ireland">Ireland</Option>
                                <Option value="switzerland">Switzerland</Option>
                                <Option value="nz">New Zealand</Option>
                                <Option value="australia">Australia</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Start Date">
                            <DatePicker placeholder="Select date" style={{ width: "100%" }} />
                        </Form.Item>
                    </div>
                </Card>


                {showAdvance && (
                    <Card
                        // ...
                        size="medium"
                        title="Advance filter"
                        bordered={false}
                        headStyle={{ borderBottom: "1px solid #f0f0f0", padding: "0px 16px" }}
                        bodyStyle={{ padding: advanceOpen ? "16px" : "0", display: advanceOpen ? "block" : "none" }}
                        extra={
                            <span
                                style={{ cursor: "pointer", color: colors.character.primary }}
                                onClick={() => setAdvanceOpen(!advanceOpen)}
                            >
                                {advanceOpen ? <UpOutlined /> : <DownOutlined />}
                            </span>
                        }
                    >
                        <div style={{ display: advanceOpen ? "block" : "none", padding: advanceOpen ? "16px" : "0" }}>

                            {/* Tuition Range (Min/Max) */}
                            <Form.Item label="Tuition Range (£)" style={{ marginBottom: 0 }}>
                                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                    <Form.Item name="minTuition" noStyle>
                                        <InputNumber min={0} placeholder="Min" style={{ width: "100%" }} />
                                    </Form.Item>
                                    <span>-</span>
                                    <Form.Item name="maxTuition" noStyle>
                                        <InputNumber min={0} placeholder="Max" style={{ width: "100%" }} />
                                    </Form.Item>
                                </div>
                            </Form.Item>

                            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>

                                {/* Checkbox Scholarships */}
                                <Form.Item name="hasScholarship" valuePropName="checked" noStyle>
                                    <Checkbox style={{ marginLeft: 8 }}>Low cost MBA</Checkbox>
                                </Form.Item>

                                {/* Checkbox อื่นๆ (คงดีไซน์เดิม) */}
                                <Checkbox style={{ marginLeft: 8 }}>Easy entry</Checkbox>
                                <Checkbox>Fresher MBA</Checkbox>
                                <Checkbox>Russell Group</Checkbox>
                                <Checkbox>Work placement</Checkbox>
                                <Checkbox>IELTS waiver</Checkbox>
                                <Checkbox>Has Scholarships / Low Tuition (Below £12,000)</Checkbox>
                                <Checkbox>Tuition higher £12,000 before scholarship</Checkbox>
                            </div>

                            {/* ปุ่ม Reset */}
                            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                                <Button type="primary" size="medium" onClick={handleReset} style={{width: '100%'}}>
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}
            </Form>
        </div>
    );
};

export default CourseFilter;