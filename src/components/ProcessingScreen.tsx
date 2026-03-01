import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface ProcessingScreenProps {
    onComplete: () => void;
}

export function ProcessingScreen({ onComplete }: ProcessingScreenProps) {
    useEffect(() => {
        const timer = setTimeout(onComplete, 2000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center">
                {/* Animated rings */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-8">
                    <div className="absolute inset-0 rounded-full border-2 border-primary-500/20 animate-ping" />
                    <div className="absolute inset-2 rounded-full border-2 border-primary-400/30 animate-ping [animation-delay:300ms]" />
                    <div className="absolute inset-4 rounded-full border-2 border-primary-300/40 animate-ping [animation-delay:600ms]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-primary-400 animate-spin" />
                    </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
                    Calculating Your Profile
                </h2>
                <p className="text-surface-400 text-sm sm:text-base max-w-xs mx-auto">
                    Analyzing your responses across 16 personality dimensions…
                </p>

                {/* Animated dots */}
                <div className="flex items-center justify-center gap-1.5 mt-6">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="w-2 h-2 rounded-full bg-primary-400 animate-bounce"
                            style={{ animationDelay: `${i * 200}ms` }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
