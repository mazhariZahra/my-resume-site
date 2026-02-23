import { motion } from 'framer-motion';

const Skills = ({ data }) => {
  return (
    <motion.section
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Skills
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Technical skills</h3>
          <div className="space-y-4">
            {data.technical.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-300">Soft skills</h3>
          <div className="flex flex-wrap gap-2">
            {data.soft.map((skill, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;