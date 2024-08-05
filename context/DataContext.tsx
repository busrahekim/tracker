import { useFetchDB } from "@/hooks/useFetchDB";
import { createContext, ReactNode, useContext } from "react";

//wrap layout

interface DataContextType {
  userDoc: any;
  stepsData: any;
  exercises: any;
  loading: boolean;
  error: any;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
  const { userDoc, stepsData, exercises, loading, error } = useFetchDB();
  return (
    <DataContext.Provider
      value={{ userDoc, stepsData, exercises, loading, error }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
