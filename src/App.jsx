import React from "react"
import Die from "./assets/components/Die"
import {nanoid} from "nanoid"

export default function App() {

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

  const [randomDie, setRandomDie] = React.useState(generateAllNewDice)
  
  const dieElements = randomDie.map(dieObject => <Die key={dieObject.id} value={dieObject.value} />)

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