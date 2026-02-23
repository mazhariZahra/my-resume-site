import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import About from '../components/Home/About';
import Skills from '../components/Home/Skills';
import Experience from '../components/Home/Experience';
import Education from '../components/Home/Education';
import Projects from '../components/Home/Projects';
import Certificates from '../components/Home/Certificates';

const HomePage = () => {
  const { data, loading } = useData();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      <About data={data.personalInfo} />
      <Skills data={data.skills} />
      <Experience data={data.workExperience} />
      <Education data={data.education} />
      <Projects data={data.projects} />
      <Certificates data={data.certificates} />
    </motion.div>
  );
};

export default HomePage;