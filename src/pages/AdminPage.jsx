import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Navigate } from 'react-router-dom';
import { 
  PencilIcon, 
  TrashIcon, 
  PlusIcon,
  DocumentTextIcon,
  CodeBracketIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  FolderIcon,
  XMarkIcon,
  CheckIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  CameraIcon,
  ArrowPathIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { onlineStorage } from '../services/api';

const AdminPage = () => {
  const { user } = useAuth();
  const { data, updateData } = useData();
  const [activeTab, setActiveTab] = useState('personal');
  const [editingItem, setEditingItem] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  // اگر کاربر لاگین نکرده باشه
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ذخیره تغییرات
  const handleSave = (section, newData) => {
    updateData(section, newData);
    setEditingItem(null);
    setEditingIndex(null);
    setShowAddForm(false);
    setSaveMessage('تغییرات با موفقیت ذخیره شد');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // ریست کردن داده‌ها به حالت اولیه
  const resetData = () => {
    if (window.confirm('آیا از بازنشانی داده‌ها به حالت اولیه اطمینان دارید؟')) {
      localStorage.removeItem('resumeData');
      window.location.reload();
    }
  };

  const tabs = [
    { id: 'personal', name: '', icon: UserIcon },
    { id: 'skills', name: 'مهارت‌ها', icon: CodeBracketIcon },
    { id: 'experience', name: 'سوابق شغلی', icon: BriefcaseIcon },
    { id: 'education', name: 'تحصیلات', icon: AcademicCapIcon },
    { id: 'certificates', name: 'گواهی‌ها', icon: DocumentTextIcon },
    { id: 'projects', name: 'پروژه‌ها', icon: FolderIcon },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen py-20"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        {/* هدر با دکمه ریست */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            پنل مدیریت
          </h1>
          <button
            onClick={resetData}
            className="flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600 rounded-lg hover:bg-red-600/30 transition"
          >
            <ArrowPathIcon className="w-5 h-5" />
            بازنشانی به حالت اولیه
          </button>
        </div>

        {/* پیام ذخیره */}
        {saveMessage && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-300">
            {saveMessage}
          </div>
        )}

        {/* تب‌ها */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setEditingItem(null);
                setEditingIndex(null);
                setShowAddForm(false);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 hover:bg-white/20'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* محتوای تب‌ها */}
        <div className="bg-white/5 rounded-xl p-6">
          {activeTab === 'personal' && (
            <PersonalInfoForm 
              data={data.personalInfo} 
              onSave={(newData) => handleSave('personalInfo', newData)}
              uploading={uploading}
              setUploading={setUploading}
            />
          )}
          
          {activeTab === 'skills' && (
            <SkillsForm 
              data={data.skills}
              onSave={(newData) => handleSave('skills', newData)}
            />
          )}
          
          {activeTab === 'experience' && (
            <ListForm 
              title="سابقه شغلی"
              items={data.workExperience}
              onSave={(newData) => handleSave('workExperience', newData)}
              fields={[
                { name: 'company', label: 'نام شرکت/سازمان', type: 'text' },
                { name: 'position', label: 'سمت', type: 'text' },
                { name: 'location', label: 'مکان', type: 'text' },
                { name: 'startDate', label: 'تاریخ شروع', type: 'text' },
                { name: 'endDate', label: 'تاریخ پایان', type: 'text' },
                { name: 'description', label: 'توضیحات', type: 'textarea' }
              ]}
              technologiesField={true}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              showAddForm={showAddForm}
              setShowAddForm={setShowAddForm}
            />
          )}
          
          {activeTab === 'education' && (
            <ListForm 
              title="تحصیلات"
              items={data.education}
              onSave={(newData) => handleSave('education', newData)}
              fields={[
                { name: 'degree', label: 'مقطع تحصیلی فعلی', type: 'text' },
                { name: 'university', label: 'دانشگاه/موسسه فعلی', type: 'text' },
                { name: 'location', label: 'مکان فعلی', type: 'text' },
                { name: 'startDate', label: 'تاریخ شروع فعلی', type: 'text' },
                { name: 'endDate', label: 'تاریخ پایان فعلی', type: 'text' }
              ]}
              previousEducationFields={[
                { name: 'previousEducation.degree', label: 'مقطع قبلی', type: 'text' },
                { name: 'previousEducation.university', label: 'موسسه قبلی', type: 'text' },
                { name: 'previousEducation.location', label: 'مکان قبلی', type: 'text' },
                { name: 'previousEducation.startDate', label: 'تاریخ شروع قبلی', type: 'text' },
                { name: 'previousEducation.endDate', label: 'تاریخ پایان قبلی', type: 'text' }
              ]}
              gradesField={true}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              showAddForm={showAddForm}
              setShowAddForm={setShowAddForm}
            />
          )}
          
          {activeTab === 'certificates' && (
            <ListForm 
              title="گواهی‌ها"
              items={data.certificates}
              onSave={(newData) => handleSave('certificates', newData)}
              fields={[
                { name: 'name', label: 'نام گواهی', type: 'text' },
                { name: 'issuer', label: 'صادرکننده', type: 'text' },
                { name: 'date', label: 'تاریخ', type: 'text' },
                { name: 'validUntil', label: 'اعتبار تا', type: 'text' },
                { name: 'link', label: 'لینک گواهی', type: 'url' }
              ]}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              showAddForm={showAddForm}
              setShowAddForm={setShowAddForm}
            />
          )}
          
          {activeTab === 'projects' && (
            <ListForm 
              title="پروژه‌ها"
              items={data.projects}
              onSave={(newData) => handleSave('projects', newData)}
              fields={[
                { name: 'name', label: 'نام پروژه', type: 'text' },
                { name: 'description', label: 'توضیحات', type: 'textarea' },
                { name: 'startDate', label: 'تاریخ شروع', type: 'text' },
                { name: 'endDate', label: 'تاریخ پایان', type: 'text' },
                { name: 'demo', label: 'لینک دمو', type: 'url' },
                { name: 'github', label: 'لینک گیت‌هاب', type: 'url' },
                { name: 'link', label: 'لینک پروژه', type: 'url' }
              ]}
              technologiesField={true}
              featuresField={true}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              showAddForm={showAddForm}
              setShowAddForm={setShowAddForm}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

// فرم اطلاعات شخصی با قابلیت آپلود عکس
const PersonalInfoForm = ({ data, onSave, uploading, setUploading }) => {
  const [formData, setFormData] = useState(data);
  const [imagePreview, setImagePreview] = useState(data.profileImage || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    
    try {
      // نمایش پیش‌نمایش موقت
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      // آپلود عکس به سرور
      const imageUrl = await onlineStorage.uploadImageToCloudinary(file);
      
      setFormData({
        ...formData,
        profileImage: imageUrl
      });
    } catch (error) {
      console.error('خطا در آپلود عکس:', error);
      alert('خطا در آپلود عکس. لطفاً دوباره تلاش کنید.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* بخش آپلود عکس */}
      <div className="flex flex-col items-center gap-4 p-6 bg-white/5 rounded-lg">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/50">
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="پروفایل"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <UserIcon className="w-16 h-16 text-white/50" />
              </div>
            )}
          </div>
          
          {/* دکمه آپلود عکس */}
          <label className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 cursor-pointer hover:bg-purple-700 transition border-2 border-white">
            <CameraIcon className="w-4 h-4 text-white" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>

          {uploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <ArrowPathIcon className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-400">برای تغییر عکس، روی دکمه دوربین کلیک کنید</p>
          <p className="text-xs text-gray-500 mt-1">فرمت‌های مجاز: JPG، PNG، GIF</p>
        </div>

        {/* فیلد لینک عکس (دستی) */}
        <div className="w-full mt-4">
          <label className="block text-sm text-gray-300 mb-2">یا لینک عکس را وارد کنید</label>
          <div className="flex gap-2">
            <input
              type="url"
              value={formData.profileImage || ''}
              onChange={(e) => {
                setFormData({...formData, profileImage: e.target.value});
                setImagePreview(e.target.value);
              }}
              className="flex-1 px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-purple-500 focus:outline-none"
              placeholder="https://example.com/image.jpg"
              dir="ltr"
            />
            <LinkIcon className="w-5 h-5 text-gray-400 self-center" />
          </div>
        </div>
      </div>

      {/* بقیه فیلدها */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 mb-2">نام و نام خانوادگی</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">عنوان شغلی</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-300 mb-2">درباره من</label>
          <textarea
            rows="4"
            value={formData.about}
            onChange={(e) => setFormData({...formData, about: e.target.value})}
            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">شماره تماس</label>
          <input
            type="text"
            value={formData.contact.phone}
            onChange={(e) => setFormData({
              ...formData, 
              contact: {...formData.contact, phone: e.target.value}
            })}
            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-purple-500 focus:outline-none"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">ایمیل</label>
          <input
            type="email"
            value={formData.contact.email}
            onChange={(e) => setFormData({
              ...formData, 
              contact: {...formData.contact, email: e.target.value}
            })}
            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-purple-500 focus:outline-none"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">آدرس</label>
          <input
            type="text"
            value={formData.contact.location}
            onChange={(e) => setFormData({
              ...formData, 
              contact: {...formData.contact, location: e.target.value}
            })}
            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">سن</label>
          <input
            type="number"
            value={formData.personalDetails.age}
            onChange={(e) => setFormData({
              ...formData, 
              personalDetails: {...formData.personalDetails, age: parseInt(e.target.value)}
            })}
            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">وضعیت تأهل</label>
          <select
            value={formData.personalDetails.maritalStatus}
            onChange={(e) => setFormData({
              ...formData, 
              personalDetails: {...formData.personalDetails, maritalStatus: e.target.value}
            })}
            className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:border-purple-500 focus:outline-none"
          >
            <option value="مجرد">مجرد</option>
            <option value="متأهل">متأهل</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={uploading}
        className={`flex items-center gap-2 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition ${
          uploading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {uploading ? (
          <>
            <ArrowPathIcon className="w-5 h-5 animate-spin" />
            در حال آپلود...
          </>
        ) : (
          <>
            <CheckIcon className="w-5 h-5" />
            ذخیره تغییرات
          </>
        )}
      </button>
    </form>
  );
};

// فرم مهارت‌ها
const SkillsForm = ({ data, onSave }) => {
  const [skills, setSkills] = useState(data);
  const [newSkill, setNewSkill] = useState({ name: '', level: 50, category: 'frontend' });
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const addSkill = () => {
    if (newSkill.name) {
      setSkills({
        ...skills,
        technical: [...skills.technical, newSkill]
      });
      setNewSkill({ name: '', level: 50, category: 'frontend' });
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.technical.filter((_, i) => i !== index);
    setSkills({ ...skills, technical: updatedSkills });
  };

  const updateSkillLevel = (index, level) => {
    const updated = [...skills.technical];
    updated[index].level = level;
    setSkills({...skills, technical: updated});
  };

  const addSoftSkill = () => {
    if (newSoftSkill && !skills.soft.includes(newSoftSkill)) {
      setSkills({
        ...skills,
        soft: [...skills.soft, newSoftSkill]
      });
      setNewSoftSkill('');
    }
  };

  const removeSoftSkill = (index) => {
    const updatedSoft = skills.soft.filter((_, i) => i !== index);
    setSkills({ ...skills, soft: updatedSoft });
  };

  const editSkill = (index, field, value) => {
    const updated = [...skills.technical];
    updated[index][field] = field === 'level' ? parseInt(value) : value;
    setSkills({...skills, technical: updated});
  };

  return (
    <div className="space-y-6">
      {/* مهارت‌های فنی */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-purple-300">مهارت‌های فنی</h3>
        <div className="space-y-4">
          {skills.technical.map((skill, index) => (
            <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <div className="flex items-center gap-4 mb-3">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => editSkill(index, 'name', e.target.value)}
                  className="flex-1 px-3 py-1 bg-white/10 rounded-lg border border-white/20 text-sm"
                />
                <select
                  value={skill.category}
                  onChange={(e) => editSkill(index, 'category', e.target.value)}
                  className="px-3 py-1 bg-white/10 rounded-lg border border-white/20 text-sm"
                >
                  <option value="frontend">فرانت‌اند</option>
                  <option value="backend">بک‌اند</option>
                  <option value="database">دیتابیس</option>
                  <option value="programming">برنامه‌نویسی</option>
                </select>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm w-12">{skill.level}%</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => editSkill(index, 'level', e.target.value)}
                  className="flex-1 accent-purple-500"
                />
              </div>
            </div>
          ))}
        </div>

        {/* افزودن مهارت جدید */}
        <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
          <h4 className="font-semibold mb-3 text-sm">افزودن مهارت جدید</h4>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="نام مهارت"
              value={newSkill.name}
              onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
              className="flex-1 px-4 py-2 bg-white/10 rounded-lg border border-white/20"
            />
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({...newSkill, category: e.target.value})}
              className="px-4 py-2 bg-white/10 rounded-lg border border-white/20"
            >
              <option value="frontend">فرانت‌اند</option>
              <option value="backend">بک‌اند</option>
              <option value="database">دیتابیس</option>
              <option value="programming">برنامه‌نویسی</option>
            </select>
            <input
              type="number"
              min="0"
              max="100"
              value={newSkill.level}
              onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
              className="w-20 px-3 py-2 bg-white/10 rounded-lg border border-white/20"
              placeholder="درصد"
            />
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* مهارت‌های نرم */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-purple-300">مهارت‌های نرم</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.soft.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm flex items-center gap-2"
            >
              <input
                type="text"
                value={skill}
                onChange={(e) => {
                  const updated = [...skills.soft];
                  updated[index] = e.target.value;
                  setSkills({...skills, soft: updated});
                }}
                className="bg-transparent border-none outline-none w-auto min-w-[80px] text-center"
              />
              <button
                onClick={() => removeSoftSkill(index)}
                className="text-red-400 hover:text-red-300"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="مهارت نرم جدید"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            className="flex-1 px-4 py-2 bg-white/10 rounded-lg border border-white/20"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addSoftSkill();
              }
            }}
          />
          <button
            onClick={addSoftSkill}
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <button
        onClick={() => onSave(skills)}
        className="flex items-center gap-2 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
      >
        <CheckIcon className="w-5 h-5" />
        ذخیره تغییرات
      </button>
    </div>
  );
};

// فرم لیست با قابلیت ویرایش
const ListForm = ({ 
  title, 
  items, 
  onSave, 
  fields, 
  technologiesField = false, 
  featuresField = false, 
  gradesField = false,
  previousEducationFields = false,
  editingItem,
  setEditingItem,
  editingIndex,
  setEditingIndex,
  showAddForm,
  setShowAddForm
}) => {
  const [list, setList] = useState(items || []);
  const [newItem, setNewItem] = useState({});
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [gradeInput, setGradeInput] = useState({ course: '', grade: '' });

  useEffect(() => {
    setList(items || []);
  }, [items]);

  const addItem = () => {
    const itemToAdd = { ...newItem, id: Date.now() };
    setList([...list, itemToAdd]);
    setNewItem({});
    setShowAddForm(false);
  };

  const updateItem = () => {
    if (editingIndex !== null) {
      const updatedList = [...list];
      updatedList[editingIndex] = { ...editingItem };
      setList(updatedList);
      setEditingItem(null);
      setEditingIndex(null);
    }
  };

  const deleteItem = (index) => {
    if (window.confirm(`آیا از حذف این ${title} اطمینان دارید؟`)) {
      const updated = list.filter((_, i) => i !== index);
      setList(updated);
    }
  };

  const startEdit = (item, index) => {
    setEditingItem({...item});
    setEditingIndex(index);
    setShowAddForm(false);
  };

  const addTechnology = () => {
    if (techInput) {
      const target = editingItem || newItem;
      const currentTechs = target.technologies || [];
      if (!currentTechs.includes(techInput)) {
        if (editingItem) {
          setEditingItem({
            ...editingItem,
            technologies: [...currentTechs, techInput]
          });
        } else {
          setNewItem({
            ...newItem,
            technologies: [...currentTechs, techInput]
          });
        }
      }
      setTechInput('');
    }
  };

  const removeTechnology = (tech) => {
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        technologies: (editingItem.technologies || []).filter(t => t !== tech)
      });
    } else {
      setNewItem({
        ...newItem,
        technologies: (newItem.technologies || []).filter(t => t !== tech)
      });
    }
  };

  const addFeature = () => {
    if (featureInput) {
      const target = editingItem || newItem;
      const currentFeatures = target.features || [];
      if (!currentFeatures.includes(featureInput)) {
        if (editingItem) {
          setEditingItem({
            ...editingItem,
            features: [...currentFeatures, featureInput]
          });
        } else {
          setNewItem({
            ...newItem,
            features: [...currentFeatures, featureInput]
          });
        }
      }
      setFeatureInput('');
    }
  };

  const removeFeature = (feature) => {
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        features: (editingItem.features || []).filter(f => f !== feature)
      });
    } else {
      setNewItem({
        ...newItem,
        features: (newItem.features || []).filter(f => f !== feature)
      });
    }
  };

  const addGrade = () => {
    if (gradeInput.course && gradeInput.grade) {
      const target = editingItem || newItem;
      const currentGrades = target.grades || [];
      if (editingItem) {
        setEditingItem({
          ...editingItem,
          grades: [...currentGrades, gradeInput]
        });
      } else {
        setNewItem({
          ...newItem,
          grades: [...currentGrades, gradeInput]
        });
      }
      setGradeInput({ course: '', grade: '' });
    }
  };

  const removeGrade = (index) => {
    const target = editingItem || newItem;
    const currentGrades = target.grades || [];
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        grades: currentGrades.filter((_, i) => i !== index)
      });
    } else {
      setNewItem({
        ...newItem,
        grades: currentGrades.filter((_, i) => i !== index)
      });
    }
  };

  const handleFieldChange = (fieldName, value) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [fieldName]: value });
    } else {
      setNewItem({ ...newItem, [fieldName]: value });
    }
  };

  const handlePreviousEducationChange = (fieldName, value) => {
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        previousEducation: {
          ...(editingItem.previousEducation || {}),
          [fieldName]: value
        }
      });
    } else {
      setNewItem({
        ...newItem,
        previousEducation: {
          ...(newItem.previousEducation || {}),
          [fieldName]: value
        }
      });
    }
  };

  const handleSubmit = () => {
    if (editingItem && editingIndex !== null) {
      updateItem();
    } else {
      addItem();
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setEditingIndex(null);
    setNewItem({});
    setShowAddForm(false);
  };

  const currentItem = editingItem || newItem;

  return (
    <div className="space-y-6">
      {/* لیست آیتم‌ها */}
      <div className="space-y-4">
        {list.map((item, index) => (
          <div key={item.id || index} className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {fields.map(field => (
                  <div key={field.name}>
                    {field.type === 'textarea' ? (
                      <p className="text-sm mt-2 text-gray-300">{item[field.name]}</p>
                    ) : (
                      <p className={field.name === 'name' || field.name === 'company' || field.name === 'degree' ? 'font-semibold text-lg' : 'text-sm text-gray-300'}>
                        <span className="text-gray-400">{field.label}:</span> {item[field.name]}
                      </p>
                    )}
                  </div>
                ))}

                {/* نمایش تحصیلات قبلی */}
                {item.previousEducation && (
                  <div className="mt-3 pr-3 border-r-2 border-purple-500/30">
                    <p className="text-sm text-purple-300 mb-1">تحصیلات قبلی:</p>
                    <p className="text-sm">{item.previousEducation.degree} - {item.previousEducation.university}</p>
                    <p className="text-xs text-gray-400">
                      {item.previousEducation.startDate} - {item.previousEducation.endDate} | {item.previousEducation.location}
                    </p>
                  </div>
                )}
                
                {item.technologies && item.technologies.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-400 mb-1">تکنولوژی‌ها:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.technologies.map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-purple-500/20 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {item.features && item.features.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-400 mb-1">ویژگی‌ها:</p>
                    <ul className="list-disc list-inside">
                      {item.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="text-sm text-gray-300">{feature}</li>
                      ))}
                      {item.features.length > 3 && (
                        <li className="text-sm text-purple-400">... و {item.features.length - 3} مورد دیگر</li>
                      )}
                    </ul>
                  </div>
                )}

                {item.grades && item.grades.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-400 mb-1">نمرات:</p>
                    <div className="grid grid-cols-2 gap-1">
                      {item.grades.map((grade, i) => (
                        <div key={i} className="text-xs bg-white/5 p-1 rounded flex justify-between">
                          <span>{grade.course}:</span>
                          <span className="text-purple-400">{grade.grade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2 mr-2">
                <button
                  onClick={() => startEdit(item, index)}
                  className="text-blue-400 hover:text-blue-300"
                  title="ویرایش"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteItem(index)}
                  className="text-red-400 hover:text-red-300"
                  title="حذف"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* فرم افزودن/ویرایش */}
      {(showAddForm || editingItem) && (
        <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30">
          <h4 className="font-semibold mb-4">
            {editingItem ? `ویرایش ${title}` : `افزودن ${title} جدید`}
          </h4>
          
          <div className="grid md:grid-cols-2 gap-4">
            {fields.map(field => (
              <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                <label className="block text-sm mb-1 text-gray-300">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={currentItem[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20"
                    rows="3"
                  />
                ) : field.type === 'url' ? (
                  <input
                    type="url"
                    value={currentItem[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20"
                    dir="ltr"
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={currentItem[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20"
                  />
                )}
              </div>
            ))}

            {/* فیلدهای تحصیلات قبلی */}
            {previousEducationFields && (
              <div className="md:col-span-2 mt-4 p-4 bg-purple-500/5 rounded-lg">
                <h5 className="font-semibold mb-3 text-purple-300">تحصیلات قبلی</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  {previousEducationFields.map(field => {
                    const fieldParts = field.name.split('.');
                    const fieldName = fieldParts[1];
                    return (
                      <div key={field.name}>
                        <label className="block text-sm mb-1 text-gray-300">{field.label}</label>
                        <input
                          type={field.type || 'text'}
                          value={currentItem.previousEducation?.[fieldName] || ''}
                          onChange={(e) => handlePreviousEducationChange(fieldName, e.target.value)}
                          className="w-full px-4 py-2 bg-white/10 rounded-lg border border-white/20"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {technologiesField && (
              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-300">تکنولوژی‌ها</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white/10 rounded-lg border border-white/20"
                    placeholder="نام تکنولوژی"
                  />
                  <button
                    type="button"
                    onClick={addTechnology}
                    className="px-4 py-2 bg-purple-600 rounded-lg"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(currentItem.technologies || []).map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-500/30 rounded-full text-sm flex items-center gap-1">
                      {tech}
                      <button type="button" onClick={() => removeTechnology(tech)} className="text-red-400">
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {featuresField && (
              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-300">ویژگی‌ها</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    className="flex-1 px-4 py-2 bg-white/10 rounded-lg border border-white/20"
                    placeholder="ویژگی پروژه"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-purple-600 rounded-lg"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(currentItem.features || []).map((feature, i) => (
                    <span key={i} className="px-2 py-1 bg-green-500/30 rounded-full text-sm flex items-center gap-1">
                      {feature}
                      <button type="button" onClick={() => removeFeature(feature)} className="text-red-400">
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {gradesField && (
              <div className="md:col-span-2">
                <label className="block mb-2 text-gray-300">نمرات</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="نام درس"
                    value={gradeInput.course}
                    onChange={(e) => setGradeInput({...gradeInput, course: e.target.value})}
                    className="flex-1 px-4 py-2 bg-white/10 rounded-lg border border-white/20"
                  />
                  <input
                    type="text"
                    placeholder="نمره"
                    value={gradeInput.grade}
                    onChange={(e) => setGradeInput({...gradeInput, grade: e.target.value})}
                    className="w-24 px-4 py-2 bg-white/10 rounded-lg border border-white/20"
                  />
                  <button
                    type="button"
                    onClick={addGrade}
                    className="px-4 py-2 bg-purple-600 rounded-lg"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(currentItem.grades || []).map((grade, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-500/30 rounded-full text-sm flex items-center gap-1">
                      {grade.course}: {grade.grade}
                      <button type="button" onClick={() => removeGrade(i)} className="text-red-400">
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              {editingItem ? 'به‌روزرسانی' : 'افزودن'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-600 rounded-lg hover:bg-gray-700"
            >
              انصراف
            </button>
          </div>
        </div>
      )}

      {/* دکمه افزودن */}
      {!showAddForm && !editingItem && (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
        >
          <PlusIcon className="w-5 h-5" />
          افزودن {title} جدید
        </button>
      )}

      {/* دکمه ذخیره */}
      <button
        onClick={() => onSave(list)}
        className="flex items-center gap-2 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
      >
        <CheckIcon className="w-5 h-5" />
        ذخیره تغییرات
      </button>
    </div>
  );
};

export default AdminPage;