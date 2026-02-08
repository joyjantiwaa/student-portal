import React, { useState, useEffect } from 'react';
import { Layout, Input, Button, Avatar, Typography } from 'antd';
import { SendOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import colors from '@/features/designsystem/colors'; // สมมติว่ามีการตั้งค่าสีไว้แล้ว
import '@/App.css';

// 1. จัดระเบียบ Import
const { Content, Footer, Header } = Layout;
const { Text } = Typography;

// ข้อมูลจำลองสำหรับแสดงผล
const mockMessages = [
    { id: 1, text: "สวัสดีครับ สนใจสอบถามคอร์ส MBA ใช่ไหมครับ?", sender: 'other', time: '10:00 AM' },
    { id: 2, text: "ใช่ครับ ขอข้อมูลทุนการศึกษาสำหรับนักเรียนต่างชาติหน่อยครับ", sender: 'self', time: '10:05 AM' },
    { id: 3, text: "ได้ครับ ทุนการศึกษาของ London Business School มี 3 ประเภทหลัก...", sender: 'other', time: '10:15 AM' },
    { id: 4, text: "ขอบคุณมากครับ", sender: 'self', time: '10:16 AM' },
];

const ChatWindow = ({ onClose = () => {} }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [messages, setMessages] = useState(mockMessages); // ใช้สำหรับ Map ข้อมูลข้อความ
    const [messageInput, setMessageInput] = useState('');

    // ⚙️ Logic Responsive: ตรวจสอบขนาดหน้าจอ
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 📐 กำหนด Style สำหรับการแสดงผล 1/3 (Desktop) หรือ 100% (Mobile)
    const containerStyle = {
        position: 'fixed',
        top: 0,
        right: 0,
        width: isMobile ? '100vw' : '33.33vw',
        height: '100vh',
        background: colors.neutral[1],
        zIndex: 1500,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isMobile ? 'none' : '-4px 0 16px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
    };


    // 💬 ฟังก์ชันจำลองการส่งข้อความ
    const handleSend = () => {
        if (messageInput.trim()) {
            const newMessage = {
                id: Date.now(),
                text: messageInput.trim(),
                sender: 'self',
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            };
            
            // 2. ✅ แก้ไข: ทำให้ Logic การส่งข้อความทำงานได้จริง
            setMessages(prev => [...prev, newMessage]); 
            
            setMessageInput('');

            // 💡 ถ้าต้องการให้ Scroll ลงไปด้านล่างสุดโดยอัตโนมัติ 
            // สามารถเพิ่ม Logic Scroll ได้ที่นี่ (ต้องใช้ useRef)
        }
    };

    // ------------------------------------------------------------------
    // 🧱 Chat Bubble Component
    // ------------------------------------------------------------------
    const ChatBubble = ({ message, sender, time }) => {
        const isSelf = sender === 'self';
        return (
            <div 
                style={{
                    display: 'flex',
                    justifyContent: isSelf ? 'flex-end' : 'flex-start',
                    marginBottom: 12,
                }}
            >
                <div 
                    style={{
                        maxWidth: '80%',
                        padding: '8px',
                        borderRadius: 16,
                        backgroundColor: isSelf ? colors.primary[1] : colors.neutral[3],
                        color: isSelf ? colors.neutral[1] : colors.character.primary,
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    }}
                >
                    <Text className="chat-message">
                    {message}
                    </Text>
                    <div style={{ fontSize: 10, textAlign: isSelf ? 'right' : 'left', marginTop: 4, color: colors.character.secondary }}>
                        {time}
                    </div>
                </div>
            </div>
        );
    };

    return (
    <>
        {/* Overlay ด้านนอก เอาไว้คลิกเพื่อปิด */}
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0,0,0,0.25)',
                zIndex: 1499,
            }}
        />

        {/* Chat Widget ด้านขวา */}
        <Layout style={containerStyle} onClick={(e) => e.stopPropagation()}>
            {/* 3. UI Header ที่ปรับปรุงแล้ว */}
            <Header style={{
                height: 56, // ปรับให้สูงขึ้นเล็กน้อย
                padding: '0 16px',
                background: colors.neutral[1],
                display: 'flex',
                alignItems: 'center',
                borderBottom: `1px solid ${colors.neutral[4]}`,
            }}>
                {isMobile && (
                <Button 
                    type="text" 
                    icon={<ArrowLeftOutlined />} 
                    onClick={onClose} 
                    style={{ 
                    marginRight: 8, 
                    color: colors.neutral[1], // 👈 กำหนดสีที่นี่ (ใช้สีที่คุณต้องการ)
                    }}
                />
                )}
                <Avatar 
                    size="small" 
                    style={{ 
                        backgroundColor: colors.geekBlue[6], 
                        marginRight: 10,
                        // ปรับ Line Height เพื่อให้ตัวอักษร 'U' อยู่ตรงกลาง Avatar มากขึ้น (ถ้าใช้ตัวอักษร)
                        lineHeight: '32px' 
                    }}
                >
                </Avatar>
                <Text strong style={{ color: colors.character.primary }}>Admin</Text>
            </Header>

            <Content style={{ padding: 16, overflowY: 'auto', flexGrow: 1, background: colors.neutral[2] }}>
                {messages.map(msg => (
                    <ChatBubble 
                        key={msg.id} 
                        message={msg.text} 
                        sender={msg.sender} 
                        time={msg.time} 
                    />
                ))}
            </Content>

            {/* 4. UI Footer ที่ปรับปรุงแล้ว */}
            <Footer style={{
                padding: 12,
                background: colors.neutral[1],
                borderTop: `1px solid ${colors.neutral[4]}`,
            }}>
                <Input.Group compact style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onPressEnter={handleSend}
                        placeholder="Type a message..."
                        style={{ 
                            flexGrow: 1, 
                            borderRadius: '18px', // ปรับให้ดูเป็นมิตรขึ้น
                            marginRight: '8px',
                            height: '36px',
                        }}
                    />
                    <Button 
                        type="primary"
                        icon={<SendOutlined />} 
                        onClick={handleSend}
                        disabled={!messageInput.trim()}
                        style={{ 
                            background: colors.geekBlue[5], 
                            borderColor: colors.geekBlue[5],
                            borderRadius: '50%', // เปลี่ยนเป็นวงกลม
                            width: '40px', 
                            height: '35px',
                            minWidth: 'unset',
                            padding: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    />
                </Input.Group>
            </Footer>
        </Layout>
    </>
    );
};

export default ChatWindow;