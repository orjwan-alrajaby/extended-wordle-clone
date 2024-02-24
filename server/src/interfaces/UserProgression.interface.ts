export interface UserProgression {
  id: string;
  userId: string;
  levelId: string;
  themeId: string;
  wordId: string;
  attempts_count: number;
  hasGuessedWord: boolean;
  timeToGuess: Date
}