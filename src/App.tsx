import { useState } from 'react';
import { PhoneContainer } from './components/PhoneContainer';
import { ScreenOne } from './components/ScreenOne';
import { OtpVerificationScreen } from './components/OtpVerificationScreen';
import { CreatePasswordScreen } from './components/CreatePasswordScreen';
import { BiometricSetupScreen } from './components/BiometricSetupScreen';
import { BiometricLoginScreen } from './components/BiometricLoginScreen';
import { ScreenTwo, ROLES } from './components/ScreenTwo';
import { RoleProfileScreen } from './components/RoleProfileScreens';
import { RoleExploreScreen } from './components/RoleExploreScreens';
import { PaymentPortalScreen, PaymentSuccessScreen } from './components/PaymentAndSuccessScreens';

import { Smartphone, LayoutGrid, Sparkles, RotateCcw, Building2, Moon, Sun, ScanFace } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'showcase' | 'interactive' | 'biometric-showcase'>('interactive');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // App Flow Step:
  // 1: Screen 1 (Join Network - Account Details)
  // 2: Screen 2 (OTP Verification)
  // 3: Screen 3 (Create & Confirm Password)
  // 4: Screen 4 (Biometric Registration - Face ID & Fingerprint)
  // 5: Screen 5 (Android App Biometric Login)
  // 6: Screen 6 (Role Select)
  // 7: Screen 7 (Role Profile Setup)
  // 8: Screen 8 (Role Explore Feed)
  // 9: Screen 9 (Pay ₹399 Portal)
  // 10: Screen 10 (Success Notification)
  const [interactiveStep, setInteractiveStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>(1);
  const [isPaidMember, setIsPaidMember] = useState<boolean>(false);

  // Biometric Registration State
  const [isFaceRegistered, setIsFaceRegistered] = useState<boolean>(false);
  const [isFingerprintRegistered, setIsFingerprintRegistered] = useState<boolean>(false);

  // Form & User State
  const [formData, setFormData] = useState({
    fullName: 'Rajat Sharma',
    email: 'rajat@valoris.com',
    phone: '+1 (555) 234-5678',
  });
  const [, setUserPassword] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('broker');

  const currentRoleObj = ROLES.find((r) => r.id === selectedRole) || ROLES[0];

  const handleScreenOneNext = (data: { fullName: string; email: string; phone: string }) => {
    setFormData(data);
    setInteractiveStep(2); // Route to OTP Verification
  };

  const handleOtpVerified = () => {
    setInteractiveStep(3); // Route to Create Password screen
  };

  const handlePasswordCreated = (password: string) => {
    setUserPassword(password);
    setInteractiveStep(4); // Route to Biometric Registration
  };

  const handleBiometricsSaved = () => {
    setInteractiveStep(5); // Route to Biometric Login
  };

  const handleBiometricLoginSuccess = () => {
    setInteractiveStep(6); // Route to Role Selection
  };

  const handleScreenTwoFinish = (role: string) => {
    setSelectedRole(role);
    setInteractiveStep(7); // Route to role-specific profile setup
  };

  const handleProfileComplete = () => {
    setInteractiveStep(8); // Route to role-specific explore feed
  };

  const handleProceedToPayment = () => {
    setInteractiveStep(9); // Route to Pay ₹399 portal
  };

  const handlePaymentSuccess = () => {
    setIsPaidMember(true); // Unlock all contacts & features
    setInteractiveStep(10); // Route to success message
  };

  const handleReset = () => {
    setInteractiveStep(1);
    setSelectedRole('broker');
    setUserPassword('');
    setIsFaceRegistered(false);
    setIsFingerprintRegistered(false);
    setIsPaidMember(false);
  };

  return (
    <div className={`min-h-screen studio-surface bg-studio-grid text-gray-800 flex flex-col font-sans selection:bg-[#00a896] selection:text-white${isDarkMode ? ' dark' : ''}`}>
      {/* Top Controls Header */}
      <header className="app-header sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/80 px-3 sm:px-8 py-2.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="bg-brand-gradient text-white p-1.5 sm:p-2 rounded-xl shadow-xs shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#4ade80]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-gray-900 leading-none">
                    VALORIS Mobile App
                  </h1>
                  <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#00a896]/10 text-[#007a6e] px-2 py-0.5 rounded-full border border-[#00a896]/20">
                    Android & Web
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 font-medium hidden sm:block">
                  Join ➔ OTP ➔ Password ➔ Biometric Setup ➔ Android Login ➔ Role ➔ Profile ➔ Feed ➔ Pay ₹399
                </p>
              </div>
            </div>
          </div>

          {/* View Mode Controls (Horizontal Scrollable on Mobile) */}
          <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-2xl border border-gray-200/60 w-full sm:w-auto overflow-x-auto no-scrollbar">
            <button
              onClick={() => setViewMode('interactive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                viewMode === 'interactive'
                  ? 'bg-white text-[#007a6e] shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Interactive Flow
            </button>

            <button
              onClick={() => setViewMode('biometric-showcase')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                viewMode === 'biometric-showcase'
                  ? 'bg-white text-[#1A3FAA] shadow-sm border border-gray-200 font-black'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ScanFace className="w-3.5 h-3.5 text-[#0097A7]" />
              Biometric Showcase
            </button>

            <button
              onClick={() => setViewMode('showcase')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                viewMode === 'showcase'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Auth Showcase
            </button>
          </div>

          {/* Role Quick Selector, Reset & Dark Mode Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setSelectedRole('broker');
                setInteractiveStep(8);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 btn-brand text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <Building2 className="w-3.5 h-3.5 text-[#4ade80]" />
              <span className="hidden xs:inline">Broker</span> Dashboard
            </button>

            <div className="flex items-center gap-1 shrink-0">
              <label className="text-[11px] font-bold text-gray-600 hidden xs:inline">Role:</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-2 py-1.5 text-xs font-bold bg-white border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-[#00a896] cursor-pointer"
              >
                <option value="broker">Broker</option>
                <option value="customer">Customer</option>
                <option value="investor">Investor / VC</option>
                <option value="landlord">Landlord</option>
                <option value="founder">Founder</option>
              </select>
            </div>

            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-all cursor-pointer shrink-0"
              title="Reset Flow"
            >
              <RotateCcw className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden md:inline">Reset</span>
            </button>

            {/* Header Dark Mode Toggle Button (Always Visible) */}
            <button
              onClick={() => setIsDarkMode((d) => !d)}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer shrink-0 ${
                isDarkMode
                  ? 'bg-blue-950/80 border-blue-400 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.35)]'
                  : 'bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-300 text-amber-900 shadow-2xs hover:bg-amber-100/50'
              }`}
            >
              {isDarkMode ? (
                <>
                  <Moon className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 lg:p-12 overflow-x-hidden w-full">
        
        {/* VIEW MODE 1: INTERACTIVE SINGLE PHONE SIMULATOR */}
        {viewMode === 'interactive' && (
          <div className="flex flex-col items-center space-y-4 sm:space-y-6 max-w-lg w-full animate-fadeIn">
            
            {/* Step Navigation Bar */}
            <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-xs overflow-x-auto no-scrollbar max-w-full w-full justify-start sm:justify-center">
              {[
                { step: 1, label: '1. Join' },
                { step: 2, label: '2. OTP' },
                { step: 3, label: '3. Password' },
                { step: 4, label: '4. Biometrics' },
                { step: 5, label: '5. App Login' },
                { step: 6, label: '6. Role' },
                { step: 7, label: '7. Profile' },
                { step: 8, label: '8. Feed' },
                { step: 9, label: '9. Pay ₹399' },
                { step: 10, label: '10. Done' },
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setInteractiveStep(s.step as any)}
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    interactiveStep === s.step
                      ? 'bg-brand-gradient text-white shadow-xs'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Interactive Phone Frame */}
            <PhoneContainer
              title={`Step ${interactiveStep} of 10`}
              badge={
                interactiveStep === 1
                  ? 'Join Network'
                  : interactiveStep === 2
                  ? 'OTP Verification'
                  : interactiveStep === 3
                  ? 'Set Password'
                  : interactiveStep === 4
                  ? 'Add Biometrics'
                  : interactiveStep === 5
                  ? 'Android Login'
                  : interactiveStep === 6
                  ? 'Role Select'
                  : interactiveStep === 7
                  ? `${currentRoleObj.title} Profile`
                  : interactiveStep === 8
                  ? `${currentRoleObj.title} Dashboard`
                  : interactiveStep === 9
                  ? 'Checkout ₹399'
                  : 'Confirmed!'
              }
            >
              {interactiveStep === 1 && (
                <ScreenOne initialData={formData} onNext={handleScreenOneNext} />
              )}
              {interactiveStep === 2 && (
                <OtpVerificationScreen
                  userEmail={formData.email}
                  userPhone={formData.phone}
                  onVerified={handleOtpVerified}
                  onBack={() => setInteractiveStep(1)}
                />
              )}
              {interactiveStep === 3 && (
                <CreatePasswordScreen
                  onPasswordCreated={handlePasswordCreated}
                  onBack={() => setInteractiveStep(2)}
                />
              )}
              {interactiveStep === 4 && (
                <BiometricSetupScreen
                  userName={formData.fullName}
                  userEmail={formData.email}
                  isFaceRegistered={isFaceRegistered}
                  isFingerprintRegistered={isFingerprintRegistered}
                  isDarkMode={isDarkMode}
                  onUpdateBiometrics={(face, fp) => {
                    setIsFaceRegistered(face);
                    setIsFingerprintRegistered(fp);
                  }}
                  onNext={handleBiometricsSaved}
                  onBack={() => setInteractiveStep(3)}
                />
              )}
              {interactiveStep === 5 && (
                <BiometricLoginScreen
                  userName={formData.fullName}
                  userEmail={formData.email}
                  isFaceRegistered={isFaceRegistered}
                  isFingerprintRegistered={isFingerprintRegistered}
                  isDarkMode={isDarkMode}
                  onGoToSetup={() => setInteractiveStep(4)}
                  onLoginSuccess={handleBiometricLoginSuccess}
                  onBackToFlow={() => setInteractiveStep(4)}
                />
              )}
              {interactiveStep === 6 && (
                <ScreenTwo
                  selectedRole={selectedRole}
                  onBack={() => setInteractiveStep(5)}
                  onFinish={handleScreenTwoFinish}
                />
              )}
              {interactiveStep === 7 && (
                <RoleProfileScreen
                  roleId={selectedRole}
                  onBack={() => setInteractiveStep(6)}
                  onComplete={handleProfileComplete}
                />
              )}
              {interactiveStep === 8 && (
                <RoleExploreScreen
                  roleId={selectedRole}
                  onProceedToPayment={handleProceedToPayment}
                  isPaidMember={isPaidMember}
                />
              )}
              {interactiveStep === 9 && (
                <PaymentPortalScreen
                  userEmail={formData.email}
                  userPhone={formData.phone}
                  roleTitle={currentRoleObj.title}
                  onBack={() => setInteractiveStep(8)}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              )}
              {interactiveStep === 10 && (
                <PaymentSuccessScreen
                  userEmail={formData.email}
                  userPhone={formData.phone}
                  roleTitle={currentRoleObj.title}
                  onExploreDashboard={() => setInteractiveStep(8)}
                />
              )}
            </PhoneContainer>
          </div>
        )}

        {/* VIEW MODE 2: BIOMETRIC MOCK SCREENS SHOWCASE */}
        {viewMode === 'biometric-showcase' && (
          <div className="flex flex-col items-center space-y-8 animate-fadeIn">
            <div className="text-center space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#1A3FAA]/10 border border-[#1A3FAA]/20 text-[#1A3FAA] rounded-full text-xs font-bold mb-1">
                <ScanFace className="w-3.5 h-3.5 text-[#0097A7]" />
                <span>Biometric Authentication Suite</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Face ID & Fingerprint Android Mock Screens
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Enroll biometrics on Screen 1, then instantly test logging in to the Android App on Screen 2.
              </p>
            </div>

            {/* Side-by-Side Mobile Screens */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 pt-2">
              
              {/* Screen 1: Biometric Enrollment */}
              <div className="transform hover:scale-[1.01] transition-transform duration-300">
                <PhoneContainer title="1. Add Face & Fingerprint" badge="Biometric Enrollment">
                  <BiometricSetupScreen
                    userName={formData.fullName}
                    userEmail={formData.email}
                    isFaceRegistered={isFaceRegistered}
                    isFingerprintRegistered={isFingerprintRegistered}
                    onUpdateBiometrics={(face, fp) => {
                      setIsFaceRegistered(face);
                      setIsFingerprintRegistered(fp);
                    }}
                    onNext={() => setInteractiveStep(5)}
                    onBack={() => setInteractiveStep(3)}
                  />
                </PhoneContainer>
              </div>

              {/* Screen 2: Biometric Android Login */}
              <div className="transform hover:scale-[1.01] transition-transform duration-300">
                <PhoneContainer title="2. Android Biometric App Login" badge="Android App Auth">
                  <BiometricLoginScreen
                    userName={formData.fullName}
                    userEmail={formData.email}
                    isFaceRegistered={isFaceRegistered}
                    isFingerprintRegistered={isFingerprintRegistered}
                    onGoToSetup={() => setViewMode('biometric-showcase')}
                    onLoginSuccess={() => setInteractiveStep(6)}
                    onBackToFlow={() => setInteractiveStep(4)}
                  />
                </PhoneContainer>
              </div>

            </div>
          </div>
        )}

        {/* VIEW MODE 3: SIDE-BY-SIDE SIGNUP SHOWCASE */}
        {viewMode === 'showcase' && (
          <div className="flex flex-col items-center space-y-8 animate-fadeIn">
            <div className="text-center space-y-1.5 max-w-xl">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Signup Auth & Password Setup Showcase
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Compare the <strong className="text-[#007a6e]">OTP & Password Setup</strong> screens alongside the complete user onboarding workflow.
              </p>
            </div>

            {/* Side-by-Side Mobile Screens */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 pt-2">
              
              {/* Screen A: OTP Verification */}
              <div className="transform hover:scale-[1.01] transition-transform duration-300">
                <PhoneContainer title="1. OTP Code Verification" badge="OTP Auth">
                  <OtpVerificationScreen
                    userEmail={formData.email}
                    userPhone={formData.phone}
                    onVerified={() => setInteractiveStep(3)}
                    onBack={() => setInteractiveStep(1)}
                  />
                </PhoneContainer>
              </div>

              {/* Screen B: Create Password */}
              <div className="transform hover:scale-[1.01] transition-transform duration-300">
                <PhoneContainer title="2. Password Setup & Match" badge="New Password">
                  <CreatePasswordScreen
                    onPasswordCreated={() => setInteractiveStep(4)}
                    onBack={() => setInteractiveStep(2)}
                  />
                </PhoneContainer>
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Footer Details */}
      <footer className="py-4 border-t border-gray-200/60 bg-white/60 text-center text-xs text-gray-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 gap-2">
          <div className="flex items-center gap-2">
            <span>Valoris — Complete Face ID & Fingerprint Biometric Android Mock Authentication</span>
          </div>
          <div>React + Vite + Tailwind • Android BiometricPrompt Mock Included</div>
        </div>
      </footer>

      {/* Floating Theme Switcher Widget (Always Fixed & Accessible at Bottom Right) */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsDarkMode((d) => !d)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs font-black shadow-xl border backdrop-blur-md transition-all active:scale-95 cursor-pointer ${
            isDarkMode
              ? 'bg-slate-900/90 text-blue-300 border-blue-500/50 shadow-blue-900/40 hover:bg-slate-800'
              : 'bg-white/90 text-gray-800 border-gray-300 shadow-gray-400/30 hover:bg-gray-50'
          }`}
          title="Toggle Theme"
        >
          {isDarkMode ? (
            <>
              <Moon className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>Dark Mode ON</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Light Mode ON</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
