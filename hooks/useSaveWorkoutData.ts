import { doc, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";

//TODO:
export const useSaveWorkoutData = () => {
  const { exerciseSets, uploadedPhotos } = useCombinedWorkoutData();

  const saveWorkoutData = async (scheduleDate: string) => {
    const auth = getAuth();
    const user = auth.currentUser;

    console.log("exerciseSets: ", exerciseSets);
    console.log("uploadedPhotos: ", uploadedPhotos);

    // if (user) {
    //   const userDocRef = doc(FIRESTORE_DB, "users", user.uid);

    //   await setDoc(
    //     userDocRef,
    //     {
    //       schedule: {
    //         [scheduleDate]: {
    //           exerciseSets,
    //           photoUris: uploadedPhotos,
    //         },
    //       },
    //     },
    //     { merge: true }
    //   );
    // } else {
    //   throw new Error("No authenticated user found!");
    // }
  };

  return { saveWorkoutData };
};
