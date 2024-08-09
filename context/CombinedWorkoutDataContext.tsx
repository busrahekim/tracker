import {
  CombinedWorkoutDataContextType,
  SetData,
} from "@/constants/Interfaces";
import { useFetchDB } from "@/hooks/useFetchDB";
import { createContext, ReactNode, useState, useMemo, useContext } from "react";

//This context handles user data, onboarding steps, exercises, current workout & exercises information, error and loading state.
//Manages exercise sets and uploaded photos, to track workout data

export const CombinedWorkoutDataContext =
  createContext<CombinedWorkoutDataContextType>({
    exerciseSets: {},
    uploadedPhotos: [],
    userDoc: null,
    stepsData: [],
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
