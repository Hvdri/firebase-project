import { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import "./Auth.css";

interface AuthProps {
  refreshExperience: () => void;
}

export const Auth = ({ refreshExperience }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.uid);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setAuthenticated(true);
      refreshExperience(); // Refresh Experience component
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setAuthenticated(true);
      refreshExperience(); // Refresh Experience component
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setAuthenticated(false);
      refreshExperience(); // Refresh Experience component
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="div-autentificare">
      <input
        type="text"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      {!authenticated && <button onClick={signIn}>Sign In</button>}
      {!authenticated && (
        <button onClick={signInWithGoogle}>Sign In With Google</button>
      )}
      {authenticated && <button onClick={logout}>Sign Out</button>}
    </div>
  );
};
