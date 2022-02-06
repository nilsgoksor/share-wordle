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
  background-color: ${(p) => p.present && "yellow"};
  background-color: ${(p) => p.correct && "green"};
  color: ${(p) => p.correct && "white"};
`;

export const TypingTile = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  height: 50px;
  width: 50px;
  margin-right: 10px;
  text-align: center;
`;

export const Button = styled.button`
  color: teal;
  background-color: white;
  border: 1px solid teal;
  text-align: center;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.15s;
  height: 40px;
  margin: 10px;
  padding: 10px;

  :disabled {
    opacity: 0.5;
  }

  :hover {
    background-color: teal;
    color: black;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    transform: translateY(-2px);
    cursor: pointer;
  }
`;

export const Input = styled.input`
  color: teal;
  background-color: white;
  border: 1px solid teal;
  text-align: center;
  padding: 10px;
  margin: 10px;
`;
