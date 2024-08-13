import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";

export const useSaveWorkoutData = () => {
  const { exerciseSets, uploadedPhotos, currentExercises } =
    useCombinedWorkoutData();

  const saveWorkoutData = async (
    scheduleDate: string,
    currentWorkout: string
  ) => {
    const auth = getAuth();
    const user = auth.currentUser;

     // to determine if the keys are numeric or exercise names
     const isIndexed = Object.keys(exerciseSets).every(key => !isNaN(Number(key)));

    const namedExerciseSets =  isIndexed
    ? Object.keys(exerciseSets).reduce((acc, key) => {
      const exerciseIndex = Number(key);
      const exerciseName = currentExercises[exerciseIndex];

      if (exerciseName) {
        acc[exerciseName] = exerciseSets[exerciseIndex];
      }

      return acc;
    }, {} as Record<string, Array<{ kg: string; rep: string }>>)
    : exerciseSets;

    if (user) {
      const userDocRef = doc(FIRESTORE_DB, "users", user.uid);

      await setDoc(
        userDocRef,
        {
          schedule: {
            [scheduleDate]: {
              currentWorkout,
              exerciseSets: namedExerciseSets,
              photoUris: uploadedPhotos,
              status: "done",
            },
          },
        },
        { merge: true }
      );
    } else {
      throw new Error("No authenticated user found!");
    }
  };

  return { saveWorkoutData };
};
