import styled from "styled-components";

export const TileContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

interface TileI {
  present: boolean;
  correct: boolean;
}
export const Tile = styled.div<TileI>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  height: 50px;
  width: 50px;
  margin-right: 10px;
  background-color: ${(p) => p.present && "#FFD639"};
  background-color: ${(p) => p.correct && "#91F5AD"};
`;

export const Button = styled.button`
  font-weight: 700;
  font-size: 18px;
  background-color: #ef9cda;
  color: #bf5f82;
  border: 1px solid #bf5f82;
  font-family: "Share Tech Mono", monospace;
  text-align: center;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.15s;
  margin: 10px;
  padding: 10px;

  :disabled {
    opacity: 0.5;
  }

  :hover {
    color: #ef9cda;
    background-color: #bf5f82;
    box-shadow: 0px 15px 20px #bf5f82;
    transform: translateY(-2px);
    cursor: pointer;
  }
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 1rem;
  width: 95vw;
  max-width: 480px;
`;

export const KeyBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface KeyBoardRowI {
  middleRow?: boolean;
}
export const KeyBoardRow = styled.div<KeyBoardRowI>`
  display: flex;
  justify-content: space-between;
  width: ${(p) => (p.middleRow ? "92%" : "100%")};
  margin-bottom: 0.5rem;
`;

interface KeyI {
  width?: number;
  present?: boolean;
  correct?: boolean;
  notPresent?: boolean;
}
export const Key = styled.button<KeyI>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(p) => (p.width ? `${p.width}px` : "32px")};
  height: 32px;
  font-weight: 700;
  font-size: 18px;
  background-color: #ef9cda;
  background-color: ${(p) => p.present && "#FFD639"};
  background-color: ${(p) => p.correct && "#91F5AD"};
  background-color: ${(p) => p.notPresent && "#BFCBC2"};
  color: #e0479e;
  border: 1px solid #41393d;
  font-family: "Share Tech Mono", monospace;
  cursor: pointer;
`;

interface AI {
  disabled?: boolean;
}

export const A = styled.a<AI>`
  opacity: ${(p) => p.disabled && 0.5};
  cursor: pointer;
`;
