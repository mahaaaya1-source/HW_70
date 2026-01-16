import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [pageName, setPageName] = useState("home");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadPage = async () => {
      const ref = doc(db, "pages", pageName);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setTitle(snap.data().title);
        setContent(snap.data().content);
      }
    };

    loadPage();
  }, [pageName]);

  const saveHandler = async () => {
    const ref = doc(db, "pages", pageName);
    await updateDoc(ref, { title, content });
    navigate(`/pages/${pageName}`);
  };

  return (
    <div>
      <h2>Edit pages</h2>

      <select value={pageName} onChange={(e) => setPageName(e.target.value)}>
        <option value="home">Home</option>
        <option value="about">About</option>
        <option value="contacts">Contacts</option>
        <option value="divisions">Divisions</option>
      </select>

      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />

      <button onClick={saveHandler}>Save</button>
    </div>
  );
};

export default Admin;
