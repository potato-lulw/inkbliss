"use client"
import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction } from "react";

// Define the shape of the context state
interface FilesContextState {
  fileList: any[];
  setFileList: Dispatch<SetStateAction<any[]>>;
}

// Create the context with an initial default value
const FilesListContext = createContext<FilesContextState | undefined>(undefined);

// Custom hook to use the FilesListContext
export const useFilesContext = (): FilesContextState => {
  const context = useContext(FilesListContext);
  if (context === undefined) {
    throw new Error("useFilesContext must be used within a FilesContextProvider");
  }
  return context;
};

interface FilesContextProviderProps {
  children: ReactNode;
}

export const FilesContextProvider: React.FC<FilesContextProviderProps> = ({ children }) => {
  const [fileList, setFileList] = useState<any[]>([]);

  return (
    <FilesListContext.Provider value={{ fileList, setFileList }}>
      {children}
    </FilesListContext.Provider>
  );
};
