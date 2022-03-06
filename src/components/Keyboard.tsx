import { useEffect } from "react";
import * as S from "../styled-components";

interface KeyboardI {
  handleKeyPressed(k: string): void;
  isKeyPresent?(k: string): boolean;
  isKeyCorrect?(k: string): boolean;
  isKeyNotPresent?(k: string): boolean;
}

export const Keyboard = ({
  handleKeyPressed,
  isKeyPresent,
  isKeyCorrect,
  isKeyNotPresent,
}: KeyboardI) => {
  const rowOne = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const rowTwo = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const rowThree = ["Z", "X", "C", "V", "B", "N", "M"];

  const downHandler = ({ key }: { key: string }) => {
    const kp = key.toUpperCase();

    if (
      rowOne.includes(kp) ||
      rowTwo.includes(kp) ||
      rowThree.includes(kp) ||
      kp === "ENTER" ||
      kp === "BACKSPACE"
    ) {
      handleKeyPressed(kp);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", downHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []);

  return (
    <S.KeyBoard>
      <S.KeyBoardRow>
        {rowOne.map((key) => (
          <S.Key
            key={key}
            onClick={() => handleKeyPressed(key)}
            present={isKeyPresent && isKeyPresent(key)}
            correct={isKeyCorrect && isKeyCorrect(key)}
            notPresent={isKeyNotPresent && isKeyNotPresent(key)}
          >
            {key}
          </S.Key>
        ))}
      </S.KeyBoardRow>
      <S.KeyBoardRow middleRow>
        {rowTwo.map((key) => (
          <S.Key
            key={key}
            onClick={() => handleKeyPressed(key)}
            present={isKeyPresent && isKeyPresent(key)}
            correct={isKeyCorrect && isKeyCorrect(key)}
            notPresent={isKeyNotPresent && isKeyNotPresent(key)}
          >
            {key}
          </S.Key>
        ))}
      </S.KeyBoardRow>
      <S.KeyBoardRow>
        <S.Key width={60} onClick={() => handleKeyPressed("ENTER")}>
          {"Enter"}
        </S.Key>
        {rowThree.map((key) => (
          <S.Key
            key={key}
            onClick={() => handleKeyPressed(key)}
            present={isKeyPresent && isKeyPresent(key)}
            correct={isKeyCorrect && isKeyCorrect(key)}
            notPresent={isKeyNotPresent && isKeyNotPresent(key)}
          >
            {key}
          </S.Key>
        ))}
        <S.Key onClick={() => handleKeyPressed("BACKSPACE")}>{"<-"}</S.Key>
      </S.KeyBoardRow>
    </S.KeyBoard>
  );
};
