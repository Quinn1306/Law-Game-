import { create } from 'zustand'

export type GamePhase = 'intro' | 'phase1' | 'phase2' | 'results'
export type AnswerState = 'unanswered' | 'correct' | 'incorrect'

interface GameStore {
  phase: GamePhase
  userName: string
  currentQuestion: number
  score: number
  answers: Record<string, string>
  answerState: AnswerState
  scenarioPaths: Record<string, string[]>
  currentSublevel: number

  setPhase: (phase: GamePhase) => void
  setUserName: (name: string) => void
  selectAnswer: (questionId: string, optionId: string, correct: boolean) => void
  nextQuestion: () => void
  setAnswerState: (state: AnswerState) => void
  addScenarioNode: (sublevelId: string, nodeId: string) => void
  setSublevel: (index: number) => void
  reset: () => void
}

export const useGameStore = create<GameStore>((set) => ({
  phase: 'intro',
  userName: '',
  currentQuestion: 0,
  score: 0,
  answers: {},
  answerState: 'unanswered',
  scenarioPaths: {},
  currentSublevel: 0,

  setPhase: (phase) => set({ phase }),

  setUserName: (userName) => set({ userName }),

  selectAnswer: (questionId, optionId, correct) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionId },
      score: correct ? state.score + 1 : state.score,
      answerState: correct ? 'correct' : 'incorrect',
    })),

  nextQuestion: () =>
    set((state) => ({
      currentQuestion: state.currentQuestion + 1,
      answerState: 'unanswered',
    })),

  setAnswerState: (answerState) => set({ answerState }),

  addScenarioNode: (sublevelId, nodeId) =>
    set((state) => ({
      scenarioPaths: {
        ...state.scenarioPaths,
        [sublevelId]: [...(state.scenarioPaths[sublevelId] ?? []), nodeId],
      },
    })),

  setSublevel: (index) => set({ currentSublevel: index }),

  reset: () =>
    set((state) => ({
      phase: 'intro',
      userName: state.userName,
      currentQuestion: 0,
      score: 0,
      answers: {},
      answerState: 'unanswered',
      scenarioPaths: {},
      currentSublevel: 0,
    })),
}))
