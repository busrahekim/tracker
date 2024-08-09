import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";

export const useSaveWorkoutData = () => {
  const { exerciseSets, uploadedPhotos } = useCombinedWorkoutData();

  const saveWorkoutData = async (scheduleDate: string, currentWorkout: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(FIRESTORE_DB, "users", user.uid);

      await setDoc(
        userDocRef,
        {
          schedule: {
            [scheduleDate]: {
              currentWorkout,
              exerciseSets,
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
