import { useMemo, useCallback } from 'react';
import { OnboardingScreen } from './components/OnboardingScreen';
import { QuestionnaireScreen } from './components/QuestionnaireScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { useTestState } from './hooks/useTestState';
import { calculateResults } from './utils/scoring';
import questionsData from './data/questions.json';
import type { Question, UserInfo, StenScores } from './types';

const questions = (questionsData as { questions: Question[] }).questions;

function App() {
  const {
    state,
    setUserInfo,
    startTest,
    recordAnswer,
    goBack,
    setPhase,
    reset,
    getAnswerForQuestion,
    totalQuestions,
  } = useTestState();

  const handleStart = useCallback(
    (info: UserInfo) => {
      setUserInfo(info);
      startTest();
    },
    [setUserInfo, startTest],
  );

  const handleProcessingComplete = useCallback(() => {
    setPhase('results');
  }, [setPhase]);

  const currentQuestion = questions[state.currentIndex];

  const existingAnswer = useMemo(
    () => (currentQuestion ? getAnswerForQuestion(currentQuestion.id) : undefined),
    [currentQuestion, getAnswerForQuestion],
  );

  const scores: StenScores | null = useMemo(() => {
    if (state.phase !== 'results' || !state.userInfo) return null;
    return calculateResults(state.answers, questions, state.userInfo.gender);
  }, [state.phase, state.answers, state.userInfo]);

  return (
    <div className="flex flex-col min-h-dvh">
      {state.phase === 'onboarding' && (
        <OnboardingScreen onStart={handleStart} />
      )}

      {state.phase === 'testing' && currentQuestion && (
        <QuestionnaireScreen
          question={currentQuestion}
          currentIndex={state.currentIndex}
          totalQuestions={totalQuestions}
          existingAnswer={existingAnswer}
          onAnswer={recordAnswer}
          onBack={goBack}
        />
      )}

      {state.phase === 'processing' && (
        <ProcessingScreen onComplete={handleProcessingComplete} />
      )}

      {state.phase === 'results' && scores && (
        <ResultsScreen scores={scores} onReset={reset} />
      )}
    </div>
  );
}

export default App;
