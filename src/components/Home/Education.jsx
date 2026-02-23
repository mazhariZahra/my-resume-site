import { motion } from 'framer-motion';
import { AcademicCapIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Education = ({ data }) => {
  return (
    <motion.section
      id="education"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Education
      </h2>

      <div className="space-y-6">
        {data.map((edu, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-start gap-4">
              <AcademicCapIcon className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                {/* مقطع فعلی */}
                <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                <p className="text-purple-300 mb-2">{edu.university}</p>
                <div className="flex items-center gap-4 text-gray-400 mb-3 flex-wrap">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="text-sm">{edu.location}</span>
                  </div>
                </div>

                {/* مقطع قبلی (اگر وجود داشته باشد) */}
                {edu.previousEducation && (
                  <div className="mt-4 pt-4 border-t border-purple-500/30">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      </div>
                      <div>
                        <h4 className="text-md font-semibold mb-1 text-purple-300">{edu.previousEducation.degree}</h4>
                        <p className="text-sm text-gray-300 mb-1">{edu.previousEducation.university}</p>
                        <div className="flex items-center gap-4 text-gray-400 text-xs flex-wrap">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-3 h-3" />
                            <span>{edu.previousEducation.startDate} - {edu.previousEducation.endDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPinIcon className="w-3 h-3" />
                            <span>{edu.previousEducation.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* نمرات */}
                {edu.grades && edu.grades.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-purple-300">Important scores:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {edu.grades.map((grade, i) => (
                        <div key={i} className="flex justify-between bg-white/5 p-2 rounded">
                          <span className="text-sm">{grade.course}:</span>
                          <span className="text-purple-400 font-bold">{grade.grade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Education;