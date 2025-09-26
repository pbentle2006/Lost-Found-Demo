import React, { useState, createContext, useContext } from 'react';

// Language Context
interface LanguageContextType {
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation dictionary
const translations = {
  en: {
    // Navigation
    'nav.title': 'Lost & Found AI Platform',
    'nav.partner': 'Partner Portal',
    'nav.government': 'Government',
    'nav.report': '🤖 Report Lost Item',
    
    // Home page
    'home.title': 'Lost & Found AI Platform',
    'home.subtitle': 'Reuniting people with their lost items using advanced AI technology',
    'home.startReport': '🤖 Start AI Report',
    'home.howItWorks': 'How It Works',
    'home.step1.title': '1. AI Conversation',
    'home.step1.desc': 'Chat with our AI assistant to describe your lost item',
    'home.step2.title': '2. Smart Search',
    'home.step2.desc': 'AI searches our database for potential matches',
    'home.step3.title': '3. Get Reunited',
    'home.step3.desc': 'Verify ownership and arrange pickup or delivery',
    'home.demo.title': '🎯 Try the Interactive Demo',
    'home.demo.step1': 'Click "Start AI Report"',
    'home.demo.step2': 'Answer 4 Questions',
    'home.demo.step3': 'Watch AI Search',
    'home.demo.step4': 'View Results',
    
    // AI Chat
    'chat.title': 'Lost Item Report - AI Assistant',
    'chat.greeting': 'Hi there! I\'m your AI assistant, and I\'m here to help you find your lost item. I know losing something important can be stressful, so let\'s work together to get it back. What did you lose?',
    'chat.phone.response': 'Oh no, losing your phone is really inconvenient! Let me help you find it. Can you tell me what brand and model it is? Also, does it have a case, screen protector, or any stickers on it?',
    'chat.wallet.response': 'I understand how worrying it must be to lose your wallet. Let\'s get it back to you quickly. What color is it, and what material is it made of? Does it have any distinctive features like logos, patterns, or wear marks?',
    'chat.typing': 'AI is typing...',
    'chat.placeholder': 'Type your response...',
    'chat.send': 'Send',
    
    // Results
    'results.title': '✅ Search Complete - {count} Matches Found!',
    'results.reportId': 'Report ID: {id}',
    'results.confidence': '{percent}% Match',
    'results.location': 'Location:',
    'results.foundBy': 'Found by:',
    'results.date': 'Date:',
    'results.description': 'Description:',
    'results.features': 'Key Features:',
    'results.claimBtn': 'This looks like mine!',
    'results.detailsBtn': 'View Details',
    'results.notMineBtn': 'Not my item',
    
    // Tooltips
    'tooltip.platform': 'First city-wide AI-enabled Lost & Found ecosystem designed to reduce handling time by 50%',
    'tooltip.startDemo': 'Start an interactive demo that shows how AI conversation reduces report time from hours to minutes',
    'tooltip.howItWorks': 'Our 3-step process leverages conversational AI, smart matching algorithms, and secure identity verification'
  },
  ar: {
    // Navigation
    'nav.title': 'منصة المفقودات الذكية بالذكاء الاصطناعي',
    'nav.partner': 'بوابة الشركاء',
    'nav.government': 'الحكومة',
    'nav.report': '🤖 الإبلاغ عن عنصر مفقود',
    
    // Home page
    'home.title': 'منصة المفقودات الذكية بالذكاء الاصطناعي',
    'home.subtitle': 'إعادة توحيد الأشخاص مع أغراضهم المفقودة باستخدام تقنية الذكاء الاصطناعي المتقدمة',
    'home.startReport': '🤖 بدء تقرير الذكاء الاصطناعي',
    'home.howItWorks': 'كيف يعمل',
    'home.step1.title': '١. محادثة الذكاء الاصطناعي',
    'home.step1.desc': 'تحدث مع مساعد الذكاء الاصطناعي لوصف العنصر المفقود',
    'home.step2.title': '٢. البحث الذكي',
    'home.step2.desc': 'يبحث الذكاء الاصطناعي في قاعدة البيانات عن التطابقات المحتملة',
    'home.step3.title': '٣. العثور على الغرض',
    'home.step3.desc': 'التحقق من الملكية وترتيب الاستلام أو التسليم',
    'home.demo.title': '🎯 جرب العرض التفاعلي',
    'home.demo.step1': 'انقر على "بدء تقرير الذكاء الاصطناعي"',
    'home.demo.step2': 'أجب على ٤ أسئلة',
    'home.demo.step3': 'شاهد البحث بالذكاء الاصطناعي',
    'home.demo.step4': 'عرض النتائج',
    
    // AI Chat
    'chat.title': 'تقرير العنصر المفقود - مساعد الذكاء الاصطناعي',
    'chat.greeting': 'مرحباً! أنا مساعد الذكاء الاصطناعي، وأنا هنا لمساعدتك في العثور على العنصر المفقود. أعلم أن فقدان شيء مهم قد يكون مرهقاً، لذا دعنا نعمل معاً لاستعادته. ما الذي فقدته؟',
    'chat.phone.response': 'أوه لا، فقدان هاتفك أمر مزعج حقاً! دعني أساعدك في العثور عليه. هل يمكنك إخباري بالعلامة التجارية والطراز؟ وهل يحتوي على جراب أو واقي شاشة أو أي ملصقات؟',
    'chat.wallet.response': 'أتفهم مدى قلقك من فقدان محفظتك. دعنا نستعيدها بسرعة. ما لونها وما المادة المصنوعة منها؟ هل لديها أي ميزات مميزة مثل الشعارات أو الأنماط أو علامات التآكل؟',
    'chat.typing': 'الذكاء الاصطناعي يكتب...',
    'chat.placeholder': 'اكتب ردك...',
    'chat.send': 'إرسال',
    
    // Results
    'results.title': '✅ اكتمل البحث - تم العثور على {count} تطابق!',
    'results.reportId': 'رقم التقرير: {id}',
    'results.confidence': '{percent}% تطابق',
    'results.location': 'الموقع:',
    'results.foundBy': 'وجده:',
    'results.date': 'التاريخ:',
    'results.description': 'الوصف:',
    'results.features': 'الميزات الرئيسية:',
    'results.claimBtn': 'هذا يبدو مثل غرضي!',
    'results.detailsBtn': 'عرض التفاصيل',
    'results.notMineBtn': 'ليس غرضي',
    
    // Tooltips
    'tooltip.platform': 'أول نظام بيئي للمفقودات على مستوى المدينة مدعوم بالذكاء الاصطناعي مصمم لتقليل وقت المعالجة بنسبة ٥٠٪',
    'tooltip.startDemo': 'ابدأ عرضاً تفاعلياً يوضح كيف تقلل محادثة الذكاء الاصطناعي وقت التقرير من ساعات إلى دقائق',
    'tooltip.howItWorks': 'عمليتنا المكونة من ٣ خطوات تستفيد من الذكاء الاصطناعي المحادثي وخوارزميات المطابقة الذكية والتحقق الآمن من الهوية'
  }
};

// Language Provider Component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    let translation = translations[language][key as keyof typeof translations['en']] || key;
    
    // Replace parameters in translation
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value));
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} style={{ fontFamily: language === 'ar' ? 'Arial, sans-serif' : 'system-ui, sans-serif' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

// Language Toggle Button Component
export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      style={{
        padding: '0.5rem 1rem',
        borderRadius: '0.375rem',
        border: '1px solid #d1d5db',
        backgroundColor: 'white',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.2s'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#f3f4f6';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = 'white';
      }}
    >
      <span>{language === 'en' ? '🇦🇪' : '🇺🇸'}</span>
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
};
