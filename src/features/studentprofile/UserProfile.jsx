import React, { useState, useEffect } from 'react';
import {
    Typography,
    Menu,
    Button,
    Grid,
    Input,
    Radio,
    Select,
    DatePicker,
    Row,
    Col,
    Alert,
    Divider,
    Space,
    Form,
    message,
    Layout
} from 'antd';
import {
    CheckCircleFilled,
    QuestionCircleOutlined,
    UploadOutlined,
    PaperClipOutlined,
    DeleteTwoTone
} from '@ant-design/icons';
import colors from "@/features/designsystem/colors"; // Please ensure this import is correct
import Sidebar from "@/features/components/Sidebar";
import MenuBar from "@/features/components/MenuBar";
import AppFooter from "@/features/components/Footer";
import Avatar from "@/assets/images/Avatar.jpg";
import "antd/dist/antd.css";
import "@/App.css";


const { useBreakpoint } = Grid;
const { Title, Text } = Typography;
const { Option } = Select;
const { Content, Header, Footer, Sider } = Layout;

// --- Mock/Placeholder Data สำหรับ Profile Box ---
// ⚠️ ในแอปพลิเคชันจริง ข้อมูลนี้ควรมาจาก Props หรือ Context/Redux
const profileData = {
    name: "John Doe",            
    studentId: "12345678",        
    profileImageUrl: Avatar, // ใช้ Avatar ที่ import มา
};
// --- 0. Section Definitions ---
const sections = [
    { key: 'personal', title: 'Personal details' },
    { key: 'documents', title: 'Documents' },
    { key: 'education', title: 'Education background' }, // Target tab
    { key: 'password', title: 'Change password' }
];


// -----------------------------------------------------------
// 📌 Component ย่อย: DocumentItem (สำหรับ DocumentsForm)
// -----------------------------------------------------------
const DocumentItem = ({ label, isRequired = false }) => {
    const [file, setFile] = useState(null);
    const screens = useBreakpoint();
    const isMobile = screens.xs; // xs คือ breakpoint สำหรับมือถือ


    const handleUpload = () => {
        setFile({ name: `${label.replace(/[^a-zA-Z0-9]/g, '_')}_uploaded.pdf` });
    };


    const handleDelete = () => {
        setFile(null);
    };


    return (
        <div style={{ marginBottom: 24 }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: 12,
                paddingBottom: 12,
            }}>
                {/* 1. Document Label */}
                <Text style={{ fontSize: 14, color: colors.character.primary, flexGrow: 1 }}>
                    {label} {isRequired && <span style={{ color: 'red' }}>*</span>}
                </Text>


                {/* 2. Upload Button / Uploaded File Display */}
                {file ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                       
                        {/* 2A. กลุ่มคลิปและชื่อไฟล์ */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <PaperClipOutlined style={{ fontSize: 14, color: colors.character.secondary }} />
                            <Text style={{ fontSize: 14, color: colors.character.primary }}>
                                {file.name}
                            </Text>
                        </div>
                       
                        {/* 2B. ปุ่มถังขยะ */}
                        <DeleteTwoTone
                            style={{ fontSize: 16, cursor: 'pointer' }}
                            onClick={handleDelete}
                        />
                    </div>
                ) : (
                    // 🟡 สถานะ: รอการอัปโหลด
                    <Button
                        size="medium"
                        icon={<UploadOutlined style={{ fontSize: 14 }} />}
                        onClick={handleUpload}
                        style={{ border: `1px dashed ${colors.character.secondary}`, color: colors.character.secondary }}
                    >
                        Upload
                    </Button>
                )}
            </div>
           
            {/* 3. Underline */}
            <div style={{
                height: 1,
                backgroundColor: colors.conditional.divider,
                marginTop: 12
            }} />
        </div>
    );
};




// -----------------------------------------------------------
// 📌 Component หลักสำหรับ Tab Documents: DocumentsForm
// -----------------------------------------------------------
const DocumentsForm = ({ onNext }) => {
    const documentList = [
        { label: 'Passport', required: true },
        { label: 'Resume', required: false },
        { label: 'Mark sheet and pass certificates', required: true },
        { label: 'Letter of recomendation (LOR)', required: false },
        { label: 'Entrance Exam Scorecards (SAT, ACR, GRE, GMAT)', required: false },
        { label: 'Statement of Purpose', required: false },
        { label: 'Application confirmation copy', required: true },
        { label: 'Essays', required: false },
        { label: 'Proof of funds', required: false },
        { label: 'Research proposal/portfolio/project description', required: false },
        { label: 'Certificates for extra-curricular activities', required: false },
    ];


    const handleNext = () => {
        onNext();
    };


    return (
        <div style={{ margin: '24px auto', borderRadius: 12, backgroundColor: colors.neutral[1], padding: 0  }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 24, marginBottom: 0, borderBottom: `1px solid ${colors.neutral[2]}` }}>
                <div>
                    <Title level={4} style={{ margin: 0, color: colors.character.primary }}>Documents</Title>
                    <Text style={{ fontSize: 14, color: colors.character.secondary }}>
                        Update your documents here. Required documents are marked with *.
                    </Text>
                </div>
                <QuestionCircleOutlined style={{ fontSize: 16, color: colors.character.secondary }} />
            </div>


            <div style={{ padding: '24px' }}>
                <Alert
                    message="Note"
                    description="For the purpose of this demo, we assume all documents are uploaded when you click 'Next Section'."
                    type="info"
                    showIcon
                    style={{ marginBottom: 24 }}
                />


                {/* Document Items List */}
                <div>
                    {documentList.map((doc) => (
                        <DocumentItem
                            key={doc.label}
                            label={doc.label}
                            isRequired={doc.required}
                        />
                    ))}
                </div>


                {/* Next Section Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 24, borderTop: `1px solid ${colors.neutral[2]}` }}>
                    <Button type="primary" size="large"
                    onClick={() => {
                    message.success("Documents Completed!");
                    onNext();  
                    }}
                    >
                        Next Section
                    </Button>
                </div>
            </div>
        </div>
    );
};




// -----------------------------------------------------------
// 📌 NEW/UPDATED: Education Sub-Components
// -----------------------------------------------------------


const EducationItem = () => {
    const [transcriptFile, setTranscriptFile] = useState(null);


    const handleUploadTranscript = () => {
        setTranscriptFile({ name: 'My_Transcript_2024.pdf' });
    };


    const handleDeleteTranscript = () => {
        setTranscriptFile(null);
    };


    return (
        <div style={{ paddingBottom: 24, borderBottom: `1px solid ${colors.conditional.divider}`, marginBottom: 24  }}>
           
            {/* Row 1: Start Date, Finish Date, Institution */}
            <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
                <Col xs={24} md={8}>
                    <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Start date</Text>
                    <DatePicker size="large" style={{ width: '100%' }} picker="month" />
                </Col>
                <Col xs={24} md={8}>
                    <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Finish date</Text>
                    <DatePicker size="large" style={{ width: '100%' }} picker="month" />
                </Col>
                <Col xs={24} md={8}>
                    <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Institution</Text>
                    <Select size="large" placeholder="Select or type institution name" style={{ width: '100%' }} showSearch>
                        <Option value="uni_a">University A</Option>
                        <Option value="uni_b">University B</Option>
                    </Select>
                </Col>
            </Row>


            {/* Row 2: Level, Qualification, Major/Field of Study */}
            <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
                <Col xs={24} md={8}>
                    <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Level</Text>
                    <Select size="large" placeholder="Select level" style={{ width: '100%' }}>
                        <Option value="bachelor">Bachelor's</Option>
                        <Option value="master">Master's</Option>
                    </Select>
                </Col>
                <Col xs={24} md={8}>
                    <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Qualification</Text>
                    <Select size="large" placeholder="Select qualification" style={{ width: '100%' }}>
                        <Option value="eng">Engineering</Option>
                        <Option value="arts">Arts</Option>
                    </Select>
                </Col>
                <Col xs={24} md={8}>
                    <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Major/Field of Study</Text>
                    <Input size="large" placeholder="e.g. Computer Science" />
                </Col>
            </Row>


            {/* Row 3: Country/City, Grade */}
            <Row gutter={[12, 12]} style={{ marginBottom: 24 }}>
                <Col xs={24} md={8}>
                    <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Country/City</Text>
                    <Input size="large" placeholder="e.g. Bangkok, Thailand" />
                </Col>
                <Col xs={24} md={8}>
                    <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Grade</Text>
                    <Input size="large" placeholder="GPA or Grade" type="number" />
                </Col>
                <Col xs={24} md={8} /> {/* คอลัมน์ว่าง */}
            </Row>
           
            {/* Row 4: Transcript Upload */}
            <Row gutter={[12, 12]}>
                <Col xs={24} md={8}>
                    <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Transcript</Text>
                   
                    {transcriptFile ? (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 40, padding: '0 12px', borderRadius: 6 }}>
                            <Space size={8} style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                                <PaperClipOutlined style={{ fontSize: 14, color: colors.character.secondary }} />
                                <Text
                                    style={{ fontSize: 14, color: colors.character.primary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                                >
                                    {transcriptFile.name}
                                </Text>
                            </Space>
                            <DeleteTwoTone
                                twoToneColor="#EF4444"
                                style={{ fontSize: 16, cursor: 'pointer' }}
                                onClick={handleDeleteTranscript}
                            />
                        </div>
                    ) : (
                        <Button
                            size="medium"
                            type="default"
                            icon={<UploadOutlined />}
                            style={{ width: 'auto' }}
                            onClick={handleUploadTranscript}
                        >
                            Upload Transcript
                        </Button>
                    )}
                </Col>
                <Col xs={24} md={8} />
                <Col xs={24} md={8} />
            </Row>
        </div>
    );
};


const WorkExperienceItem = () => (
    <div style={{ paddingBottom: 24, borderBottom: `1px solid ${colors.conditional.divider}`, marginBottom: 24 }}>
       
        {/* Row 1: Start Date, Finish Date, Position */}
        <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
            <Col xs={24} md={8}>
                <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Start date</Text>
                <DatePicker size="large" style={{ width: '100%' }} picker="month" />
            </Col>
            <Col xs={24} md={8}>
                <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Finish date</Text>
                <DatePicker size="large" style={{ width: '100%' }} picker="month" />
            </Col>
            <Col xs={24} md={8}>
                <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Position</Text>
                <Input size="large" placeholder="e.g. Software Engineer" />
            </Col>
        </Row>


        {/* Row 2: Institution/Company */}
        <Row gutter={[12, 12]} align="bottom">
            <Col xs={24} md={8}>
                <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Institution/Company</Text>
                <Input size="large" placeholder="Company Name" />
            </Col>
            <Col xs={24} md={8} /> {/* กล่องว่าง */}
            <Col xs={24} md={8} /> {/* กล่องว่าง */}
        </Row>
    </div>
);


const EnglishProficiencyItem = () => (
    <div style={{ paddingBottom: 24, borderBottom: `1px solid ${colors.conditional.divider}`, marginBottom: 24 }}>
       
        {/* Row 1: Date, Test Type, Score */}
        <Row gutter={[12, 12]} style={{ marginBottom: 12 }}>
            <Col xs={24} md={8}>
                <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Date</Text>
                <DatePicker size="large" style={{ width: '100%' }} />
            </Col>
            <Col xs={24} md={8}>
                <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Test type</Text>
                <Select size="large" placeholder="Select test type" style={{ width: '100%' }}>
                    <Option value="toefl">TOEFL</Option>
                    <Option value="ielts">IELTS</Option>
                    <Option value="pte">PTE</Option>
                </Select>
            </Col>
            <Col xs={24} md={8}>
                <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Score</Text>
                <Input size="large" placeholder="Score (e.g. 7.5)" type="number" />
            </Col>
        </Row>
    </div>
);




// -----------------------------------------------------------
// 📌 NEW: Education Background Main Form (Replaces Placeholder)
// -----------------------------------------------------------
const EducationBackgroundForm = ({ onNext }) => {
    const [counts, setCounts] = useState({
        education: 1,
        work: 1,
        english: 1,
    });

    const handleAdd = (key) => {
        setCounts(prev => ({ ...prev, [key]: prev[key] + 1 }));
    };

    const handleRemove = (key) => {
        setCounts(prev => ({ ...prev, [key]: Math.max(1, prev[key] - 1) }));
    };

    const handleSaveAndNext = () => {
        // ในแอปจริงจะมี validation + save data
        onNext();
    };

    const renderItems = (key, Component) => (
        <>
            {Array.from({ length: counts[key] }).map((_, index) => (
                <Component key={index} />
            ))}
            <Space>
                <Button type="primary" size="medium" onClick={() => handleAdd(key)}>Add new {key.charAt(0).toUpperCase() + key.slice(1)}</Button>
                {counts[key] > 1 && (
                    <Button type="primary" danger size="medium" onClick={() => handleRemove(key)}>Delete Last</Button>
                )}
            </Space>
        </>
    );

    return (
        <div style={{ margin: '24px auto', borderRadius: 12, backgroundColor: colors.neutral[1], padding: 0 }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 24, borderBottom: `1px solid ${colors.neutral[2]}` }}>
                <div>
                    <Title level={4} style={{ margin: 0, color: colors.character.primary }}>Education Background</Title>
                    <Text style={{ fontSize: 14, color: colors.character.secondary }}>
                        Update your academic history, work experience, and English proficiency.
                    </Text>
                </div>
                <QuestionCircleOutlined style={{ fontSize: 16, color: colors.character.secondary }} />
            </div>

            <div style={{ padding: '24px' }}>
                {/* 1. Academic History */}
                <div style={{ marginBottom: 32 }}>
                    <Title level={5} style={{ margin: '0 0 16px 0', color: colors.character.primary }}>1. Academic History</Title>
                    {renderItems('education', EducationItem)}
                </div>

                <Divider style={{ margin: '24px 0' }} />

                {/* 2. Work Experience */}
                <div style={{ marginBottom: 32 }}>
                    <Title level={5} style={{ margin: '0 0 16px 0', color: colors.character.primary }}>2. Work Experience</Title>
                    {renderItems('work', WorkExperienceItem)}
                </div>

                <Divider style={{ margin: '24px 0' }} />

                {/* 3. English Proficiency */}
                <div style={{ marginBottom: 32 }}>
                    <Title level={5} style={{ margin: '0 0 16px 0', color: colors.character.primary }}>3. English Proficiency Score</Title>
                    {renderItems('english', EnglishProficiencyItem)}
                </div>

                {/* Next Section Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 24, borderTop: `1px solid ${colors.neutral[2]}` }}>
                    <Button type="primary" size="large" onClick={handleSaveAndNext}>Save</Button>
                </div>
            </div>
        </div>
    );
};


// --- 3. Personal Details Form Component (REMAINS THE SAME) ---
const PersonalDetailsForm = ({ onNext }) => {
   
    // 🟢 State ของฟอร์ม
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState('male');
    const [dob, setDob] = useState(null); // Moment object
    const [nationality, setNationality] = useState(undefined); // undefined for Select
    const [passportNo, setPassportNo] = useState('');
   
    // State สำหรับฟิลด์ที่ไม่จำเป็นสำหรับการทดสอบ
    const [correspondence, setCorrespondence] = useState('');
    const [permanent, setPermanent] = useState('');
    const [mobile, setMobile] = useState('');
    const [enrolment, setEnrolment] = useState(null);
    const [funding, setFunding] = useState('self');
    const [disability, setDisability] = useState('no');
    const [criminal, setCriminal] = useState('no');


    const [error, setError] = useState(''); // 🚨 Added Error State


    const handleNext = () => {
        // ตรวจสอบว่ากรอก field จำเป็นหรือไม่: 5 fields
        // ⚠️ การตรวจสอบสำหรับ DatePicker (dob) ต้องตรวจสอบว่าไม่ใช่ null
        if (!!firstName && !!surname && !!dob && !!nationality && !!passportNo) {
            setError('');
            // 💡 เรียก onNext() เพื่อให้ parent component เปลี่ยนไปยัง Tab/Menu ถัดไป
            onNext();
        } else {
            // 🚨 แสดงข้อความแจ้งเตือนเมื่อฟอร์มไม่สมบูรณ์
            setError("Please fill all required fields: First name, Surname, Date of Birth, Nationality, and Passport No.");
        }
    }


    return (
        // <div> Container หลัก: Box Form (สีเทาอ่อน)
        <div style={{ margin: '24px auto', borderRadius: 12, backgroundColor: colors.neutral[1], padding: 0 }}>
           
            {/* 1. Profile Box (ส่วนบน 60% White) */}
            <div style={{
            background: `linear-gradient(to bottom,
                rgba(238, 174, 202, 1) 0%, /* Start: Gradient Color 1 */    
                rgba(148, 187, 233, 1) 30%, /* End: Gradient Color 2 ที่ 40% */
                white 30%,    /* Start: White ที่ 40% */
                white 100%    /* End: White ที่ 100% */
            )`,
               
                // Style Layout/Sizing
                padding: '24px',
                display: 'flex',
                flexDirection: 'row', // 💡 เปลี่ยนเป็น column เพื่อให้เนื้อหาอยู่ด้านบน
                alignItems: 'center',
                gap: '24px',
               
                width: '100%',
                borderRadius: '12px',
                minHeight: '200px', // กำหนดความสูงขั้นต่ำเพื่อเห็น Gradient
            }}>
                {/* 2. ส่วนขวา: รูปภาพ */}
                <div style={{ marginLeft: '24px' }}>
                    <img
                        src={profileData.profileImageUrl}
                        alt="Profile"
                        style={{
                            width: '158px',
                            height: '158px',
                            borderRadius: '100px',
                            objectFit: 'cover',
                            border: '4px solid #fff'
                        }}
                    />
                </div>
                {/* 3. ส่วนซ้าย: ชื่อและรหัสนักศึกษา */}
                <div style={{ flexGrow: 1 }}>
                    {/* ชื่อ นามสกุล (30px, semibold) */}
                    <div style={{
                        fontSize: '30px',
                        fontWeight: '600',
                        color: colors.character.primary,
                        marginBottom: '4px'
                    }}>
                        {profileData.name} {/* ⬅️ ใช้ profileData.name */}
                    </div>
                    {/* Student ID (auto generate) */}
                    <div style={{
                        fontSize: '16px',
                        color: colors.character.secondary
                    }}>
                        {profileData.studentId} {/* ⬅️ ใช้ profileData.studentId */}
                    </div>
                </div>
            </div>


            {/* 2. Header ของ Section: Personal details */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 24,
                marginBottom: 0,
                borderBottom: `1px solid ${colors.neutral[2]}`
            }}>
                <div>
                    <Title level={4} style={{ margin: 0, color: colors.character.primary }}>Personal details</Title>
                    <Text style={{ fontSize: 14, color: colors.character.secondary }}>
                        Update your photo and personal details here. Fields marked with * are required.
                    </Text>
                </div>
                <QuestionCircleOutlined style={{ fontSize: 16, color: colors.character.secondary }} />
            </div>


            {/* 3. Form Content */}
            <div style={{ padding: '24px' }}>
                {error && (
                    <Alert
                        message="Required fields missing"
                        description={error}
                        type="error"
                        showIcon
                        closable
                        onClose={() => setError('')}
                        style={{ marginBottom: 24 }}
                    />
                )}


                {/* 1. Name & Gender */}
                <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                    <Col xs={24} md={8}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>First name *</Text>
                        <Input size="large" placeholder="Firstname" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </Col>
                    <Col xs={24} md={8}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Surname *</Text>
                        <Input size="large" placeholder="Surname" value={surname} onChange={e => setSurname(e.target.value)} />
                    </Col>
                    <Col xs={24} md={8}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Gender</Text>
                        <Radio.Group value={gender} onChange={e => setGender(e.target.value)} size="large">
                            <Radio value="female">Female</Radio>
                            <Radio value="male">Male</Radio>
                        </Radio.Group>
                    </Col>
                </Row>


                {/* 2. Date of Birth, Nationality, Passport No. */}
                <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                    <Col xs={24} md={8}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Date of birth *</Text>
                        <DatePicker size="large" style={{ width: '100%' }} value={dob} onChange={date => setDob(date)} />
                    </Col>
                    <Col xs={24} md={8}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Nationality *</Text>
                        <Select size="large" placeholder="Select country" style={{ width: '100%' }} value={nationality} onChange={value => setNationality(value)}>
                            <Select.Option value="th">Thailand</Select.Option>
                            <Select.Option value="uk">United Kingdom</Select.Option>
                        </Select>
                    </Col>
                    <Col xs={24} md={8}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Passport No. *</Text>
                        <Input size="large" placeholder="A1234567" value={passportNo} onChange={e => setPassportNo(e.target.value)} />
                    </Col>
                </Row>
               
                {/* 3. Addresses & Mobile Number (Optional for completion logic) */}
                <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                    <Col xs={24} md={8}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Correspondence address</Text>
                        <Input.TextArea size="large" rows={4} placeholder="Current Address" value={correspondence} onChange={e => setCorrespondence(e.target.value)} style={{ height: 120 }} />
                    </Col>
                    <Col xs={24} md={8}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Permanent address</Text>
                        <Input.TextArea size="large" rows={4} placeholder="Permanent Address" value={permanent} onChange={e => setPermanent(e.target.value)} style={{ height: 120 }} />
                    </Col>
                    <Col xs={24} md={8}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Mobile number</Text>
                        <Input placeholder="Phone Number"
                                        size="large"
                                        addonBefore={
                                          <select>
                                            <option value="+66">+66</option>
                                            <option value="+1">+1</option>
                                          </select>
                                        } value={mobile} onChange={e => setMobile(e.target.value)} />
                    </Col>
                </Row>


                {/* 4. Funding Sources Header */}
                <Title level={4} style={{ margin: '32px 0 16px', color: colors.character.primary }}>
                    Funding Sources
                </Title>


                {/* 5. Enrolment, Funding, Disability */}
                <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                    <Col xs={24} md={8}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Enrolment year</Text>
                        <DatePicker picker="year" size="large" style={{ width: '100%' }} value={enrolment} onChange={date => setEnrolment(date)} />
                    </Col>
                    <Col xs={24} md={8}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Funding type</Text>
                        <Radio.Group value={funding} onChange={e => setFunding(e.target.value)} size="large">
                            <Radio value="scholarship">Scholarship</Radio>
                            <Radio value="self">Self funded</Radio>
                        </Radio.Group>
                    </Col>
                    <Col xs={24} md={8}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Disability</Text>
                        <Radio.Group value={disability} onChange={e => setDisability(e.target.value)} size="large">
                            <Radio value="yes">Yes</Radio>
                            <Radio value="no">No</Radio>
                        </Radio.Group>
                    </Col>
                </Row>


                {/* 6. Criminal Record */}
                <Row gutter={[24, 24]} style={{ marginBottom: 48 }}>
                    <Col xs={24} md={8}>
                        <Text style={{ fontSize: 14, color: colors.character.primary, display: 'block', marginBottom: 8 }}>Criminal record</Text>
                        <Radio.Group value={criminal} onChange={e => setCriminal(e.target.value)} size="large">
                            <Radio value="yes">Yes</Radio>
                            <Radio value="no">No</Radio>
                        </Radio.Group>
                    </Col>
                </Row>


                {/* 7. Next Section Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 24, borderTop: `1px solid ${colors.neutral[2]}` }}>
                    <Button type="primary" size="large" onClick={handleNext}>Next Section</Button>
                </div>
            </div>
        </div>
    );
};




const UserProfile = () => {
  // ---------- RESPONSIVE ----------
  const [screenSize, setScreenSize] = useState(() => {
    if (typeof window !== "undefined") {
      const w = window.innerWidth;
      if (w < 768) return "mobile";
      if (w < 1200) return "tablet";
    }
    return "desktop";
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) setScreenSize("mobile");
      else if (w < 1200) setScreenSize("tablet");
      else setScreenSize("desktop");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenSize === "mobile";

  // ---------- STATE ----------
  const [activeKey, setActiveKey] = useState("personal");
  const [formCompletion, setFormCompletion] = useState({
    personal: false,
    documents: false,
    education: false,
    // password จะไม่เช็ค
  });

  const sections = [
    { key: "personal", title: "Personal Details" },
    { key: "documents", title: "Documents" },
    { key: "education", title: "Education" },
  ];

  const handleSectionComplete = (key) => {
    setFormCompletion((prev) => {
      const updated = { ...prev, [key]: true };
      const requiredSections = ["personal", "documents", "education"];
      const allRequiredCompleted = requiredSections.every((sec) => updated[sec]);
      localStorage.setItem("isProfileCompleted", allRequiredCompleted ? "true" : "false");

      // Move to next section
      const currentIndex = sections.findIndex((s) => s.key === key);
      if (currentIndex < sections.length - 1) setActiveKey(sections[currentIndex + 1].key);

      return updated;
    });
  };

  const getContent = (key) => {
    switch (key) {
      case "personal":
        return <PersonalDetailsForm onNext={() => handleSectionComplete("personal")} />;
      case "documents":
        return <DocumentsForm onNext={() => handleSectionComplete("documents")} />;
      case "education":
        return <EducationBackgroundForm onNext={() => handleSectionComplete("education")} />;
      default:
        return null;
    }
  };

  // ---------- JSX ----------
  return (
    <Layout style={{ minHeight: "100vh", position: "relative" }}>
      {/* Sidebar Desktop Only */}
      {!isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: 47,
            zIndex: 3000,
            backgroundColor: colors.conditional.pageBackground,
          }}
        >
          <Sidebar mobileMode={false} />
        </div>
      )}

      <Layout
        style={{
          marginLeft: isMobile ? 0 : 47,
          width: "100%",
          transition: "0.3s",
        }}
      >
        {/* Top Menu Bar */}
        <MenuBar isMobile={isMobile} />

        <Content style={{ minHeight: "calc(100vh - 70px)" }}>
          <div style={{  backgroundColor: "#f9fafb", minHeight: "100%"}}>
            <div style={{ maxWidth: 1280, margin: "0 auto" }}>
              {/* Header */}
              <div style={{ backgroundColor: "white", padding: '24px 24px 0px 24px', marginBottom: 24 }}>
                <Title level={4} style={{marginLeft: '20px'}}>My Profile</Title>
                <Menu mode="horizontal" selectedKeys={[activeKey]} onClick={(e) => setActiveKey(e.key)}>
                  {sections.map((sec) => (
                    <Menu.Item key={sec.key}>
                      {formCompletion[sec.key] && (
                        <CheckCircleFilled style={{ marginRight: 8, color: colors.character.success }} />
                      )}
                      {sec.title}
                    </Menu.Item>
                  ))}
                </Menu>
              </div>

              {/* Form Content */}
              <div style={{ background: "white", borderRadius: 12, margin: 24 }}>
                {getContent(activeKey)}
              </div>
            </div>
          </div>
        </Content>

        {/* Footer */}
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default UserProfile;