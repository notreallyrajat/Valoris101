import { useState } from 'react';
import { PhoneContainer } from './components/PhoneContainer';
import { ScreenOne } from './components/ScreenOne';
import { OtpVerificationScreen } from './components/OtpVerificationScreen';
import { CreatePasswordScreen } from './components/CreatePasswordScreen';
import { ScreenTwo, ROLES } from './components/ScreenTwo';
import { RoleProfileScreen } from './components/RoleProfileScreens';
import { RoleExploreScreen } from './components/RoleExploreScreens';
import { PaymentPortalScreen, PaymentSuccessScreen } from './components/PaymentAndSuccessScreens';

import { Smartphone, LayoutGrid, Sparkles, RotateCcw, Building2, Moon, Sun } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'showcase' | 'interactive' | 'dual-interactive'>('interactive');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // App Flow Step:
  // 1: Screen 1 (Join Network - Account Details)
  // 2: Screen 2 (OTP Verification)
  // 3: Screen 3 (Create & Confirm Password)
  // 4: Screen 4 (Role Select)
  // 5: Screen 5 (Role Profile Setup)
  // 6: Screen 6 (Role Explore Feed)
  // 7: Screen 7 (Pay ₹399 Portal)
  // 8: Screen 8 (Success Notification)
  const [interactiveStep, setInteractiveStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8>(1);
  const [isPaidMember, setIsPaidMember] = useState<boolean>(false);

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
    setInteractiveStep(4); // Route to Role Selection
  };

  const handleScreenTwoFinish = (role: string) => {
    setSelectedRole(role);
    setInteractiveStep(5); // Route to role-specific profile setup
  };

  const handleProfileComplete = () => {
    setInteractiveStep(6); // Route to role-specific explore feed
  };

  const handleProceedToPayment = () => {
    setInteractiveStep(7); // Route to Pay ₹399 portal
  };

  const handlePaymentSuccess = () => {
    setIsPaidMember(true); // Unlock all contacts & features
    setInteractiveStep(8); // Route to success message
  };

  const handleReset = () => {
    setInteractiveStep(1);
    setSelectedRole('broker');
    setUserPassword('');
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
                  Join ➔ Verify OTP ➔ Set Password ➔ Select Role ➔ Profile Setup ➔ Explore Feed ➔ Pay ₹399 ➔ Success
                </p>
              </div>
            </div>

            {/* Mobile Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode((d) => !d)}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="sm:hidden p-1.5 rounded-xl border bg-white border-gray-200 text-gray-700"
            >
              {isDarkMode ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>
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

            <button
              onClick={() => setViewMode('dual-interactive')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                viewMode === 'dual-interactive'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00a896]" />
              Dual Live View
            </button>
          </div>

          {/* Role Quick Selector & Reset */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => {
                setSelectedRole('broker');
                setInteractiveStep(6);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 btn-brand text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <Building2 className="w-3.5 h-3.5 text-[#4ade80]" />
              Broker Dashboard
            </button>

            <div className="flex items-center gap-1 shrink-0">
              <label className="text-[11px] font-bold text-gray-600">Role:</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-2 py-1 text-xs font-bold bg-white border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-[#00a896] cursor-pointer"
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
              className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-all cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3 h-3 text-gray-500" />
              Reset
            </button>

            {/* Desktop Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode((d) => !d)}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer overflow-hidden ${
                isDarkMode
                  ? 'bg-[#0F172A] border-blue-500/40 text-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className={`transition-transform duration-300 ${isDarkMode ? 'rotate-0' : 'rotate-180'}`}>
                {isDarkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              </span>
              <span>{isDarkMode ? 'Dark' : 'Light'}</span>
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
                { step: 4, label: '4. Role' },
                { step: 5, label: '5. Profile' },
                { step: 6, label: '6. Feed' },
                { step: 7, label: '7. Pay ₹399' },
                { step: 8, label: '8. Done' },
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
              title={`Step ${interactiveStep} of 8`}
              badge={
                interactiveStep === 1
                  ? 'Join Network'
                  : interactiveStep === 2
                  ? 'OTP Verification'
                  : interactiveStep === 3
                  ? 'Set Password'
                  : interactiveStep === 4
                  ? 'Role Select'
                  : interactiveStep === 5
                  ? `${currentRoleObj.title} Profile`
                  : interactiveStep === 6
                  ? `${currentRoleObj.title} Dashboard`
                  : interactiveStep === 7
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
                <ScreenTwo
                  selectedRole={selectedRole}
                  onBack={() => setInteractiveStep(3)}
                  onFinish={handleScreenTwoFinish}
                />
              )}
              {interactiveStep === 5 && (
                <RoleProfileScreen
                  roleId={selectedRole}
                  onBack={() => setInteractiveStep(4)}
                  onComplete={handleProfileComplete}
                />
              )}
              {interactiveStep === 6 && (
                <RoleExploreScreen
                  roleId={selectedRole}
                  onProceedToPayment={handleProceedToPayment}
                  isPaidMember={isPaidMember}
                />
              )}
              {interactiveStep === 7 && (
                <PaymentPortalScreen
                  userEmail={formData.email}
                  userPhone={formData.phone}
                  roleTitle={currentRoleObj.title}
                  onBack={() => setInteractiveStep(6)}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              )}
              {interactiveStep === 8 && (
                <PaymentSuccessScreen
                  userEmail={formData.email}
                  userPhone={formData.phone}
                  roleTitle={currentRoleObj.title}
                  onExploreDashboard={() => setInteractiveStep(6)}
                />
              )}
            </PhoneContainer>
          </div>
        )}

        {/* VIEW MODE 2: SIDE-BY-SIDE SHOWCASE */}
        {viewMode === 'showcase' && (
          <div className="flex flex-col items-center space-y-8 animate-fadeIn">
            <div className="text-center space-y-1.5 max-w-xl">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Signup Auth & Profile Setup Showcase
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Compare the new <strong className="text-[#007a6e]">OTP & Password Setup</strong> screens alongside the complete user onboarding workflow.
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

        {/* VIEW MODE 3: DUAL LIVE INTERACTIVE */}
        {viewMode === 'dual-interactive' && (
          <div className="flex flex-col items-center space-y-8 animate-fadeIn">
            <div className="text-center space-y-1 max-w-lg">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                Live Dual Auth & Payment View
              </h2>
              <p className="text-xs text-gray-500">
                Signup password creation and Payment ₹399 portal side-by-side.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
              {/* Password Screen */}
              <PhoneContainer title="Create Password Screen" badge="Security">
                <CreatePasswordScreen
                  onPasswordCreated={() => setInteractiveStep(4)}
                  onBack={() => setInteractiveStep(2)}
                />
              </PhoneContainer>

              {/* Payment Screen */}
              <PhoneContainer title="Payment & Success Notice" badge="Pay ₹399">
                <PaymentPortalScreen
                  userEmail={formData.email}
                  userPhone={formData.phone}
                  roleTitle={currentRoleObj.title}
                  onBack={() => setInteractiveStep(6)}
                  onPaymentSuccess={() => setInteractiveStep(8)}
                />
              </PhoneContainer>
            </div>
          </div>
        )}
      </main>

      {/* Footer Details */}
      <footer className="py-4 border-t border-gray-200/60 bg-white/60 text-center text-xs text-gray-500 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 gap-2">
          <div className="flex items-center gap-2">
            <span>Valoris — Complete OTP Verification & Password Setup Onboarding</span>
          </div>
          <div>React + Vite + Tailwind • OTP & Password Flow Included</div>
        </div>
      </footer>
    </div>
  );
}
