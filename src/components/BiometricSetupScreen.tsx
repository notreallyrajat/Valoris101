import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ScanFace,
  Fingerprint,
  Sparkles,
  Camera,
  Check,
  UserCheck,
  Shield,
  Layers,
  RotateCcw,
} from 'lucide-react';

interface BiometricSetupScreenProps {
  userEmail?: string;
  userName?: string;
  isFaceRegistered: boolean;
  isFingerprintRegistered: boolean;
  isDarkMode?: boolean;
  onUpdateBiometrics: (face: boolean, fingerprint: boolean) => void;
  onNext: () => void;
  onBack?: () => void;
}

export const BiometricSetupScreen: React.FC<BiometricSetupScreenProps> = ({
  isFaceRegistered,
  isFingerprintRegistered,
  isDarkMode = false,
  onUpdateBiometrics,
  onNext,
  onBack: _onBack,
}) => {
  // Method selection modal state: 'face' | 'fingerprint' | 'both' | null
  const [selectedMethod, setSelectedMethod] = useState<'face' | 'fingerprint' | 'both' | null>(null);

  // Face Scan State
  const [isScanningFace, setIsScanningFace] = useState(false);
  const [faceProgress, setFaceProgress] = useState(0);

  // Fingerprint Scan State
  const [isScanningFingerprint, setIsScanningFingerprint] = useState(false);
  const [fingerprintProgress, setFingerprintProgress] = useState(0);

  // Trigger Face scanning timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isScanningFace) {
      interval = setInterval(() => {
        setFaceProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanningFace(false);
            onUpdateBiometrics(true, isFingerprintRegistered);
            return 100;
          }
          return prev + 15;
        });
      }, 180);
    }
    return () => clearInterval(interval);
  }, [isScanningFace, isFingerprintRegistered, onUpdateBiometrics]);

  // Trigger Fingerprint scanning timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isScanningFingerprint) {
      interval = setInterval(() => {
        setFingerprintProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanningFingerprint(false);
            onUpdateBiometrics(isFaceRegistered, true);
            return 100;
          }
          return prev + 18;
        });
      }, 160);
    }
    return () => clearInterval(interval);
  }, [isScanningFingerprint, isFaceRegistered, onUpdateBiometrics]);

  const handleStartFaceScan = () => {
    setFaceProgress(0);
    setIsScanningFace(true);
  };

  const handleStartFingerprintScan = () => {
    setFingerprintProgress(0);
    setIsScanningFingerprint(true);
  };

  const handleQuickSetupBoth = () => {
    setFaceProgress(100);
    setFingerprintProgress(100);
    onUpdateBiometrics(true, true);
  };

  const handleResetBiometrics = () => {
    setFaceProgress(0);
    setFingerprintProgress(0);
    setSelectedMethod(null);
    onUpdateBiometrics(false, false);
  };

  return (
    <div
      className={`w-full h-full flex flex-col justify-between p-4 font-sans overflow-hidden relative transition-colors duration-200 ${
        isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* ── 1. FULL-SCREEN EDGE-TO-EDGE FACE RECOGNITION CAMERA VIEW ── */}
      {selectedMethod === 'face' ? (
        <div
          className={`absolute inset-0 z-20 flex flex-col justify-between p-5 animate-fadeIn transition-colors duration-200 ${
            isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
          }`}
        >
          {/* Top Bar Overlay */}
          <div className="flex justify-between items-center z-10">
            <span className={`text-xs font-bold flex items-center gap-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              <Camera className="w-4 h-4 text-[#0097A7]" />
              Modern Face ID Viewfinder
            </span>
            <button
              type="button"
              onClick={() => setSelectedMethod(null)}
              className={`text-xs font-semibold cursor-pointer ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Switch Method
            </button>
          </div>

          {/* Full Screen Camera Viewport Center */}
          <div
            onClick={handleStartFaceScan}
            className={`flex-1 my-4 relative rounded-3xl border-2 overflow-hidden flex flex-col items-center justify-center p-4 cursor-pointer group shadow-xl transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            {/* Camera Grid Dots Pattern */}
            <div className={`absolute inset-0 opacity-20 ${
              isDarkMode
                ? 'bg-[radial-gradient(#0097A7_1px,transparent_1px)] [background-size:16px_16px]'
                : 'bg-[radial-gradient(#1A3FAA_1px,transparent_1px)] [background-size:16px_16px]'
            }`} />

            {/* Radar Scan Grid Line */}
            {isScanningFace && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#0097A7] to-transparent shadow-[0_0_20px_#0097A7] animate-bounce top-1/3 z-20" />
            )}

            {/* Face Target Oval Frame */}
            <div
              className={`relative z-10 w-44 h-56 rounded-[45%] border-2 border-dashed flex flex-col items-center justify-center p-4 backdrop-blur-xs shadow-md transition-all ${
                isDarkMode
                  ? 'border-cyan-400/80 bg-slate-950/60 text-white'
                  : 'border-[#1A3FAA] bg-slate-50/90 text-slate-900'
              }`}
            >
              {isFaceRegistered ? (
                <div className="flex flex-col items-center text-center space-y-2">
                  <UserCheck className="w-14 h-14 text-emerald-500 animate-bounce" />
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">3D Face Registered</span>
                </div>
              ) : isScanningFace ? (
                <div className="flex flex-col items-center text-center space-y-2">
                  <ScanFace className="w-14 h-14 text-[#0097A7] animate-pulse" />
                  <span className="text-xs font-bold text-[#0097A7]">Scanning {faceProgress}%</span>
                  <div className="w-28 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-gradient-to-r from-[#1A3FAA] to-[#0097A7] transition-all duration-200"
                      style={{ width: `${faceProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center space-y-2 group-hover:scale-105 transition-transform">
                  <ScanFace className="w-14 h-14 text-[#1A3FAA]" />
                  <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Position Face Here</span>
                  <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Tap to start 3D scan</span>
                </div>
              )}
            </div>

            <span className={`relative z-10 text-xs font-bold mt-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {isScanningFace ? 'Hold still • Mapping facial contours' : isFaceRegistered ? 'Facial biometrics enrolled' : 'Tap camera screen to scan'}
            </span>
          </div>

          {/* Bottom Floating Actions */}
          <div className="space-y-2.5 z-10">
            <button
              type="button"
              onClick={onNext}
              className="w-full py-3.5 btn-brand active:scale-[0.99] font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Save & Proceed to Lock Screen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}

      {/* ── 2. FULL-SCREEN EDGE-TO-EDGE FINGERPRINT SENSOR VIEW ── */}
      {selectedMethod === 'fingerprint' ? (
        <div
          className={`absolute inset-0 z-20 flex flex-col justify-between p-5 animate-fadeIn transition-colors duration-200 ${
            isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
          }`}
        >
          {/* Top Bar Overlay */}
          <div className="flex justify-between items-center z-10">
            <span className={`text-xs font-bold flex items-center gap-1.5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              <Fingerprint className="w-4 h-4 text-[#0097A7]" />
              Capacitive Sensor Enrollment
            </span>
            <button
              type="button"
              onClick={() => setSelectedMethod(null)}
              className={`text-xs font-semibold cursor-pointer ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Switch Method
            </button>
          </div>

          {/* Full Screen Fingerprint Sensor Viewport Center */}
          <div
            onClick={handleStartFingerprintScan}
            className={`flex-1 my-4 relative rounded-3xl border-2 overflow-hidden flex flex-col items-center justify-center p-4 cursor-pointer group shadow-xl transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800'
                : 'bg-white border-slate-200'
            }`}
          >
            {/* Capacitive Circuit Pattern */}
            <div className={`absolute inset-0 opacity-20 ${
              isDarkMode
                ? 'bg-[radial-gradient(#0097A7_1px,transparent_1px)] [background-size:16px_16px]'
                : 'bg-[radial-gradient(#0097A7_1px,transparent_1px)] [background-size:16px_16px]'
            }`} />

            {/* Glowing Sensor Fingerprint Circle */}
            <div
              className={`relative z-10 w-44 h-44 rounded-full border-2 flex flex-col items-center justify-center p-4 backdrop-blur-xs transition-all ${
                isDarkMode
                  ? isScanningFingerprint
                    ? 'border-cyan-400 bg-slate-950/80 shadow-[0_0_35px_rgba(0,151,167,0.5)] animate-pulse'
                    : isFingerprintRegistered
                    ? 'border-emerald-500 bg-slate-950/80 shadow-[0_0_30px_rgba(52,211,153,0.4)]'
                    : 'border-[#0097A7]/70 bg-slate-950/80'
                  : isScanningFingerprint
                  ? 'border-[#0097A7] bg-cyan-50 shadow-md animate-pulse'
                  : isFingerprintRegistered
                  ? 'border-emerald-500 bg-emerald-50 shadow-md'
                  : 'border-[#0097A7] bg-slate-50 shadow-sm'
              }`}
            >
              {isFingerprintRegistered ? (
                <div className="flex flex-col items-center text-center space-y-2">
                  <Fingerprint className="w-16 h-16 text-emerald-500 animate-bounce" />
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Print Registered</span>
                </div>
              ) : isScanningFingerprint ? (
                <div className="flex flex-col items-center text-center space-y-2">
                  <Fingerprint className="w-16 h-16 text-[#0097A7] animate-pulse" />
                  <span className="text-xs font-bold text-[#0097A7]">Reading Ridges {fingerprintProgress}%</span>
                  <div className="w-28 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-gradient-to-r from-[#0097A7] to-emerald-400 transition-all duration-200"
                      style={{ width: `${fingerprintProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center space-y-2 group-hover:scale-105 transition-transform">
                  <Fingerprint className="w-16 h-16 text-[#0097A7]" />
                  <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Touch Sensor Ring</span>
                  <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Hold finger down</span>
                </div>
              )}
            </div>

            <span className={`relative z-10 text-xs font-bold mt-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              {isScanningFingerprint
                ? 'Hold finger firm • Capturing minutiae points'
                : isFingerprintRegistered
                ? 'Fingerprint enrolled successfully'
                : 'Touch sensor ring to scan thumbprint'}
            </span>
          </div>

          {/* Bottom Floating Actions */}
          <div className="space-y-2.5 z-10">
            <button
              type="button"
              onClick={onNext}
              className="w-full py-3.5 btn-brand active:scale-[0.99] font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Save & Proceed to Lock Screen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : null}

      {/* ── INITIAL METHOD SELECTION POPUP DIALOG (LIGHT & DARK ADAPTIVE) ── */}
      {!selectedMethod && (
        <div
          className={`absolute inset-0 backdrop-blur-xs z-30 p-4 flex items-center justify-center animate-fadeIn ${
            isDarkMode ? 'bg-slate-950/80' : 'bg-slate-900/40'
          }`}
        >
          <div
            className={`border rounded-3xl p-5 w-full space-y-3.5 shadow-2xl text-center transition-colors ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1A3FAA] to-[#0097A7] flex items-center justify-center mx-auto text-white shadow-md">
              <Shield className="w-6 h-6" />
            </div>

            <div>
              <h2 className={`text-base font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Choose Setup Method
              </h2>
              <p className={`text-xs font-medium mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Select your preferred metric to enroll biometrics for Veloris
              </p>
            </div>

            {/* Option Buttons */}
            <div className="space-y-2 pt-1 text-left">
              
              {/* Option A: Full-Screen Face ID */}
              <button
                type="button"
                onClick={() => setSelectedMethod('face')}
                className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer group active:scale-[0.99] ${
                  isDarkMode
                    ? 'bg-slate-800/90 hover:bg-slate-800 border-slate-700/80 hover:border-[#1A3FAA] text-white'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-[#1A3FAA] text-slate-900 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1A3FAA]/20 border border-[#1A3FAA]/40 flex items-center justify-center text-[#1A3FAA] group-hover:scale-105 transition-transform">
                    <ScanFace className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-xs font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Full-Screen Face Recognition</h3>
                    <p className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Edge-to-Edge 3D Viewfinder</p>
                  </div>
                </div>
                {isFaceRegistered ? (
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">Enrolled</span>
                ) : (
                  <ArrowRight className={`w-4 h-4 ${isDarkMode ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-400 group-hover:text-slate-700'}`} />
                )}
              </button>

              {/* Option B: Full-Screen Fingerprint */}
              <button
                type="button"
                onClick={() => setSelectedMethod('fingerprint')}
                className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer group active:scale-[0.99] ${
                  isDarkMode
                    ? 'bg-slate-800/90 hover:bg-slate-800 border-slate-700/80 hover:border-[#0097A7] text-white'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-[#0097A7] text-slate-900 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0097A7]/20 border border-[#0097A7]/40 flex items-center justify-center text-[#0097A7] group-hover:scale-105 transition-transform">
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-xs font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Full-Screen Fingerprint</h3>
                    <p className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Edge-to-Edge Capacitive Sensor</p>
                  </div>
                </div>
                {isFingerprintRegistered ? (
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">Registered</span>
                ) : (
                  <ArrowRight className={`w-4 h-4 ${isDarkMode ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-400 group-hover:text-slate-700'}`} />
                )}
              </button>

              {/* Option C: Setup Both */}
              <button
                type="button"
                onClick={() => setSelectedMethod('both')}
                className={`w-full p-2.5 rounded-2xl border flex items-center justify-center gap-2 text-xs font-bold transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-700/50 text-slate-300'
                    : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                }`}
              >
                <Layers className="w-4 h-4 text-[#0097A7]" />
                <span>Show Dual Setup Options</span>
              </button>

            </div>

            <button
              type="button"
              onClick={() => {
                handleQuickSetupBoth();
                setSelectedMethod('both');
              }}
              className="text-[10.5px] text-[#0097A7] font-bold hover:underline cursor-pointer pt-1 inline-flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#3CB043]" />
              Quick Enroll Demo Both
            </button>

          </div>
        </div>
      )}

      {/* ── 3. DUAL ENROLLMENT VIEW (FOR 'BOTH' SELECTION) ── */}
      <div className="space-y-3">
        
        {/* Method Switch Header */}
        <div className={`flex justify-between items-center pb-1 border-b text-xs font-bold ${isDarkMode ? 'border-slate-800 text-slate-200' : 'border-gray-200 text-slate-800'}`}>
          <span>Dual Biometrics Setup</span>
          <button
            type="button"
            onClick={() => setSelectedMethod(null)}
            className="text-[11px] text-[#0097A7] hover:underline cursor-pointer font-semibold"
          >
            Change Method
          </button>
        </div>

        {/* Dual Face & Print Card */}
        <div
          className={`rounded-2xl border p-4 space-y-3 relative overflow-hidden shadow-sm animate-fadeIn ${
            isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#0097A7]/20 border border-[#0097A7]/40 flex items-center justify-center text-[#0097A7]">
                <Fingerprint className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`text-xs font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>Dual Biometrics Active</h3>
                <p className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Face 3D Mesh & Fingerprint Sensor</p>
              </div>
            </div>

            {(isFaceRegistered || isFingerprintRegistered) && (
              <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
                <Check className="w-3 h-3 stroke-[3]" /> Active
              </span>
            )}
          </div>

          <div
            onClick={handleStartFingerprintScan}
            className={`w-full h-36 rounded-xl border flex items-center justify-center relative cursor-pointer group transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 hover:border-[#0097A7]'
                : 'bg-slate-50 border-slate-200 hover:border-[#0097A7]'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-2 text-slate-400">
              <Fingerprint className="w-12 h-12 text-[#0097A7]" />
              <span className="text-xs font-bold">Touch Sensor to Enroll</span>
            </div>
          </div>
        </div>

        {/* Demo Action Helpers */}
        <div className="flex justify-between items-center pt-1 text-[10.5px]">
          <button
            type="button"
            onClick={handleQuickSetupBoth}
            className="inline-flex items-center gap-1 font-bold text-[#1A3FAA] hover:underline cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#0097A7]" />
            Quick Enroll Both (Demo)
          </button>

          <button
            type="button"
            onClick={handleResetBiometrics}
            className={`font-semibold cursor-pointer flex items-center gap-1 ${isDarkMode ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <RotateCcw className="w-3 h-3" />
            Reset Data
          </button>
        </div>
      </div>

      {/* Save & Test Proceed Button */}
      <div className="pt-2 space-y-2">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-3.5 btn-brand active:scale-[0.99] font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Save & Proceed to Lock Screen</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
