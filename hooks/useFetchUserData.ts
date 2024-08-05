import { FIRESTORE_DB } from "@/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const useFetchUserData = () => {
  const fetchUserData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return userDocSnap.data();
      } else {
        throw new Error("No such document!");
      }
    } else {
      throw new Error("No authenticated user found!");
    }
  };

  return useQuery({ queryKey: ["userDoc"], queryFn: fetchUserData });
};
