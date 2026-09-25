import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { MessageCircle, X, Send, Bot, Sparkles, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const NaaradChatbot = () => {
  const { lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
    // Multilingual Initial Greeting
  const getGreeting = (language) => {
    if (language === 'hi') return "प्रणाम! मैं नारद मुनि हूँ, आपका MoTA AI मार्गदर्शक। मैं योजना पात्रता, आवेदन की समय सीमा, और स्थिति को ट्रैक करने के बारे में ज्ञान साझा कर सकता हूँ। मैं आपकी कैसे सहायता कर सकता हूँ?";
    if (language === 'te') return "నమస్కారం! నేను నారద మునిని, మీ MoTA AI గైడ్. స్కీమ్ అర్హత, గడువు మరియు మీ స్థితిని ట్రాక్ చేయడం గురించి నేను సమాచారాన్ని పంచుకోగలను. నేను మీకు ఎలా సహాయం చేయగలను?";
    return "Pranam! I am Naarad Muni, your MoTA AI Guide. I can share knowledge about scheme eligibility, application deadlines, and track your status. How may I assist you?";
  };

  const [messages, setMessages] = useState([
    { text: getGreeting(lang), isBot: true }
  ]);
  
  useEffect(() => {
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages.length > 0 && newMessages[0].isBot) {
        newMessages[0].text = getGreeting(lang);
      }
      return newMessages;
    });
  }, [lang]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
  // Text to Speech
  const speak = (text) => {
    if (!isVoiceMode || !('speechSynthesis' in window)) return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    // Best effort mapping lang to speech synthesis voice language
    if (lang === 'hi') utterance.lang = 'hi-IN';
    else if (lang === 'te') utterance.lang = 'te-IN';
    else utterance.lang = 'en-IN';
    
    window.speechSynthesis.speak(utterance);
  };
  
  // Speech to Text
  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition. Please try Chrome.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    if (lang === 'hi') recognition.lang = 'hi-IN';
    else if (lang === 'te') recognition.lang = 'te-IN';
    else recognition.lang = 'en-IN';
    
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  useEffect(() => {
    // If voice mode turned on, optionally greet
    if (isVoiceMode && messages.length > 0) {
      // speak(messages[messages.length - 1].text);
    } else {
      window.speechSynthesis.cancel();
    }
  }, [isVoiceMode]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI Thinking
        setTimeout(() => {
      let botReply = "I am equipped to guide you on scheme eligibility, application deadlines, grievance registration, and tracking your status. Could you provide more details?";
      if (lang === 'hi') botReply = "मैं आपको योजना पात्रता, आवेदन की समय सीमा, शिकायत पंजीकरण और आपकी स्थिति को ट्रैक करने पर मार्गदर्शन करने के लिए सुसज्जित हूँ। क्या आप अधिक विवरण प्रदान कर सकते हैं?";
      if (lang === 'te') botReply = "స్కీమ్ అర్హత, గడువు, మరియు మీ స్థితిని ట్రాక్ చేయడంలో మీకు మార్గనిర్దేశం చేయడానికి నేను సిద్ధంగా ఉన్నాను. దయచేసి మరిన్ని వివరాలు అందించగలరా?";

      const lowerMsg = userMsg.toLowerCase();
      
      if (lowerMsg.includes("eligibility") || lowerMsg.includes("who can apply") || lowerMsg.includes("criteria") || lowerMsg.includes("पात्रता")) {
        botReply = "For the National Overseas Scholarship (NOS), candidates require at least 60% marks in their qualifying degree and a family income below Rs.16 Lakhs/annum. For the National Fellowship (NFST), enrollment in an M.Phil or Ph.D program is required.";
        if (lang === 'hi') botReply = "राष्ट्रीय प्रवासी छात्रवृत्ति (NOS) के लिए, उम्मीदवारों को योग्यता डिग्री में कम से कम 60% अंक और Rs.16 लाख/वर्ष से कम पारिवारिक आय की आवश्यकता है। राष्ट्रीय फैलोशिप (NFST) के लिए M.Phil या Ph.D में नामांकन आवश्यक है।";
        if (lang === 'te') botReply = "NOS కోసం కనీసం 60% మార్కులు మరియు కుటుంబ ఆదాయం Rs.16 లక్షల లోపు ఉండాలి. NFST కోసం M.Phil లేదా Ph.D నమోదు అవసరం.";
      } else if (lowerMsg.includes("status") || lowerMsg.includes("track") || lowerMsg.includes("स्थिति")) {
        botReply = "You can track your real-time application timeline by clicking the 'Students' card on the dashboard and logging in with your OTR ID. It will show stages like 'Pending at Institute' or 'Verified'.";
        if (lang === 'hi') botReply = "आप डैशबोर्ड पर 'छात्र' कार्ड पर क्लिक करके और अपनी OTR ID से लॉगिन करके अपने आवेदन को ट्रैक कर सकते हैं। यह 'संस्थान में लंबित' या 'सत्यापित' जैसे चरण दिखाएगा।";
        if (lang === 'te') botReply = "మీరు డాష్‌బోర్డ్‌లో 'విద్యార్థులు' కార్డ్‌పై క్లిక్ చేసి, మీ OTR ID తో లాగిన్ చేయడం ద్వారా మీ అప్లికేషన్ స్థితిని ట్రాక్ చేయవచ్చు.";
      } else if (lowerMsg.includes("deadline") || lowerMsg.includes("date") || lowerMsg.includes("last") || lowerMsg.includes("तारीख")) {
        botReply = "The MoTA portal is open for the 2026-27 Academic Year. The sacred deadline for fresh student applications is October 31, 2026. Do not miss it!";
        if (lang === 'hi') botReply = "MoTA पोर्टल 2026-27 शैक्षणिक वर्ष के लिए खुला है। नए छात्र आवेदनों के लिए अंतिम तिथि 31 अक्टूबर, 2026 है। इसे न चूकें!";
        if (lang === 'te') botReply = "MoTA పోర్టల్ 2026-27 విద్యా సంవత్సరానికి తెరిచి ఉంది. కొత్త విద్యార్థుల దరఖాస్తులకు చివరి తేదీ అక్టోబర్ 31, 2026. దీన్ని మిస్ అవ్వకండి!";
      } else if (lowerMsg.includes("otr") || lowerMsg.includes("register")) {
         botReply = "One Time Registration (OTR) is a unique 14-digit number linked to your Aadhaar, mandatory for all seekers. You can generate it via the 'Students' action card -> 'OTR'.";
         if (lang === 'hi') botReply = "वन टाइम रजिस्ट्रेशन (OTR) आपके आधार से जुड़ा एक अद्वितीय 14 अंकों का नंबर है। आप इसे 'छात्र' कार्ड -> 'OTR' के माध्यम से बना सकते हैं।";
         if (lang === 'te') botReply = "వన్ టైమ్ రిజిస్ట్రేషన్ (OTR) అనేది మీ ఆధార్‌కు అనుసంధానించబడిన 14 అంకెల సంఖ్య. మీరు దీన్ని 'విద్యార్థులు' కార్డ్ ద్వారా సృష్టించవచ్చు.";
      } else if (lowerMsg.includes("hi") || lowerMsg.includes("hello") || lowerMsg.includes("pranam") || lowerMsg.includes("namaste") || lowerMsg.includes("नमस्ते")) {
         botReply = "Namaskaram! How can I illuminate your path on the ScholarCore India portal today?";
         if (lang === 'hi') botReply = "नमस्कारम! मैं आज स्कॉलरकोर इंडिया पोर्टल पर आपका मार्गदर्शन कैसे कर सकता हूँ?";
         if (lang === 'te') botReply = "నమస్కారం! స్కాలర్‌కోర్ ఇండియా పోర్టల్‌లో నేను మీకు ఎలా మార్గనిర్దేశం చేయగలను?";
      } else if (lowerMsg.includes("grievance") || lowerMsg.includes("complain") || lowerMsg.includes("help") || lowerMsg.includes("शिकायत")) {
         botReply = "If you face any hurdles, you may register a grievance by clicking the 'Public' card and selecting 'Grievance Registration'. Our GROs (Grievance Redressal Officers) will assist you swiftly.";
         if (lang === 'hi') botReply = "यदि आपको कोई समस्या आती है, तो आप 'सार्वजनिक' कार्ड पर क्लिक करके और 'शिकायत पंजीकरण' का चयन करके शिकायत दर्ज कर सकते हैं। हमारे GRO आपकी सहायता करेंगे।";
         if (lang === 'te') botReply = "మీకు ఏదైనా సమస్య ఉంటే, దయచేసి 'పబ్లిక్' కార్డ్‌పై క్లిక్ చేసి ఫిర్యాదు నమోదు చేయండి. మా GRO మీకు సహాయం చేస్తారు.";
      }

      setIsTyping(false);
      speak(botReply);
      setMessages(prev => [...prev, { text: botReply, isBot: true }]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-[360px] rounded-2xl shadow-2xl border border-gray-200 mb-4 overflow-hidden flex flex-col transition-all duration-300 transform origin-bottom-right">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-4 flex justify-between items-center text-white shadow-md z-10">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full relative">
                <Bot size={24} />
                <Sparkles size={12} className="absolute top-0 right-0 text-yellow-200" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide">Naarad Muni</h3>
                <p className="text-[10px] text-orange-100 uppercase tracking-widest">AI-Powered Guide</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button onClick={() => setIsVoiceMode(!isVoiceMode)} className={`p-1.5 rounded-full transition ${isVoiceMode ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Toggle Voice Output">
                {isVoiceMode ? <Volume2 size={18} /> : <VolumeX size={18} className="opacity-70" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-full transition">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div className="h-80 overflow-y-auto p-4 bg-orange-50/30 flex flex-col space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.isBot ? 'items-start' : 'items-end'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm leading-relaxed ${msg.isBot ? 'bg-white border border-orange-100 text-gray-800 rounded-tl-sm' : 'bg-orange-500 text-white rounded-tr-sm'}`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.isBot ? 'Naarad Muni' : 'You'}</span>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-white border border-orange-100 p-3 rounded-2xl rounded-tl-sm shadow-sm flex space-x-1.5 items-center h-10">
                  <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200 flex items-center space-x-2">
            <button onClick={toggleListening} className={`p-2.5 rounded-full transition shadow-sm ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} title="Speech to Text">
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Naarad Muni..." 
              className="flex-1 bg-gray-100 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-transparent focus:border-transparent transition"
            />
            <button onClick={handleSend} disabled={!input.trim()} className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-orange-500 text-white p-2.5 rounded-full transition shadow-sm">
              <Send size={18} className="ml-0.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <div className="relative cursor-pointer hover:scale-105 transition-transform" onClick={() => setIsOpen(true)}>
          <div className="absolute -top-12 -left-8 bg-orange-50 text-orange-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-orange-200 animate-pulse whitespace-nowrap">
            Pranam,<br/>I'm Naarad Muni
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-orange-50 border-b border-r border-orange-200 transform rotate-45"></div>
          </div>
          <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
            <MessageCircle className="text-white" size={32} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NaaradChatbot;

