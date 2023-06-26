import { useState } from "react";
import { Auth } from "./components/Auth";
import { Experience } from "./components/Experience";
import "./App.css";

export const App = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshExperience = () => {
    setRefresh((prevRefresh) => !prevRefresh);
  };

  return (
    <>
    <div>
      <Auth refreshExperience={refreshExperience} />
    </div>
    
    
    <div>
      <Experience key={refresh ? "refresh" : "no-refresh"} />
    </div>

    


    </>
  );
};
