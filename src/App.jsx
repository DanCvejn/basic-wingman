import { useState } from "react";
import Confetti from 'react-confetti';
import { useWindowSize } from "react-use";

const word = "snowboard";
const letters = ["qwertzuiop", "asdfghjkl", "yxcvbnm"];

function App() {
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessCount, setGuessCount] = useState(0);
  const [remainingLives, setRemainingLives] = useState(5);
  const [guessed, setGuessed] = useState(false);
  const { width, height } = useWindowSize();

  const checkGuessed = (newGuessedLetters) => {
    if (word.split("").every((letter) => newGuessedLetters.includes(letter))) {
      setGuessed(true);
    }
  }

  const resetGame = () => {
    setGuessed(false);
    setGuessedLetters([]);
    setGuessCount(0);
    setRemainingLives(5);
  }

  const handleGuess = (letter) => {
    if (guessed) {
      return;
    }
    setGuessCount(guessCount + 1);
    if (guessedLetters.includes(letter)) {
      return;
    }
    if (!word.includes(letter)) {
      setRemainingLives(remainingLives - 1);
    }
    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);
    checkGuessed(newGuessedLetters);
  };

  return (
    <>
      <h1>Uhádni slovo</h1>
      <div className="lives">
        {Array(remainingLives).fill(0).map((_, i) => {
          return (
            <span key={i}>❤︎</span>
          )
        })}
      </div>
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
          <Confetti width={width} height={height} />
          <h2>Gratuluji, uhádl jsi slovo!</h2>
          <p>Tímto získáváš poukaz na snowboardovou školu na Ještědě.</p>
        </div>
      ) : ""
      }
      {remainingLives === 0 ? (
          <div className="congrats">
            <h2>Bohužel jsi ztratil všechny životy.</h2>
            <p>Můžeš to zkustit znovu.</p>
            <div className="reset" onClick={resetGame}>
              Zkusit znovu
            </div>
          </div>
        ) : ""
      }
    </>
  )
}

export default App
