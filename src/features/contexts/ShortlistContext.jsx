// src/features/contexts/ShortlistContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";

const ShortlistContext = createContext();

export const useShortlist = () => useContext(ShortlistContext);

// ⭐ รายการสถานะทั้งหมดสำหรับการสุ่ม
const STATUS_OPTIONS = [
    "Submitted",
    "In Review",
    "Awaiting Documents",
    "Interview Required",
    "Waitlisted",
    "Conditional Offer",
    "Unconditional Offer",
    "Offer Accepted",
    "Deposit Paid",
    "Offer Declined",
];

// ⭐ Helper function สำหรับสุ่มสถานะ
const getRandomStatus = () => {
    const randomIndex = Math.floor(Math.random() * STATUS_OPTIONS.length);
    return STATUS_OPTIONS[randomIndex];
};

export const ShortlistProvider = ({ children }) => {
    // 1. โหลดข้อมูล Shortlist จาก Local Storage เมื่อเริ่มต้น
    const [shortlist, setShortlist] = useState(() => {
        const savedShortlist = localStorage.getItem("shortlistCourses");
        // Ensure the saved data is an array before returning
        try {
            const parsed = JSON.parse(savedShortlist);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error("Error parsing shortlist from localStorage:", e);
            return [];
        }
    });

    // 2. บันทึกข้อมูล Shortlist ลง Local Storage เมื่อมีการเปลี่ยนแปลง
    useEffect(() => {
        localStorage.setItem("shortlistCourses", JSON.stringify(shortlist));
    }, [shortlist]);

    const toggleShortlist = (course) => {
        // 🛑 เพิ่มการตรวจสอบ Course ID เพื่อป้องกันการทำงานผิดพลาด
        if (!course || !course.id) {
            console.error("Attempted to toggle shortlist with invalid course object.", course);
            return;
        }

        setShortlist((prev) => {
            const exists = prev.find((c) => c.id === course.id);
            if (exists) {
                // 🔴 บั๊กถูกแก้ไขที่นี่: ต้องกรองด้วย course.id ที่ส่งเข้ามา
                // โค้ดเดิม: return prev.filter((c) => c.id !== c.id);  <-- ผิด
                // โค้ดที่แก้ไข:
                return prev.filter((c) => c.id !== course.id); // ✅ ใช้ course.id ที่รับเข้ามา
            } else {
                // เพิ่มเข้า: ต้องมี field applied และ applicationStatus 
                const courseToAdd = { 
                    ...course, 
                    applied: course.applied || false,
                    applicationStatus: course.applicationStatus || null, // สถานะเริ่มต้น
                };
                return [...prev, courseToAdd];
            }
        });
    };

    // ⭐ 3. ฟังก์ชันสำหรับอัปเดตสถานะการสมัครเมื่อสมัครสำเร็จ (พร้อมสุ่มสถานะ)
    const handleCourseApply = (appliedCourse) => {
        // 🛑 ป้องกันการทำงานหากไม่มี ID
        if (!appliedCourse || !appliedCourse.id) {
            console.error("Attempted to apply with invalid course object.");
            return;
        }

        const newStatus = getRandomStatus(); // ⭐ สุ่มสถานะ

        setShortlist((prev) => {
            return prev.map((course) => {
                if (course.id === appliedCourse.id) {
                    // สร้าง Object ใหม่ โดยเปลี่ยนค่า applied เป็น true และกำหนดสถานะที่สุ่มได้
                    return { 
                        ...course, 
                        applied: true, 
                        applicationStatus: newStatus 
                    };
                }
                return course;
            });
        });
    };
    
    // ⭐ 4. ฟังก์ชันสำหรับอัปเดตสถานะการสมัครเมื่อได้รับสถานะใหม่ (เช่น Awaiting Documents)
    const updateCourseStatus = (courseId, newStatus) => {
        setShortlist((prev) => {
            return prev.map((course) => {
                if (course.id === courseId) {
                    return { 
                        ...course, 
                        applicationStatus: newStatus 
                    };
                }
                return course;
            });
        });
    };
    
    // ⭐ 5. ฟังก์ชันสำหรับลบทั้งหมด (เผื่อใช้ในอนาคต)
    const clearShortlist = () => {
        setShortlist([]);
    };

    return (
        <ShortlistContext.Provider value={{ 
            shortlist, 
            toggleShortlist, 
            handleCourseApply, 
            updateCourseStatus, // เพิ่มฟังก์ชันใหม่เข้า Context
            clearShortlist // เพิ่มฟังก์ชันใหม่เข้า Context
        }}>
            {children}
        </ShortlistContext.Provider>
    );
};