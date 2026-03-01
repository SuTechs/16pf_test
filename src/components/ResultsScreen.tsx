import { useMemo, useRef, useEffect, useState } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';
import type { StenScores } from '../types';
import { factorDescriptions } from '../data/factorDescriptions';

interface ResultsScreenProps {
    scores: StenScores;
    mdSten: number;
    onReset: () => void;
}

const STEN_COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function ResultsScreen({ scores, mdSten, onReset }: ResultsScreenProps) {
    const gridRef = useRef<HTMLDivElement>(null);
    const [dotPositions, setDotPositions] = useState<{ x: number; y: number }[]>([]);

    const rows = useMemo(
        () => factorDescriptions.map((fd) => ({ ...fd, score: scores[fd.code] })),
        [scores],
    );

    // Calculate SVG line positions after render
    useEffect(() => {
        if (!gridRef.current) return;
        const positions: { x: number; y: number }[] = [];
        const gridRect = gridRef.current.getBoundingClientRect();

        rows.forEach((row) => {
            const dot = gridRef.current?.querySelector(`[data-dot="${row.code}"]`);
            if (dot) {
                const dotRect = dot.getBoundingClientRect();
                positions.push({
                    x: dotRect.left - gridRect.left + dotRect.width / 2,
                    y: dotRect.top - gridRect.top + dotRect.height / 2,
                });
            }
        });

        setDotPositions(positions);
    }, [rows]);

    const linePath = useMemo(() => {
        if (dotPositions.length < 2) return '';
        return dotPositions
            .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
            .join(' ');
    }, [dotPositions]);

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
            <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        Personality Profile
                    </h1>
                    <p className="text-surface-400 text-sm sm:text-base">
                        Standard Ten (Sten) Score Profile — 16PF Form C
                    </p>
                </div>

                {/* MD Score Badge */}
                <div className="flex justify-center mb-5">
                    <div className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
            ${mdSten >= 7
                            ? 'bg-amber-500/15 border border-amber-500/30 text-amber-400'
                            : 'bg-surface-800/60 border border-surface-700/50 text-surface-300'
                        }
          `}>
                        <AlertTriangle className="w-4 h-4" />
                        Motivational Distortion (MD) Sten: <span className="font-bold text-white">{mdSten}</span>
                        {mdSten >= 7 && <span className="text-xs opacity-75">(corrections applied)</span>}
                    </div>
                </div>

                {/* Profile Grid */}
                <div className="bg-surface-800/40 backdrop-blur-xl border border-surface-700/50 rounded-2xl p-2 sm:p-4 mb-6 sm:mb-8 overflow-x-auto">
                    <div ref={gridRef} className="relative min-w-[700px]">
                        {/* SVG connecting line */}
                        {linePath && (
                            <svg
                                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                                style={{ overflow: 'visible' }}
                            >
                                <path
                                    d={linePath}
                                    fill="none"
                                    stroke="#6366f1"
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    opacity="0.7"
                                />
                            </svg>
                        )}

                        {/* Header row */}
                        <div className="grid grid-cols-[minmax(120px,1fr)_repeat(10,1fr)_minmax(120px,1fr)] items-end border-b border-surface-600/40 pb-2 mb-1">
                            <div className="text-[10px] sm:text-xs font-semibold text-surface-400 uppercase tracking-wider px-1.5">
                                Low Score
                            </div>
                            {STEN_COLS.map((s) => (
                                <div
                                    key={s}
                                    className={`text-center text-[10px] sm:text-xs font-bold ${s === 5 || s === 6 ? 'text-primary-400' : 'text-surface-500'
                                        }`}
                                >
                                    {s}
                                </div>
                            ))}
                            <div className="text-[10px] sm:text-xs font-semibold text-surface-400 uppercase tracking-wider px-1.5 text-right">
                                High Score
                            </div>
                        </div>

                        {/* Factor rows */}
                        {rows.map((row, rowIdx) => (
                            <div
                                key={row.code}
                                className={`
                  grid grid-cols-[minmax(120px,1fr)_repeat(10,1fr)_minmax(120px,1fr)] items-center
                  ${rowIdx % 2 === 0 ? 'bg-surface-900/20' : ''}
                  border-b border-surface-700/20
                `}
                                style={{ minHeight: '36px' }}
                            >
                                {/* Left description */}
                                <div className="px-1.5 sm:px-2 py-1.5">
                                    <span className="text-primary-400 font-bold text-[11px] sm:text-xs mr-1">{row.code}</span>
                                    <span className="text-surface-400 text-[10px] sm:text-[11px] leading-tight">
                                        {row.lowLabel}
                                    </span>
                                </div>

                                {/* Sten columns */}
                                {STEN_COLS.map((s) => {
                                    const isAvgZone = s === 5 || s === 6;
                                    const isScore = row.score === s;

                                    return (
                                        <div
                                            key={s}
                                            className={`
                        flex items-center justify-center h-full
                        border-l border-surface-700/15
                        ${isAvgZone ? 'bg-primary-500/[0.04]' : ''}
                      `}
                                        >
                                            {isScore && (
                                                <div
                                                    data-dot={row.code}
                                                    className="relative z-20 w-4 h-4 sm:w-[18px] sm:h-[18px] rounded-full bg-primary-500 border-2 border-white shadow-lg shadow-primary-500/40"
                                                />
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Right description */}
                                <div className="px-1.5 sm:px-2 py-1.5 text-right">
                                    <span className="text-surface-400 text-[10px] sm:text-[11px] leading-tight">
                                        {row.highLabel}
                                    </span>
                                    <span className="text-primary-400 font-bold text-[11px] sm:text-xs ml-1">{row.code}</span>
                                </div>
                            </div>
                        ))}

                        {/* Footer Sten numbers */}
                        <div className="grid grid-cols-[minmax(120px,1fr)_repeat(10,1fr)_minmax(120px,1fr)] mt-1 pt-2 border-t border-surface-600/40">
                            <div />
                            {STEN_COLS.map((s) => (
                                <div
                                    key={s}
                                    className={`text-center text-[10px] sm:text-xs font-bold ${s === 5 || s === 6 ? 'text-primary-400' : 'text-surface-500'
                                        }`}
                                >
                                    {s}
                                </div>
                            ))}
                            <div />
                        </div>
                    </div>
                </div>

                {/* Factor Details */}
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
                        Factor Details
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {rows.map((row) => {
                            const isLow = row.score <= 5;
                            return (
                                <div
                                    key={row.code}
                                    className="flex items-start gap-3 px-4 py-3 rounded-xl bg-surface-800/40 border border-surface-700/50"
                                >
                                    <span className={`
                    shrink-0 flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold
                    ${row.score >= 8
                                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                            : row.score >= 4
                                                ? 'bg-primary-500/15 text-primary-400 border border-primary-500/30'
                                                : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                        }
                  `}>
                                        {row.score}
                                    </span>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-1.5 mb-0.5">
                                            <span className="font-bold text-sm text-white">{row.code}</span>
                                            <span className="text-xs text-surface-400">— {row.name}</span>
                                        </div>
                                        <p className="text-xs text-surface-400 leading-relaxed">
                                            {isLow ? row.lowDescription : row.highDescription}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Reset */}
                <div className="text-center pb-8">
                    <button
                        onClick={onReset}
                        className="
              inline-flex items-center gap-2 px-6 py-3 rounded-xl
              bg-surface-800/60 border border-surface-700/50
              text-surface-300 hover:text-white text-sm font-medium
              hover:bg-surface-700/60 active:scale-[0.98] transition-all duration-200 cursor-pointer
            "
                    >
                        <RotateCcw className="w-4 h-4" />
                        Start Over
                    </button>
                </div>
            </div>
        </div>
    );
}
