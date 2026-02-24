import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const SyncPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { updateAllData } = useData();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const syncData = async () => {
      const dataParam = searchParams.get('data');
      
      if (!dataParam) {
        setStatus('error');
        setMessage('لینک همگام‌سازی معتبر نیست');
        setTimeout(() => navigate('/'), 3000);
        return;
      }

      try {
        // دیکد کردن داده‌ها
        const decodedStr = decodeURIComponent(atob(dataParam));
        const importedData = JSON.parse(decodedStr);
        
        // ذخیره در context و localStorage
        updateAllData(importedData);
        
        setStatus('success');
        setMessage('داده‌ها با موفقیت همگام‌سازی شدند');
        
        // رفتن به صفحه اصلی بعد از 3 ثانیه
        setTimeout(() => navigate('/'), 3000);
      } catch (error) {
        console.error('خطا در همگام‌سازی:', error);
        setStatus('error');
        setMessage('خطا در همگام‌سازی داده‌ها');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    syncData();
  }, [searchParams, navigate, updateAllData]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[60vh] flex items-center justify-center"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <ArrowPathIcon className="w-16 h-16 text-purple-400 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold mb-2">در حال همگام‌سازی</h2>
            <p className="text-gray-400">لطفاً صبر کنید...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-green-400">موفقیت!</h2>
            <p className="text-gray-300">{message}</p>
            <p className="text-sm text-gray-500 mt-4">به صفحه اصلی هدایت می‌شوید...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircleIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2 text-red-400">خطا!</h2>
            <p className="text-gray-300">{message}</p>
            <p className="text-sm text-gray-500 mt-4">به صفحه اصلی هدایت می‌شوید...</p>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SyncPage;