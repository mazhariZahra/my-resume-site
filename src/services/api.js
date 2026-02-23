// سرویس ذخیره‌سازی آنلاین با JSONBin.io
// برای استفاده، در سایت https://jsonbin.io ثبت نام کنید و یک Bin جدید بسازید

const BIN_ID = ''; // بعد از ثبت نام، شناسه Bin خود را اینجا وارد کنید
const MASTER_KEY = ''; // کلید Master خود را اینجا وارد کنید

// سرویس آپلود عکس با Cloudinary
const CLOUDINARY_CLOUD_NAME = ''; // نام ابر خود را در Cloudinary وارد کنید
const CLOUDINARY_UPLOAD_PRESET = ''; // upload preset خود را وارد کنید

export const onlineStorage = {
  // ذخیره داده‌ها در سرور
  saveData: async (data) => {
    // اگر کلیدها خالی بودند، فقط در localStorage ذخیره کن
    if (!BIN_ID || !MASTER_KEY) {
      console.log('JSONBin.io not configured, saving only to localStorage');
      localStorage.setItem('resumeData', JSON.stringify(data));
      return null;
    }
    
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': MASTER_KEY
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // همزمان در localStorage هم ذخیره کن
      localStorage.setItem('resumeData', JSON.stringify(data));
      
      return await response.json();
    } catch (error) {
      console.error('خطا در ذخیره داده‌ها در سرور:', error);
      localStorage.setItem('resumeData', JSON.stringify(data));
      return null;
    }
  },

  // دریافت داده‌ها از سرور
  loadData: async () => {
    // اگر کلیدها خالی بودند، از localStorage بخوان
    if (!BIN_ID || !MASTER_KEY) {
      console.log('JSONBin.io not configured, loading from localStorage');
      const savedData = localStorage.getItem('resumeData');
      return savedData ? JSON.parse(savedData) : null;
    }
    
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: {
          'X-Master-Key': MASTER_KEY
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      const data = result.record;
      
      // ذخیره در localStorage برای استفاده آفلاین
      localStorage.setItem('resumeData', JSON.stringify(data));
      
      return data;
    } catch (error) {
      console.error('خطا در بارگذاری داده‌ها از سرور:', error);
      const savedData = localStorage.getItem('resumeData');
      return savedData ? JSON.parse(savedData) : null;
    }
  },

  // آپلود عکس به Cloudinary
  uploadImageToCloudinary: async (file) => {
    if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
      console.log('Cloudinary not configured, using local fallback');
      // برگردوندن URL موقت
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData
        }
      );
      
      if (!response.ok) {
        throw new Error('آپلود عکس با خطا مواجه شد');
      }
      
      const data = await response.json();
      return data.secure_url; // برگردوندن لینک عکس
    } catch (error) {
      console.error('خطا در آپلود عکس:', error);
      // برگردوندن URL موقت در صورت خطا
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    }
  }
};