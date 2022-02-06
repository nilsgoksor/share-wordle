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
        <h1>Wordle</h1>
      </header>
      {!valid ? <Create /> : <Play answer={word} author={author} />}
      <S.Footer>
        {valid && <a href={window.location.origin}>create your own</a>}
      </S.Footer>
    </div>
  );
}

export default App;
