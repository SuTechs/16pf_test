import { useMemo, useState } from 'react';
import {
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { RotateCcw, ChevronDown, ChevronUp, TrendingUp, TrendingDown } from 'lucide-react';
import type { StenScores, PrimaryFactor } from '../types';
import { factorDescriptions } from '../data/factorDescriptions';

interface ResultsScreenProps {
    scores: StenScores;
    onReset: () => void;
}

export function ResultsScreen({ scores, onReset }: ResultsScreenProps) {
    const [expandedFactor, setExpandedFactor] = useState<PrimaryFactor | null>(null);

    const chartData = useMemo(
        () =>
            factorDescriptions.map((fd) => ({
                factor: fd.code,
                name: fd.name,
                score: scores[fd.code],
                fullMark: 10,
            })),
        [scores],
    );

    const toggleFactor = (code: PrimaryFactor) => {
        setExpandedFactor((prev) => (prev === code ? null : code));
    };

    return (
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
            <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                        Your Personality Profile
                    </h1>
                    <p className="text-surface-400 text-sm sm:text-base">
                        16 personality dimensions on a 1–10 Sten scale
                    </p>
                </div>

                {/* Radar Chart */}
                <div className="bg-surface-800/40 backdrop-blur-xl border border-surface-700/50 rounded-2xl p-3 sm:p-6 mb-6 sm:mb-8">
                    <ResponsiveContainer width="100%" height={340}>
                        <RadarChart
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            outerRadius="72%"
                        >
                            <PolarGrid
                                stroke="rgba(148, 163, 184, 0.15)"
                                gridType="polygon"
                            />
                            <PolarAngleAxis
                                dataKey="factor"
                                tick={{
                                    fill: '#94a3b8',
                                    fontSize: 11,
                                    fontWeight: 600,
                                }}
                            />
                            <PolarRadiusAxis
                                angle={90}
                                domain={[0, 10]}
                                tick={{ fill: '#475569', fontSize: 10 }}
                                tickCount={6}
                                axisLine={false}
                            />
                            <Radar
                                name="Score"
                                dataKey="score"
                                stroke="#6366f1"
                                fill="#6366f1"
                                fillOpacity={0.2}
                                strokeWidth={2}
                                dot={{
                                    r: 3,
                                    fill: '#818cf8',
                                    stroke: '#6366f1',
                                    strokeWidth: 1,
                                }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #334155',
                                    borderRadius: '12px',
                                    fontSize: '13px',
                                    padding: '8px 12px',
                                }}
                                itemStyle={{ color: '#a5b4fc' }}
                                labelStyle={{ color: '#f1f5f9', fontWeight: 600 }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                {/* Factor Breakdown */}
                <div className="mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-bold text-white mb-4">
                        Factor Breakdown
                    </h2>

                    <div className="space-y-2 sm:space-y-2.5">
                        {factorDescriptions.map((fd) => {
                            const score = scores[fd.code];
                            const isLow = score <= 5;
                            const isExpanded = expandedFactor === fd.code;

                            return (
                                <div
                                    key={fd.code}
                                    className="bg-surface-800/40 border border-surface-700/50 rounded-xl overflow-hidden transition-all duration-200"
                                >
                                    <button
                                        onClick={() => toggleFactor(fd.code)}
                                        className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-3.5 text-left cursor-pointer"
                                    >
                                        {/* Score badge */}
                                        <span
                                            className={`
                        shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-sm font-bold
                        ${score >= 8
                                                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                                    : score >= 4
                                                        ? 'bg-primary-500/15 text-primary-400 border border-primary-500/30'
                                                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                                                }
                      `}
                                        >
                                            {score}
                                        </span>

                                        {/* Factor info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm sm:text-base font-semibold text-white">
                                                    {fd.code}
                                                </span>
                                                <span className="text-sm text-surface-400 truncate">
                                                    {fd.name}
                                                </span>
                                            </div>
                                            {/* Score bar */}
                                            <div className="h-1.5 bg-surface-700/50 rounded-full mt-1.5 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-700 ease-out ${score >= 8
                                                        ? 'bg-emerald-500'
                                                        : score >= 4
                                                            ? 'bg-primary-500'
                                                            : 'bg-amber-500'
                                                        }`}
                                                    style={{ width: `${(score / 10) * 100}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Direction indicator */}
                                        <div className="shrink-0 flex items-center gap-1.5">
                                            <span
                                                className={`text-xs font-medium ${isLow ? 'text-amber-400' : 'text-emerald-400'
                                                    }`}
                                            >
                                                {isLow ? fd.lowLabel : fd.highLabel}
                                            </span>
                                            {isLow ? (
                                                <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
                                            ) : (
                                                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                                            )}
                                        </div>

                                        {/* Expand toggle */}
                                        <span className="shrink-0 text-surface-500">
                                            {isExpanded ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            )}
                                        </span>
                                    </button>

                                    {/* Expanded content */}
                                    {isExpanded && (
                                        <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-surface-700/40">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                                <div className="p-3 rounded-lg bg-surface-900/50">
                                                    <div className="flex items-center gap-1.5 mb-1.5">
                                                        <TrendingDown className="w-3.5 h-3.5 text-amber-400" />
                                                        <span className="text-xs font-semibold text-amber-400">
                                                            Low: {fd.lowLabel}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-surface-400 leading-relaxed">
                                                        {fd.lowDescription}
                                                    </p>
                                                </div>
                                                <div className="p-3 rounded-lg bg-surface-900/50">
                                                    <div className="flex items-center gap-1.5 mb-1.5">
                                                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                                                        <span className="text-xs font-semibold text-emerald-400">
                                                            High: {fd.highLabel}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-surface-400 leading-relaxed">
                                                        {fd.highDescription}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Reset Button */}
                <div className="text-center pb-8">
                    <button
                        onClick={onReset}
                        className="
              inline-flex items-center gap-2 px-6 py-3 rounded-xl
              bg-surface-800/60 border border-surface-700/50
              text-surface-300 hover:text-white text-sm font-medium
              hover:bg-surface-700/60 hover:border-surface-600/60
              active:scale-[0.98] transition-all duration-200 cursor-pointer
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
