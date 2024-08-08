import { useFetchDB } from "@/hooks/useFetchDB";
import { createContext, ReactNode, useContext, useMemo } from "react";


//This context handles user data, onboarding steps, exercises, current workout & exercises information, error and loading state.

interface DataContextType {
  userDoc: any;
  stepsData: any;
  exercises: any[] | undefined;
  loading: boolean;
  error: any;
  currentWorkout: string;
  currentExercises: string[];
}

export const DataContext = createContext<DataContextType>({
  userDoc: null,
  stepsData: null,
  exercises: [],
  loading: true,
  error: null,
  currentWorkout: "",
  currentExercises: []

});

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const { userDoc, stepsData, exercises, loading, error } = useFetchDB();

  const currentDate = new Date().toISOString().split("T")[0];
  const currentWorkout =
    userDoc?.schedule?.[currentDate] || "No planned workout for today";

  const currentExercises =
    exercises?.find((workout) => workout.day === currentWorkout)?.exercises ||
    [];

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      userDoc,
      stepsData,
      exercises,
      loading,
      error,
      currentWorkout,
      currentExercises,
    }),
    [exercises, userDoc, loading, currentWorkout, currentExercises]
  );
  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
