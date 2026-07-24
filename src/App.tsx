import { useState } from 'react';
import { PhoneContainer } from './components/PhoneContainer';
import { ScreenOne } from './components/ScreenOne';
import { ScreenTwo, ROLES } from './components/ScreenTwo';
import { RoleProfileScreen } from './components/RoleProfileScreens';
import { ValorisLogo } from './components/ValorisLogo';
import { Smartphone, LayoutGrid, Sparkles, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'showcase' | 'interactive' | 'dual-interactive'>('showcase');
  const [interactiveStep, setInteractiveStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Rajat Sharma',
    email: 'rajat@valoris.com',
    phone: '+1 (555) 234-5678',
  });
  const [selectedRole, setSelectedRole] = useState<string>('broker');
  const [submitted, setSubmitted] = useState(false);

  const handleScreenOneNext = (data: { fullName: string; email: string; phone: string }) => {
    setFormData(data);
    setInteractiveStep(2);
  };

  const handleScreenTwoFinish = (role: string) => {
    setSelectedRole(role);
    setInteractiveStep(3); // Route to role-specific profile screen!
  };

  const handleProfileComplete = (_profileData: any) => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setInteractiveStep(1);
    setSubmitted(false);
    setSelectedRole('broker');
  };

  const currentRoleObj = ROLES.find((r) => r.id === selectedRole) || ROLES[0];

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
                  Role-Based Routing
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                Join Network ➔ Select Role ➔ Role Profile Setup Screen
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

          {/* Role Quick Selector for Live Preview */}
          <div className="flex items-center gap-2">
            <label className="text-xs font-bold text-gray-600">Preview Role:</label>
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
              Reset
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
                Role-Based Onboarding Experience
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Selecting a role on Screen 2 routes dynamically to the specialized <strong className="text-[#007a6e]">{currentRoleObj.title} Profile Setup Screen</strong>.
              </p>
            </div>

            {/* Side-by-Side Mobile Screens Container */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 pt-2">
              
              {/* Screen 1 Frame */}
              <div className="transform hover:scale-[1.01] transition-transform duration-300">
                <PhoneContainer title="Screen 1 of 2" badge="Join the Network">
                  <ScreenOne
                    initialData={formData}
                    onNext={() => setViewMode('interactive')}
                  />
                </PhoneContainer>
              </div>

              {/* Screen 2 / Role Profile Screen Frame */}
              <div className="transform hover:scale-[1.01] transition-transform duration-300">
                <PhoneContainer
                  title={`Routed Screen: ${currentRoleObj.title}`}
                  badge="Profile Setup"
                >
                  <RoleProfileScreen
                    roleId={selectedRole}
                    onBack={() => setViewMode('interactive')}
                    onComplete={handleProfileComplete}
                  />
                </PhoneContainer>
              </div>

            </div>
          </div>
        )}

        {/* VIEW MODE 2: INTERACTIVE SINGLE PHONE SIMULATOR */}
        {viewMode === 'interactive' && (
          <div className="flex flex-col items-center space-y-6 max-w-md w-full animate-fadeIn">
            
            {/* Step Navigation Pill */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-xs">
              <button
                onClick={() => { setInteractiveStep(1); setSubmitted(false); }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  interactiveStep === 1 && !submitted
                    ? 'bg-[#092C3E] text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                1. Join
              </button>
              <ArrowRight className="w-3 h-3 text-gray-400" />
              <button
                onClick={() => setInteractiveStep(2)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  interactiveStep === 2 && !submitted
                    ? 'bg-[#00a896] text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                2. Role Select
              </button>
              <ArrowRight className="w-3 h-3 text-gray-400" />
              <button
                onClick={() => setInteractiveStep(3)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  interactiveStep === 3 && !submitted
                    ? 'bg-[#1F4E5C] text-white'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                3. {currentRoleObj.title} Setup
              </button>
            </div>

            {/* Interactive Phone Frame */}
            <PhoneContainer
              title={submitted ? 'Success!' : `Step ${interactiveStep} of 3`}
              badge={interactiveStep === 1 ? 'Join Network' : interactiveStep === 2 ? 'Select Role' : `${currentRoleObj.title} Setup`}
            >
              {!submitted ? (
                interactiveStep === 1 ? (
                  <ScreenOne
                    initialData={formData}
                    onNext={handleScreenOneNext}
                  />
                ) : interactiveStep === 2 ? (
                  <ScreenTwo
                    selectedRole={selectedRole}
                    onBack={() => setInteractiveStep(1)}
                    onFinish={handleScreenTwoFinish}
                  />
                ) : (
                  <RoleProfileScreen
                    roleId={selectedRole}
                    onBack={() => setInteractiveStep(2)}
                    onComplete={handleProfileComplete}
                  />
                )
              ) : (
                /* Success Screen state */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4 bg-white animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00a896] flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-gray-900">
                      Profile Completed!
                    </h2>
                    <p className="text-xs text-gray-500 font-medium px-2">
                      Welcome aboard <strong className="text-gray-800">{formData.fullName || 'User'}</strong>! Your <strong className="text-[#00a896] capitalize">{currentRoleObj.title} Profile</strong> is now live on Valoris.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="w-full py-3 bg-[#1F4E5C] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#163842] transition-all cursor-pointer"
                  >
                    Start Over
                  </button>
                </div>
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
                Screen 2 (Role Picker) and Screen 3 ({currentRoleObj.title} Setup) live side-by-side.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
              {/* Screen 2 Live */}
              <PhoneContainer title="Screen 2: Role Picker" badge="Select Role">
                <ScreenTwo
                  selectedRole={selectedRole}
                  onBack={() => setInteractiveStep(1)}
                  onFinish={(role) => setSelectedRole(role)}
                />
              </PhoneContainer>

              {/* Screen 3 Live for Selected Role */}
              <PhoneContainer title={`Screen 3: ${currentRoleObj.title}`} badge="Role Setup Form">
                <RoleProfileScreen
                  roleId={selectedRole}
                  onBack={() => setInteractiveStep(2)}
                  onComplete={handleProfileComplete}
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
            <span>— Mobile App Web Mockup</span>
          </div>
          <div>Role-Based Routing • Built with React, Vite & Tailwind</div>
        </div>
      </footer>
    </div>
  );
}
