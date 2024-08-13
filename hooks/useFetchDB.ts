import { useFetchSteps } from "@/hooks/useFetchSteps";
import { useFetchExercises } from "@/hooks/useFetchExercises";
import { useFetchUserData } from "@/hooks/useFetchUserData";

export const useFetchDB = () => {
  const {
    data: stepsData,
    error: stepsError,
    isLoading: stepsLoading,
  } = useFetchSteps();
  const {
    data: exercises,
    error: exercisesError,
    isLoading: exercisesLoading,
  } = useFetchExercises();
  const {
    data: userDoc,
    error: userDocError,
    isLoading: userDocLoading,
    refetch: refetchUserData,
  } = useFetchUserData();

  const loading = stepsLoading || exercisesLoading || userDocLoading;
  const error = stepsError || exercisesError || userDocError;

  return {
    userDoc,
    stepsData,
    exercises,
    loading,
    error,
    refetchUserData
  };
};
