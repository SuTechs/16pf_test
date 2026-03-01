import { useState } from 'react';
import { Brain, ChevronRight, Sparkles } from 'lucide-react';
import type { Gender, UserInfo } from '../types';

interface OnboardingScreenProps {
    onStart: (info: UserInfo) => void;
}

export function OnboardingScreen({ onStart }: OnboardingScreenProps) {
    const [gender, setGender] = useState<Gender | ''>('');
    const [age, setAge] = useState('');
    const [errors, setErrors] = useState<{ gender?: string; age?: string }>({});

    const handleSubmit = () => {
        const newErrors: typeof errors = {};
        if (!gender) newErrors.gender = 'Please select your gender';
        if (!age || parseInt(age) < 10 || parseInt(age) > 120)
            newErrors.age = 'Please enter a valid age (10–120)';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onStart({ gender: gender as Gender, age: parseInt(age) });
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-lg">
                {/* Hero */}
                <div className="text-center mb-8 sm:mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 mb-5 sm:mb-6 shadow-lg shadow-primary-500/25">
                        <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                        16PF Personality Assessment
                    </h1>
                    <p className="text-surface-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                        Discover your personality profile across 16 scientifically validated
                        dimensions. This takes about <strong className="text-surface-300">15–20 minutes</strong> to complete.
                    </p>
                </div>

                {/* Info badges */}
                <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8">
                    {[
                        { label: '105', sub: 'Questions' },
                        { label: '16', sub: 'Factors' },
                        { label: '~20', sub: 'Minutes' },
                    ].map((item) => (
                        <div
                            key={item.sub}
                            className="flex flex-col items-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-surface-800/60 border border-surface-700/50"
                        >
                            <span className="text-lg sm:text-xl font-bold text-primary-400">
                                {item.label}
                            </span>
                            <span className="text-[11px] sm:text-xs text-surface-400 mt-0.5">
                                {item.sub}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Form Card */}
                <div className="bg-surface-800/40 backdrop-blur-xl border border-surface-700/50 rounded-2xl p-5 sm:p-7">
                    <div className="flex items-center gap-2 mb-5 sm:mb-6">
                        <Sparkles className="w-4 h-4 text-primary-400" />
                        <p className="text-xs sm:text-sm text-surface-300 font-medium">
                            Required for accurate scoring
                        </p>
                    </div>

                    {/* Gender Select */}
                    <div className="mb-4 sm:mb-5">
                        <label className="block text-xs sm:text-sm font-medium text-surface-300 mb-1.5 sm:mb-2">
                            Gender
                        </label>
                        <select
                            value={gender}
                            onChange={(e) => {
                                setGender(e.target.value as Gender);
                                setErrors((prev) => ({ ...prev, gender: undefined }));
                            }}
                            className={`
                w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-surface-900/80 border text-sm sm:text-base
                text-white appearance-none cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                transition-all duration-200
                ${errors.gender ? 'border-red-500/70' : 'border-surface-600/50'}
              `}
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && (
                            <p className="text-red-400 text-xs mt-1.5">{errors.gender}</p>
                        )}
                    </div>

                    {/* Age Input */}
                    <div className="mb-6 sm:mb-7">
                        <label className="block text-xs sm:text-sm font-medium text-surface-300 mb-1.5 sm:mb-2">
                            Age
                        </label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => {
                                setAge(e.target.value);
                                setErrors((prev) => ({ ...prev, age: undefined }));
                            }}
                            placeholder="Enter your age"
                            min={10}
                            max={120}
                            className={`
                w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-surface-900/80 border text-sm sm:text-base
                text-white placeholder-surface-500
                focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500
                transition-all duration-200
                ${errors.age ? 'border-red-500/70' : 'border-surface-600/50'}
              `}
                        />
                        {errors.age && (
                            <p className="text-red-400 text-xs mt-1.5">{errors.age}</p>
                        )}
                    </div>

                    {/* Start Button */}
                    <button
                        onClick={handleSubmit}
                        className="
              w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-6 rounded-xl
              bg-gradient-to-r from-primary-600 to-primary-500
              text-white font-semibold text-sm sm:text-base
              hover:from-primary-500 hover:to-primary-400
              active:scale-[0.98] transition-all duration-200
              shadow-lg shadow-primary-600/25 hover:shadow-primary-500/40
              cursor-pointer
            "
                    >
                        Start Assessment
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>

                <p className="text-center text-[11px] sm:text-xs text-surface-500 mt-4 sm:mt-5">
                    Your progress is automatically saved — you can leave and return anytime.
                </p>
            </div>
        </div>
    );
}
