import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Upload, Check, ArrowRight, Mail } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const WHATSAPP_LINK =" https://chat.whatsapp.com/Grc5YSsGkPe7u20HYINW3G";

const TRACKS = Object.freeze([
  'EdTech Solutions',
  'Campus-Related Challenges',
]);

const YEARS = Object.freeze(['1st Year', '2nd Year', '3rd Year', '4th Year']);
const TEAM_SIZE_OPTIONS = Object.freeze(['2', '3', '4']);
const FEE_PER_MEMBER = 100;

const FORM_STEPS = ['details', 'team', 'payment', 'confirm'];

export const RegistrationModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    year: '',
    teamName: '',
    track: '',
    teamSize: '2',
  });

  const [teamMembers, setTeamMembers] = useState([
    { name: '', rollNumber: '', program: '' },
    { name: '', rollNumber: '', program: '' },
  ]);

  const [paymentFile, setPaymentFile] = useState(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const totalFee = useMemo(() => FEE_PER_MEMBER * Number(formData.teamSize || 0), [formData.teamSize]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen || successData) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, successData]);

  // Adjust team members based on team size
  useEffect(() => {
    const size = Math.max(2, Math.min(4, Number(formData.teamSize || 2)));
    setTeamMembers((prev) => {
      if (prev.length === size) return prev;
      const copy = prev.slice(0, size);
      while (copy.length < size) copy.push({ name: '', rollNumber: '', program: '' });
      return copy;
    });
  }, [formData.teamSize]);

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    };
  }, [filePreviewUrl]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setFormData({
        name: '',
        email: '',
        phone: '',
        year: '',
        teamName: '',
        track: '',
        teamSize: '2',
      });
      setTeamMembers([
        { name: '', rollNumber: '', program: '' },
        { name: '', rollNumber: '', program: '' },
      ]);
      handleRemoveFile();
      setUpiId('');
      setTransactionId('');
      setSuccessData(null);
    }
  }, [isOpen]);

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleMemberChange = useCallback((index, field, value) => {
    setTeamMembers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }, []);

  const validateFileType = useCallback((file) => {
    if (!file) return false;
    const allowed = ['image/jpeg', 'image/jpg', 'application/pdf'];
    return allowed.includes(file.type);
  }, []);

  const handleFileSelected = useCallback((file) => {
    if (!file) {
      if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
      setPaymentFile(null);
      setFilePreviewUrl(null);
      return;
    }

    if (!validateFileType(file)) {
      toast.error('Payment receipt must be JPG, JPEG or PDF');
      return;
    }

    if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
    setPaymentFile(file);
    setFilePreviewUrl(preview);
  }, [filePreviewUrl, validateFileType]);

  const handleRemoveFile = useCallback(() => {
    if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    setFilePreviewUrl(null);
    setPaymentFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [filePreviewUrl]);

  const validateStep = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        if (!formData.name || !formData.email || !formData.phone || !formData.year || !formData.track) {
          toast.error('Please fill in all required fields');
          return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          toast.error('Please enter a valid email address');
          return false;
        }
        if (!/^[0-9]{10}$/.test(formData.phone)) {
          toast.error('Please enter a valid 10-digit phone number');
          return false;
        }
        return true;

      case 1:
        if (!formData.teamName || !formData.teamName.trim()) {
          toast.error('Team name is required');
          return false;
        }
        const teamSize = Number(formData.teamSize);
        if (!(teamSize >= 2 && teamSize <= 4)) {
          toast.error('Team size must be between 2 and 4');
          return false;
        }
        for (let i = 0; i < teamMembers.length; i++) {
          const m = teamMembers[i];
          if (!m.name?.trim() || !m.rollNumber?.trim() || !m.program?.trim()) {
            toast.error(`Please enter name, roll number and program for member ${i + 1}`);
            return false;
          }
        }
        return true;

      case 2:
        if (!paymentFile) {
          toast.error('Please upload the payment receipt');
          return false;
        }
        if (!validateFileType(paymentFile)) {
          toast.error('Payment receipt must be JPG, JPEG or PDF');
          return false;
        }
        if (!upiId || !transactionId) {
          toast.error('Please provide UPI ID and transaction ID');
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, FORM_STEPS.length - 1));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!validateStep(2)) return;

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('year', formData.year);
      payload.append('teamName', formData.teamName);
      payload.append('track', formData.track);
      payload.append('teamSize', String(formData.teamSize));
      payload.append('teamMembers', JSON.stringify(teamMembers));
      payload.append('upiId', upiId);
      payload.append('transactionId', transactionId);
      payload.append('paymentReceipt', paymentFile);
      payload.append('feePerMember', String(FEE_PER_MEMBER));
      payload.append('totalFee', String(FEE_PER_MEMBER * Number(formData.teamSize)));

      const response = await axios.post(`${BACKEND_URL}/api/registrations`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Set success data with email
      setSuccessData({
        teamName: formData.teamName,
        email: formData.email,
        name: formData.name,
      });

      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      const msg = error?.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(String(msg));
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, teamMembers, paymentFile, upiId, transactionId]);

  if (!isOpen && !successData) return null;

  // Show success modal if registration was successful
  if (successData) {
    return (
      <SuccessModal 
        data={successData} 
        onClose={() => {
          setSuccessData(null);
          onClose?.();
        }} 
      />
    );
  }

  return (
    <>
      {/* Backdrop with blur */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        data-testid="registration-backdrop"
      />

      {/* Modal centered in viewport */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
        <motion.div
          className="w-full max-w-2xl max-h-[90vh] bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-purple-500/30 pointer-events-auto"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          onClick={(e) => e.stopPropagation()}
          data-testid="registration-modal"
        >
          {/* Header with gradient background */}
          <div className="relative p-6 sm:p-8 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/40 to-transparent flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-1 sm:mb-2">
                Register Now
              </h2>
              <p className="text-xs sm:text-sm text-purple-300/80 font-medium">
                Step {currentStep + 1} of {FORM_STEPS.length} • HackForge 2.0
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-purple-400/60 hover:text-white transition-colors p-2 hover:bg-purple-500/10 rounded-lg flex-shrink-0 ml-2"
              data-testid="close-modal"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-1.5 bg-purple-900/50 flex overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 h-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep + 1) / FORM_STEPS.length) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Content area with better scrolling */}
          <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 scrollbar-thin scrollbar-thumb-purple-500/30 scrollbar-track-transparent">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <StepDetails
                  key="details"
                  formData={formData}
                  handleChange={handleChange}
                  data-testid="step-details"
                />
              )}
              {currentStep === 1 && (
                <StepTeam
                  key="team"
                  teamMembers={teamMembers}
                  handleMemberChange={handleMemberChange}
                  formData={formData}
                  handleChange={handleChange}
                  data-testid="step-team"
                />
              )}
              {currentStep === 2 && (
                <StepPayment
                  key="payment"
                  paymentFile={paymentFile}
                  filePreviewUrl={filePreviewUrl}
                  upiId={upiId}
                  transactionId={transactionId}
                  setUpiId={setUpiId}
                  setTransactionId={setTransactionId}
                  handleFileSelected={handleFileSelected}
                  handleRemoveFile={handleRemoveFile}
                  fileInputRef={fileInputRef}
                  totalFee={totalFee}
                  data-testid="step-payment"
                />
              )}
              {currentStep === 3 && (
                <StepConfirm
                  key="confirm"
                  formData={formData}
                  teamMembers={teamMembers}
                  totalFee={totalFee}
                  data-testid="step-confirm"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Footer with action buttons */}
          <div className="p-6 sm:p-8 border-t border-purple-500/20 bg-gradient-to-t from-purple-900/20 to-transparent flex gap-2 sm:gap-3 justify-between flex-shrink-0 flex-col sm:flex-row">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="order-2 sm:order-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-purple-500/40 text-white hover:border-purple-500/70 hover:bg-purple-500/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold text-sm sm:text-base"
            >
              Back
            </button>

            {currentStep < FORM_STEPS.length - 1 ? (
              <button
                onClick={handleNextStep}
                disabled={currentStep === 2 && !paymentFile}
                className="order-1 sm:order-2 flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-purple-500/50 disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base"
                data-testid="next-button"
              >
                Continue <ArrowRight size={16} className="sm:w-5 sm:h-5 hidden sm:inline" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="order-1 sm:order-2 flex-1 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60 transition-all shadow-lg hover:shadow-pink-500/50 text-sm sm:text-base"
                data-testid="registration-submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Complete
                  </>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

// Step Components
const StepDetails = React.memo(({ formData, handleChange }) => (
  <motion.div
    className="space-y-4 sm:space-y-6"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-2">
        Full Name <span className="text-pink-400">*</span>
      </label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="John Doe"
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-purple-900/20 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/70 focus:bg-purple-900/30 transition-all text-sm"
        data-testid="registration-name"
      />
    </div>

    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-2">
        Email Address <span className="text-pink-400">*</span>
      </label>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="john@university.edu.in"
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-purple-900/20 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/70 focus:bg-purple-900/30 transition-all text-sm"
        data-testid="registration-email"
      />
    </div>

    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-2">
        Phone Number <span className="text-pink-400">*</span>
      </label>
      <input
        type="tel"
        inputMode="numeric"
        value={formData.phone}
        onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
        placeholder="9876543210"
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-purple-900/20 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/70 focus:bg-purple-900/30 transition-all text-sm"
        data-testid="registration-phone"
      />
    </div>

    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-2">
        Academic Year <span className="text-pink-400">*</span>
      </label>
      <select
        value={formData.year}
        onChange={(e) => handleChange('year', e.target.value)}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-purple-900/20 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500/70 focus:bg-purple-900/30 transition-all cursor-pointer text-sm appearance-none bg-no-repeat bg-right"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a78bfa' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 1rem center',
          paddingRight: '2.5rem',
        }}
        data-testid="registration-year"
      >
        <option value="">Select your year</option>
        {YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-2">
        Preferred Track <span className="text-pink-400">*</span>
      </label>
      <select
        value={formData.track}
        onChange={(e) => handleChange('track', e.target.value)}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-purple-900/20 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500/70 focus:bg-purple-900/30 transition-all cursor-pointer text-sm appearance-none bg-no-repeat bg-right"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a78bfa' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 1rem center',
          paddingRight: '2.5rem',
        }}
        data-testid="registration-track"
      >
        <option value="">Select a track</option>
        {TRACKS.map((track) => (
          <option key={track} value={track}>
            {track}
          </option>
        ))}
      </select>
    </div>
  </motion.div>
));

const StepTeam = React.memo(({ teamMembers, handleMemberChange, formData, handleChange }) => (
  <motion.div
    className="space-y-4 sm:space-y-6"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-2">
        Team Name <span className="text-pink-400">*</span>
      </label>
      <input
        type="text"
        value={formData.teamName}
        onChange={(e) => handleChange('teamName', e.target.value)}
        placeholder="e.g., Team Alpha, Code Warriors"
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-purple-900/20 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/70 focus:bg-purple-900/30 transition-all text-sm"
        data-testid="registration-team"
      />
    </div>

    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-2">
        Team Size <span className="text-pink-400">*</span>
      </label>
      <select
        value={formData.teamSize}
        onChange={(e) => handleChange('teamSize', e.target.value)}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-purple-900/20 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-500/70 focus:bg-purple-900/30 transition-all cursor-pointer text-sm appearance-none bg-no-repeat bg-right"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a78bfa' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 1rem center',
          paddingRight: '2.5rem',
        }}
        data-testid="registration-team-size"
      >
        {TEAM_SIZE_OPTIONS.map((size) => (
          <option key={size} value={size}>
            {size} Members (₹{100 * Number(size)})
          </option>
        ))}
      </select>
    </div>

    <div className="space-y-3 sm:space-y-4">
      <p className="text-xs sm:text-sm font-semibold text-gray-100">
        Team Members <span className="text-pink-400">*</span>
      </p>
      {teamMembers.map((member, idx) => (
        <motion.div
          key={idx}
          className="p-3 sm:p-4 rounded-xl bg-purple-900/20 border border-purple-500/20 space-y-2 sm:space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <p className="text-xs font-bold text-purple-300 uppercase tracking-widest">
            {idx === 0 ? '👑 Team Leader' : `👥 Member ${idx + 1}`}
          </p>
          <input
            type="text"
            value={member.name}
            onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
            placeholder="Full name"
            className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 bg-purple-900/30 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500/50 transition-all"
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={member.rollNumber}
              onChange={(e) => handleMemberChange(idx, 'rollNumber', e.target.value)}
              placeholder="Roll number"
              className="px-2.5 sm:px-3 py-2 sm:py-2.5 bg-purple-900/30 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500/50 transition-all"
            />
            <input
              type="text"
              value={member.program}
              onChange={(e) => handleMemberChange(idx, 'program', e.target.value)}
              placeholder="Program"
              className="px-2.5 sm:px-3 py-2 sm:py-2.5 bg-purple-900/30 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-purple-500/50 transition-all"
            />
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
));

const StepPayment = React.memo(({
  paymentFile,
  filePreviewUrl,
  upiId,
  transactionId,
  setUpiId,
  setTransactionId,
  handleFileSelected,
  handleRemoveFile,
  fileInputRef,
  totalFee,
}) => (
  <motion.div
    className="space-y-4 sm:space-y-6"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {/* QR Code Section */}
    <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-900/40 to-purple-900/20 border border-purple-500/30 text-center">
      <p className="text-xs sm:text-sm font-bold text-purple-200 mb-3 sm:mb-4 uppercase tracking-widest">📱 Scan to Pay</p>
      <img
        src="/images/QR/payment_qr.jpeg"
        alt="Payment QR Code"
        className="w-32 h-32 sm:w-48 sm:h-48 mx-auto rounded-xl border-2 border-purple-500/40 shadow-lg shadow-purple-500/20"
        loading="lazy"
      />
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-purple-500/20">
        <p className="text-xs text-gray-400 mb-1">Amount to pay</p>
        <p className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">₹{totalFee}</p>
      </div>
    </div>

    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-2">
        UPI ID <span className="text-pink-400">*</span>
      </label>
      <input
        type="text"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        placeholder="yourname@bankupi"
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-purple-900/20 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/70 focus:bg-purple-900/30 transition-all text-sm"
        data-testid="registration-upi"
      />
    </div>

    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-2">
        Transaction ID <span className="text-pink-400">*</span>
      </label>
      <input
        type="text"
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
        placeholder="Enter transaction reference ID"
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-purple-900/20 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/70 focus:bg-purple-900/30 transition-all text-sm"
        data-testid="registration-transaction"
      />
    </div>

    <div>
      <label className="block text-xs sm:text-sm font-semibold text-gray-100 mb-2 sm:mb-3">
        Payment Receipt <span className="text-pink-400">*</span>
      </label>
      <div className="border-2 border-dashed border-purple-500/40 rounded-xl p-4 sm:p-6 text-center hover:border-purple-500/70 hover:bg-purple-900/10 transition-all">
        {!paymentFile ? (
          <label className="cursor-pointer">
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.pdf"
              onChange={(e) => handleFileSelected(e.target.files?.[0] || null)}
              className="hidden"
              data-testid="registration-payment-file"
            />
            <Upload size={28} className="sm:w-9 sm:h-9 text-purple-400 mx-auto mb-2 sm:mb-3" />
            <p className="text-xs sm:text-sm font-bold text-gray-200">Click to upload receipt</p>
            <p className="text-xs text-gray-500 mt-1">JPG, JPEG or PDF • Max 10MB</p>
          </label>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {filePreviewUrl && paymentFile.type.startsWith('image/') ? (
              <img
                src={filePreviewUrl}
                alt="receipt preview"
                className="w-20 h-20 sm:w-32 sm:h-32 mx-auto object-cover rounded-lg border border-purple-500/30"
              />
            ) : null}
            <p className="text-xs sm:text-sm text-gray-300 font-semibold break-all">{paymentFile.name}</p>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all font-semibold"
              data-testid="registration-remove-file"
            >
              <X size={12} className="inline mr-1" />
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  </motion.div>
));

const StepConfirm = React.memo(({ formData, teamMembers, totalFee }) => (
  <motion.div
    className="space-y-3 sm:space-y-5"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    <div className="p-3 sm:p-4 rounded-xl bg-green-500/10 border border-green-500/30">
      <p className="text-xs sm:text-sm text-green-300 font-semibold">✓ Everything looks good! Click "Complete" to submit.</p>
    </div>

    <div className="space-y-3 sm:space-y-4">
      <div className="p-3 sm:p-4 rounded-xl bg-purple-900/30 border border-purple-500/20">
        <p className="text-xs text-gray-400 font-semibold mb-1">Team Leader</p>
        <p className="text-sm sm:text-base font-bold text-white">{formData.name}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <div className="p-3 sm:p-4 rounded-xl bg-purple-900/30 border border-purple-500/20">
          <p className="text-xs text-gray-400 font-semibold mb-1">Track</p>
          <p className="text-xs sm:text-sm font-bold text-purple-300">{formData.track}</p>
        </div>
        <div className="p-3 sm:p-4 rounded-xl bg-purple-900/30 border border-purple-500/20">
          <p className="text-xs text-gray-400 font-semibold mb-1">Team Size</p>
          <p className="text-xs sm:text-sm font-bold text-purple-300">{formData.teamSize} Members</p>
        </div>
      </div>

      <div className="p-3 sm:p-4 rounded-xl bg-purple-900/30 border border-purple-500/20">
        <p className="text-xs text-gray-400 font-semibold mb-1">Team Name</p>
        <p className="text-sm sm:text-base font-bold text-purple-300">{formData.teamName}</p>
      </div>

      <div className="p-3 sm:p-4 rounded-xl bg-purple-900/30 border border-purple-500/20">
        <p className="text-xs text-gray-400 font-semibold mb-2 sm:mb-3">Team Members</p>
        <div className="space-y-1 sm:space-y-2">
          {teamMembers.map((member, idx) => (
            <p key={idx} className="text-xs sm:text-sm text-gray-300">
              {idx === 0 ? '👑' : '👥'} <span className="font-semibold">{member.name}</span> ({member.rollNumber})
            </p>
          ))}
        </div>
      </div>

      <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-600/40 to-pink-600/40 border border-purple-500/40">
        <p className="text-xs text-gray-300 font-semibold mb-1">Total Amount</p>
        <p className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">₹{totalFee}</p>
      </div>
    </div>
  </motion.div>
));

const SuccessModal = ({ data, onClose }) => {
  return (
    <>
      {/* Backdrop with blur */}
      <motion.div
  className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Success Modal - Compact Square */}
     <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none p-4">
        <motion.div
          className="w-full max-w-sm bg-gradient-to-b from-purple-900/90 via-slate-900/90 to-purple-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl text-center border border-purple-500/40 pointer-events-auto"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 35 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Success Icon */}
          <motion.div
            className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500/40 to-emerald-600/30 border-2 border-green-500/60 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', delay: 0.1, stiffness: 300, damping: 25 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Check size={32} className="sm:w-10 sm:h-10 text-green-400" />
            </motion.div>
          </motion.div>

          {/* Success Title */}
          <motion.h3
            className="text-2xl sm:text-3xl font-black text-white mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Registration Successful! 🎉
          </motion.h3>

          {/* Team Name */}
          <motion.div
            className="mb-4 sm:mb-5 p-3 sm:p-4 rounded-xl bg-purple-900/40 border border-purple-500/30"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs text-gray-400 font-semibold mb-1 uppercase">Team Name</p>
            <p className="text-base sm:text-lg font-bold text-purple-300">{data.teamName}</p>
          </motion.div>

          {/* Email Confirmation */}
          <motion.div
            className="mb-5 sm:mb-6 p-3 sm:p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-2 sm:gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Mail className="text-blue-400 flex-shrink-0 mt-0.5 sm:mt-1 w-4 h-4 sm:w-5 sm:h-5" />
            <div className="text-left min-w-0">
              <p className="text-xs text-gray-400 font-semibold mb-1">Confirmation Email Sent</p>
              <p className="text-xs sm:text-sm text-blue-300 break-all font-semibold">{data.email}</p>
              <p className="text-xs text-gray-500 mt-1">Check your inbox for details</p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-gray-300 mb-6 sm:mb-7 text-xs sm:text-sm leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Your team <span className="font-bold text-purple-300">{data.teamName}</span> is registered for <span className="font-bold text-purple-300">HackForge 2.0</span>!
          </motion.p>

          {/* WhatsApp Button */}
          <motion.a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-green-500/50 mb-2 sm:mb-3 text-sm sm:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-lg sm:text-xl">✓</span> Join WhatsApp
          </motion.a>

          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="w-full px-4 sm:px-6 py-2.5 sm:py-3 border border-purple-500/40 text-white rounded-xl hover:bg-purple-500/10 transition-all font-semibold text-sm sm:text-base"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Close
          </motion.button>

          {/* Footer message */}
          <motion.p
            className="text-xs text-gray-500 mt-3 sm:mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            See you at HackForge 2.0! 🚀
          </motion.p>
        </motion.div>
      </div>
    </>
  );
};

export default RegistrationModal;