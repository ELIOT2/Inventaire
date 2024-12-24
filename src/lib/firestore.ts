import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ProcessedFile } from "../types";

// Save file to Firestore
export const saveFileToFirestore = async (fileName: string, data: any) => {
  await addDoc(collection(db, "uploadedFiles"), {
    name: fileName,
    data: data,
    uploadedAt: new Date().toISOString(),
  });
};

// Fetch all files from Firestore
export const fetchFilesFromFirestore = async (): Promise<ProcessedFile[]> => {
  const querySnapshot = await getDocs(collection(db, "uploadedFiles"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    data: doc.data().data,
  }));
};

// Delete file from Firestore
export const deleteFileFromFirestore = async (id: string) => {
  await deleteDoc(doc(db, "uploadedFiles", id));
};
