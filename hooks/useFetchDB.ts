import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { StepData } from "@/constants/Steps";
import { useQuery } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";

type UserDoc = {
  [key: string]: any;
};

export const useFetchDB = () => {
  const fetchSteps = async () => {
    const stepsRef = collection(FIRESTORE_DB, "steps");
    const stepsSnapshot = await getDocs(stepsRef);

    const steps = [];

    for (const stepDoc of stepsSnapshot.docs) {
      const stepData = stepDoc.data();
      const contentRef = collection(stepDoc.ref, "content");
      const contentSnapshot = await getDocs(contentRef);

      const contentData = contentSnapshot.docs.map((doc) => doc.data());

      steps.push({ ...stepData, content: contentData });
    }

    return steps as StepData[];
  };

  const fetchExercises = async () => {
    const exercisesRef = collection(
      FIRESTORE_DB,
      "workoutPlans",
      "PPL",
      "exercises"
    );
    const exercisesSnapshot = await getDocs(exercisesRef);

    let exercises: any[] = [];

    exercisesSnapshot.forEach((doc) => {
      exercises.push(doc.data());

      //   if (data.day === dayName) {
      //     exercisesForDay = data.exercises;
      //   }
    });

    return exercises;
  };

  const fetchUserData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userDocRef = doc(FIRESTORE_DB, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        return userDocSnap.data() as UserDoc;
      } else {
        throw new Error("No such document!");
      }
    } else {
      throw new Error("No authenticated user found!");
    }
  };

  const {
    data: stepsData,
    error: stepsError,
    isLoading: stepsLoading,
  } = useQuery({
    queryKey: ["stepsData"],
    queryFn: fetchSteps,
  });

  const {
    data: exercises,
    error: exercisesError,
    isLoading: exercisesLoading,
  } = useQuery({
    queryKey: ["exercises"],
    queryFn: fetchExercises,
  });

  const {
    data: userDoc,
    error: userDocError,
    isLoading: userDocLoading,
  } = useQuery({
    queryKey: ["userDoc"],
    queryFn: fetchUserData,
  });

  const loading = stepsLoading || exercisesLoading || userDocLoading;
  const error = stepsError || exercisesError || userDocError;

  return {
    userDoc,
    stepsData,
    exercises,
    loading,
    error,
  };
};



 // const addSteps = async (newSteps: StepData[]): Promise<void> => {
  //   const stepsRef = collection(FIRESTORE_DB, "steps");

  //   for (const step of newSteps) {
  //     const stepDocRef = doc(stepsRef, `step${step.id}`);

  //     await setDoc(stepDocRef, {
  //       id: step.id,
  //       stepTitle: step.stepTitle,
  //     });

  //     const contentRef = collection(stepDocRef, "content");
  //     for (const content of step.content) {
  //       await setDoc(doc(contentRef), content);
  //     }
  //   }

  // };




// const handleClick = async () => {

//   try {
//     const docRef = await addDoc(collection(FIRESTORE_DB, "users"), {
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815,
//     });
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };