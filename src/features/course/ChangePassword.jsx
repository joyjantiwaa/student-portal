import React, { useState, useEffect } from 'react';
import { Layout, Typography, Form, Input, Button, Alert, Grid, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
// 💡 สมมติว่า Imports เหล่านี้ใช้งานได้
import colors from "@/features/designsystem/colors"; 
import Sidebar from "@/features/components/Sidebar";
import MenuBar from "@/features/components/MenuBar";
import AppFooter from "@/features/components/Footer";
// ----------------------------------------------------

const { Title, Text } = Typography;
const { Content } = Layout;
const { useBreakpoint } = Grid; 

// -----------------------------------------------------------
// 📌 1. PasswordForm Component
// -----------------------------------------------------------
const PasswordForm = () => {
    const [form] = Form.useForm();
    const [success, setSuccess] = useState(false);
    
    const screens = useBreakpoint();
    // 💡 Logic ของฟอร์ม ควรใช้ breakpoint ที่เหมาะสมในการจัด Layout
    const isMobile = !screens.lg; 

    const onFinish = (values) => {
        console.log("Success:", values);
        
        setSuccess(true);
        message.success("Password updated successfully!"); 
        
        form.resetFields(); 
    };


    return (
        <div
            style={{
                borderRadius: 12,
                backgroundColor: 'white', 
                padding: 0,
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 24,
                    borderBottom: `1px solid ${colors.neutral[2]}`,
                }}
            >
                <div>
                    <Title level={4} style={{ margin: 0, color: colors.character.primary }}>
                        Change Password
                    </Title>
                    <Text style={{ fontSize: 14, color: colors.character.secondary }}>
                        Update your account password. Make sure it’s strong and memorable.
                    </Text>
                </div>
                <QuestionCircleOutlined style={{ fontSize: 16, color: colors.character.secondary }} />
            </div>


            <div style={{ padding: "24px" }}>
                {success && (
                    <Alert
                        message="Password changed successfully!"
                        description="Your password has been securely updated. You may need to log in again next time."
                        type="success"
                        showIcon
                        closable
                        style={{ marginBottom: 24 }}
                        onClose={() => setSuccess(false)}
                    />
                )}


                <Form
                    form={form}
                    name="change_password"
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    style={{ 
                        maxWidth: 400,
                        // 🟢 เพิ่ม margin: '0 auto' เพื่อจัดให้อยู่กึ่งกลางแนวนอน
                        margin: '0 auto', 
                    }} 
                >
                    {/* Current Password */}
                    {/* ... (Form.Item อื่นๆ) ... */}
                    
                    <Form.Item
                        label="Current Password"
                        name="currentPassword"
                        rules={[{ required: true, message: "Please input your current password!" }]}
                    >
                        <Input.Password size="large" placeholder="Enter current password" />
                    </Form.Item>

                    {/* New Password */}
                    <Form.Item
                        // ... (Rules และโค้ดอื่น ๆ)
                    >
                        <Input.Password size="large" placeholder="Enter new password" />
                    </Form.Item>

                    {/* Confirm Password */}
                    <Form.Item
                        // ... (Rules และโค้ดอื่น ๆ)
                    >
                        <Input.Password size="large" placeholder="Confirm new password" />
                    </Form.Item>


                    <Form.Item style={{ marginTop: 32 }}>
                        <Button type="primary" htmlType="submit" size="large">
                            Save Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};


// -----------------------------------------------------------
// 📌 2. ChangePasswordPage Component (รวม Layout)
// -----------------------------------------------------------
const ChangePasswordPage = () => {
    
    const screens = useBreakpoint();
    // ✅ แก้ไข Logic ให้ isMobile เป็น TRUE เมื่อหน้าจอเล็กกว่า LG (Desktop)
    // Sidebar จะแสดงเมื่อ screens.lg, xl, xxl เป็น true
    const isMobile = !screens.lg; 
    
    const sidebarBgColor = colors.neutral[0]; 

    return (
        <Layout style={{ minHeight: "100vh", position: "relative" }}>

            {/* ⭐ SIDEBAR DESKTOP ONLY */}
            {!isMobile && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: "100vh",
                        background: sidebarBgColor,
                        width: 47,
                        zIndex: 3000,
                    }}
                >
                    {/* 💡 Sidebar Component ต้องรับ props mobileMode={false} */}
                    <Sidebar mobileMode={false} />
                </div>
            )}

            <Layout
                style={{
                    // ✅ ใช้ isMobile ที่กำหนดใหม่ในการเว้น Margin ซ้าย
                    marginLeft: isMobile ? 0 : 47, 
                    width: "100%",
                    transition: "0.3s",
                }}
            >

                {/* ⭐ TOP MENU BAR */}
                {/* 💡 ส่ง isMobile ที่ถูกต้องไปให้ MenuBar */}
                <MenuBar isMobile={isMobile} />

                {/* CONTENT AREA */}
                <Content style={{ minHeight: "calc(100vh - 48px)" }}> {/* ปรับความสูง Content ให้หัก Header 48px */}

                    {/* ⭐ WRAPPER สำหรับเนื้อหาหลัก */}
                    <div style={{ 
                        padding: '24px', 
                        backgroundColor: colors.conditional.pageBackground || '#f9fafb', 
                        minHeight: '100%', 
                    }}>
                        <div style={{ 
                            maxWidth: '1280px', 
                            margin: '0px',
                            alignItems: 'center',
                        }}>
                            
                            <PasswordForm /> 

                        </div>
                    </div>

                </Content>

                {/* ⭐ FOOTER */}
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default ChangePasswordPage;