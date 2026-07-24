import { useState } from 'react';
import { PhoneContainer } from './components/PhoneContainer';
import { ScreenOne } from './components/ScreenOne';
import { ScreenTwo, ROLES } from './components/ScreenTwo';
import { RoleProfileScreen } from './components/RoleProfileScreens';
import { RoleExploreScreen } from './components/RoleExploreScreens';
import { PaymentPortalScreen, PaymentSuccessScreen } from './components/PaymentAndSuccessScreens';
import { ValorisLogo } from './components/ValorisLogo';
import { Smartphone, LayoutGrid, Sparkles, RotateCcw } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'showcase' | 'interactive' | 'dual-interactive'>('showcase');
  
  // App Flow Step:
  // 1: Screen 1 (Join Network)
  // 2: Screen 2 (Role Select)
  // 3: Screen 3 (Role Profile Setup)
  // 4: Screen 4 (Role Explore Feed)
  // 5: Screen 5 (Pay ₹399 Portal)
  // 6: Screen 6 (Success Notification)
  const [interactiveStep, setInteractiveStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Form & User State
  const [formData, setFormData] = useState({
    fullName: 'Rajat Sharma',
    email: 'rajat@valoris.com',
    phone: '+1 (555) 234-5678',
  });
  const [selectedRole, setSelectedRole] = useState<string>('broker');

  const currentRoleObj = ROLES.find((r) => r.id === selectedRole) || ROLES[0];

  const handleScreenOneNext = (data: { fullName: string; email: string; phone: string }) => {
    setFormData(data);
    setInteractiveStep(2);
  };

  const handleScreenTwoFinish = (role: string) => {
    setSelectedRole(role);
    setInteractiveStep(3); // Route to role-specific profile setup!
  };

  const handleProfileComplete = () => {
    setInteractiveStep(4); // Route to role-specific explore feed!
  };

  const handleProceedToPayment = () => {
    setInteractiveStep(5); // Route to Pay ₹399 portal!
  };

  const handlePaymentSuccess = () => {
    setInteractiveStep(6); // Route to success message!
  };

  const handleReset = () => {
    setInteractiveStep(1);
    setSelectedRole('broker');
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] bg-studio-grid text-gray-800 flex flex-col font-sans selection:bg-[#00a896] selection:text-white">
      {/* Top Controls Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="bg-[#092C3E] text-white p-2 rounded-xl shadow-xs">
              <Sparkles className="w-5 h-5 text-[#4ade80]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold tracking-tight text-gray-900 leading-none">
                  VALORIS SaaS Onboarding
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#00a896]/10 text-[#007a6e] px-2 py-0.5 rounded-full border border-[#00a896]/20">
                  Full Role Flow & ₹399 Checkout
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Join ➔ Select Role ➔ Profile Setup ➔ Explore Feed ➔ Pay ₹399 ➔ Confirmation Notice
              </p>
            </div>
          </div>

          {/* View Mode Controls */}
          <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-2xl border border-gray-200/60">
            <button
              onClick={() => setViewMode('showcase')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'showcase'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Side-by-Side Showcase
            </button>

            <button
              onClick={() => setViewMode('interactive')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'interactive'
                  ? 'bg-white text-[#007a6e] shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Interactive Simulator
            </button>

            <button
              onClick={() => setViewMode('dual-interactive')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'dual-interactive'
                  ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00a896]" />
              Dual Live View
            </button>
          </div>

          {/* Role Quick Selector */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-gray-600">Active Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-2.5 py-1 text-xs font-bold bg-white border border-gray-200 rounded-xl text-gray-800 focus:ring-2 focus:ring-[#00a896] cursor-pointer"
            >
              <option value="broker">Broker</option>
              <option value="investor">Investor / VC</option>
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="founder">Founder</option>
            </select>

            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl transition-all cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-gray-500" />
              Reset Flow
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 overflow-x-auto">
        
        {/* VIEW MODE 1: SIDE-BY-SIDE SHOWCASE */}
        {viewMode === 'showcase' && (
          <div className="flex flex-col items-center space-y-8 animate-fadeIn">
            <div className="text-center space-y-1.5 max-w-xl">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Role-Based Flow & Payment Portal (₹399)
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Explore setup for <strong className="text-[#007a6e]">{currentRoleObj.title}</strong>, explore screen preview, ₹399 payment portal, and final email/SMS confirmation.
              </p>
            </div>

            {/* Side-by-Side Mobile Screens */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 pt-2">
              
              {/* Screen 1: Role Setup */}
              <div className="transform hover:scale-[1.01] transition-transform duration-300">
                <PhoneContainer title={`1. ${currentRoleObj.title} Setup`} badge="Setup Form">
                  <RoleProfileScreen
                    roleId={selectedRole}
                    onBack={() => setViewMode('interactive')}
                    onComplete={() => setInteractiveStep(4)}
                  />
                </PhoneContainer>
              </div>

              {/* Screen 2: Payment Portal & Success Notice */}
              <div className="transform hover:scale-[1.01] transition-transform duration-300">
                <PhoneContainer title="2. Payment & Confirmation" badge="Pay ₹399">
                  {interactiveStep === 6 ? (
                    <PaymentSuccessScreen
                      userEmail={formData.email}
                      userPhone={formData.phone}
                      roleTitle={currentRoleObj.title}
                      onExploreDashboard={handleReset}
                    />
                  ) : (
                    <PaymentPortalScreen
                      userEmail={formData.email}
                      userPhone={formData.phone}
                      roleTitle={currentRoleObj.title}
                      onBack={() => setInteractiveStep(4)}
                      onPaymentSuccess={handlePaymentSuccess}
                    />
                  )}
                </PhoneContainer>
              </div>

            </div>
          </div>
        )}

        {/* VIEW MODE 2: INTERACTIVE SINGLE PHONE SIMULATOR */}
        {viewMode === 'interactive' && (
          <div className="flex flex-col items-center space-y-6 max-w-lg w-full animate-fadeIn">
            
            {/* Step Navigation Bar */}
            <div className="flex items-center gap-1.5 bg-white p-2 rounded-2xl border border-gray-200 shadow-xs overflow-x-auto max-w-full">
              {[
                { step: 1, label: '1. Join' },
                { step: 2, label: '2. Role' },
                { step: 3, label: '3. Form' },
                { step: 4, label: '4. Feed' },
                { step: 5, label: '5. Pay ₹399' },
                { step: 6, label: '6. Success' },
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => setInteractiveStep(s.step as any)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                    interactiveStep === s.step
                      ? 'bg-[#1F4E5C] text-white shadow-xs'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Interactive Phone Frame */}
            <PhoneContainer
              title={`Step ${interactiveStep} of 6`}
              badge={
                interactiveStep === 1
                  ? 'Join Network'
                  : interactiveStep === 2
                  ? 'Role Select'
                  : interactiveStep === 3
                  ? `${currentRoleObj.title} Form`
                  : interactiveStep === 4
                  ? 'Role Feed'
                  : interactiveStep === 5
                  ? 'Checkout ₹399'
                  : 'Confirmed!'
              }
            >
              {interactiveStep === 1 && (
                <ScreenOne initialData={formData} onNext={handleScreenOneNext} />
              )}
              {interactiveStep === 2 && (
                <ScreenTwo
                  selectedRole={selectedRole}
                  onBack={() => setInteractiveStep(1)}
                  onFinish={handleScreenTwoFinish}
                />
              )}
              {interactiveStep === 3 && (
                <RoleProfileScreen
                  roleId={selectedRole}
                  onBack={() => setInteractiveStep(2)}
                  onComplete={handleProfileComplete}
                />
              )}
              {interactiveStep === 4 && (
                <RoleExploreScreen
                  roleId={selectedRole}
                  onProceedToPayment={handleProceedToPayment}
                />
              )}
              {interactiveStep === 5 && (
                <PaymentPortalScreen
                  userEmail={formData.email}
                  userPhone={formData.phone}
                  roleTitle={currentRoleObj.title}
                  onBack={() => setInteractiveStep(4)}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              )}
              {interactiveStep === 6 && (
                <PaymentSuccessScreen
                  userEmail={formData.email}
                  userPhone={formData.phone}
                  roleTitle={currentRoleObj.title}
                  onExploreDashboard={handleReset}
                />
              )}
            </PhoneContainer>
          </div>
        )}

        {/* VIEW MODE 3: DUAL LIVE INTERACTIVE */}
        {viewMode === 'dual-interactive' && (
          <div className="flex flex-col items-center space-y-8 animate-fadeIn">
            <div className="text-center space-y-1 max-w-lg">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">
                Live Dual Interactive Mode
              </h2>
              <p className="text-xs text-gray-500">
                Role Explore Feed and Payment Portal live side-by-side.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
              {/* Explore Screen */}
              <PhoneContainer title={`Role Explore Feed (${currentRoleObj.title})`} badge="Preview Feed">
                <RoleExploreScreen
                  roleId={selectedRole}
                  onProceedToPayment={() => setInteractiveStep(5)}
                />
              </PhoneContainer>

              {/* Payment Screen */}
              <PhoneContainer title="Payment & Success Notice" badge="Pay ₹399">
                <PaymentPortalScreen
                  userEmail={formData.email}
                  userPhone={formData.phone}
                  roleTitle={currentRoleObj.title}
                  onBack={() => setInteractiveStep(4)}
                  onPaymentSuccess={() => setInteractiveStep(6)}
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
            <ValorisLogo size="sm" showTagline={false} className="h-5 w-auto" />
            <span>— Complete Role & Payment Flow</span>
          </div>
          <div>React + Vite + Tailwind • Pay ₹399 & Confirmation Integration</div>
        </div>
      </footer>
    </div>
  );
}
