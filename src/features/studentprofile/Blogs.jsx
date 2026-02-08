import React, { useState } from "react";
import { Typography, Button } from "antd"; 
import { 
    CopyOutlined, TwitterSquareFilled, FacebookFilled, LinkedinFilled
} from '@ant-design/icons';
import img from "@/assets/images/img.jpg";
import imgs from "@/assets/images/img-1.jpg";
import image from "@/assets/images/image.jpg";
import img2 from "@/assets/images/img2.jpg";
import colors from "@/features/designsystem/colors"; // Assuming external color path
import "antd/dist/antd.css";
import "@/App.css";
import { Bold } from "lucide-react";


const { Title, Text } = Typography;


export default function Blog() {
    
  const [activeKey, setActiveKey] = useState("guide");
  // กำหนดให้เริ่มต้นที่ null เพื่อให้แสดง Guide Index ก่อน
  const [activeSubKey, setActiveSubKey] = useState(null); 
  // Expanded state is used to toggle the active parent menu's submenu visibility
  const [expanded, setExpanded] = useState(true);

  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 720);

  const sections = [
    { key: "guide", title: "Guide", isToggle: true },
    { key: "visa", title: "Student Visa Application Service" },
    { key: "contact", title: "Contact Us", isToggle: true }, // Contact Us สามารถ Toggle ได้
  ];

  // เมนูย่อยสำหรับ Guide
  const subMenusGuide = [
    { key: "uk", title: "UK university application process" },
    { key: "si", title: "How to use the SI-UK application platform" },
  ];
    
  // เมนูย่อยสำหรับ Contact Us
  const subMenusContact = [
    { key: "ab", title: "About us" },
    { key: "ct", title: "General Contact" }, // เปลี่ยน title เป็น General Contact เพื่อไม่ให้ซ้ำกับเมนูหลัก
  ];

  // Helper function to get the current submenu list
  const getSubMenus = (key) => {
      if (key === 'guide') return subMenusGuide;
      if (key === 'contact') return subMenusContact;
      return [];
  };


  // LOGIC: การแสดงผลเนื้อหาสำหรับเมนูย่อยทั้งหมด
  const renderContent = () => {
    // รวม activeKey และ activeSubKey เพื่อกำหนดเนื้อหาที่ชัดเจน
    // ถ้า activeSubKey เป็น null จะใช้ 'index' เป็น suffix
    const contentKey = activeKey + "_" + (activeSubKey || 'index'); 

    switch (contentKey) {
      // --- Guide Submenu Contents ---
      case "guide_uk":
        return (
          <>
              <Text style={{ color: colors.primary[6], fontSize: "14px", display: "block", textAlign: 'center' }}>
                  Published 20 Jan 2022
              </Text>
              <Title level={1} style={{ color: colors.character.primary, marginTop: "8px", textAlign: 'center' }}>
                  UK University application process
              </Title>
              <Text style={{ textAlign: 'center', fontSize: "14px", color: colors.character.secondary, display: "block", marginTop: "8px", marginBottom: "48px" }}>
                How do you create compelling presentations that wow your colleagues and impress your managers?              
              </Text>
              {/* Simplified content view when a submenu is selected */}
              <div></div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            1.Complete your profile
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            Fill in your personal profile, including information on travel and immigration, education and work history, so your consultant is able to complete your application quickly later on.
                        </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            2.Upload documents
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            Upload as many relevant documents as possible, such as high school transcripts, IELTS scores and passport details, so we can process your application smoothly.                    </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            3.Search courses and universities
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            Fill in your personal profile, including information on travel and immigration, education and work history, so your consultant is able to complete your application quickly later on.                    </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            4.Request applications
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            Fill in your personal profile, including information on travel and immigration, education and work history, so your consultant is able to complete your application quickly later on.
                        </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            5.Application management
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            Fill in your personal profile, including information on travel and immigration, education and work history, so your consultant is able to complete your application quickly later on.
                        </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            6.Receive your university offer
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            Fill in your personal profile, including information on travel and immigration, education and work history, so your consultant is able to complete your application quickly later on.
                        </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, borderBottom: `1px solid ${colors.conditional.divider}`, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            7.Secure your visa
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            Fill in your personal profile, including information on travel and immigration, education and work history, so your consultant is able to complete your application quickly later on.
                        </Text>
                </div>
                <div style={{ display: 'flex', marginTop: '24px', gap: '12px'}}>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<CopyOutlined style={{ fontSize: 14 }} />}
                    >
                        Upload
                    </Button>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<TwitterSquareFilled style={{ fontSize: 14 }} />}
                    >
                    </Button>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<FacebookFilled style={{ fontSize: 14 }} />}
                    >
                    </Button>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<LinkedinFilled style={{ fontSize: 14 }} />}
                    >
                    </Button>
                </div>
          </>
        );

      case "guide_si":
        return (
          <>
              <Text style={{ color: colors.primary[6], fontSize: "14px", display: "block", textAlign: 'center' }}>
                  Published 20 Jan 2022
              </Text>
              <Title level={1} style={{ color: colors.character.primary, marginTop: "8px", textAlign: 'center' }}>
                  How to use the SI-UK Application Platform
              </Title>
              <Text style={{ textAlign: 'center', fontSize: "14px", color: colors.character.secondary, display: "block", marginTop: "8px", marginBottom: "48px" }}>
                How do you create compelling presentations that wow your colleagues and impress your managers?              
              </Text>
              {/* Simplified content view when a submenu is selected */}
              <div></div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            Step 1 Filling out your profile
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            Before searching for courses you first must complete your personal profile.
                            <br></br><br></br>
                            Each student profile has the following sections: Personal Details, Travel & Immigration, Education, Work Details and Documents.
                            <br></br><br></br>
                            <p style={{fontWeight: '600'}}>Please visit each tab and fill in the required information. Once a section has been updated with the required information, a green tick will appear next to it in the menu.</p>

                            You may return to edit sections once they are completed if you wish.
                        </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            Step 2 Uploading your documents
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            Within the ‘Documents’ section you can upload all relevant documents which are required for your application.
                            To upload application documents, click the “Documents” tab. Here you will be able to upload each document in the relevant section. There is an “Other” section for any documents that may not fit in the provided sections.
                            <br></br><br></br>
                            Please note: In order to submit an application, all required information from the student profile must be completed, and all necessary documents must be uploaded.                        
                        </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            3.Search courses and universities
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            You can search over 65,000 courses within the ‘Course search’ section.
                            Course search tips
                            <br></br><br></br>
                            1. For subjects, you can start typing to pull up suggested subjects from the dropdown list.<br></br>
                            2. You can also type in subjects that may not appear in the list, for example here is “sport management” typed in.<br></br>
                            3. Universities are listed alphabetically by their official names, so “University of Bristol” is under the “U” section, as are many others.<br></br>
                            4. You can also find a university through autosuggest, by starting to type its name, for example with University College London below.<br></br>
                            5. You can further refine your course search by selecting additional filters under ‘Advanced options’.<br></br>                        
                        </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            Step 4 Shortlisting courses
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            You can shortlist all courses you are interested in studying by clicking ‘Add to shortlist’. This will allow your consultant to build up a database of courses you wish to study which can then be revisited.
                        </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            Step 5 Applying for courses
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            Once you have finished shortlisting courses, they will appear at the top of the ‘Apply’ section. Each shortlisted course will have the option to submit an application or be deleted from the list.
                            <br></br><br></br>
                            Please note: In order to submit an application request, all required information from the student profile must be completed, and all necessary documents must be uploaded.
                            <br></br><br></br>
                            Once all necessary information has been added to a student’s profile, the “Apply” button will become active.
                            To request an application for a shortlisted course, click the “Apply” button. When the button is clicked, it will notify your consultant that this student wishes to apply for the course. The buttons will be replaced by green text saying “Application pending”.
                        </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            Step 6 Tracking your applications
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            Your consultant will now track your application from beginning to end, contacting you if any further information is required, and letting you know if your application has been accepted or rejected.
                        </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            Step 7 Receiving offers
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            After a period of time you will receive a number of offers, and you may now consider what you would like to study with a firm list of interested universities in front of you.
                        </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            Step 8 Choosing your programme
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            You now need to select which programme you wish to study. Things to consider include:
                            <br></br><br></br>
                            1. Reputation and ranking for the course<br></br>
                            2. Course structure and modules and timetable<br></br>
                            3. Study abroad, placement or a year in industry opportunities<br></br>
                            4. Employability prospects<br></br>
                        </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, borderBottom: `1px solid ${colors.conditional.divider}`, }}>
                        <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                            Step 9 Visa support and assistance
                        </Title>
                        <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                            Once your place on a UK university course is confirmed, you will now need to apply for a Student Visa.
                            <br></br><br></br>
                            SI-UK's visa consultant is registered with the Home Office OISC* (Office of the Immigration Services Commissioner) and has extensive knowledge of the latest immigration legislation, rules and regulations.
                            <br></br><br></br>
                            SI-UK’s Student Visa team offers advice and assistance to international students wishing to obtain the following visa types:
                            <br></br><br></br>
                            1. Student visa<br></br>
                            2. Child Student visa<br></br>
                            3. Short-term study visa (for English language courses lasting longer than 6 months)<br></br>
                        </Text>
                </div>
                <div style={{ display: 'flex', marginTop: '24px', gap: '12px'}}>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<CopyOutlined style={{ fontSize: 14 }} />}
                    >
                        Upload
                    </Button>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<TwitterSquareFilled style={{ fontSize: 14 }} />}
                    >
                    </Button>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<FacebookFilled style={{ fontSize: 14 }} />}
                    >
                    </Button>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<LinkedinFilled style={{ fontSize: 14 }} />}
                    >
                    </Button>
                </div>
          </>
        );

      case "guide_index":
        return (
          <>
              <Text style={{ color: colors.primary[6], fontSize: "14px", display: "block",textAlign: 'center' }}>
                  Published 20 Jan 2022
              </Text>

              <Title level={1} style={{ color: colors.character.primary, marginTop: "8px",textAlign: 'center' }}>
                  Guide
              </Title>

              <Text style={{ textAlign: 'center', fontSize: "14px", color: colors.character.secondary, display: "block", marginTop: "8px", marginBottom: "32px" }}>
                  Learn to navigate seamlessly, find courses, explore universities, and access valuable resources.
              </Text>
             
              {/* Article 1 */}
              <div
                  className="article-card" // Used for responsive styling below
                  onClick={() => setActiveSubKey("uk")}
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column": "row-reverse",
                    gap: "24px",
                    alignItems: "flex-start",
                    borderTop: `1px solid ${colors.conditional.divider}`,
                    padding: "24px",
                    marginTop: "24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "box-shadow 0.3s, background 0.3s",
                    background: "#fff",
                }}
              >
                  <img
                      src={img}
                      alt="UK application"
                      style={{
                          width:isMobile ? "100%":"272px",
                          height:isMobile ? "100%": "154px",
                          objectFit: "cover",
                          flexShrink: 0
                      }}
                  />
                  <div style={{ flex: 1 }}>
                      <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                          UK university application process
                      </Title>
                      <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                          Get expert tips on selecting universities, preparing materials, and meeting requirements. From personal statements to reference letters, we've got you covered.
                      </Text>
                  </div>
              </div>

              {/* Article 2 */}
              <div
                  className="article-card" // Used for responsive styling below
                  onClick={() => setActiveSubKey("si")}
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column": "row-reverse",
                    gap: "24px",
                    alignItems: "flex-start",
                    borderTop: `1px solid ${colors.conditional.divider}`,
                    padding: "24px",
                    marginTop: "24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "box-shadow 0.3s, background 0.3s",
                    background: "#fff",
                }}
              >
                  <img
                      src={imgs}
                      alt="SI Platform"
                      style={{
                          width:isMobile ? "100%":"272px",
                          height:isMobile ? "100%": "154px",
                          objectFit: "cover",
                          flexShrink: 0
                      }}
                  />
                  <div style={{ flex: 1 }}>
                      <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                          How to use the SI-UK application platform
                      </Title>
                      <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                          Learn how to create an account, search for educational opportunities, and apply for courses and scholarships.
                      </Text>
                </div>
              </div>
          </>
        );


      // --- Visa Content (Default for non-toggleable) ---
      case "visa_index":
      case "visa_null":
        return (
          <>
              <Text style={{ color: colors.primary[6], fontSize: "14px", display: "block", textAlign: 'center' }}>
                  Published 20 Jan 2022
              </Text>
              <Title level={1} style={{ color: colors.character.primary, marginTop: "8px", textAlign: 'center' }}>
                  Student Visa Application Service
              </Title>
              <Text style={{ textAlign: 'center', fontSize: "14px", color: colors.character.secondary, display: "block", marginTop: "8px", marginBottom: "48px" }}>
                How do you create compelling presentations that wow your colleagues and impress your managers?              
              </Text>
                <div style={{ flex: 1, paddingBottom: 32 }}>
                <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                    Our Core Services
                </Title>
                <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                    Our service covers every component of the visa application process, ensuring the highest possible success rate:
                </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32 }}>
                <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                    1. Detailed Document Verification
                </Title>
                <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                    We meticulously check all your essential documents (e.g., passport, financial evidence, Confirmation of Acceptance for Studies (CAS), language test scores) to ensure they are complete, accurate, and comply with the latest requirements set by the embassy or immigration authorities.
                </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32 }}>
                <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                    2. Application Filing and Submission
                </Title>
                <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                    Our expert team will accurately assist you in filling out the official online visa application forms, helping you avoid minor technical errors or inconsistencies that could potentially lead to visa refusal.
                </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32 }}>
                <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                    3. Interview Preparation (If Required)
                </Title>
                <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                    Should the destination country require a visa interview, we provide in-depth guidance and conduct real interview simulations. This ensures you are thoroughly prepared and confident in answering the officer's questions naturally and clearly.
                </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32 }}>
                <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                    4. Management and Status Tracking
                </Title>
                <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                    We assist with managing document submission appointments and queues, and we closely monitor your application status every step of the way until you receive the final visa approval.
                </Text>
                </div>
                <div style={{ flex: 1, paddingBottom: 32, borderBottom: `1px solid ${colors.conditional.divider}`, }}>
                <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                    Contact Us
                </Title>
                <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                    Ready to start your journey toward studying abroad? If you require more information regarding our service fees or wish to schedule a dedicated student visa consultation appointment, please select the "General Contact" menu to reach our team immediately.
                </Text>
                </div>
                <div style={{ display: 'flex', marginTop: '24px', gap: '12px'}}>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<CopyOutlined style={{ fontSize: 14 }} />}
                    >
                        Upload
                    </Button>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<TwitterSquareFilled style={{ fontSize: 14 }} />}
                    >
                    </Button>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<FacebookFilled style={{ fontSize: 14 }} />}
                    >
                    </Button>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<LinkedinFilled style={{ fontSize: 14 }} />}
                    >
                    </Button>
                </div>
          </>
        );
        
      // --- Contact Submenu Contents ---
      case "contact_ab":
        return (
          <>
              <Text style={{ color: colors.primary[6], fontSize: "14px", display: "block", textAlign: 'center' }}>
                  Published 20 Jan 2022
              </Text>
              <Title level={1} style={{ color: colors.character.primary, marginTop: "8px", textAlign: 'center' }}>
                  About us
              </Title>
              <Text style={{ textAlign: 'center', fontSize: "14px", color: colors.character.secondary, display: "block", marginTop: "8px", marginBottom: "48px" }}>
                SI-UK is the leading provider of free, independent advice and support to international students applying to study in the UK.            
              </Text>
              <div style={{ flex: 1, paddingBottom: 32, borderBottom: `1px solid ${colors.conditional.divider}`, }}>
                <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                    Move Forward, Be Great
                </Title>
                <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                    Established in 2006, each year SI-application assists hundreds of thousands of international students to join UK universities, reach target IELTS scores and secure scholarships and visas. In 2021, our global offices sent over 130,000 applications to UK universities with a 98% success rate of getting students into their dream university.
                    <br></br><br></br>
                    No matter which level of higher education you wish to study, we have a support team and a service to suit you.
                    <br></br><br></br>
                    A free consultation online or in-person will help you find the right university to apply to, along with advice on how best to fill in your application form. The Premium Service will guarantee you an offer from at least one UK university, while specialist services in Medicine, Art and applying to Oxbridge are also available.
                    <br></br><br></br>
                    We believe every student is unique, coming from different academic, cultural and social backgrounds and, as such, our services are finely tailored to ensure your success.
                    <br></br><br></br>
                    SI-applications celebrated its 15th anniversary in 2021 and, looking to the future, we pledge to help many more international students from all over the world realise their dream of studying in the UK.
                </Text>
                </div>
                <div style={{ display: 'flex', marginTop: '24px', gap: '12px'}}>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<CopyOutlined style={{ fontSize: 14 }} />}
                    >
                        Upload
                    </Button>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<TwitterSquareFilled style={{ fontSize: 14 }} />}
                    >
                    </Button>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<FacebookFilled style={{ fontSize: 14 }} />}
                    >
                    </Button>
                    <Button 
                        size="medium" 
                        type="secondary" 
                        icon={<LinkedinFilled style={{ fontSize: 14 }} />}
                    >
                    </Button>
                </div>
          </>
        );
        
      case "contact_ct":
        return (
          <>
              <Text style={{ color: colors.primary[6], fontSize: "14px", display: "block", textAlign: 'center' }}>
                  Published 20 Jan 2022
              </Text>
              <Title level={1} style={{ color: colors.character.primary, marginTop: "8px", textAlign: 'center' }}>
                  Contact us
              </Title>
              <Text style={{ textAlign: 'center', fontSize: "14px", color: colors.character.secondary, display: "block", marginTop: "8px", marginBottom: "48px" }}>
                SI-aplications is the leading provider of free, independent advice and support to international students applying to study in the UK.              
              </Text>
            <div style={{ flex: 1, paddingBottom: 32, }}>
                <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                    United States Office
                </Title>
                <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                    Address: 123 Main Street, New York, NY 10001<br></br>
                    Phone: +1 (555) 123-4567<br></br>
                    Email: info@educationagencyus.com<br></br>
                </Text>
            </div>
            <div style={{ flex: 1, paddingBottom: 32, }}>
                <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                    United Kingdom Office
                </Title>
                <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                    Address: 456 High Street, London, SW1A 1AA<br></br>
                    Phone: +44 (0) 1234 567890<br></br>
                    Email: info@educationagencyuk.com<br></br>
                </Text>
            </div>
            <div style={{ flex: 1, paddingBottom: 32, }}>
                <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                    Australia Office
                </Title>
                <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                    Address: 789 Collins Street, Melbourne, VIC 3000<br></br>
                    Phone: +61 2 9876 5432<br></br>
                    Email: info@educationagencyaustralia.com<br></br>
                </Text>
            </div>
            <div style={{ flex: 1, paddingBottom: 32, }}>
                <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                    Canada Office
                </Title>
                <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                    Address: 321 Maple Avenue, Toronto, ON M1N 2P3<br></br>
                    Phone: +1 (416) 555-7890<br></br>
                    Email: info@educationagencycanada.com<br></br>
                </Text>
            </div>
            <div style={{ flex: 1, paddingBottom: 32, borderBottom: `1px solid ${colors.conditional.divider}`, }}>
                <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                    Singapore Office
                </Title>
                <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                   Address: 567 Orchard Road, Singapore 123456<br></br>
                    Phone: +65 9876 5432<br></br>
                    Email: info@educationagencysingapore.com<br></br>
                </Text>
            </div>
            <div style={{ display: 'flex', marginTop: '24px', gap: '12px'}}>
                <Button 
                    size="medium" 
                    type="secondary" 
                    icon={<CopyOutlined style={{ fontSize: 14 }} />}
                >
                    Upload
                </Button>
                <Button 
                    size="medium" 
                    type="secondary" 
                    icon={<TwitterSquareFilled style={{ fontSize: 14 }} />}
                >
                </Button>
                <Button 
                    size="medium" 
                    type="secondary" 
                    icon={<FacebookFilled style={{ fontSize: 14 }} />}
                >
                </Button>
                <Button 
                    size="medium" 
                    type="secondary" 
                    icon={<LinkedinFilled style={{ fontSize: 14 }} />}
                >
                </Button>
            </div>
          </>
        );

      // 💡 แก้ไข: Contact Us Index แยกออกมาจาก General Contact
      case "contact_index": 
        return (
          <>
            <Text style={{ color: colors.primary[6], fontSize: "14px", display: "block", textAlign: 'center' }}>
                  Published 20 Jan 2022
              </Text>

              <Title level={1} style={{ color: colors.character.primary, marginTop: "8px", textAlign: 'center' }}>
                  Contact us
              </Title>

              <Text style={{ textAlign: 'center',fontSize: "14px", color: colors.character.secondary, display: "block", marginTop: "8px", marginBottom: "32px" }}>
                  Feel free to reach out to us with any questions, inquiries, or feedback you may have.              </Text>
             
              {/* Article 1 */}
              <div
                  className="article-card" // Used for responsive styling below
                  onClick={() => setActiveSubKey("ab")}
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column": "row-reverse",
                    gap: "24px",
                    alignItems: "flex-start",
                    borderTop: `1px solid ${colors.conditional.divider}`,
                    padding: "24px",
                    marginTop: "24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "box-shadow 0.3s, background 0.3s",
                    background: "#fff",
                }}
              >
                  <img
                      src={image}
                      alt="UK application"
                      style={{
                          width:isMobile ? "100%":"272px",
                          height:isMobile ? "100%": "154px",
                          objectFit: "cover",
                          flexShrink: 0
                      }}
                  />
                  <div style={{ flex: 1 }}>
                      <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                          About us
                      </Title>
                      <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                          We are your trusted education partner, dedicated to helping you achieve your educational goals. With our expertise and personalized guidance, we navigate the educational landscape together. Count on us to provide exceptional service and support as we unlock a world of possibilities for your future.
                      </Text>
                  </div>
                  
              </div>


              {/* Article 2 */}
              <div
                  className="article-card" // Used for responsive styling below
                  onClick={() => setActiveSubKey("ct")}
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column": "row-reverse",
                    gap: "24px",
                    alignItems: "flex-start",
                    borderTop: `1px solid ${colors.conditional.divider}`,
                    padding: "24px",
                    marginTop: "24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "box-shadow 0.3s, background 0.3s",
                    background: "#fff",
                }}
              >
                  <img
                      src={img2}
                      alt="SI Platform"
                      style={{
                          width:isMobile ? "100%":"272px",
                          height:isMobile ? "100%": "154px",
                          objectFit: "cover",
                          flexShrink: 0
                      }}
                  />
                  <div style={{ flex: 1 }}>
                      <Title level={5} style={{ color: colors.character.primary, marginTop: 0 }}>
                          Contact us
                      </Title>
                      <Text style={{ fontSize: "14px", color: colors.character.primary, display: "block" }}>
                          Got questions? Need guidance? We're here for you. Contact our dedicated team to get the support you need for your educational journey. Let's connect and achieve your goals together.
                      </Text>
                  </div>
              </div>
          </>
        );



      default:
        return null;
    }
  };
  React.useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 720);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

  return (
    <div
        className="main-container" // Class for responsive layout
        style={{
            display: "flex",
            flexDirection: "row",
            gap: "24px",
            padding: "24px",
            backgroundColor: colors.neutral[1] // Page background
        }}
    >
        
      {/* Sidebar (30%) */}
      {!isMobile && (
      <div 
        className="sidebar" // Class for responsive layout
        style={{
          flexBasis: "30%", 
          backgroundColor: colors.neutral[1],
          borderRadius: "8px",
          padding: "16px",
          minWidth: "220px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            marginLeft: 8,
          }}
        >
          {sections.map((sec) => (
            <React.Fragment key={sec.key}>
                {/* Main Menu Item */}
                <a
                    className="menu-item" // Class for hover
                    onClick={() => {
                        // Logic for Toggling Submenu visibility
                        if (sec.isToggle) {
                            if (activeKey === sec.key) {
                                // 💡 การแก้ไขตรรกะ: ถ้าคลิกหัวข้อหลักที่กำลังใช้งานอยู่
                                if (activeSubKey !== null) {
                                    // 1. ถ้ามีเมนูย่อยถูกเลือกอยู่ -> ให้กลับไปที่หน้า Index/Default
                                    setActiveSubKey(null);
                                    setExpanded(true); // คงสถานะเปิดไว้
                                } else {
                                    // 2. ถ้ากำลังแสดงหน้า Index อยู่ -> ให้สลับการเปิด/ปิดเมนูย่อย
                                    setExpanded(!expanded); 
                                }
                            } else {
                                // ถ้าเปลี่ยนไปหัวข้อหลักใหม่ (เช่น จาก Visa มา Guide)
                                setExpanded(true); 
                                setActiveSubKey(null); // ล้าง sub key เพื่อแสดงหน้า Index
                            }
                        } else {
                            // สำหรับเมนูที่ไม่มีการสลับเมนูย่อย (Visa)
                            setExpanded(false);
                            setActiveSubKey(null);
                        }
                        setActiveKey(sec.key);
                    }}
                    style={{
                        cursor: "pointer",
                        padding: "12px 8px",
                        background:
                            activeKey === sec.key ? colors.neutral[1] : "transparent",
                        // เพิ่ม box shadow ที่นี่
                        boxShadow: 
                            activeKey === sec.key ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)' : 'none',
                        borderRadius: 8,
                        color: colors.character.primary, 
                        fontWeight: 600, // h5/Bold style
                        fontSize: 18, // h5/18px style
                        textDecoration: "none",
                        transition: "background 0.3s, box-shadow 0.3s",
                    }}
                >
                    {sec.title}
                </a>

                {/* Sidebar Rendering Logic: แสดงเมนูย่อยถ้าเป็นเมนูที่ถูก Toggle และถูก Expand */}
                {sec.isToggle && activeKey === sec.key && expanded && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingLeft: "16px", marginTop: "4px" }}>
                        {getSubMenus(sec.key).map((sub) => (
                            <a
                                key={sub.key}
                                className="submenu-item" // Class for hover
                                onClick={() => {
                                    setActiveKey(sec.key); // Keep parent key active
                                    setActiveSubKey(sub.key); // Set submenu key
                                }}
                                style={{
                                    cursor: "pointer",
                                    padding: "8px 16px", // Smaller padding for sub items
                                    background:
                                        activeSubKey === sub.key && activeKey === sec.key ? colors.neutral[1] : "transparent",
                                    // เพิ่ม box shadow ที่นี่
                                    boxShadow:
                                        activeSubKey === sub.key && activeKey === sec.key ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' : 'none',
                                    borderRadius: 8,
                                    color: colors.character.primary,
                                    fontWeight: 400, // Regular weight
                                    fontSize: 14, // 14px size
                                    textDecoration: "none",
                                    transition: "background 0.3s, box-shadow 0.3s",
                                }}
                            >
                                {sub.title}
                            </a>
                        ))}
                    </div>
                )}
            </React.Fragment>
          ))}
        </div>
      </div>
    )}
    
      {/* Content Area (70%) */}
      <div
        className="content-area" // Class for responsive layout
        style={{
          flexBasis: isMobile ? "100%":"70%", 
          padding: "0px",
          minWidth: 0, 
        }}
      >
        {renderContent()}
      </div>
      {/* CSS */}
        <style jsx>{`
        .article-card:hover {
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        background: #fff;
        }
        `}
        </style>
    </div>
  );
};
