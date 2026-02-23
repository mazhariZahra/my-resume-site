// داده‌های کامل رزومه برگرفته از فایل PDF
export const resumeData = {
  personalInfo: {
    name: "Zahra Mazhari",
    title: "توسعه دهنده وبسایت و نرم افزار",
    about: "دانشجوی مهندسی کامپیوتر با علاقه‌مندی جدی به حوزه طراحی و توسعه وب هستم. تجربه کار روی پروژه‌های واقعی از صفر تا استقرار روی هاست را داشته‌ام و با چالش‌های عملی مانند ریسپانسیو بودن، سازگاری مرورگرها و بهبود تجربه کاربری آشنا هستم. هدف من رشد مستمر مهارت‌ها و ورود حرفه‌ای به بازار کار حوزه وب است.",
    profileImage: "https://ui-avatars.com/api/?name=Zahra+Mazhari&size=200&background=8b5cf6&color=fff&bold=true",
    contact: {
      phone: "09102882913",
      email: "mazhari.zahra82@gmail.com",
      location: "سمنان، دامغان"
    },
    personalDetails: {
      age: 22,
      maritalStatus: "مجرد",
      gender: "خانم",
      updateDate: "4 اسفند 1404"
    },
    socialMedia: {
      linkedin: "",
      github: "",
      instagram: ""
    }
  },
  
  workExperience: [
    {
      company: "Vira Techno Computer Technical and Service Office",
      position: "توسعه‌دهنده وب",
      location: "سمنان",
      startDate: "تیر 1404",
      endDate: "تیر 1404",
      description: "طراحی و توسعه وب‌سایت با استفاده از تکنولوژی‌های مختلف",
      technologies: ["Django", "Python", "JavaScript", "Bootstrap 5", "HTML", "CSS", "PHP", "JSON"]
    },
    {
      company: "طراحی و توسعه وب‌سایت «اردوگاه شهید صدوقی دامغان»",
      position: "توسعه‌دهنده فرانت‌اند و بک‌اند",
      location: "دامغان",
      startDate: "خرداد 1398",
      endDate: "1401 تا اکنون",
      description: "طراحی و توسعه وب‌سایت کامل اردوگاه با امکانات رزرو و معرفی",
      technologies: ["Django", "Python", "CSS", "JavaScript", "SQL", "phpMyAdmin"]
    }
  ],

  education: [
    {
      degree: "مهندسی کامپیوتر کارشناسی",
      university: "دانشگاه صنعتی شاهرود",
      location: "شاهرود",
      startDate: "1401",
      endDate: "اکنون",
      description: "",
      grades: [
        { course: "ساختمان داده", grade: "۱۸.۵" },
        { course: "برنامه نویسی پیشرفته", grade: "۱۹.۲۵" },
        { course: "اصول طراحی کامپایلر", grade: "۱۹" },
        { course: "طراحی الگوریتم", grade: "۱۵.۲۵" }
      ]
    },
    {
      degree: "دیپلم",
      university: "دبیرستان نمونه دولتی دخترانه حضرت زینب (س)",
      location: "دامغان",
      startDate: "۱۳۹۸",
      endDate: "۱۴۰۱",
      description: "",
      grades: []
    }
  ],

  skills: {
    technical: [
      { name: "Python", level: 90, category: "backend" },
      { name: "JavaScript", level: 85, category: "frontend" },
      { name: "Django", level: 80, category: "backend" },
      { name: "JSON", level: 75, category: "backend" },
      { name: "CSS", level: 85, category: "frontend" },
      { name: "HTML", level: 95, category: "frontend" },
      { name: "PHP", level: 70, category: "backend" },
      { name: "Bootstrap 5", level: 85, category: "frontend" },
      { name: "Tailwind CSS", level: 75, category: "frontend" },
      { name: "Ajax", level: 70, category: "frontend" },
      { name: "jQuery", level: 65, category: "frontend" },
      { name: "SQL", level: 70, category: "database" },
      { name: "OOP", level: 80, category: "programming" }
    ],
    soft: [
      "شنونده خوب", "همدلی", "قدرت تصمیم‌گیری", "مدیریت زمان",
      "مسئولیت‌پذیری", "انتقادپذیری", "گزارش‌نویسی", "آموزش دادن",
      "شوخ طبعی", "مدیریت استرس"
    ],
    interests: ["Tailwind CSS", "JavaScript", "Frontend Development"]
  },

  certificates: [
    {
      name: "Javascript-one",
      issuer: "گروه آموزشی پرتقال",
      date: "دی ۱۴۰۴",
      validUntil: "اکنون",
      link: "https://example.com/certificate1",
      image: null
    },
    {
      name: "Javascript-two",
      issuer: "گروه آموزشی پرتقال",
      date: "دی ۱۴۰۴",
      validUntil: "اکنون",
      link: "https://example.com/certificate2",
      image: null
    },
    {
      name: "Frontend - ۲۰۲۵ المپیک فناوری",
      issuer: "Quera Event",
      date: "آبان ۱۴۰۴",
      validUntil: "اکنون",
      link: "https://example.com/certificate3",
      image: null
    },
    {
      name: "آموزش فرانت‌اند (Front-End)",
      issuer: "Quera College",
      date: "تیر ۱۴۰۴",
      validUntil: "اکنون",
      link: "https://example.com/certificate4",
      image: null
    },
    {
      name: "عکاسی با موبایل – از مبتدی تا حرفه‌ای",
      issuer: "فرادرس",
      date: "خرداد ۱۴۰۴",
      validUntil: "اکنون",
      link: "https://example.com/certificate5",
      image: null
    },
    {
      name: "ICDL",
      issuer: "گروه آموزشی پرتقال",
      date: "بهمن ۱۴۰۳",
      validUntil: "اکنون",
      link: "https://example.com/certificate6",
      image: null
    },
    {
      name: "برنامه‌نویسی پایتون مقدماتی",
      issuer: "Quera College",
      date: "آبان ۱۴۰۲",
      validUntil: "۱۴۰۷",
      link: "https://example.com/certificate7",
      image: null
    },
    {
      name: "طراحی وب (CIW)",
      issuer: "سازمان آموزش فنی حرفه‌ای کشور",
      date: "اسفند ۱۳۹۹",
      validUntil: "۱۴۰۴",
      link: "https://example.com/certificate8",
      image: null
    },
    {
      name: "Photoshop",
      issuer: "سازمان آموزش فنی حرفه‌ای کشور",
      date: "اسفند ۱۳۹۹",
      validUntil: "۱۴۰۴",
      link: "https://example.com/certificate9",
      image: null
    }
  ],

  projects: [
    {
      name: "سامانه مدیریت اخبار",
      startDate: "بهمن ۱۴۰۴",
      endDate: "بهمن ۱۴۰۴",
      description: "یک سیستم کامل مدیریت اخبار تحت وب با قابلیت‌های زیر:",
      longDescription: "سیستم احراز هویت پیشرفته با Django Authentication، پنل مدیریت کاربر، سیستم مدیریت اخبار با CRUD کامل، دسته‌بندی در ۵ دسته اصلی (فناوری، ورزشی، سلامت، اقتصادی، سیاسی)، آمار پیشرفته و بروزرسانی زنده",
      features: [
        "سیستم احراز هویت پیشرفته با Django Authentication",
        "مدیریت نشست‌ها (Session Management) برای حفظ وضعیت کاربر",
        "حفاظت CSRF برای امنیت درخواست‌ها",
        "پنل مدیریت کاربر با انتخاب دسته‌های خبری مورد علاقه",
        "ذخیره تنظیمات در پروفایل کاربر",
        "رابط کاربری فارسی و راست‌چین",
        "سیستم مدیریت اخبار با CRUD کامل",
        "دسته‌بندی در ۵ دسته اصلی",
        "آمار پیشرفته: شمارش بازدیدها، مرتب‌سازی بر اساس محبوبیت",
        "بروزرسانی زنده خودکار هر ۳ ثانیه"
      ],
      technologies: ["Django", "Python", "JavaScript", "AJAX", "API", "CSS", "HTML", "SQLite3", "Django ORM"],
      security: [
        "Session-based Authentication",
        "CSRF Token Protection",
        "SQL Injection Prevention",
        "XSS Protection"
      ],
      github: "https://github.com/zahramazhari/news-management",
      demo: "https://news-demo.example.com",
      link: "https://news-project.example.com"
    },
    {
      name: "مدیریت لیست کارها (To-Do List CLI App)",
      startDate: "مرداد ۱۴۰۴",
      endDate: "مرداد ۱۴۰۴",
      description: "برنامه خط فرمانی ساده با زبان Python برای مدیریت لیست کارهای روزانه با قابلیت ذخیره‌سازی در فایل JSON",
      features: [
        "اضافه کردن کار جدید",
        "علامت زدن کارهای انجام شده",
        "حذف کارها",
        "مشاهده وضعیت فعلی",
        "ذخیره خودکار در فایل JSON"
      ],
      technologies: ["Python", "JSON"],
      github: "https://github.com/zahramazhari/todo-cli",
      demo: "",
      link: ""
    },
    {
      name: "سایت سفارش خدمات کامپیوتری",
      startDate: "مرداد ۱۴۰۴",
      endDate: "مرداد ۱۴۰۴",
      description: "سایت سفارش غیرحضوری خدمات کامپیوتری با پنل ادمین Django و پشتیبانی آنلاین از طریق واتساپ",
      features: [
        "پنل ادمین Django",
        "پشتیبانی آنلاین واتساپ",
        "سیستم پیام‌رسانی",
        "پروفایل کاربر با نمایش سفارشات",
        "مشاهده وضعیت سفارش",
        "دانلود فایل سفارش پس از تکمیل"
      ],
      technologies: ["Django", "Python", "Tailwind CSS", "JavaScript", "HTML5", "CSS"],
      github: "",
      demo: "https://computer-service.example.com",
      link: "https://computer-service.example.com"
    },
    {
      name: "پلتفرم اردوگاه شهید صدوقی",
      startDate: "آذر ۱۴۰۴",
      endDate: "آذر ۱۴۰۴",
      description: "وب‌سایت رسمی اردوگاه فرهنگی‌تربیتی شهید صدوقی در استان سمنان",
      features: [
        "معرفی اردوگاه و امکانات اقامتی، رفاهی و تفریحی",
        "رزرو سوئیت و اتاق‌ها برای اردوهای یک‌روزه یا چندروزه",
        "بخش «انعقاد قرارداد» برای هماهنگی رسمی",
        "گالری تصاویر",
        "بخش اخبار",
        "صفحات «درباره ما» و «تماس با ما»"
      ],
      technologies: ["Django", "Python", "CSS", "JavaScript", "SQL"],
      github: "",
      demo: "https://shahid-sadoughi.example.com",
      link: "https://shahid-sadoughi.example.com"
    }
  ],

  languages: [
    {
      name: "انگلیسی",
      level: "متوسط",
      score: null
    }
  ]
};

export default resumeData;