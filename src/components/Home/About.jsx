import { motion } from 'framer-motion';
import { UserIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, CalendarIcon } from '@heroicons/react/24/outline';

const About = ({ data }) => {
  const contactInfo = [
    { icon: PhoneIcon, text: data.contact.phone },
    { icon: EnvelopeIcon, text: data.contact.email },
    { icon: MapPinIcon, text: data.contact.location },
    { icon: CalendarIcon, text: `Age: ${data.personalDetails.age} Year` },
  ];

  return (
    <motion.section
      id="about"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* عکس پروفایل */}
        {data.profileImage ? (
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-purple-500/50 shadow-lg shadow-purple-500/20">
            <img 
              src={data.profileImage} 
              alt={data.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"><svg class="w-24 h-24 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>';
              }}
            />
          </div>
        ) : (
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center border-4 border-white/20 shadow-lg">
            <UserIcon className="w-24 h-24 text-white/50" />
          </div>
        )}

        <div className="flex-1 text-center md:text-right">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {data.name}
          </h1>
          <h2 className="text-2xl text-gray-300 mb-6">{data.title}</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-300 text-left">About me</h3>
              <p className="text-gray-300 leading-relaxed text-justify">
                {data.about}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-300 text-left">Contact information</h3>
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3 text-gray-300 justify-center md:justify-start"
                  >
                    <item.icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-sm md:text-base">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;