import "./App.css";
import { useFindSharedWord } from "./useFindSharedWord";
import { Create } from "./containers/Create";
import { Play } from "./containers/Play";
import * as S from "./styled-components";

function App() {
  const { word, author } = useFindSharedWord();

  const valid = typeof word === "string" && typeof author === "string";

  return (
    <div className="App">
      <header>
        <S.Title>Custom Wordle</S.Title>
      </header>
      {!valid ? <Create /> : <Play answer={word} author={author} />}
    </div>
  );
}

export default App;
