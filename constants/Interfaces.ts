import { User } from "firebase/auth";

export interface ScheduleEntry {
  currentWorkout: string;
  exerciseSets: any[];
  photoUris: string[];
  status?: string;
}

export interface Schedule {
  [date: string]: ScheduleEntry;
}

export interface UserDoc {
  schedule: Schedule;
}

export interface Content {
  contentId: number;
  title: string;
  description: string;
  contentTitles: string[];
}

export interface StepData {
  id: number;
  stepTitle: string;
  content: Content[];
}

export interface SetData {
  kg: string;
  rep: string;
}

export interface DateItem {
  weekday: string;
  date: Date;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export interface CombinedWorkoutDataContextType {
  exerciseSets: {
    [key: number]: SetData[];
  };
  uploadedPhotos: string[];
  userDoc: any;
  stepsData?: StepData[];
  exercises: any[] | undefined;
  loading: boolean;
  error: any;
  currentWorkout: string;
  currentExercises: string[];
  currentWorkoutDescription: string;
  setExerciseSets: (sets: { [key: number]: SetData[] }) => void;
  setUploadedPhotos: (photos: string[]) => void;
}

export interface PhotoEntry {
  uri: string;
  date: string;
}
