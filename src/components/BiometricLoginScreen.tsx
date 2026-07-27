import React, { useState } from 'react';
import {
  Unlock,
  Lock,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Delete,
  X,
  CheckCircle2,
} from 'lucide-react';

interface BiometricLoginScreenProps {
  userEmail?: string;
  userName?: string;
  isFaceRegistered: boolean;
  isFingerprintRegistered: boolean;
  isDarkMode?: boolean;
  onGoToSetup: () => void;
  onLoginSuccess: () => void;
  onBackToFlow?: () => void;
}

export const BiometricLoginScreen: React.FC<BiometricLoginScreenProps> = ({
  userEmail = 'rajat@valoris.com',
  userName = 'Rajat Sharma',
  isFaceRegistered,
  isFingerprintRegistered,
  isDarkMode = false,
  onGoToSetup,
  onLoginSuccess,
  onBackToFlow: _onBackToFlow,
}) => {
  const [activeAuthorizedMethod, setActiveAuthorizedMethod] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [authStatus, setAuthStatus] = useState<'idle' | 'success'>('idle');

  // PIN Input string
  const [pinDigits, setPinDigits] = useState<string>('');

  // Background Face Lock Verification
  const handleCameraFaceTap = () => {
    if (!isFaceRegistered) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setActiveAuthorizedMethod('Facial Biometric');
      setAuthStatus('success');
    }, 500);
  };

  // Background Fingerprint Verification
  const handleFingerprintTap = () => {
    if (!isFingerprintRegistered) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setActiveAuthorizedMethod('Capacitive Sensor');
      setAuthStatus('success');
    }, 400);
  };

  // Numpad Key Press
  const handleNumpadPress = (val: string) => {
    if (pinDigits.length >= 4) return;
    const updated = pinDigits + val;
    setPinDigits(updated);

    if (updated.length === 4) {
      setIsVerifying(true);
      setTimeout(() => {
        setIsVerifying(false);
        setActiveAuthorizedMethod('Passcode PIN');
        setAuthStatus('success');
      }, 350);
    }
  };

  const handleNumpadDelete = () => {
    setPinDigits((prev) => prev.slice(0, -1));
  };

  const handleNumpadClear = () => {
    setPinDigits('');
  };

  const handleResetAuth = () => {
    setAuthStatus('idle');
    setIsVerifying(false);
    setActiveAuthorizedMethod(null);
    setPinDigits('');
  };

  return (
    <div
      className={`w-full h-full flex flex-col justify-between px-4 pt-4 pb-4 font-sans overflow-y-auto transition-colors duration-200 ${
        isDarkMode
          ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white'
          : 'bg-gradient-to-b from-slate-50 via-slate-100 to-gray-100 text-slate-900'
      }`}
    >
      <div className="flex-1 flex flex-col justify-center items-center w-full">
        {/* ── UNLOCKED SUCCESS VIEW ── */}
        {authStatus === 'success' ? (
          <div className="flex flex-col items-center justify-center text-center py-8 space-y-4 animate-fadeIn w-full max-w-xs">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-[#3CB043] flex items-center justify-center text-white shadow-[0_0_35px_rgba(52,211,153,0.5)] animate-bounce">
                <Unlock className="w-10 h-10 stroke-[2.5]" />
              </div>
              <div className="absolute -top-1 -right-1 bg-white p-1 rounded-full text-emerald-600 shadow-md">
                <CheckCircle2 className="w-5 h-5 fill-emerald-500 text-white" />
              </div>
            </div>

            <div>
              <h2 className={`text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Unlocked
              </h2>
              <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Welcome back, <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{userName}</strong>
              </p>
            </div>

            {/* Session Summary Card */}
            <div
              className={`w-full rounded-2xl p-3 space-y-1.5 text-left text-xs border ${
                isDarkMode
                  ? 'bg-slate-800/80 border-slate-700/80 text-white'
                  : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              <div className={`flex justify-between items-center font-bold border-b pb-1 ${isDarkMode ? 'border-slate-700 text-slate-300' : 'border-slate-100 text-slate-700'}`}>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  Authenticated
                </span>
                <span className="text-[10px] text-slate-400 font-mono">ID: #VAL-9482</span>
              </div>
              <div className="text-[11px] space-y-1 pt-0.5">
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Account:</span>
                  <span className={`font-semibold truncate max-w-[150px] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{userEmail}</span>
                </div>
                {activeAuthorizedMethod && (
                  <div className="flex justify-between">
                    <span className={isDarkMode ? 'text-slate-400' : 'text-slate-500'}>Auth Method:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{activeAuthorizedMethod}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full space-y-2 pt-1">
              <button
                type="button"
                onClick={onLoginSuccess}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-[#0097A7] text-white font-bold text-xs rounded-xl shadow-lg hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enter App Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleResetAuth}
                className={`w-full py-1.5 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                  isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Lock Device Again</span>
              </button>
            </div>
          </div>
        ) : (
          /* ── CLEAN IOS LOCK SCREEN (ADAPTIVE LIGHT / DARK MODE) ── */
          <div className="my-auto py-4 flex flex-col items-center justify-center w-full space-y-4 animate-fadeIn">

            {/* Discreet Top Camera / Lock Icon Viewport */}
            <div
              onClick={handleCameraFaceTap}
              className="relative cursor-pointer group flex flex-col items-center"
              title="Camera Sensor"
            >
              <div
                className={`w-13 h-13 rounded-full border-2 flex items-center justify-center transition-all ${
                  isDarkMode
                    ? isVerifying
                      ? 'border-cyan-400 animate-pulse bg-cyan-950/30 text-emerald-400'
                      : 'border-slate-700 hover:border-slate-500 bg-slate-900 text-slate-300'
                    : isVerifying
                    ? 'border-cyan-500 animate-pulse bg-cyan-50 text-emerald-600'
                    : 'border-slate-300 hover:border-slate-400 bg-white text-slate-700 shadow-sm'
                }`}
              >
                {isVerifying ? (
                  <Unlock className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
              </div>

              {/* Discreet Sensor Touch Area */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleFingerprintTap();
                }}
                className={`w-8 h-1.5 rounded-full mt-2 transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-800 hover:bg-cyan-500/60'
                    : 'bg-slate-300 hover:bg-cyan-500'
                }`}
                title="Sensor Bar"
              />
            </div>

            {/* Subtitle */}
            <div className="text-center">
              <h1 className={`text-base font-bold tracking-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                Enter Passcode
              </h1>
              <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {userEmail}
              </p>
            </div>

            {/* PIN Dots Indicator */}
            <div className="flex items-center justify-center gap-3.5 py-1">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    pinDigits.length > idx
                      ? isDarkMode
                        ? 'bg-white border-white shadow-[0_0_10px_rgba(255,255,255,0.9)]'
                        : 'bg-slate-900 border-slate-900 shadow-[0_0_8px_rgba(0,0,0,0.3)]'
                      : isDarkMode
                      ? 'bg-slate-900 border-slate-700'
                      : 'bg-slate-200 border-slate-300'
                  }`}
                />
              ))}
            </div>

            {/* Perfectly Centered 12-Button Numpad Grid */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-[240px] pt-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleNumpadPress(num)}
                  className={`w-14 h-14 rounded-full font-semibold text-xl flex items-center justify-center transition-all active:scale-95 cursor-pointer mx-auto ${
                    isDarkMode
                      ? 'bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-white shadow-sm'
                      : 'bg-white hover:bg-slate-100 border border-slate-200/90 text-slate-900 shadow-sm'
                  }`}
                >
                  {num}
                </button>
              ))}

              <button
                type="button"
                onClick={handleNumpadClear}
                className={`w-14 h-14 rounded-full text-xs font-bold flex items-center justify-center transition-all active:scale-95 cursor-pointer mx-auto ${
                  isDarkMode
                    ? 'bg-slate-900/40 hover:bg-slate-800 text-slate-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => handleNumpadPress('0')}
                className={`w-14 h-14 rounded-full font-semibold text-xl flex items-center justify-center transition-all active:scale-95 cursor-pointer mx-auto ${
                  isDarkMode
                    ? 'bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 border border-slate-200/90 text-slate-900 shadow-sm'
                }`}
              >
                0
              </button>

              <button
                type="button"
                onClick={handleNumpadDelete}
                className={`w-14 h-14 rounded-full text-xs font-bold flex items-center justify-center transition-all active:scale-95 cursor-pointer mx-auto ${
                  isDarkMode
                    ? 'bg-slate-900/40 hover:bg-slate-800 text-slate-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
                }`}
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>

          </div>
        )}
      </div>

      {/* Footer Nav Controls */}
      {authStatus !== 'success' && (
        <div className={`pt-2 border-t flex items-center justify-center text-xs font-semibold ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
          <button
            type="button"
            onClick={onGoToSetup}
            className={`cursor-pointer ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Setup Settings
          </button>
        </div>
      )}
    </div>
  );
};
