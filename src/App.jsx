import React from "react"
import Die from "./assets/components/Die"
import {nanoid} from "nanoid"

export default function App() {

  function hold(id) {
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

  const [randomDie, setRandomDie] = React.useState(generateAllNewDice)
  
  const dieElements = randomDie.map(dieObject => <Die key={dieObject.id} id={dieObject.id} value={dieObject.value} isHeld={dieObject.isHeld} hold={hold} />)

  function rollDie() {
    setRandomDie(prevRandomDie => 
      prevRandomDie.map(die => die.isHeld === false ? {...die, value: Math.floor(Math.random() * 6) + 1} : die))
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