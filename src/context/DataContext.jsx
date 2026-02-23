import { createContext, useState, useContext, useEffect } from 'react';
import { resumeData as initialData } from '../data/initialData';
import { onlineStorage } from '../services/api';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(true);

  // بارگذاری داده‌ها از localStorage و سرور هنگام شروع
  useEffect(() => {
    const loadData = async () => {
      try {
        // اول از localStorage بارگذاری کن
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
          setData(JSON.parse(savedData));
        }
        
        // بعد از سرور بگیر (اگر اینترنت وصل بود)
        const serverData = await onlineStorage.loadData();
        if (serverData) {
          setData(serverData);
          localStorage.setItem('resumeData', JSON.stringify(serverData));
        }
      } catch (error) {
        console.error('Error loading:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // به‌روزرسانی داده‌ها و ذخیره در localStorage و سرور
  const updateData = async (section, newData) => {
    setData(prevData => {
      const updatedData = {
        ...prevData,
        [section]: newData
      };
      
      // ذخیره در localStorage
      localStorage.setItem('resumeData', JSON.stringify(updatedData));
      
      // ذخیره در سرور (بدون منتظر موندن)
      onlineStorage.saveData(updatedData).catch(console.error);
      
      return updatedData;
    });
  };

  // به‌روزرسانی کل داده‌ها
  const updateAllData = async (newData) => {
    setData(newData);
    localStorage.setItem('resumeData', JSON.stringify(newData));
    await onlineStorage.saveData(newData).catch(console.error);
  };

  return (
    <DataContext.Provider value={{ 
      data, 
      updateData, 
      updateAllData,
      loading 
    }}>
      {children}
    </DataContext.Provider>
  );
};