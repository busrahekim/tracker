import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "@/firebaseConfig";
import Steps, { StepData } from "@/constants/Steps";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFirestoreDB = () => {
  const queryClient = useQueryClient();
  //   const [stepsData, setStepsData] = useState<StepData[]>([]);

  const fetchSteps = async (): Promise<StepData[]> => {
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

  const fetchExercisesForDay = async (dayName: string) => {
    const exercisesRef = collection(
      FIRESTORE_DB,
      "workoutPlans",
      "PPL",
      "exercises"
    );
    const exercisesSnapshot = await getDocs(exercisesRef);

    let exercisesForDay: any[] = [];

    exercisesSnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(data);

    //   if (data.day === dayName) {
    //     exercisesForDay = data.exercises;
    //   }
    });

    return exercisesForDay;
  };

  const useExercisesForDay = (dayName: string) => {
    return useQuery({
      queryKey: ["exercisesForDay", dayName],
      queryFn: () => fetchExercisesForDay(dayName),
    });
  };

  const {
    data: steps,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["steps"],
    queryFn: fetchSteps,
  });


  const addSteps = async (newSteps: StepData[]): Promise<void> => {
    const stepsRef = collection(FIRESTORE_DB, "steps");

    for (const step of newSteps) {
      const stepDocRef = doc(stepsRef, `step${step.id}`);

      await setDoc(stepDocRef, {
        id: step.id,
        stepTitle: step.stepTitle,
      });

      const contentRef = collection(stepDocRef, "content");
      for (const content of step.content) {
        await setDoc(doc(contentRef), content);
      }
    }

    console.log("Steps data added to Firestore");
  };

  const mutation = useMutation<void, Error, StepData[]>({
    mutationFn: addSteps,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["steps"],
      }),
  });

  return {
    steps,
    isLoading,
    error,
    addSteps: mutation.mutate,
    useExercisesForDay,
  };


};



// const handleClick = async () => {
//   console.log("clicked");

//   try {
//     const docRef = await addDoc(collection(FIRESTORE_DB, "users"), {
//       first: "Ada",
//       last: "Lovelace",
//       born: 1815,
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };