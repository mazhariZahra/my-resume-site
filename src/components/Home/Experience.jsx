import { motion } from 'framer-motion';
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from '@heroicons/react/24/outline';

const Experience = ({ data }) => {
  return (
    <motion.section
      id="experience"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Career history
      </h2>

      <div className="space-y-6">
        {data.map((exp, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-start gap-4">
              <BriefcaseIcon className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{exp.company}</h3>
                <p className="text-purple-300 mb-2">{exp.position}</p>
                <div className="flex items-center gap-4 text-gray-400 mb-3 flex-wrap">
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-4 h-4" />
                    <span className="text-sm">{exp.startDate} - {exp.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="text-sm">{exp.location}</span>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-300 text-sm mb-3">{exp.description}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Experience;