import { useState, useEffect, useCallback } from 'react';
import type { TestState, UserInfo, ChosenOption, Answer } from '../types';

const STORAGE_KEY = '16pf_test_state';
const TOTAL_QUESTIONS = 105;

function getInitialState(): TestState {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved) as TestState;
        }
    } catch {
        // Ignore corrupt storage
    }
    return {
        phase: 'onboarding',
        userInfo: null,
        currentIndex: 0,
        answers: [],
    };
}

export function useTestState() {
    const [state, setState] = useState<TestState>(getInitialState);

    // Persist to localStorage on every state change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch {
            // Silently ignore storage errors
        }
    }, [state]);

    const setUserInfo = useCallback((info: UserInfo) => {
        setState((prev) => ({
            ...prev,
            userInfo: info,
        }));
    }, []);

    const startTest = useCallback(() => {
        setState((prev) => ({
            ...prev,
            phase: 'testing',
            currentIndex: 0,
        }));
    }, []);

    const recordAnswer = useCallback((questionId: number, chosen: ChosenOption) => {
        setState((prev) => {
            const newAnswers = [...prev.answers];
            const existingIdx = newAnswers.findIndex((a) => a.questionId === questionId);

            if (existingIdx >= 0) {
                newAnswers[existingIdx] = { questionId, chosen };
            } else {
                newAnswers.push({ questionId, chosen });
            }

            const nextIndex = prev.currentIndex + 1;
            const isComplete = nextIndex >= TOTAL_QUESTIONS;

            return {
                ...prev,
                answers: newAnswers,
                currentIndex: isComplete ? prev.currentIndex : nextIndex,
                phase: isComplete ? 'processing' : prev.phase,
            };
        });
    }, []);

    const goBack = useCallback(() => {
        setState((prev) => ({
            ...prev,
            currentIndex: Math.max(0, prev.currentIndex - 1),
        }));
    }, []);

    const setPhase = useCallback((phase: TestState['phase']) => {
        setState((prev) => ({ ...prev, phase }));
    }, []);

    const reset = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        setState({
            phase: 'onboarding',
            userInfo: null,
            currentIndex: 0,
            answers: [],
        });
    }, []);

    const getAnswerForQuestion = useCallback(
        (questionId: number): Answer | undefined => {
            return state.answers.find((a) => a.questionId === questionId);
        },
        [state.answers],
    );

    const completionPercentage = Math.round(
        (state.answers.length / TOTAL_QUESTIONS) * 100,
    );

    return {
        state,
        setUserInfo,
        startTest,
        recordAnswer,
        goBack,
        setPhase,
        reset,
        getAnswerForQuestion,
        completionPercentage,
        totalQuestions: TOTAL_QUESTIONS,
    };
}
