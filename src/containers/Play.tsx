import { useEffect, useState } from "react";
import * as S from "../styled-components";
import { wordleAnswers } from "../wordle-answers";
import { wordleGuesses } from "../wordle-guesses";

interface PlayI {
  answer: string;
  author: string;
}
export const Play = ({ answer, author }: PlayI) => {
  const [letterOne, setLetterOne] = useState("");
  const [letterTwo, setLetterTwo] = useState("");
  const [letterThree, setLetterThree] = useState("");
  const [letterFour, setLetterFour] = useState("");
  const [letterFive, setLetterFive] = useState("");

  const [victory, setVictory] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [guesses, setGuesses] = useState<string[]>([]);

  const guess = `${letterOne}${letterTwo}${letterThree}${letterFour}${letterFive}`;

  useEffect(() => {
    !victory && setFeedback("");
  }, [victory, guess]);

  const guessHandler = () => {
    if (
      wordleGuesses.includes(guess.toLowerCase()) ||
      wordleAnswers.includes(guess.toLowerCase())
    ) {
      const updatedGuesses = [...guesses, guess];
      setGuesses(updatedGuesses);
      setLetterOne("");
      setLetterTwo("");
      setLetterThree("");
      setLetterFour("");
      setLetterFive("");
      if (guess === answer) {
        setVictory(true);
        setFeedback(`Well done! Let ${author} know how it went :)`);
      } else if (updatedGuesses.length === 5) {
        setFeedback("Game over... :(");
      } else {
        setFeedback("");
      }
    } else {
      setFeedback("Word not in dictionary :O");
    }
  };

  const isLetterPresent = (l: string): boolean => {
    return answer.includes(l);
  };
  const isLetterCorrect = (l: string, i: number): boolean => {
    const letterIndex = answer.indexOf(l);
    return letterIndex === i;
  };

  const gameFinished = victory || guesses.length === 5;

  return (
    <>
      <p>{`${author} sent you a custom wordle!`}</p>
      {guesses.map((w) => (
        <S.TileContainer key={w}>
          <S.Tile
            present={isLetterPresent(w[0])}
            correct={isLetterCorrect(w[0], 0)}
          >
            {w[0]}
          </S.Tile>
          <S.Tile
            present={isLetterPresent(w[1])}
            correct={isLetterCorrect(w[1], 1)}
          >
            {w[1]}
          </S.Tile>
          <S.Tile
            present={isLetterPresent(w[2])}
            correct={isLetterCorrect(w[2], 2)}
          >
            {w[2]}
          </S.Tile>
          <S.Tile
            present={isLetterPresent(w[3])}
            correct={isLetterCorrect(w[3], 3)}
          >
            {w[3]}
          </S.Tile>
          <S.Tile
            present={isLetterPresent(w[4])}
            correct={isLetterCorrect(w[4], 4)}
          >
            {w[4]}
          </S.Tile>
        </S.TileContainer>
      ))}
      {!gameFinished && (
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
      )}
      {!gameFinished && (
        <S.Button onClick={() => guessHandler()} disabled={guess.length !== 5}>
          Guess
        </S.Button>
      )}
      {feedback && <p>{feedback}</p>}
    </>
  );
};
