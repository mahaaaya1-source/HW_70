import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import  { db } from "../firebase";

type PageData = {
  title: string;
  content: string;
};

const Page = () => {
  const { pageName } = useParams();
  const [page, setPage] = useState<PageData | null>(null);

  useEffect(() => {
    const loadPage = async () => {
      if (!pageName) return;

      const ref = doc(db, "pages", pageName);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setPage(snap.data() as PageData);
      }
    };

    loadPage();
  }, [pageName]);

  if (!page) return null;

  return (
    <div>
      <h1>{page.title}</h1>
      <p>{page.content}</p>
    </div>
  );
};

export default Page;
