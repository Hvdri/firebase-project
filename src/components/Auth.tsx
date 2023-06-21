import { auth, googleProvider } from "../config/firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const signIn = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    setAuthenticated(true);
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    setAuthenticated(true);
  };

  const logout = async () => {
    await auth.signOut();
    setAuthenticated(false);
  };

  return (
    <div>
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
      {!authenticated && 
        <button onClick={signIn}>Sign In</button>
      }
      {!authenticated && (
        <button onClick={signInWithGoogle}>Sign In With Google</button>
      )}
      {authenticated && <button onClick={logout}>Sign Out</button>}
    </div>
  );
};
