import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const BACKEND_URL = "http://localhost:5000";
const WHATSAPP_LINK = import.meta.env.WHATSAPP_LINK || 'https://chat.whatsapp.com/YOUR_GROUP_LINK';

const TRACKS = Object.freeze([
  'AI & Machine Learning',
  'Web3 & Blockchain',
  'HealthTech',
  'Cybersecurity',
  'Sustainability',
  'Open Innovation',
]);

const YEARS = Object.freeze([
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
]);

const TEAM_SIZE_OPTIONS = Object.freeze(['2', '3', '4']);

const FEE_PER_MEMBER = 50; // INR

// static styles to avoid re-creation and re-renders
const DIALOG_PANEL_STYLES = {
  backgroundColor: '#0F0518',
  border: '1px solid rgba(124, 58, 237, 0.3)',
  borderRadius: 8,
  width: 'min(95vw, 820px)',
  maxHeight: '88vh',
  cursor: 'default', // normal system cursor inside modal
  zIndex: 1200,
  // fixed centering to avoid any parent/layout interference
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxSizing: 'border-box',
  overflow: 'hidden',
};

const INPUT_STYLE = {
  backgroundColor: 'rgba(26, 11, 46, 0.6)',
  color: '#F3F4F6',
  cursor:"text",
  borderBottom: '1px solid rgba(124, 58, 237, 0.3)',
};


const FORM_CONTAINER_STYLES = {
  maxHeight: '70vh',
  overflowY: 'auto',
  paddingRight: 12,
  paddingLeft: 16,
  paddingBottom: 16,
};

const SELECT_CONTENT_COMMON = {
  backgroundColor: '#1A0B2E',
  border: '1px solid rgba(124, 58, 237, 0.3)',
  color: '#F3F4F6',
  zIndex: 1400,
  position: 'fixed', // ensures dropdown isn't clipped by the scrollable container
};

const TeamMemberRow = React.memo(function TeamMemberRow({
member,
index,
onChange,
}) {
return (
  <div className="grid grid-cols-3 gap-3">
    <Input
      value={member.name}
      onChange={(e) => onChange(index, 'name', e.target.value)}
      placeholder={index === 0 ? 'Leader name - John Doe' : `Member ${index + 1} name`}
      className="border-0"
      style={INPUT_STYLE}
    />
    <Input
      value={member.rollNumber}
      onChange={(e) => onChange(index, 'rollNumber', e.target.value)}
      placeholder="Roll Number"
      className="border-0"
      style={INPUT_STYLE}
    />
    <Input
      value={member.program}
      onChange={(e) => onChange(index, 'program', e.target.value)}
      placeholder="Program (e.g. B.Tech CS)"
      className="border-0"
      style={INPUT_STYLE}
    />
  </div>
);
});
export const RegistrationModal = ({ isOpen, onClose }) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
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

  useEffect(() => {
    const size = Math.max(2, Math.min(4, Number(formData.teamSize || 2)));
    setTeamMembers((prev) => {
      const copy = prev.slice(0, size);
      while (copy.length < size) copy.push({ name: '', rollNumber: '', program: '' });
      return copy;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.teamSize]);

  useEffect(() => {
    return () => {
      if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl);
    };
  }, [filePreviewUrl]);

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
    fileInputRef.current.value = ''; // ✅ clears filename
  }
}, [filePreviewUrl]);


  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.year || !formData.track) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    const teamSize = Number(formData.teamSize);
    if (!(teamSize >= 2 && teamSize <= 4)) {
      toast.error('Team size must be between 2 and 4');
      return;
    }

    for (let i = 0; i < teamMembers.length; i++) {
      const m = teamMembers[i];
      if (!m.name || !m.name.trim() || !m.rollNumber || !m.rollNumber.trim() || !m.program || !m.program.trim()) {
        toast.error(`Please enter name, roll number and program for member ${i + 1}`);
        return;
      }
    }

    if (!paymentFile) {
      toast.error('Please upload the payment receipt');
      return;
    }

    if (!validateFileType(paymentFile)) {
      toast.error('Payment receipt must be JPG, JPEG or PDF');
      return;
    }

    if (!upiId || !transactionId) {
      toast.error('Please provide UPI ID and transaction ID');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('year', formData.year);
      payload.append('teamName', formData.teamName || '-');
      payload.append('track', formData.track);
      payload.append('teamSize', String(teamSize));
      payload.append('teamMembers', JSON.stringify(teamMembers));
      payload.append('upiId', upiId);
      payload.append('transactionId', transactionId);
      payload.append('paymentReceipt', paymentFile);
      payload.append('feePerMember', String(FEE_PER_MEMBER));
      payload.append('totalFee', String(FEE_PER_MEMBER * teamSize));

      await axios.post(`${BACKEND_URL}/api/registrations`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Registration successful!');

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

      try { onClose?.(); } catch (e) {}
      setSuccessOpen(true);
    } catch (error) {
      console.error('Registration error:', error);
      const msg = error?.response?.data || 'Registration failed. Please try again.';
      toast.error(String(msg));
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, teamMembers, paymentFile, upiId, transactionId, validateFileType, handleRemoveFile, onClose]);


  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="registration-dialog-content"
          style={DIALOG_PANEL_STYLES}
          data-testid="registration-modal"
        >
          <DialogHeader>
            <DialogTitle
              className="text-2xl font-bold"
              style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6', padding: '16px 16px 0 16px' }}
            >
              Register for <span style={{ color: '#7C3AED' }}>HackForge 2.0</span>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-4" style={FORM_CONTAINER_STYLES}>
            <div className="space-y-5" style={{ paddingBottom: 8 }}>
              {/* Leader */}
              <div className="space-y-2">
                <Label htmlFor="name" style={{ color: '#D1D5DB' }}>
                  Team Leader Full Name <span style={{ color: '#EF4444' }}>*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Leader - John Doe"
                  className="border-0"
                  style={INPUT_STYLE}
                  data-testid="registration-name"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" style={{ color: '#D1D5DB' }}>
                    Email Address <span style={{ color: '#EF4444' }}>*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="john@geetauniversity.edu.in"
                    className="border-0"
                    style={INPUT_STYLE}
                    data-testid="registration-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" style={{ color: '#D1D5DB' }}>
                    Phone Number <span style={{ color: '#EF4444' }}>*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="9876543210"
                    className="border-0"
                    style={INPUT_STYLE}
                    data-testid="registration-phone"
                  />
                </div>
              </div>

              {/* Year & Team Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label style={{ color: '#D1D5DB' }}>
                    Year <span style={{ color: '#EF4444' }}>*</span>
                  </Label>
                  <Select
                    value={formData.year}
                    onValueChange={(value) => handleChange('year', value)}
                  >
                    <SelectTrigger
                      className="border-0"
                      style={{...INPUT_STYLE, cursor:"pointer"}}
                      data-testid="registration-year"
                    >
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent style={SELECT_CONTENT_COMMON}>
                      {YEARS.map((year) => (
                        <SelectItem key={year} value={year} style={{ color: '#F3F4F6', cursor: 'pointer'  }}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamName" style={{ color: '#D1D5DB' }}>
                    Team Name
                  </Label>
                  <Input
                    id="teamName"
                    value={formData.teamName}
                    onChange={(e) => handleChange('teamName', e.target.value)}
                    placeholder="Team Alpha"
                    className="border-0"
                    style={INPUT_STYLE}
                    data-testid="registration-team"
                  />
                </div>
              </div>

              {/* Track & Team Size */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label style={{ color: '#D1D5DB' }}>
                    Preferred Track <span style={{ color: '#EF4444' }}>*</span>
                  </Label>
                  <Select
                    value={formData.track}
                    onValueChange={(value) => handleChange('track', value)}
                  >
                    <SelectTrigger
                      className="border-0"
                      style={{...INPUT_STYLE, cursor:"pointer"}}
                      data-testid="registration-track"
                    >
                      <SelectValue placeholder="Select a track" />
                    </SelectTrigger>
                    <SelectContent style={SELECT_CONTENT_COMMON}>
                      {TRACKS.map((track) => (
                        <SelectItem key={track} value={track} style={{ color: '#F3F4F6', cursor: 'pointer'  }}>
                          {track}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label style={{ color: '#D1D5DB' }}>
                    Team Size (2 to 4 members) <span style={{ color: '#EF4444' }}>*</span>
                  </Label>
                  <Select
                    value={formData.teamSize}
                    onValueChange={(value) => handleChange('teamSize', value)}
                  >
                    <SelectTrigger
                      className="border-0"
                      style={{...INPUT_STYLE, cursor:"pointer"}}
                      data-testid="registration-team-size"
                    >
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent style={SELECT_CONTENT_COMMON}>
                      {TEAM_SIZE_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s} style={{ color: '#F3F4F6', cursor: 'pointer'}}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Team Members */}
              <div className="space-y-2">
                <Label style={{ color: '#D1D5DB' }}>
                  Team Members (Leader first). Provide full name, roll number and program for each member. <span style={{ color: '#EF4444' }}>*</span>
                </Label>
                <div className="space-y-3">
                  {teamMembers.map((member, idx) => (
  <TeamMemberRow
    key={idx}
    member={member}
    index={idx}
    onChange={handleMemberChange}
  />
))}

                </div>
              </div>

              {/* Payment */}
              <div className="space-y-2">
                <Label style={{ color: '#D1D5DB' }}>
                  Payment Receipt (jpg, jpeg, pdf) <span style={{ color: '#EF4444' }}>*</span>
                </Label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <input
  ref={fileInputRef}
  type="file"
  accept=".jpg,.jpeg,.pdf"
  onChange={(e) => handleFileSelected(e.target.files?.[0] || null)}
  data-testid="registration-payment-file"
/>


                  {paymentFile && (
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      {filePreviewUrl && paymentFile.type.startsWith('image/') ? (
                        <img src={filePreviewUrl} alt="receipt preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6, border: '1px solid rgba(124,58,237,0.2)' }} />
                      ) : (paymentFile && paymentFile.type === 'application/pdf') ? (
                        <a href={filePreviewUrl || '#'} target="_blank" rel="noreferrer" style={{ color: '#9CA3AF' }}>
                          Preview PDF
                        </a>
                      ) : null}

                      {paymentFile && !filePreviewUrl && (
                        <span style={{ color: '#9CA3AF' }}>{paymentFile.name}</span>
                      )}

                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        style={{ background: 'transparent', border: '1px solid rgba(124,58,237,0.3)', color: '#F3F4F6', padding: '6px 10px', borderRadius: 6, cursor: 'pointer' }}
                        data-testid="registration-remove-file"
                      >
                        <X size={16} /> Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* UPI & Transaction */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label style={{ color: '#D1D5DB' }}>
                    UPI ID <span style={{ color: '#EF4444' }}>*</span>
                  </Label>
                  <Input
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourupi@bank"
                    className="border-0"
                    style={INPUT_STYLE}
                    data-testid="registration-upi"
                  />
                </div>

                <div className="space-y-2">
                  <Label style={{ color: '#D1D5DB' }}>
                    Transaction ID <span style={{ color: '#EF4444' }}>*</span>
                  </Label>
                  <Input
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    placeholder="Transaction/Ref ID"
                    className="border-0"
                    style={INPUT_STYLE}
                    data-testid="registration-transaction"
                  />
                </div>
              </div>

              <div className="text-sm" style={{ color: '#D1D5DB' }}>
                Fee per member: ₹{FEE_PER_MEMBER} — Team of {formData.teamSize} → Total: <strong>₹{totalFee}</strong>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#7C3AED',
                  color: '#FFFFFF',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'wait' : 'pointer',
                }}
                whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)' } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                data-testid="registration-submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Registering...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </motion.button>

              <p className="text-xs text-center" style={{ color: '#6B7280' }}>
                By registering, you agree to our Code of Conduct. Payment receipt and transaction details are required to confirm your registration.
              </p>
            </div>
          </form>

          {/* Loading overlay */}
          {isSubmitting && (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.55)',
      zIndex: 1500,
    }}
  >
    <div style={{ textAlign: 'center', color: '#fff' }}>
      <Loader2 className="animate-spin" size={36} />
      <div style={{ marginTop: 8 }}>Submitting registration…</div>
    </div>
  </div>
)}

        </DialogContent>
      </Dialog>

      {/* Success modal */}
      <Dialog open={successOpen} onOpenChange={(open) => setSuccessOpen(open)}>
        <DialogContent
          className="success-dialog"
          style={{
            backgroundColor: '#0F0518',
            border: '1px solid rgba(124, 58, 237, 0.3)',
            borderRadius: 8,
            width: 'min(95vw, 520px)',
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1400,
            cursor: 'default',
          }}
        >
          <DialogHeader>
            <DialogTitle
              className="text-2xl font-bold"
              style={{ fontFamily: 'Syne, sans-serif', color: '#F3F4F6', padding: '16px' }}
            >
              Registration Successful
            </DialogTitle>
          </DialogHeader>

          <div style={{ marginTop: 12, padding: 16 }}>
            <p style={{ color: '#D1D5DB', marginBottom: 12 }}>
              Your team has been registered for HackForge 2.0. Join the WhatsApp group to get updates and final instructions.
            </p>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  textDecoration: 'none',
                  backgroundColor: '#25D366',
                  color: '#0F0518',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontWeight: 600,
                }}
                data-testid="whatsapp-join-link"
              >
                Join WhatsApp Group
              </a>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(WHATSAPP_LINK);
                  toast.success('WhatsApp link copied to clipboard');
                }}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(124,58,237,0.3)',
                  color: '#F3F4F6',
                  padding: '8px 10px',
                  borderRadius: 8,
                }}
              >
                Copy Link
              </button>
            </div>

            <div style={{ color: '#9CA3AF', fontSize: 13 }}>
              If the WhatsApp link doesn't open in the app, paste it into your browser or WhatsApp web. We'll also email you the confirmation (if you provided an email).
            </div>

            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button
                type="button"
                onClick={() => setSuccessOpen(false)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(124,58,237,0.3)',
                  color: '#F3F4F6',
                  padding: '10px 14px',
                  borderRadius: 999,
                }}
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};