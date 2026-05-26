export interface WorkoutSet {
  id: string;
  setIndex: number;
  reps: number;
  weight: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  targetMuscles: string[];
  sets: WorkoutSet[];
  defaultSets: number;
  defaultReps: string;
  description: string;
  instructions: string[];
  equipment: string;
}

export interface WorkoutDay {
  id: string;
  dayNumber: number;
  title: string;
  subtitle: string;
  exercises: Exercise[];
}

export interface UserWorkoutHistory {
  date: string; // ISO String
  dayId: string;
  dayTitle: string;
  completedExercisesCount: number;
  totalExercisesCount: number;
  durationMs: number;
}
