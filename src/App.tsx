import "./App.css";
import { useFindSharedWord } from "./useFindSharedWord";
import { Create } from "./containers/Create";
import { Play } from "./containers/Play";

function App() {
  const { word, author } = useFindSharedWord();

  const valid = typeof word === "string" && typeof author === "string";

  return (
    <div className="App">
      <header>
        <h1>Custom Wordle</h1>
      </header>
      {!valid ? <Create /> : <Play answer={word} author={author} />}
    </div>
  );
}

export default App;
