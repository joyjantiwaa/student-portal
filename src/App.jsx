import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 🔑 1. AUTH & CONTEXT IMPORTS 
import { AuthProvider, useAuth } from '@/features/auth/AuthContext';
import Login from '@/features/auth/Login';
import OnBoarding from '@/features/onboarding/OnBoarding';

// Context
import { ShortlistProvider } from '@/features/contexts/ShortlistContext';

// Import Component เดิม (Routes Content)
import EmptyDashboard from '@/features/dashboard/EmptyDashboard';
import CourseSearch from '@/features/course/CourseSearch';
import UserProfile from '@/features/studentprofile/UserProfile';
import ChangePasswordPage from '@/features/course/ChangePassword'; 
import UniversitySearch from '@/features/course/UniversitySearch';
import UniversityFairSearch from '@/features/course/UniversityFairSearch';
import ChatWindow from '@/features/components/Chat';
import CourseProfile from '@/features/course/CourseProfile';
import UniversityProfile from '@/features/course/UniversityProfile';
import UniversityFairProfile from '@/features/course/UniversityFairProfile';
import HowToUseGuide from '@/features/course/HowToUseGuide';
import Status from '@/features/course/Status';


// 🛡️ Component สำหรับการห่อหุ้มเส้นทางที่ต้องมีการเข้าสู่ระบบ (Protected Layout)
const ProtectedLayout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <div style={{ flexGrow: 1 }}> 
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
};

// 🏠 Component ที่รวมเส้นทาง Protected ทั้งหมด (เพื่อจัดการ OnBoarding/Dashboard)
const ProtectedRoutes = () => {
    const { isFirstTime } = useAuth();
    
    // หากเพิ่ง Sign Up/Login ครั้งแรก และยังไม่ทำ OnBoarding
    if (isFirstTime) {
        // ➡️ Flow: Sign Up หรือ Login ครั้งแรก และยังไม่เคยทำ OnBoarding
        return <OnBoarding />;
    }
    
    // หากทำ OnBoarding แล้ว ให้แสดง Dashboard Layout และ Routes ปกติ
    return (
        <ProtectedLayout>
            <Routes>
                {/* Dashboard (Home) */}
                <Route path="/" element={<EmptyDashboard />} />
                <Route path="/dashboard" element={<EmptyDashboard />} />

                {/* Status Detail */}
                <Route path="/status-detail" element={<Status />} />

                {/* User Profile */}
                <Route path="/update-profile" element={<UserProfile />} />
                <Route path="/update-password" element={<ChangePasswordPage />} />
                
                {/* How To Use Guide / Blogs */}
                <Route path="/blogs" element={<HowToUseGuide />} />

                {/* Course Search & Detail */}
                <Route path="/search-courses" element={<CourseSearch />} />
                <Route path="/course-profile/:courseId" element={<CourseProfile />} />

                {/* University Search & Detail */}
                <Route path="/universities" element={<UniversitySearch />} />
                <Route path="/university/:universityId" element={<UniversityProfile />} />

                {/* Events */}
                <Route path="/events" element={<UniversityFairSearch />} />
                <Route path="/fair/:id" element={<UniversityFairProfile />} />

                {/* Chat */}
                <Route path="/chat" element={<ChatWindow />} />
                
                {/* 🚨 Catch-all สำหรับ Protected Routes ที่ไม่ได้กำหนด (เช่น /onboarding เมื่อทำเสร็จแล้ว) */}
                {/* ถ้า isFirstTime เป็น false แล้ว แต่เข้า /onboarding จะถูกนำไปที่ Dashboard แทน */}
                <Route path="/onboarding" element={<Navigate to="/" replace />} />
            </Routes>
        </ProtectedLayout>
    );
};


// 🔄 Component หลักในการจัดการ Redirect
const AppRouter = () => {
    const { isAuthenticated, loading } = useAuth();
    
    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading application...</div>;
    }

    return (
        <Routes>
            {/* 1. Public Routes: Login / Register */}
            <Route 
                path="/login" 
                element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
            />
            <Route 
                path="/register" 
                element={isAuthenticated ? <Navigate to="/" replace /> : <Login registerMode={true} />} 
            />

            {/* 2. Protected Routes (รวม OnBoarding และ App ทั้งหมด) */}
            {/* เส้นทางหลัก "/*" จะเรียก ProtectedRoutes ซึ่งจะตัดสินใจว่าควรแสดง OnBoarding หรือ Dashboard */}
            <Route 
                path="/*" 
                element={isAuthenticated ? <ProtectedRoutes /> : <Navigate to="/login" replace />} 
            />

            {/* ❌ ลบ Route /onboarding ที่ซ้ำซ้อนออก */}
        </Routes>
    );
}

// 📦 App Wrapper
function App() {
    return (
        <AuthProvider>
            <ShortlistProvider>
                <Router>
                    <AppRouter />
                </Router>
            </ShortlistProvider>
        </AuthProvider>
    );
}

export default App;