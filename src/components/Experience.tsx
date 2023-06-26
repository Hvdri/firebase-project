import { useEffect, useState } from "react";
import { db, auth } from "../config/firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import UpdateElement from "./UpdateElement";

import "./Experience.css";

export const Experience = () => {
  const [dataList, setDataList] = useState<any>([]);

  const [language, setLanguage] = useState<string>("");
  const [years, setYears] = useState<number>(0);

  const [editId, setEditId] = useState<string>("");

  const technologiesCollectionRef = collection(db, "technologies");

  //   OPTIMISTIC METHOD:
  // useEffect(() => {
  //     const getDataList = async () => {
  //       try {
  //         const data = await getDocs(technologiesCollectionRef);
  //         const filteredData = data.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }));
  //         setDataList(filteredData);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };

  //     getDataList();
  //   }, []);

  //   const onSubmit = async () => {
  //     const newData = {
  //       language,
  //       years,
  //       id: Date.now().toString(), // temporary ID
  //     };
  //     setDataList([...dataList, newData]);

  //     try {
  //       await addDoc(technologiesCollectionRef, newData);

  //       const data = await getDocs(technologiesCollectionRef);
  //       const filteredData = data.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setDataList(filteredData);
  //     } catch (err) {
  //       console.error(err);
  //       // Revert the dataList state if there is an error
  //       setDataList(dataList);
  //     }
  //   };
  //   -----------------------------------------------

  // NON-OPTIMISTIC METHOD:
  useEffect(() => {
    const getDataList = async () => {
      try {
        const data = await getDocs(technologiesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDataList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getDataList();
  }, []);

  const onSubmit = async () => {
    try {
      console.log(auth?.currentUser?.uid)
      await addDoc(technologiesCollectionRef, {
        language,
        years,
        userId: auth?.currentUser?.uid,
      });

      const data = await getDocs(technologiesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteData = async (id: any) => {
    try {
      const docRef = doc(db, "technologies", id);
      await deleteDoc(docRef);

      setDataList((prevDataList: any) =>
        prevDataList.filter((data: any) => data.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id: string, updatedData: any) => {
    try {
      const docRef = doc(db, "technologies", id);
      await updateDoc(docRef, updatedData);

      const data = await getDocs(technologiesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDataList(filteredData);
      setEditId(""); // Reset the editId state
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="div-experience">
      <div className="div-add">
        <input
          type="text"
          placeholder="Programming Language or Technology..."
          onChange={(e) => setLanguage(e.target.value)}
        />
        <input
          type="number"
          placeholder="Years..."
          onChange={(e) => setYears(parseInt(e.target.value))}
        />
        <button onClick={onSubmit}>Add</button>
      </div>

      <div className="div-map">
        <div className="div-map-title">
          <h2>Programming Language or Technology</h2>
          <h2>Years</h2>
          <h2></h2>
          <h2></h2>

        </div>
        {dataList.map((data: any) => (
          <div key={data.id} className="div-map-elements">
            {editId === data.id ? (
              <UpdateElement
                data={data}
                onSave={(updatedData: any) =>
                  handleUpdate(data.id, updatedData)
                }
                onCancel={() => setEditId("")}
              />
            ) : (
              <>
                <h2>{data.language}</h2>
                <h2>{data.years}</h2>
                <button onClick={() => deleteData(data.id)}>Delete</button>
                <button onClick={() => setEditId(data.id)}>Update</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
