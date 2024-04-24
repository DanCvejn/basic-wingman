import { useState } from "react";

const word = "snowboard";
const letters = ["qwertzuiop", "asdfghjkl", "yxcvbnm"];

function App() {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessCount, setGuessCount] = useState(0);
  const [guessed, setGuessed] = useState(false);

  const checkGuessed = (newGuessedLetters) => {
    if (word.split("").every((letter) => newGuessedLetters.includes(letter))) {
      setGuessed(true);
    }
  }

  const handleGuess = (letter) => {
    if (guessed) {
      return;
    }
    setGuessCount(guessCount + 1);
    if (guessedLetters.includes(letter)) {
      return;
    }
    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);
    checkGuessed(newGuessedLetters);
  };

  return (
    <>
      <h1>Uhádni slovo</h1>
      <div className="word">
        {word.split("").map((letter, index) => {
          return (
            <div className="letter" key={index}>
              {guessedLetters.includes(letter) ? letter : ""}
            </div>
          )
        })}
      </div>
      <div className="keyboard">
        <div className="row">
          {letters[0].split("").map((letter) => (
            <div
              key={letter}
              className={"key " + ((guessedLetters.includes(letter) && word.includes(letter)) ? "correct" : guessedLetters.includes(letter) ? "wrong" : "")}
              onClick={() => handleGuess(letter)}
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="row">
          {letters[1].split("").map((letter) => (
            <div
              key={letter}
              className={"key " + ((guessedLetters.includes(letter) && word.includes(letter)) ? "correct" : guessedLetters.includes(letter) ? "wrong" : "")}
              onClick={() => handleGuess(letter)}
            >
              {letter}
            </div>
          ))}
        </div>
        <div className="row">
          {letters[2].split("").map((letter) => (
            <div
              key={letter}
              className={"key " + ((guessedLetters.includes(letter) && word.includes(letter)) ? "correct" : guessedLetters.includes(letter) ? "wrong" : "")}
              onClick={() => handleGuess(letter)}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
      {guessed ? (
        <div className="congrats">
          <h2>Gratuluji, uhádl jsi slovo!</h2>
          <p>Tímto získáváš poukaz na snowboardovou školu na Ještědě.</p>
        </div>
      ) : ""
      }
    </>
  )
}

export default App
