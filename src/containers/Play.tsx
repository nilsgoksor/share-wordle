import { useEffect, useState } from "react";
import { Keyboard } from "../components/Keyboard";
import * as S from "../styled-components";
import { wordleAnswers } from "../wordle-answers";
import { wordleGuesses } from "../wordle-guesses";

interface PlayI {
  answer: string;
  author: string;
}

export const Play = ({ answer, author }: PlayI) => {
  const [currKey, setCurrKey] = useState("");
  const [word, setWord] = useState("");

  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState<string[]>(["", "", "", "", "", ""]);

  const [victory, setVictory] = useState(false);
  const [invalidWord, setInvalidWord] = useState(false);

  const updateWord = (key: string) => {
    if (key === "BACKSPACE") {
      setWord(word.substring(0, word.length - 1));
    } else if (word.length < 5) {
      setWord(`${word}${key}`);
    }
  };

  useEffect(() => {
    if (currKey.length > 0 && !victory) {
      if (currKey === "ENTER") {
        guessHandler();
      } else {
        updateWord(currKey);
        setInvalidWord(false);
      }
      setCurrKey("");
    }
  }, [currKey, victory]);

  useEffect(() => {
    if (guessIndex <= 5) {
      const updatedGuesses = [...guesses];
      updatedGuesses[guessIndex] = word;
      setGuesses(updatedGuesses);
    }
  }, [word]);

  const guessHandler = () => {
    if (guessIndex <= 5 && word.length === 5) {
      if (
        wordleGuesses.includes(word.toLowerCase()) ||
        wordleAnswers.includes(word.toLowerCase())
      ) {
        const updatedGuesses = [...guesses];
        updatedGuesses[guessIndex] = word;

        setGuesses(updatedGuesses);
        setGuessIndex(guessIndex + 1);
        setWord("");
        if (word === answer) {
          setVictory(true);
        }
      } else {
        setInvalidWord(true);
      }
    }
  };

  const isLetterPresent = (l: string): boolean => {
    return answer.includes(l);
  };

  const isLetterCorrect = (l: string, i: number): boolean => {
    return answer[i] === l;
  };

  return (
    <>
      <p>{`${author} sent you a custom wordle!`} 👋</p>
      {guesses.map((w, i) => (
        <S.TileContainer
          id={`${w}${guessIndex}${i}`}
          key={`${w}${guessIndex}${i}`}
        >
          <S.Tile
            present={i < guessIndex && isLetterPresent(w[0])}
            correct={i < guessIndex && isLetterCorrect(w[0], 0)}
          >
            {w[0]}
          </S.Tile>
          <S.Tile
            present={i < guessIndex && isLetterPresent(w[1])}
            correct={i < guessIndex && isLetterCorrect(w[1], 1)}
          >
            {w[1]}
          </S.Tile>
          <S.Tile
            present={i < guessIndex && isLetterPresent(w[2])}
            correct={i < guessIndex && isLetterCorrect(w[2], 2)}
          >
            {w[2]}
          </S.Tile>
          <S.Tile
            present={i < guessIndex && isLetterPresent(w[3])}
            correct={i < guessIndex && isLetterCorrect(w[3], 3)}
          >
            {w[3]}
          </S.Tile>
          <S.Tile
            present={i < guessIndex && isLetterPresent(w[4])}
            correct={i < guessIndex && isLetterCorrect(w[4], 4)}
          >
            {w[4]}
          </S.Tile>
        </S.TileContainer>
      ))}
      {victory ? (
        <>
          <p>Well done! 👏</p>
          <S.Button
            onClick={() => window.open(window.location.origin, "_self")}
          >
            Create your own
          </S.Button>
        </>
      ) : guessIndex <= 5 ? (
        <S.Button onClick={() => guessHandler()} disabled={word.length !== 5}>
          Guess
        </S.Button>
      ) : (
        <p>Game over 🤯</p>
      )}
      {invalidWord && <p>Word not in dictionary 🤪</p>}
      <S.Footer>
        <Keyboard
          handleKeyPressed={(k) => setCurrKey(k)}
          isKeyPresent={(k: string) =>
            typeof [...guesses]
              .splice(0, guessIndex)
              .find((g) => g.includes(k)) !== "undefined"
          }
          isKeyCorrect={(k: string) =>
            typeof [...guesses].splice(0, guessIndex).find((g) => {
              const i = answer.indexOf(k);
              return g[i] === answer[i] && i !== -1;
            }) !== "undefined"
          }
          isKeyNotPresent={(k: string) =>
            typeof [...guesses]
              .splice(0, guessIndex)
              .find((g) => g.includes(k) && answer.indexOf(k) === -1) !==
            "undefined"
          }
        />
      </S.Footer>
    </>
  );
};
