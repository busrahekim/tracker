import { FIRESTORE_DB } from "@/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

export const useFetchExercises = () => {
  const fetchExercises = async () => {
    const exercisesRef = collection(
      FIRESTORE_DB,
      "workoutPlans",
      "PPL",
      "exercises"
    );
    const exercisesSnapshot = await getDocs(exercisesRef);

    const exercises: any[] = [];
    exercisesSnapshot.forEach((doc) => {
      exercises.push(doc.data());

      //   if (data.day === dayName) {
      //     exercisesForDay = data.exercises;
      //   }
    });
    return exercises;
  };
  return useQuery({
    queryKey: ["exercises"],
    queryFn: fetchExercises,
  });
};
