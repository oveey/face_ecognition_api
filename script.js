import fs from 'fs'

function question1(){
  fs.readFile('./hello.txt', (err, data) => {
    const direction = data.toString()
    const directionToArray = direction.split('')
    const answer = directionToArray.reduce((acc, symbol) => {
      if(symbol === '('){
        return acc += 1
      } else if (symbol === ')'){
        return acc -= 1
      } return acc
    }, 0)
    console.log(answer)
  })
}

// question1()

function question2(){
  fs.readFile('./hello.txt', (err, data) => {
    const direction = data.toString()
    const directionToArray = direction.split('')
    let  accumulator = 0
    let counter = 0 
    const answer = directionToArray.some((symbol) => {
      if(symbol === '('){
         accumulator += 1
      } else if (symbol === ')'){
        accumulator -= 1
      }  counter++
      return accumulator < 0
    })
    console.log(`floor entered at ${counter}`)
})}

question2()

// continue your back-end tomorrow