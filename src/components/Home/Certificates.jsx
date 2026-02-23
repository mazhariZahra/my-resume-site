import { motion } from 'framer-motion';
import { AcademicCapIcon, CalendarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

const Certificates = ({ data }) => {
  const handleCertificateClick = (link, name) => {
    if (link && link !== '#' && link !== '') {
      // باز کردن لینک در tab جدید
      window.open(link, '_blank', 'noopener noreferrer');
    } else {
      // اگر لینک وجود نداشت، پیام خطا نشون بده
      alert(`برای گواهی "${name}" لینکی وارد نشده است.`);
    }
  };

  return (
    <motion.section
      id="certificates"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.7 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
       Certificates
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((cert, index) => {
          const hasLink = cert.link && cert.link !== '#' && cert.link !== '';
          
          return (
            <motion.div
              key={index}
              whileHover={{ scale: hasLink ? 1.05 : 1 }}
              onClick={() => handleCertificateClick(cert.link, cert.name)}
              className={`bg-white/5 rounded-lg p-4 border transition-all ${
                hasLink 
                  ? 'cursor-pointer hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20' 
                  : 'opacity-75 cursor-not-allowed border-white/10'
              }`}
            >
              <div className="flex items-start gap-3">
                <AcademicCapIcon className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold mb-1 line-clamp-2">{cert.name}</h3>
                    {hasLink && (
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-purple-300 mb-2">{cert.issuer}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      <span>{cert.date}</span>
                    </div>
                    {cert.validUntil && cert.validUntil !== 'Now' && (
                      <span className="bg-green-500/20 px-2 py-0.5 rounded-full"> Valid until {cert.validUntil}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Certificates;