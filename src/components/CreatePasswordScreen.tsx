import React, { useState } from 'react';
import {
  ArrowLeft,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  KeyRound,
  AlertCircle,
} from 'lucide-react';
import { ValorisLogo } from './ValorisLogo';

interface CreatePasswordScreenProps {
  onPasswordCreated: (password: string) => void;
  onBack: () => void;
}

export const CreatePasswordScreen: React.FC<CreatePasswordScreenProps> = ({
  onPasswordCreated,
  onBack,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password Validation Logic
  const hasMinLength = password.length >= 8;
  const hasLetterAndNumber = /[a-zA-Z]/.test(password) && /\d/.test(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  // Strength score
  let strengthScore = 0;
  if (password.length >= 6) strengthScore += 1;
  if (hasMinLength) strengthScore += 1;
  if (hasLetterAndNumber) strengthScore += 1;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strengthScore += 1;

  const getStrengthLabel = () => {
    if (!password) return { label: 'None', color: 'bg-gray-200', text: 'text-gray-400' };
    if (strengthScore <= 1) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-500' };
    if (strengthScore === 2 || strengthScore === 3) return { label: 'Good', color: 'bg-amber-500', text: 'text-amber-500' };
    return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-600' };
  };

  const strength = getStrengthLabel();

  const handleFillSample = () => {
    setPassword('ValorisPass2026!');
    setConfirmPassword('ValorisPass2026!');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasMinLength) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!passwordsMatch) {
      setError('Passwords do not match. Please re-type and confirm.');
      return;
    }
    onPasswordCreated(password);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between px-6 pt-3 pb-6 bg-white overflow-y-auto">
      {/* Top Bar Navigation */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors text-gray-800 cursor-pointer"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <ValorisLogo size="sm" showTagline={false} className="h-6 w-auto" />
        </div>

        {/* Title Header */}
        <div className="flex flex-col items-center text-center mt-1 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#092C3E] text-white flex items-center justify-center shadow-md mb-2">
            <KeyRound className="w-6 h-6 stroke-[2]" />
          </div>
          <h1 className="text-[20px] font-extrabold text-gray-900 tracking-tight leading-tight">
            Create New Password
          </h1>
          <p className="text-[12.5px] text-gray-500 font-medium px-1 mt-0.5 leading-snug">
            Choose a strong password to secure your account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* New Password Input */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              New Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00A896]/40 focus:border-[#00A896] transition-all text-gray-800 placeholder-gray-400 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1 text-left">
            <label className="block text-xs font-bold text-gray-800 ml-0.5">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter password to confirm"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError(null);
                }}
                className={`w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50/50 border rounded-xl focus:outline-none focus:ring-2 transition-all text-gray-800 placeholder-gray-400 font-medium ${
                  confirmPassword && !passwordsMatch
                    ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
                    : confirmPassword && passwordsMatch
                    ? 'border-emerald-400 focus:ring-emerald-200 focus:border-emerald-500 bg-emerald-50/20'
                    : 'border-gray-200 focus:ring-[#00A896]/40 focus:border-[#00A896]'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Strength Bar */}
          {password && (
            <div className="space-y-1 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
              <div className="flex justify-between items-center text-[11px] font-semibold">
                <span className="text-gray-500">Password Strength:</span>
                <span className={strength.text}>{strength.label}</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex gap-1">
                <div className={`h-full flex-1 rounded-full ${strengthScore >= 1 ? strength.color : 'bg-transparent'}`} />
                <div className={`h-full flex-1 rounded-full ${strengthScore >= 2 ? strength.color : 'bg-transparent'}`} />
                <div className={`h-full flex-1 rounded-full ${strengthScore >= 3 ? strength.color : 'bg-transparent'}`} />
                <div className={`h-full flex-1 rounded-full ${strengthScore >= 4 ? strength.color : 'bg-transparent'}`} />
              </div>
            </div>
          )}

          {/* Validation Requirements Checklist */}
          <div className="space-y-1.5 pt-1 text-[11.5px] font-medium text-gray-600">
            <div className="flex items-center gap-2">
              {hasMinLength ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
              )}
              <span className={hasMinLength ? 'text-gray-800 font-semibold' : 'text-gray-400'}>
                At least 8 characters
              </span>
            </div>

            <div className="flex items-center gap-2">
              {hasLetterAndNumber ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
              )}
              <span className={hasLetterAndNumber ? 'text-gray-800 font-semibold' : 'text-gray-400'}>
                Letters & numbers combination
              </span>
            </div>

            <div className="flex items-center gap-2">
              {passwordsMatch ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
              )}
              <span className={passwordsMatch ? 'text-emerald-700 font-semibold' : 'text-gray-400'}>
                {confirmPassword ? (passwordsMatch ? 'Passwords match' : 'Passwords do not match') : 'Re-type password to match'}
              </span>
            </div>
          </div>

          {/* Helper Auto Fill sample button */}
          <div className="flex justify-center pt-0.5">
            <button
              type="button"
              onClick={handleFillSample}
              className="text-[11px] text-[#007a6e] font-bold hover:underline cursor-pointer"
            >
              Fill Sample Password (ValorisPass2026!)
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Save & Finish Button */}
          <button
            type="submit"
            className="w-full py-3.5 mt-1 bg-[#092C3E] hover:bg-[#061e2b] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Save Password & Continue
          </button>
        </form>
      </div>

      {/* Progress Footer */}
      <div className="w-full pt-3 border-t border-gray-100 flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden flex">
          <div className="w-3/5 h-full bg-[#092C3E] rounded-full transition-all duration-300"></div>
        </div>
        <span className="text-[11px] font-semibold text-gray-400 tracking-wider">
          Create Password
        </span>
      </div>
    </div>
  );
};
