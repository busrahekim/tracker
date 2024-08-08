import { StepData } from "@/constants/Interfaces";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";

export const useFetchSteps = () => {
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

  return useQuery({
    queryKey: ["stepsData"],
    queryFn: fetchSteps,
  });

};
