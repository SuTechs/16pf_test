import { useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Question, ChosenOption, Answer } from '../types';

interface QuestionnaireScreenProps {
    question: Question;
    currentIndex: number;
    totalQuestions: number;
    existingAnswer?: Answer;
    onAnswer: (questionId: number, chosen: ChosenOption) => void;
    onBack: () => void;
}

export function QuestionnaireScreen({
    question,
    currentIndex,
    totalQuestions,
    existingAnswer,
    onAnswer,
    onBack,
}: QuestionnaireScreenProps) {
    const progress = ((currentIndex) / totalQuestions) * 100;

    const optionKeys: ChosenOption[] = ['a', 'b', 'c'];

    const optionLabels = useMemo(
        () => ({
            a: question.options.a,
            b: question.options.b,
            c: question.options.c,
        }),
        [question],
    );

    return (
        <div className="flex-1 flex flex-col min-h-0">
            {/* Progress Header */}
            <div className="shrink-0 px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <span className="text-xs sm:text-sm font-medium text-surface-400">
                            Question{' '}
                            <span className="text-white font-bold">
                                {currentIndex + 1}
                            </span>{' '}
                            of {totalQuestions}
                        </span>
                        <span className="text-xs sm:text-sm font-medium text-primary-400">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 sm:h-2 bg-surface-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Question Area */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-4 sm:py-8">
                <div className="w-full max-w-2xl">
                    {/* Question Number Badge */}
                    <div className="flex justify-center mb-4 sm:mb-6">
                        <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary-600/15 border border-primary-500/20 text-primary-400 font-bold text-sm sm:text-base">
                            {currentIndex + 1}
                        </span>
                    </div>

                    {/* Question Text */}
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center leading-relaxed mb-8 sm:mb-10 px-2">
                        {question.text}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3 sm:space-y-3.5">
                        {optionKeys.map((key) => {
                            const isSelected = existingAnswer?.chosen === key;

                            return (
                                <button
                                    key={key}
                                    onClick={() => onAnswer(question.id, key)}
                                    className={`
                    w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl
                    border text-left transition-all duration-200 cursor-pointer
                    active:scale-[0.98]
                    ${isSelected
                                            ? 'bg-primary-600/15 border-primary-500/60 shadow-lg shadow-primary-500/10'
                                            : 'bg-surface-800/40 border-surface-700/50 hover:bg-surface-800/70 hover:border-surface-600/70'
                                        }
                  `}
                                >
                                    {/* Option letter badge */}
                                    <span
                                        className={`
                      shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-bold uppercase
                      transition-colors duration-200
                      ${isSelected
                                                ? 'bg-primary-500 text-white'
                                                : 'bg-surface-700/60 text-surface-400'
                                            }
                    `}
                                    >
                                        {key}
                                    </span>

                                    {/* Option text */}
                                    <span
                                        className={`
                      text-sm sm:text-base transition-colors duration-200 capitalize
                      ${isSelected ? 'text-white font-medium' : 'text-surface-300'}
                    `}
                                    >
                                        {optionLabels[key]}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Back Button */}
            <div className="shrink-0 px-4 sm:px-6 pb-5 sm:pb-7">
                <div className="max-w-2xl mx-auto">
                    {currentIndex > 0 && (
                        <button
                            onClick={onBack}
                            className="
                flex items-center gap-2 px-4 py-2.5 rounded-xl
                text-surface-400 hover:text-white text-sm font-medium
                hover:bg-surface-800/50 transition-all duration-200 cursor-pointer
              "
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Previous Question
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
