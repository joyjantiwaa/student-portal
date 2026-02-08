import React, { createContext, useContext, useState, useEffect } from 'react';
import { message } from 'antd'; 

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(true); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const onboardingStatus = localStorage.getItem('onboardingComplete');
        
        if (token) {
            setIsAuthenticated(true);
            // 💡 โหลดสถานะ Onboarding ตามจริง
            setIsFirstTime(onboardingStatus !== 'true'); 
        } else {
            setIsAuthenticated(false);
            setIsFirstTime(true); 
        }

        setLoading(false);
    }, []);

    // 1. 🔑 ฟังก์ชันสำหรับ SIGN IN (เข้าสู่ระบบปกติ) - FORCE TO DASHBOARD
    const login = (userData) => {
        localStorage.setItem('authToken', 'fake-jwt-token');
        // ⚠️ เมื่อ Login สำเร็จ ให้ถือว่าไม่ใช่ครั้งแรกเสมอ
        // เพื่อข้าม OnBoarding และไป Dashboard ทันที
        localStorage.setItem('onboardingComplete', 'true'); // บังคับว่าทำแล้ว
        
        setIsAuthenticated(true);
        setIsFirstTime(false); // ⬅️ กำหนดให้เป็น FALSE เสมอ
        
        message.success("Login Successful! Redirecting to Dashboard.");
        // ➡️ Router จะพาไป Dashboard (เพราะ isFirstTime เป็น false)
    };

    // 2. 📝 ฟังก์ชันสำหรับ SIGN UP (ลงทะเบียน) - FORCE TO ONBOARDING
    const registerAndLogin = (userData) => {
        localStorage.setItem('authToken', 'fake-jwt-token');
        localStorage.removeItem('onboardingComplete'); // เคลียร์สถานะเก่า
        
        setIsAuthenticated(true);
        setIsFirstTime(true); // ⬅️ กำหนดให้เป็น TRUE เสมอ
        
        message.success("Registration Successful! Starting Onboarding...");
        // ➡️ Router จะพาไป OnBoarding (เพราะ isFirstTime เป็น true)
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        // ไม่ลบ 'onboardingComplete'
        setIsAuthenticated(false);
        setIsFirstTime(true); 
        message.info("Logged Out.");
    };
    
    const completeOnboarding = () => {
        localStorage.setItem('onboardingComplete', 'true');
        setIsFirstTime(false);
        message.success("Onboarding Complete! Welcome.");
    };

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            isFirstTime,
            loading,
            login,              
            registerAndLogin,   
            logout,
            completeOnboarding
        }}>
            {children}
        </AuthContext.Provider>
    );
};