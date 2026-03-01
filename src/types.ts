// ─── Question Schema ───────────────────────────────────
export interface QuestionOption {
    a: string;
    b: string;
    c: string;
}

export interface QuestionScoring {
    factor?: Factor;
    weights?: {
        a: number;
        b: number;
        c: number;
    };
}

export interface Question {
    id: number;
    text: string;
    options: QuestionOption;
    scoring: QuestionScoring;
}

export interface QuestionsData {
    questions: Question[];
}

// ─── Factors ───────────────────────────────────────────
export type PrimaryFactor =
    | 'A' | 'B' | 'C' | 'E' | 'F' | 'G' | 'H' | 'I'
    | 'L' | 'M' | 'N' | 'O' | 'Q1' | 'Q2' | 'Q3' | 'Q4';

export type Factor = PrimaryFactor | 'MD';

export const PRIMARY_FACTORS: PrimaryFactor[] = [
    'A', 'B', 'C', 'E', 'F', 'G', 'H', 'I',
    'L', 'M', 'N', 'O', 'Q1', 'Q2', 'Q3', 'Q4',
];

export const ALL_FACTORS: Factor[] = [...PRIMARY_FACTORS, 'MD'];

// ─── User & State ─────────────────────────────────────
export type Gender = 'male' | 'female';

export interface UserInfo {
    gender: Gender;
    age: number;
}

export type ChosenOption = 'a' | 'b' | 'c';

export interface Answer {
    questionId: number;
    chosen: ChosenOption;
}

export type TestPhase = 'onboarding' | 'testing' | 'processing' | 'results';

export interface TestState {
    phase: TestPhase;
    userInfo: UserInfo | null;
    currentIndex: number;
    answers: Answer[];
}

// ─── Scoring Results ──────────────────────────────────
export type RawScores = Record<Factor, number>;
export type StenScores = Record<PrimaryFactor, number>;

export interface FactorDescription {
    code: PrimaryFactor;
    name: string;
    lowLabel: string;
    highLabel: string;
    lowDescription: string;
    highDescription: string;
}
