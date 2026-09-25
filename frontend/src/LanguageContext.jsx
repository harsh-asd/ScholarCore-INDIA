import React, { createContext, useState, useContext } from 'react';

const translations = {
  en: {
    "gov": "Government of India",
    "ministry": "Ministry of Tribal Affairs",
    "welcome": "Welcome to the MoTA AI Scholarship Portal",
    "desc": "A unified, transparent, and AI-enabled platform for students of tribal communities to apply, track, and receive scholarship disbursements instantly.",
    "register": "New Registration",
    "login": "Applicant Login",
    "schemes": "Active MoTA Schemes",
    "academic_year": "Academic Year 2026-27",
    "faqs": "FAQs",
    "announcements": "Announcements",
    "helpdesk": "Helpdesk",
    "latest_updates": "Latest Updates",
    "ticker_text": "Last date for National Fellowship for ST has been extended to 31st October 2026. | Ensure Aadhaar is linked with bank account before applying. | Biometric authentication is mandatory for institute nodal officers.",
    "institutions": "Institutions",
    "officers": "Officers",
    "public": "Public",
    "fellowship": "Fellowship",
    "apply_now": "Apply Now",
    "applications_open": "Applications Open",
    "scheme_1_name": "National Fellowship for ST",
    "scheme_1_desc": "Financial assistance for higher education.",
    "scheme_2_name": "National Overseas Scholarship",
    "scheme_2_desc": "Supports ST students studying abroad.",
    "dashboard": "Dashboard",
    "scheme_selection": "Scheme Selection",
    "doc_vault": "Document Vault",
    "app_status": "Application Status",
    "grievances": "Grievances",
    "empowering": "Empowering and Inspiring",
    "lifelong": "Students to Excel as Life Long Learners",
    "students_card": "Students",
    "otr_title": "Get your OTR",
    "otr_desc_1": "One Time Registration (OTR) is a unique 14-digit number issued based on the Aadhaar/Aadhaar Enrolment ID (EID) and is applicable for the entire academic career of the student.",
    "otr_desc_2": "OTR simplifies the scholarship application process, thereby eliminating the need of registration in each academic year.",
    "otr_desc_3": "OTR is required to apply for scholarship on National Scholarship Portal.",
    "otr_apply": "Apply now!"
  },
  hi: {
    "gov": "भारत सरकार",
    "ministry": "जनजातीय कार्य मंत्रालय",
    "welcome": "MoTA AI छात्रवृत्ति पोर्टल में आपका स्वागत है",
    "desc": "आदिवासी समुदायों के छात्रों के लिए छात्रवृत्ति लागू करने, ट्रैक करने और तुरंत संवितरण प्राप्त करने के लिए एक एकीकृत, पारदर्शी और एआई-सक्षम मंच।",
    "register": "नया पंजीकरण",
    "login": "आवेदक लॉगिन",
    "schemes": "सक्रिय MoTA योजनाएं",
    "academic_year": "शैक्षणिक वर्ष 2026-27",
    "faqs": "सामान्य प्रश्न",
    "announcements": "घोषणाएँ",
    "helpdesk": "हेल्पडेस्क",
    "latest_updates": "नवीनतम अपडेट",
    "ticker_text": "एसटी के लिए राष्ट्रीय फेलोशिप की अंतिम तिथि 31 अक्टूबर 2026 तक बढ़ा दी गई है। | आवेदन करने से पहले सुनिश्चित करें कि आधार बैंक खाते से जुड़ा है।",
    "institutions": "संस्थान",
    "officers": "अधिकारी",
    "public": "सार्वजनिक",
    "fellowship": "फेलोशिप",
    "apply_now": "अभी आवेदन करें",
    "applications_open": "आवेदन खुले हैं",
    "scheme_1_name": "एसटी के लिए राष्ट्रीय फेलोशिप (NFST)",
    "scheme_1_desc": "उच्च शिक्षा के लिए वित्तीय सहायता।",
    "scheme_2_name": "राष्ट्रीय विदेशी छात्रवृत्ति (NOS)",
    "scheme_2_desc": "विदेश में पढ़ने वाले एसटी छात्रों का समर्थन करता है।",
    "dashboard": "डैशबोर्ड",
    "scheme_selection": "योजना चयन",
    "doc_vault": "दस्तावेज़ तिजोरी",
    "app_status": "आवेदन की स्थिति",
    "grievances": "शिकायतें",
    "empowering": "सशक्त और प्रेरित करना",
    "lifelong": "छात्रों को आजीवन शिक्षार्थी के रूप में उत्कृष्टता प्राप्त करने के लिए",
    "students_card": "छात्र",
    "otr_title": "अपना OTR प्राप्त करें",
    "otr_desc_1": "वन टाइम रजिस्ट्रेशन (OTR) आधार/आधार नामांकन आईडी (ईआईडी) के आधार पर जारी एक विशिष्ट 14-अंकीय संख्या है और छात्र के पूरे शैक्षणिक कैरियर के लिए लागू है।",
    "otr_desc_2": "OTR छात्रवृत्ति आवेदन प्रक्रिया को सरल बनाता है, जिससे प्रत्येक शैक्षणिक वर्ष में पंजीकरण की आवश्यकता समाप्त हो जाती है।",
    "otr_desc_3": "राष्ट्रीय छात्रवृत्ति पोर्टल पर छात्रवृत्ति के लिए आवेदन करने के लिए OTR की आवश्यकता होती है।",
    "otr_apply": "अभी आवेदन करें!"
  },
  te: {
    "gov": "భారత ప్రభుత్వం",
    "ministry": "గిరిజన వ్యవహారాల మంత్రిత్వ శాఖ",
    "welcome": "MoTA AI స్కాలర్‌షిప్ పోర్టల్‌కు స్వాగతం",
    "desc": "గిరిజన వర్గాల విద్యార్థులు స్కాలర్‌షిప్ దరఖాస్తు చేసుకోవడానికి, ట్రాక్ చేయడానికి మరియు తక్షణమే స్కాలర్‌షిప్ పంపిణీని స్వీకరించడానికి ఒక ఏకీకృత, పారదర్శక మరియు AI-ప్రారంభించబడిన వేదిక.",
    "register": "కొత్త నమోదు",
    "login": "దరఖాస్తుదారు లాగిన్",
    "schemes": "క్రియాశీల MoTA పథకాలు",
    "academic_year": "విద్యా సంవత్సరం 2026-27",
    "faqs": "తరచుగా అడిగే ప్రశ్నలు",
    "announcements": "ప్రకటనలు",
    "helpdesk": "హెల్ప్‌డెస్క్",
    "latest_updates": "తాజా నవీకరణలు",
    "ticker_text": "ఎస్టీ జాతీయ ఫెలోషిప్ చివరి తేదీ 31 అక్టోబర్ 2026 వరకు పొడిగించబడింది. | దరఖాస్తు చేసే ముందు ఆధార్ బ్యాంక్ ఖాతాతో లింక్ చేయబడిందని నిర్ధారించుకోండి.",
    "institutions": "సంస్థలు",
    "officers": "అధికారులు",
    "public": "ప్రజలు",
    "fellowship": "ఫెలోషిప్",
    "apply_now": "ఇప్పుడే దరఖాస్తు చేసుకోండి",
    "applications_open": "దరఖాస్తులు ప్రారంభించబడ్డాయి",
    "scheme_1_name": "ఎస్టీల కోసం జాతీయ ఫెలోషిప్ (NFST)",
    "scheme_1_desc": "ఉన్నత విద్యకు ఆర్థిక సహాయం.",
    "scheme_2_name": "నేషనల్ ఓవర్సీస్ స్కాలర్‌షిప్ (NOS)",
    "scheme_2_desc": "విదేశాల్లో చదువుతున్న ఎస్టీ విద్యార్థులకు మద్దతు.",
    "dashboard": "డాష్‌బోర్డ్",
    "scheme_selection": "పథకం ఎంపిక",
    "doc_vault": "పత్రాల వాల్ట్",
    "app_status": "దరఖాస్తు స్థితి",
    "grievances": "ఫిర్యాదులు",
    "empowering": "సాధికారత మరియు స్ఫూర్తిదాయకం",
    "lifelong": "జీవితకాల అభ్యాసకులుగా రాణించేందుకు విద్యార్థులు",
    "students_card": "విద్యార్థులు",
    "otr_title": "మీ OTR పొందండి",
    "otr_desc_1": "వన్ టైమ్ రిజిస్ట్రేషన్ (OTR) అనేది ఆధార్/ఆధార్ ఎన్‌రోల్‌మెంట్ ID (EID) ఆధారంగా జారీ చేయబడిన ఒక ప్రత్యేకమైన 14-అంకెల సంఖ్య మరియు ఇది విద్యార్థి యొక్క మొత్తం విద్యా జీవితానికి వర్తిస్తుంది.",
    "otr_desc_2": "OTR స్కాలర్‌షిప్ దరఖాస్తు ప్రక్రియను సులభతరం చేస్తుంది, తద్వారా ప్రతి విద్యా సంవత్సరంలో రిజిస్ట్రేషన్ అవసరాన్ని తొలగిస్తుంది.",
    "otr_desc_3": "నేషనల్ స్కాలర్‌షిప్ పోర్టల్‌లో స్కాలర్‌షిప్ కోసం దరఖాస్తు చేయడానికి OTR అవసరం.",
    "otr_apply": "ఇప్పుడే దరఖాస్తు చేసుకోండి!"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  
  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
