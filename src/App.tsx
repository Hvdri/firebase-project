import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import { db } from "./config/firebase-config";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [dataList, setDataList] = useState<any>([]);

  const technologiesCollectionRef = collection(db, "technologies");

  useEffect(() => {
    const getDataList = async () => {
      try {
        const data = await getDocs(technologiesCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(filteredData);
        setDataList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getDataList();
  }, []);

  return (
      <div>
        <div>
        <Auth />
        </div>
        <div>

          {dataList.map((data: any) => (
            <h1>{data.html }</h1>
          ))}
        
        </div>
      </div>
  );
}

export default App;
