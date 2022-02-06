import { useEffect, useState } from "react";
import * as S from "../styled-components";
import { wordleAnswers } from "../wordle-answers";
import { wordleGuesses } from "../wordle-guesses";

export const Create = () => {
  const [author, setAuthor] = useState("");

  const [wordValid, setWordValid] = useState(false);
  const [feedback, setFeedback] = useState("false");

  const [letterOne, setLetterOne] = useState("");
  const [letterTwo, setLetterTwo] = useState("");
  const [letterThree, setLetterThree] = useState("");
  const [letterFour, setLetterFour] = useState("");
  const [letterFive, setLetterFive] = useState("");

  const word = `${letterOne}${letterTwo}${letterThree}${letterFour}${letterFive}`;

  useEffect(() => {
    setWordValid(false);
    setFeedback("");
  }, [word]);

  const createHandler = () => {
    if (
      wordleGuesses.includes(word.toLowerCase()) ||
      wordleAnswers.includes(word.toLowerCase())
    ) {
      setWordValid(true);
      setFeedback("");
    } else {
      setWordValid(false);
      setFeedback("Word not in dictionary");
    }
  };

  const shareHandler = () => {
    const encodedWord = window.btoa(word);
    const shareUrl = `${window.location.origin}?author=${author}&word=${encodedWord}`;
    navigator.clipboard.writeText(shareUrl);
    setFeedback("URL copied to clipboard");
  };

  return (
    <>
      <p>Create your own wordle and send to your friends :)</p>
      <S.TileContainer>
        <S.TypingTile
          id="letter-one"
          type="text"
          maxLength={1}
          value={letterOne}
          autoFocus
          onChange={(e) => {
            const l = e.target.value.toUpperCase();
            setLetterOne(l);
            if (l.length > 0) {
              document.getElementById("letter-two")?.focus();
            }
          }}
        />
        <S.TypingTile
          id="letter-two"
          type="text"
          maxLength={1}
          value={letterTwo}
          onChange={(e) => {
            const l = e.target.value.toUpperCase();
            setLetterTwo(l);
            if (l.length > 0) {
              document.getElementById("letter-three")?.focus();
            }
          }}
        />
        <S.TypingTile
          id="letter-three"
          type="text"
          maxLength={1}
          value={letterThree}
          onChange={(e) => {
            const l = e.target.value.toUpperCase();
            setLetterThree(l);
            if (l.length > 0) {
              document.getElementById("letter-four")?.focus();
            }
          }}
        />
        <S.TypingTile
          id="letter-four"
          type="text"
          maxLength={1}
          value={letterFour}
          onChange={(e) => {
            const l = e.target.value.toUpperCase();
            setLetterFour(l);
            if (l.length > 0) {
              document.getElementById("letter-five")?.focus();
            }
          }}
        />
        <S.TypingTile
          id="letter-five"
          type="text"
          maxLength={1}
          value={letterFive}
          onChange={(e) => {
            const l = e.target.value.toUpperCase();
            setLetterFive(l);
          }}
        />
      </S.TileContainer>
      {!wordValid ? (
        <S.Button onClick={() => createHandler()} disabled={word.length !== 5}>
          Create wordle
        </S.Button>
      ) : (
        <>
          <S.Input
            type="text"
            onChange={(e) => setAuthor(e.target.value.toUpperCase())}
            placeholder="AUTHOR"
          />
          <S.Button onClick={() => shareHandler()} disabled={author.length < 3}>
            Share
          </S.Button>
        </>
      )}
      {feedback && <p>{feedback}</p>}
    </>
  );
};
