import { motion } from 'framer-motion';
import { CodeBracketIcon, CalendarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { FaGithub } from 'react-icons/fa';

const Projects = ({ data }) => {
  const handleLinkClick = (url, type) => {
    if (url && url !== '') {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <motion.section
      id="projects"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Projects
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {data.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 rounded-xl p-6 border border-white/10"
          >
            <div className="flex items-start gap-3 mb-3">
              <CodeBracketIcon className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-xl font-semibold mb-1">{project.name}</h3>
                  <div className="flex gap-2">
                    {project.demo && project.demo !== '' && (
                      <button
                        onClick={() => handleLinkClick(project.demo, 'demo')}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                        title="View Demo"
                      >
                        <GlobeAltIcon className="w-5 h-5" />
                      </button>
                    )}
                    {project.github && project.github !== '' && (
                      <button
                        onClick={() => handleLinkClick(project.github, 'github')}
                        className="text-gray-400 hover:text-white transition-colors"
                        title="View on GitHub"
                      >
                        <FaGithub className="w-5 h-5" />
                      </button>
                    )}
                    {project.link && project.link !== '' && !project.demo && (
                      <button
                        onClick={() => handleLinkClick(project.link, 'link')}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                        title="View project"
                      >
                        <GlobeAltIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{project.startDate} - {project.endDate}</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-3 text-sm leading-relaxed">
              {project.description}
            </p>

            {project.features && project.features.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-purple-300 mb-2">Features:</p>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                  {project.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="text-xs">{feature}</li>
                  ))}
                  {project.features.length > 3 && (
                    <li className="text-xs text-purple-400"> and{project.features.length - 3} Another case</li>
                  )}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-3">
              {project.technologies.slice(0, 5).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-xs"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="text-xs text-gray-400">+{project.technologies.length - 5}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Projects;