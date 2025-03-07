import React from "react"
import Die from "./assets/components/Die"

export default function App() {

  function generateAllNewDice() {
    const arrayValue = []
    for (let i = 0; i < 10; i++) {
      arrayValue.push(Math.floor(Math.random() * 6) + 1)
    }
    return arrayValue
  }

  const [randomDie, setRandomDie] = React.useState(generateAllNewDice)
  
  const dieElements = randomDie.map(dieValue => <Die value={dieValue} />)

  function rollDie() {
    setRandomDie(generateAllNewDice)
  }
  return (
    <main>
      <section className = "die-container">
        {dieElements}
      </section>
      <button className="roll" onClick={rollDie}><span>Roll</span></button>
    </main>
  )
}