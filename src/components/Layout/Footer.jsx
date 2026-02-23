import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">
            © All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;