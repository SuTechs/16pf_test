import type {
    Answer,
    Gender,
    PrimaryFactor,
    Question,
    RawScores,
    StenScores,
} from '../types';
import { PRIMARY_FACTORS } from '../types';

// ─── Sten Conversion Tables (Placeholder) ─────────────
// Each table maps a factor to an array of [minRaw, maxRaw] tuples.
// Index 0 → Sten 1, Index 1 → Sten 2, ... Index 9 → Sten 10.
// Fill these with the actual raw-score ranges from the 16PF manual.

type StenRange = [number, number]; // [minRaw, maxRaw]
type FactorStenTable = Record<PrimaryFactor, StenRange[]>;

export const MALE_STEN_CONVERSION_TABLE: FactorStenTable = {
    A: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    B: [[0, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 13]],
    C: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    E: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    F: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    G: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    H: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    I: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    L: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    M: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    N: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    O: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    Q1: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    Q2: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    Q3: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    Q4: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
};

export const FEMALE_STEN_CONVERSION_TABLE: FactorStenTable = {
    A: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    B: [[0, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9], [10, 13]],
    C: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    E: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    F: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    G: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    H: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    I: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    L: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    M: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    N: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    O: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    Q1: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    Q2: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    Q3: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
    Q4: [[0, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16], [17, 18], [19, 20]],
};

// ─── Step 1: Calculate Raw Scores ─────────────────────
/**
 * Iterates through all answers and accumulates raw scores for each factor
 * by looking up the weight for the chosen option in each question's scoring.
 */
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
        if (!question || !question.scoring.factor || !question.scoring.weights) {
            continue;
        }

        const { factor, weights } = question.scoring;
        const weight = weights[answer.chosen];
        if (typeof weight === 'number') {
            scores[factor] += weight;
        }
    }

    return scores;
}

// ─── Step 2: Apply MD Corrections ─────────────────────
/**
 * Adjusts raw scores of specific factors based on the MD Sten score.
 * Uses the exact correction logic from the 16PF manual.
 */
export function applyMDCorrections(
    rawScores: RawScores,
    mdStenScore: number,
): RawScores {
    // Clone so we don't mutate the original
    const adjusted = { ...rawScores };

    if (mdStenScore === 10) {
        // Add 2 to O, Q4. Subtract 2 from C, Q3.
        adjusted.O += 2;
        adjusted.Q4 += 2;
        adjusted.C -= 2;
        adjusted.Q3 -= 2;
        // Add 1 to L, N, Q2. Subtract 1 from A, G, H.
        adjusted.L += 1;
        adjusted.N += 1;
        adjusted.Q2 += 1;
        adjusted.A -= 1;
        adjusted.G -= 1;
        adjusted.H -= 1;
    } else if (mdStenScore === 8 || mdStenScore === 9) {
        // Add 1 to L, N, O, Q2, Q4.
        adjusted.L += 1;
        adjusted.N += 1;
        adjusted.O += 1;
        adjusted.Q2 += 1;
        adjusted.Q4 += 1;
        // Subtract 1 from A, C, G, H, Q3.
        adjusted.A -= 1;
        adjusted.C -= 1;
        adjusted.G -= 1;
        adjusted.H -= 1;
        adjusted.Q3 -= 1;
    } else if (mdStenScore === 7) {
        // Add 1 to O, Q4.
        adjusted.O += 1;
        adjusted.Q4 += 1;
        // Subtract 1 from C, Q3.
        adjusted.C -= 1;
        adjusted.Q3 -= 1;
    }
    // mdStenScore ≤ 6 → no adjustments

    return adjusted;
}

// ─── Helper: Raw Score → Sten via Lookup ──────────────
function lookupSten(
    factor: PrimaryFactor,
    rawScore: number,
    table: FactorStenTable,
): number {
    const ranges = table[factor];
    if (!ranges) return 5; // fallback

    for (let sten = 0; sten < ranges.length; sten++) {
        const [min, max] = ranges[sten];
        if (rawScore >= min && rawScore <= max) {
            return sten + 1; // Sten 1–10
        }
    }

    // If raw score exceeds all ranges, cap at 10
    return rawScore <= ranges[0][0] ? 1 : 10;
}

// ─── Step 3: Convert to Sten Scores ───────────────────
/**
 * Maps adjusted raw scores to the 1–10 Sten scale using gender-specific
 * lookup tables.
 */
export function convertToSten(
    adjustedRawScores: RawScores,
    gender: Gender,
): StenScores {
    const table =
        gender === 'male'
            ? MALE_STEN_CONVERSION_TABLE
            : FEMALE_STEN_CONVERSION_TABLE;

    const stenScores: Partial<StenScores> = {};

    for (const factor of PRIMARY_FACTORS) {
        stenScores[factor] = lookupSten(factor, adjustedRawScores[factor], table);
    }

    return stenScores as StenScores;
}

// ─── Orchestrator ─────────────────────────────────────
/**
 * Full 3-step scoring pipeline:
 * 1. Calculate raw scores
 * 2. Apply MD corrections
 * 3. Convert to Sten scores
 */
export function calculateResults(
    answers: Answer[],
    questions: Question[],
    gender: Gender,
): StenScores {
    // Step 1: Raw scores
    const rawScores = calculateRawScores(answers, questions);

    // Convert MD raw to Sten so we can apply corrections
    const mdTable =
        gender === 'male'
            ? MALE_STEN_CONVERSION_TABLE
            : FEMALE_STEN_CONVERSION_TABLE;

    // MD uses a special lookup; for now treat it like any primary factor.
    // You can replace this with a dedicated MD Sten table later.
    const mdStenScore = lookupSten('A' as PrimaryFactor, rawScores.MD, mdTable);

    // Step 2: Apply MD corrections
    const adjustedScores = applyMDCorrections(rawScores, mdStenScore);

    // Step 3: Convert to Sten
    return convertToSten(adjustedScores, gender);
}
