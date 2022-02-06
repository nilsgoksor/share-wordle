import { useEffect, useState } from "react";
import queryString from "query-string";

export const useFindSharedWord = () => {
  const [word, setWord] = useState<string | undefined>(undefined);
  const [author, setAuthor] = useState<string | undefined>(undefined);

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    const queryWord = queryParams.word;
    const queryAuthor = queryParams.author;
    if (typeof queryWord === "string" && typeof queryAuthor === "string") {
      const decodedQueryWord = window.atob(queryWord);
      if (decodedQueryWord.length === 5) {
        setWord(decodedQueryWord);
        setAuthor(queryAuthor);
      }
    }
  }, []);

  return { word, author };
};
