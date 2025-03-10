import React from "react"
import Die from "./assets/components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  React.useEffect(() => {
      function handleResize() {
          setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight
          });
      }

      window.addEventListener("resize", handleResize);

      // Cleanup function to remove event listener
      return () => window.removeEventListener("resize", handleResize);
  }, []);


  const [randomDie, setRandomDie] = React.useState(() => generateAllNewDice()) //lazy state initilization

  const [isGameRunning, setIsGameRunning] = React.useState(false);
  const [time, setTime] = React.useState(0);

  // 🎯 Timer Logic
  React.useEffect(() => {
    let timer;
    if (isGameRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameRunning]);

  const gameWon = randomDie.every(die => die.isHeld) && randomDie.every(die => die.value === randomDie[0].value)

  React.useEffect(() => {
    if (gameWon) {
      setIsGameRunning(false);
    }
  }, [gameWon]);

  function hold(id) {
    if (!isGameRunning) setIsGameRunning(true); // Start timer when first die is held

    setRandomDie(prevRandomDie => 
      prevRandomDie.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die)
    )
  }

  function generateAllNewDice() {
    const arrayValue = []
    for (let i = 0; i < 10; i++) {
      arrayValue.push(Math.floor(Math.random() * 6) + 1)
    }
    const dieObjectArray = arrayValue.map(value => ({
      value: value,
      isHeld: false,
      id: nanoid()
    }))
    
    return dieObjectArray
  }
  
  const dieElements = randomDie.map(dieObject => <Die key={dieObject.id} id={dieObject.id} value={dieObject.value} isHeld={dieObject.isHeld} hold={hold} />)

  function rollDie() {
    if (!gameWon) {
      setRandomDie(prevRandomDie => 
      prevRandomDie.map(die => die.isHeld === false ? {...die, value: Math.floor(Math.random() * 6) + 1} : die))
    } else {
      setRandomDie(generateAllNewDice())
      setTime(0); // Reset timer
      setIsGameRunning(false);
    }
  }

  return (
    <main>
      {gameWon && <Confetti width={windowSize.width} height={windowSize.height}/>}
      <div className="container">
        <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <h2 className="timer">⏳ Time: {time} seconds</h2>
      <section className = "die-container">
        {dieElements}
      </section>
      <button className="roll" onClick={rollDie}><span>{gameWon ? "New Game": "Roll"}</span></button>
      </div>
    </main>  
  )
}