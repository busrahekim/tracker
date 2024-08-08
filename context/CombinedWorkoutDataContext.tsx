import { useFetchDB } from "@/hooks/useFetchDB";
import { createContext, ReactNode, useState, useMemo, useContext } from "react";

interface SetData {
  kg: string;
  rep: string;
}

interface CombinedWorkoutDataContextType {
  exerciseSets: {
    [key: number]: SetData[];
  };
  uploadedPhotos: string[];
  userDoc: any;
  stepsData: any;
  exercises: any[] | undefined;
  loading: boolean;
  error: any;
  currentWorkout: string;
  currentExercises: string[];
  currentWorkoutDescription: string;
  setExerciseSets: (sets: { [key: number]: SetData[] }) => void;
  setUploadedPhotos: (photos: string[]) => void;
}

export const CombinedWorkoutDataContext =
  createContext<CombinedWorkoutDataContextType>({
    exerciseSets: {},
    uploadedPhotos: [],
    userDoc: null,
    stepsData: null,
    exercises: [],
    loading: true,
    error: null,
    currentWorkout: "",
    currentExercises: [],
    currentWorkoutDescription: "",
    setExerciseSets: () => {},
    setUploadedPhotos: () => {},
  });

export const CombinedWorkoutDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { userDoc, stepsData, exercises, loading, error } = useFetchDB();
  const [exerciseSets, setExerciseSets] = useState<{
    [key: number]: SetData[];
  }>({});
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(
    Array(3).fill("")
  );

  const currentDate = new Date().toISOString().split("T")[0];
  const currentWorkout =
    userDoc?.schedule?.[currentDate] || "No planned workout for today";
  const currentWorkoutDescription =
    exercises?.find((workout) => workout.day === currentWorkout)?.description ||
    [];
  const currentExercises =
    exercises?.find((workout) => workout.day === currentWorkout)?.exercises ||
    [];

  const contextValue = useMemo(
    () => ({
      exerciseSets,
      uploadedPhotos,
      userDoc,
      stepsData,
      exercises,
      loading,
      error,
      currentWorkout,
      currentExercises,
      currentWorkoutDescription,
      setExerciseSets,
      setUploadedPhotos,
    }),
    [
      exerciseSets,
      uploadedPhotos,
      userDoc,
      stepsData,
      exercises,
      loading,
      error,
      currentWorkout,
      currentExercises,
      currentWorkoutDescription,
    ]
  );

  return (
    <CombinedWorkoutDataContext.Provider value={contextValue}>
      {children}
    </CombinedWorkoutDataContext.Provider>
  );
};

export const useCombinedWorkoutData = () =>
  useContext(CombinedWorkoutDataContext);
