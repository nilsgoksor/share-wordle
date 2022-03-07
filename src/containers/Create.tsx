import { useEffect, useState } from "react";
import { Keyboard } from "../components/Keyboard";
import * as S from "../styled-components";
import { wordleAnswers } from "../wordle-answers";
import { wordleGuesses } from "../wordle-guesses";

export const Create = () => {
  const [currKey, setCurrKey] = useState("");
  const [author, setAuthor] = useState("");
  const [word, setWord] = useState("");

  const [validWord, setValidWord] = useState(false);
  const [isShared, setIsShared] = useState(false);

  useEffect(() => {
    const wordExists =
      wordleGuesses.includes(word.toLowerCase()) ||
      wordleAnswers.includes(word.toLowerCase());

    if (word.length === 5 && wordExists) {
      setValidWord(true);
    } else {
      setValidWord(false);
    }
  }, [word]);

  const updateWord = (key: string) => {
    if (key === "BACKSPACE") {
      setWord(word.substring(0, word.length - 1));
    } else {
      setWord(`${word}${key}`);
    }
  };

  const updateAuthor = (key: string) => {
    if (key === "BACKSPACE") {
      setAuthor(author.substring(0, author.length - 1));
    } else {
      setAuthor(`${author}${key}`);
    }
  };

  useEffect(() => {
    if (currKey.length > 0) {
      if (currKey === "ENTER") {
        shareHandler();
      } else {
        if (
          word.length !== 5 ||
          (currKey === "BACKSPACE" && author.length === 0)
        ) {
          updateWord(currKey);
        } else {
          updateAuthor(currKey);
        }
        setIsShared(false);
      }
      setCurrKey("");
    }
  }, [currKey]);

  const shareHandler = () => {
    if (word.length === 5 && author.length >= 3) {
      const encodedWord = window.btoa(word);
      const shareUrl = `${window.location.origin}?author=${author}&word=${encodedWord}`;
      navigator.clipboard.writeText(shareUrl);
      setIsShared(true);
    }
  };

  return (
    <>
      <p>Create a wordle and send to your friends ✍️</p>
      <S.TileContainer>
        {word.split("").map((w, i) => (
          <S.Tile key={i}>{w}</S.Tile>
        ))}
      </S.TileContainer>
      {word.length === 5 && !validWord && <p>Word not in dictionary 🤪</p>}
      {validWord && (
        <div>
          <p>{`from ${author.length > 0 ? author : "who?"}`}</p>
          {author.length > 3 && (
            <S.Button
              onClick={() => shareHandler()}
              disabled={author.length < 3}
              type="submit"
            >
              Share
            </S.Button>
          )}
        </div>
      )}
      {isShared && <p>URL copied to clipboard 💡</p>}
      <S.Footer>
        <Keyboard handleKeyPressed={(k) => setCurrKey(k)} />
      </S.Footer>
    </>
  );
};
