import { useCombinedWorkoutData } from "@/context/CombinedWorkoutDataContext";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { getAuth, sendEmailVerification, updateEmail as updateAuthEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

const useUpdateUserDoc = () => {
  const { userDoc } = useCombinedWorkoutData();

  const updateUserDoc = async (updatedData: Partial<typeof userDoc>) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      if (updatedData.email && updatedData.email !== user.email) {
        await updateAuthEmail(user, updatedData.email);
        await sendEmailVerification(user);
        Alert.alert("Verify Email", "A verification email has been sent. Please verify your new email address.");
      }

      const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
      await setDoc(userDocRef, updatedData, { merge: true });
    } else {
      throw new Error("No authenticated user found!");
    }
  };

  return { updateUserDoc };
};

export default useUpdateUserDoc;
