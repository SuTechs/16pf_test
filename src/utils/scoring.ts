import type {
    Answer,
    Gender,
    Question,
    RawScores,
    StenScores,
} from '../types';
import { PRIMARY_FACTORS } from '../types';

// ─── Sten Conversion Tables ──────────────────────────
// Keys = 16 factors. Values = arrays where index = Sten - 1.
// Each tuple [min, max] is the raw score range for that Sten.
// [-1, -1] means no raw score maps to that Sten (gap).

export type StenRange = [number, number];
export type FactorStenMap = Record<string, StenRange[]>;

export const MALE_STEN_TABLE: FactorStenMap = {
    A: [[0, 3], [4, 4], [5, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 12], [13, 26]],
    B: [[0, 1], [2, 2], [3, 3], [4, 4], [-1, -1], [5, 5], [6, 6], [-1, -1], [7, 7], [8, 26]],
    C: [[0, 1], [2, 3], [4, 4], [5, 5], [6, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 26]],
    E: [[0, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 7], [8, 8], [9, 9], [10, 10], [11, 26]],
    F: [[0, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 8], [9, 9], [10, 10], [11, 11], [12, 26]],
    G: [[0, 1], [2, 2], [3, 4], [5, 5], [6, 6], [7, 8], [9, 9], [10, 10], [11, 11], [12, 26]],
    H: [[0, 1], [2, 2], [3, 3], [4, 4], [5, 6], [7, 8], [9, 9], [10, 10], [11, 11], [12, 26]],
    I: [[0, 0], [1, 1], [2, 2], [3, 4], [5, 5], [6, 6], [7, 8], [9, 9], [10, 10], [11, 26]],
    L: [[0, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 26]],
    M: [[0, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 9], [10, 10], [11, 26]],
    N: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 7], [8, 8], [9, 9], [10, 26]],
    O: [[0, 0], [1, 1], [2, 3], [4, 4], [5, 6], [7, 7], [8, 9], [10, 10], [11, 11], [12, 26]],
    Q1: [[0, 1], [2, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 10], [11, 11], [12, 26]],
    Q2: [[-1, -1], [0, 0], [1, 1], [2, 2], [3, 4], [5, 5], [6, 6], [7, 8], [9, 10], [11, 26]],
    Q3: [[0, 2], [3, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 26]],
    Q4: [[0, 0], [1, 2], [3, 3], [4, 4], [5, 5], [6, 7], [8, 8], [9, 9], [10, 10], [11, 26]],
};

export const FEMALE_STEN_TABLE: FactorStenMap = {
    A: [[0, 3], [4, 5], [6, 6], [7, 7], [8, 9], [10, 10], [11, 11], [-1, -1], [12, 12], [13, 26]],
    B: [[0, 1], [2, 2], [3, 3], [4, 4], [-1, -1], [5, 5], [6, 6], [-1, -1], [7, 7], [8, 26]],
    C: [[0, 1], [2, 2], [3, 4], [5, 5], [6, 6], [7, 8], [9, 9], [10, 10], [11, 11], [12, 26]],
    E: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 6], [7, 7], [8, 8], [9, 10], [11, 26]],
    F: [[0, 1], [2, 3], [4, 4], [5, 5], [6, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 26]],
    G: [[0, 1], [2, 2], [3, 4], [5, 5], [6, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 26]],
    H: [[0, 0], [1, 2], [3, 3], [4, 4], [5, 6], [7, 7], [8, 9], [10, 10], [11, 11], [12, 26]],
    I: [[0, 0], [1, 2], [3, 3], [4, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 26]],
    L: [[0, 1], [2, 2], [3, 3], [4, 4], [5, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 26]],
    M: [[0, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 8], [9, 9], [10, 10], [11, 26]],
    N: [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 9], [10, 26]],
    O: [[0, 1], [2, 3], [4, 4], [5, 6], [7, 7], [8, 9], [10, 10], [11, 11], [12, 12], [13, 26]],
    Q1: [[0, 1], [2, 2], [3, 3], [4, 4], [5, 6], [7, 7], [8, 8], [9, 10], [11, 11], [12, 26]],
    Q2: [[0, 0], [0, 0], [1, 1], [2, 2], [3, 4], [5, 6], [7, 7], [8, 8], [9, 12], [13, 26]],
    Q3: [[0, 2], [3, 3], [4, 4], [5, 6], [7, 7], [8, 8], [9, 9], [10, 10], [11, 11], [12, 26]],
    Q4: [[0, 1], [2, 2], [3, 4], [5, 5], [6, 7], [8, 8], [9, 9], [10, 11], [12, 12], [13, 26]],
};

// ─── MD Sten Conversion ──────────────────────────────
export function calculateMDSten(rawMD: number, gender: Gender): number {
    if (gender === 'female') {
        if (rawMD <= 2) return 1;
        if (rawMD <= 4) return 2;
        if (rawMD === 5) return 3;
        if (rawMD === 6) return 4;
        if (rawMD === 7) return 5;
        if (rawMD === 8) return 6;
        if (rawMD === 9) return 7;
        if (rawMD <= 11) return 8;
        if (rawMD === 12) return 9;
        return 10; // 13+
    }
    // Male
    if (rawMD <= 3) return 1;
    if (rawMD === 4) return 2;
    if (rawMD === 5) return 3;
    if (rawMD === 6) return 4;
    if (rawMD === 7) return 5;
    if (rawMD === 8) return 6;
    if (rawMD <= 10) return 7;
    if (rawMD === 11) return 8;
    if (rawMD === 12) return 9;
    return 10; // 13+
}

// ─── Step 1: Calculate Raw Scores ─────────────────────
export function calculateRawScores(
    answers: Answer[],
    questions: Question[],
): RawScores {
    const scores: RawScores = {
        A: 0, B: 0, C: 0, E: 0, F: 0, G: 0, H: 0, I: 0,
        L: 0, M: 0, N: 0, O: 0, Q1: 0, Q2: 0, Q3: 0, Q4: 0,
        MD: 0,
    };

    const questionMap = new Map(questions.map((q) => [q.id, q]));

    for (const answer of answers) {
        const question = questionMap.get(answer.questionId);
        if (!question?.scoring?.factor || !question.scoring.weights) continue;

        const { factor, weights } = question.scoring;
        const weight = weights[answer.chosen];
        if (typeof weight === 'number') {
            scores[factor] += weight;
        }
    }

    return scores;
}

// ─── Step 2: Apply MD Corrections ─────────────────────
export function applyMDCorrections(
    rawScores: RawScores,
    mdStenScore: number,
): RawScores {
    const adj = { ...rawScores };

    if (mdStenScore === 10) {
        adj.O += 2; adj.Q4 += 2; adj.C -= 2; adj.Q3 -= 2;
        adj.L += 1; adj.N += 1; adj.Q2 += 1;
        adj.A -= 1; adj.G -= 1; adj.H -= 1;
    } else if (mdStenScore === 8 || mdStenScore === 9) {
        adj.L += 1; adj.N += 1; adj.O += 1; adj.Q2 += 1; adj.Q4 += 1;
        adj.A -= 1; adj.C -= 1; adj.G -= 1; adj.H -= 1; adj.Q3 -= 1;
    } else if (mdStenScore === 7) {
        adj.O += 1; adj.Q4 += 1; adj.C -= 1; adj.Q3 -= 1;
    }

    return adj;
}

// ─── Helper: Raw Score → Sten via Lookup ──────────────
function lookupSten(factor: string, rawScore: number, table: FactorStenMap): number {
    const ranges = table[factor];
    if (!ranges) return 5;

    for (let i = 0; i < ranges.length; i++) {
        const [min, max] = ranges[i];
        if (min === -1 && max === -1) continue; // gap
        if (rawScore >= min && rawScore <= max) return i + 1;
    }

    // Fallback: clamp
    return rawScore <= 0 ? 1 : 10;
}

// ─── Step 3: Convert to Sten Scores ───────────────────
export function convertToSten(
    adjustedRawScores: RawScores,
    gender: Gender,
): StenScores {
    const table = gender === 'male' ? MALE_STEN_TABLE : FEMALE_STEN_TABLE;
    const stenScores: Partial<StenScores> = {};

    for (const factor of PRIMARY_FACTORS) {
        const raw = adjustedRawScores[factor];
        let sten = lookupSten(factor, raw, table);
        sten = Math.max(1, Math.min(10, sten)); // clamp 1–10
        stenScores[factor] = sten;
    }

    return stenScores as StenScores;
}

// ─── Orchestrator ─────────────────────────────────────
export function calculateResults(
    answers: Answer[],
    questions: Question[],
    gender: Gender,
): { stenScores: StenScores; mdSten: number } {
    const rawScores = calculateRawScores(answers, questions);
    const mdSten = calculateMDSten(rawScores.MD, gender);
    const adjustedScores = applyMDCorrections(rawScores, mdSten);
    const stenScores = convertToSten(adjustedScores, gender);
    return { stenScores, mdSten };
}
