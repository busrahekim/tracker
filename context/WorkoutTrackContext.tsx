// import { createContext, ReactNode, useContext, useState } from "react";

// interface WorkoutTrackContextType {
//   exerciseSets: {
//     [key: number]: Array<{ kg: string; rep: string }>;
//   };
//   uploadedPhotos: string[];
// }

// export const WorkoutTrackContext = createContext<WorkoutTrackContextType>({
//   exerciseSets: [],
//   uploadedPhotos: [],
// });

// interface WorkoutTrackProviderProps {
//   children: ReactNode;
// }

// export const WorkoutTrackProvider = ({ children }: WorkoutTrackProviderProps) => {
//   const [exerciseSets, setExerciseSets] = useState<{
//     [key: number]: Array<{ kg: string; rep: string }>;
//   }>({});
//   const [uploadedPhotos, setUploadedPhotos] = useState<[]>([]);
//   return (
//     <WorkoutTrackContext.Provider value={{ exerciseSets, uploadedPhotos }}>
//       {children}
//     </WorkoutTrackContext.Provider>
//   );
// };

// export const useWorkoutTrack = () => useContext(WorkoutTrackContext);

//Manages exercise sets and uploaded photos. This context is specific to tracking workout data
import { createContext, ReactNode, useContext, useState } from "react";

interface SetData {
  kg: string;
  rep: string;
}

interface WorkoutTrackContextType {
  exerciseSets: {
    [key: number]: SetData[];
  };
  uploadedPhotos: string[];
  setExerciseSets: (sets: { [key: number]: SetData[] }) => void;
  setUploadedPhotos: (photos: string[]) => void;
}

export const WorkoutTrackContext = createContext<WorkoutTrackContextType>({
  exerciseSets: {},
  uploadedPhotos: [],
  setExerciseSets: () => {},
  setUploadedPhotos: () => {},
});

interface WorkoutTrackProviderProps {
  children: ReactNode;
}

export const WorkoutTrackProvider = ({
  children,
}: WorkoutTrackProviderProps) => {
  const [exerciseSets, setExerciseSets] = useState<{
    [key: number]: SetData[];
  }>({});
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(
    Array(3).fill("")
  );

  return (
    <WorkoutTrackContext.Provider
      value={{
        exerciseSets,
        uploadedPhotos,
        setExerciseSets,
        setUploadedPhotos,
      }}
    >
      {children}
    </WorkoutTrackContext.Provider>
  );
};

export const useWorkoutTrack = () => useContext(WorkoutTrackContext);
