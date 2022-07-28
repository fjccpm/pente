import React from "react";
import Box from "./Box";

function App() {

const ts = 15 //table size

const [table, setTable] = React.useState([]) //table array

const [player, setPlayer] = React.useState(1) //player turn

const [winner, setWinner] = React.useState(-1) //variable to define winner of game

const [scorep1, setScorep1] = React.useState(0) //player 1 score

const [scorep2, setScorep2] = React.useState(0) //player 2 score

const [fiveRow1, setFiveRow1] = React.useState(false) //five in row for player1

const [fiveRow2, setFiveRow2] = React.useState(false) //five in row for player2

const [pente, setPente] = React.useState(false) //pente defines de game has ended.

const [single, setSingle] = React.useState(0) //type of game single or multiplayer

const [plays, setPlays] = React.useState(0) //counter of plays in a game.

const [rules, setRules] = React.useState(false)

//effect for initializing game
React.useEffect(
  () => {
    initializeGame()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []
)

//if player1 reaches 5 pair captures sets the winner
React.useEffect(
  () => {
    if(scorep1===5)
      setWinner(1)
  }, [scorep1]
)
 //if player2 reaches 5 pair captures sets the winner
React.useEffect(
  () => {
    if(scorep2===5)
      setWinner(2)
  }, [scorep2]
)

//if player1 makes five in a row sets the winner
React.useEffect(
  () => {
    if(fiveRow1)
      setWinner(1)
  }, [fiveRow1]
)

//if player2 makes five in a row sets the winner
React.useEffect(
  () => {
    if(fiveRow2)
      setWinner(2)
  }, [fiveRow2]
)

//if mode is set to multiplayer and is player2 turn, autoplay is run.
React.useEffect(
  () => {
    setPlays(prev => prev+1)
    console.log("actual player: " + player + " no. plays: " + plays)
    if(single===1 && player===2 && winner===-1)
    {
      robotPlay()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]
)

React.useEffect(
  () => {
    setPlays(0)
  }, [single]
)


//if the game is ended the game is restarted.
React.useEffect(
  () => {
    if(pente)
      initializeGame()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pente]
)

//game initialization function
function initializeGame() {
  if(table.length===0 || pente)
  {
      let temp=[]
      for(let i=0; i<ts; i++)
        for(let j=0; j<ts; j++)
      { 
      //console.log(i)
        temp = [...temp, 
            {
              id: ""+i+"-"+j,
              x: j,
              y: i,
              value: 0
            }]
      }
      setTable(temp)
      setWinner(-1)
      setScorep1(0)
      setScorep1(0)
      setFiveRow1(false)
      setFiveRow2(false)
      setPente(false)
      setSingle(0)
      setPlayer(1)
      setPlays(0)
      setRules(false)
      //console.log("ends up initialization, plays: " + plays)
  }
}

//returns value in position x,y of the game table.
function getValue(x, y) {
  return table.find(
    eachBlock => (eachBlock.x===x && eachBlock.y===y)
  ).value
}

//sets value in position x,y in game table.
function setValue(x, y, newValue) {
  setTable(
    prev => (
      prev.map(
        eachBlock => (eachBlock.x===x && eachBlock.y===y) ?
          {...eachBlock, value: newValue} : eachBlock
        )
    )
  )
}

//returns the player that is not playing in this turn.
function otherPlayer() {
  if(player===1)
    return 2
  else
    return 1
}

//check for pair captures after each play.
function checkPair(x,y, actualPlayer) {
  //cheching pair captures horizontally
  if(x>2 && getValue(x-1,y)===otherPlayer() 
         && getValue(x-2,y)===otherPlayer() 
        && getValue(x-3,y)===actualPlayer)
  {
    actualPlayer===1 ? setScorep1(prev => (prev+1)) : setScorep2(prev => (prev+1))
    setValue(x-1,y,0)
    setValue(x-2,y,0)
  }
  if(x<ts-3 && getValue(x+1,y)===otherPlayer() 
         && getValue(x+2,y)===otherPlayer() 
        && getValue(x+3,y)===actualPlayer)
  {
    actualPlayer===1 ? setScorep1(prev => (prev+1)) : setScorep2(prev => (prev+1))
    setValue(x+1,y,0)
    setValue(x+2,y,0)
  }
  
  //checking pair captures vertically
  if(y>2 && getValue(x,y-1)===otherPlayer() 
         && getValue(x,y-2)===otherPlayer() 
        && getValue(x,y-3)===actualPlayer)
  {
    actualPlayer===1 ? setScorep1(prev => (prev+1)) : setScorep2(prev => (prev+1))
    setValue(x,y-1,0)
    setValue(x,y-2,0)
  }
  if(y<ts-3 && getValue(x,y+1)===otherPlayer() 
         && getValue(x,y+2)===otherPlayer() 
        && getValue(x,y+3)===actualPlayer)
  {
    actualPlayer===1 ? setScorep1(prev => (prev+1)) : setScorep2(prev => (prev+1))
    setValue(x,y+1,0)
    setValue(x,y+2,0)
  }

  //checking pair captures diagonally
  if(x>2 && y>2 && getValue(x-1,y-1)===otherPlayer() 
         && getValue(x-2,y-2)===otherPlayer() 
        && getValue(x-3,y-3)===actualPlayer)
  {
    actualPlayer===1 ? setScorep1(prev => (prev+1)) : setScorep2(prev => (prev+1))
    setValue(x-1,y-1,0)
    setValue(x-2,y-2,0)
  }
  if(x<ts-3 && y<ts-3 && getValue(x+1,y+1)===otherPlayer() 
         && getValue(x+2,y+2)===otherPlayer() 
        && getValue(x+3,y+3)===actualPlayer)
  {
    actualPlayer===1 ? setScorep1(prev => (prev+1)) : setScorep2(prev => (prev+1))
    setValue(x+1,y+1,0)
    setValue(x+2,y+2,0)
  }
  if(x>2 && y<ts-3 && getValue(x-1,y+1)===otherPlayer() 
         && getValue(x-2,y+2)===otherPlayer() 
        && getValue(x-3,y+3)===actualPlayer)
  {
    actualPlayer===1 ? setScorep1(prev => (prev+1)) : setScorep2(prev => (prev+1))
    setValue(x-1,y+1,0)
    setValue(x-2,y+2,0)
  }
  if(x<ts-3 && y>2 && getValue(x+1,y-1)===otherPlayer() 
         && getValue(x+2,y-2)===otherPlayer() 
        && getValue(x+3,y-3)===actualPlayer)
  {
    actualPlayer===1 ? setScorep1(prev => (prev+1)) : setScorep2(prev => (prev+1))
    setValue(x+1,y-1,0)
    setValue(x+2,y-2,0)
  }
}

//checks for five in a row after each play.
function checkFiveRow(x,y, actualPlayer) {
  //cheching five in a row horizontally
  var counter=1;
  var i=x-1;
  var j=0;
  while(i>=0 && getValue(i,y)===actualPlayer)
  {
      counter++;
      i--;
  }
  i=x+1;
  while(i<ts && getValue(i,y)===actualPlayer)
  {
      counter++;
      i++;
  }
  if(counter>=5 && actualPlayer===1)
  {
    setFiveRow1(true)
  }
  if(counter>=5 && actualPlayer===2)
  {
    setFiveRow2(true)
  }
 
  //cheching five in a row vertically
  counter=1;
  i=y-1;
  while(i>=0 && getValue(x,i)===actualPlayer)
  {
      counter++;
      i--;
  }
  i=y+1;
  while(i<ts && getValue(x,i)===actualPlayer)
  {
      counter++;
      i++;
  }
  if(counter>=5 && actualPlayer===1)
  {
    setFiveRow1(true)
  }
  if(counter>=5 && actualPlayer===2)
  {
    setFiveRow2(true)
  }

  //cheching five in a row diagonal 1
  counter=1;
  i=x-1;
  j=y-1;
  while(i>=0 && j>=0 && getValue(i,j)===actualPlayer)
  {
      counter++;
      i--;
      j--;
  }
  i=x+1;
  j=y+1;
  while(i<ts && j<ts && getValue(i,j)===actualPlayer)
  {
      counter++;
      i++;
      j++;
  }
  if(counter>=5 && actualPlayer===1)
  {
    setFiveRow1(true)
  }
  if(counter>=5 && actualPlayer===2)
  {
    setFiveRow2(true)
  }

  //cheching five in a row diagonal 2
  counter=1;
  i=x-1;
  j=y+1;
  while(i>=0 && j<ts && getValue(i,j)===actualPlayer)
  {
      counter++;
      i--;
      j++;
  }
  i=x+1;
  j=y-1;
  while(i<ts && j>=0 && getValue(i,j)===actualPlayer)
  {
      counter++;
      i++;
      j--;
  }
  if(counter>=5 && actualPlayer===1)
  {
    setFiveRow1(true)
  }
  if(counter>=5 && actualPlayer===2)
  {
    setFiveRow2(true)
  }
}

//returns a random int between 0 and max input.
function getRandomInt(max) {
  return Math.floor(Math.random() * max)+1;
}


//check condition to continue for loops in random direction mode.
function continueR(step, ends) {
  if(ends===0 && step===0)
    return false
  else if(ends===ts && step===ts-1)
    return false
  else
    return true
}


//function with the logic for bot player in single mode
function robotPlay()
{
  let actualPlayer=player;
  
  //random direction generation for loops
  let randomD = getRandomInt(2)
  let iStart=0
  let iEnds=ts
  let iIncrement=1
  let jStart=0
  let jEnds=ts
  let jIncrement=1
  if(randomD===1)
  {
    iStart=0
    iEnds=ts
    iIncrement=1
  }
  else
  {
    iStart=ts-1
    iEnds=0
    iIncrement=-1
  }

  randomD = getRandomInt(2)
  if(randomD===1)
  {
    jStart=0
    jEnds=ts
    jIncrement=1
  }
  else
  {
    jStart=ts-1
    jEnds=0
    jIncrement=-1
  }
  //first play - only one token on the table.
  for(let i=iStart; continueR(i,iEnds); i=i+iIncrement)
    for(let j=jStart; continueR(j,jEnds); j=j+jIncrement)
    {
      if(getValue(i,j)===1 && actualPlayer===2 && plays===0)
      {
        let randomN = getRandomInt(8)
        let x=0;
        let y=0;
        if(randomN===1 && j>1) {
          y=y-2;
        }
        if(randomN===2 && i<ts-2 && j>1) {
          x=x+2;
          y=y-2;
        }
        if(randomN===3 && i<ts-2) {
          x=x+2;
        }
        if(randomN===4 && i<ts-2 && j<ts-2) {
          x=x+2;
          y=y+2;
        }
        if(randomN===5 && j<ts-2) {
          y=y+2;
        }
        if(randomN===6 && i>1 && j<ts-2) {
          x=x-2;
          y=y+2;
        }
        if(randomN===7 && i>1) {
          x=x-2;
        }
        if(randomN===8 && i>1 && j>1) {
          x=x-2;
          y=y-2;
        }
        
        let maxTries=0;
        while(getValue(i+x,j+y)!==0 && maxTries<20 && plays===0)
        {
          randomN = getRandomInt(8)
          maxTries++
          x=0
          y=0
          if(randomN===1 && j>1) {
            y=y-2
          }
          if(randomN===2 && i<ts-2 && j>1) {
            x=x+2
            y=y-2
          }
          if(randomN===3 && i<ts-2) {
            x=x+2
          }
          if(randomN===4 && i<ts-2 && j<ts-2) {
            x=x+2
            y=y+2
          }
          if(randomN===5 && j<ts-2) {
            y=y+2
          }
          if(randomN===6 && i>1 && j<ts-2) {
            x=x-2
            y=y+2
          }
          if(randomN===7 && i>1) {
            x=x-2
          }
          if(randomN===8 && i>1 && j>1) {
            x=x-2
            y=y-2
          }
        }
        setValue(i+x, j+y, 2)
        actualPlayer=1
        setPlayer(1)
        return
      }
    }

  //try to do 5 in a row (call pente to win)
  for(let i=iStart; continueR(i,iEnds); i=i+iIncrement)
    for(let j=jStart; continueR(j,jEnds); j=j+jIncrement)
    {
      if(getValue(i,j)===0)
      {
        let count=0
        let pos=1
        while(pos<5 && j-pos>=0 && getValue(i,j-pos)===2)
        {
          count++;
          pos++;
        }
        pos=1
        while(pos<5 && j+pos<ts && getValue(i,j+pos)===2)
        {
          count++;
          pos++;
        }
        if(count>=4)
        {
          setValue(i, j, 2)
          actualPlayer=1
          checkPair(i, j, 2);
          checkFiveRow(i, j, 2);      
          setPlayer(1)
          return
        }
        
        count=0
        pos=1
        while(pos<5 && i+pos<ts && j-pos>=0 && getValue(i+pos,j-pos)===2)
        {
          count++;
          pos++;
        }
        pos=1
        while(pos<5 && i-pos>=0 && j+pos<ts && getValue(i-pos,j+pos)===2)
        {
          count++;
          pos++;
        }
        if(count>=4)
        {
          setValue(i, j, 2)
          actualPlayer=1
          checkPair(i, j, 2);
          checkFiveRow(i, j, 2);
          setPlayer(1)
          return
        }
        
        count=0
        pos=1
        while(pos<5 && i+pos<ts && getValue(i+pos,j)===2)
        {
          count++;
          pos++;
        }
        pos=1
        while(pos<5 && i-pos>=0 && getValue(i-pos,j)===2)
        {
          count++;
          pos++;
        }
        if(count>=4)
        {
          setValue(i, j, 2)
          actualPlayer=1
          checkPair(i, j, 2);
          checkFiveRow(i, j, 2);
          setPlayer(1)
          return
        }

        count=0
        pos=1
        while(pos<5 && i+pos<ts && j+pos<ts && getValue(i+pos,j+pos)===2)
        {
          count++;
          pos++;
        }
        pos=1
        while(pos<5 && i-pos>=0 && j-pos>=0 && getValue(i-pos,j-pos)===2)
        {
          count++;
          pos++;
        }
        if(count>=4)
        {
          setValue(i, j, 2)
          actualPlayer=1
          checkPair(i, j, 2);
          checkFiveRow(i, j, 2);
          setPlayer(1)
          return
        }
        
      }
    
    }

    //try to do 4 in a row (call pente to win)
  for(let i=iStart; continueR(i,iEnds); i=i+iIncrement)
  for(let j=jStart; continueR(j,jEnds); j=j+jIncrement)
  {
    if(getValue(i,j)===0)
    {
      let count=0
      let pos=1
      while(pos<5 && j-pos>=0 && getValue(i,j-pos)===2)
      {
        count++
        pos++
      }
      if(j-pos>=0 && getValue(i,j-pos)===1)
        count--
      pos=1
      while(pos<5 && j+pos<ts && getValue(i,j+pos)===2)
      {
        count++
        pos++
      }
      if(j+pos<ts && getValue(i,j+pos)===1)
        count--
      if(count>=3)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2);
        checkFiveRow(i, j, 2);
        setPlayer(1)
        return
      }
      
      count=0
      pos=1
      while(pos<5 && i+pos<ts && j-pos>=0 && getValue(i+pos,j-pos)===2)
      {
        count++
        pos++
      }
      if(i+pos<ts && j-pos>=0 && getValue(i+pos,j-pos)===1)
        count--
      pos=1
      while(pos<5 && i-pos>=0 && j+pos<ts && getValue(i-pos,j+pos)===2)
      {
        count++
        pos++
      }
      if(i-pos>=0 && j+pos<ts && getValue(i-pos,j+pos)===1)
        count--
      if(count>=3)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2);
        checkFiveRow(i, j, 2);
        setPlayer(1)
        return
      }
      
      count=0
      pos=1
      while(pos<5 && i+pos<ts && getValue(i+pos,j)===2)
      {
        count++
        pos++
      }
      if(i+pos<ts && getValue(i+pos,j)===1)
        count--
      pos=1
      while(pos<5 && i-pos>=0 && getValue(i-pos,j)===2)
      {
        count++
        pos++
      }
      if(i-pos>=0 && getValue(i-pos,j)===1)
        count--
      if(count>=3)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2);
        checkFiveRow(i, j, 2);
        setPlayer(1)
        return
      }

      count=0
      pos=1
      while(pos<5 && i+pos<ts && j+pos<ts && getValue(i+pos,j+pos)===2)
      {
        count++
        pos++
      }
      if(i+pos<ts && j+pos<ts && getValue(i+pos,j+pos)===1)
        count--
      pos=1
      while(pos<5 && i-pos>=0 && j-pos>=0 && getValue(i-pos,j-pos)===2)
      {
        count++
        pos++
      }
      if(i-pos>=0 && j-pos>=0 && getValue(i-pos,j-pos)===1)
        count--
      if(count>=3)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2);
        checkFiveRow(i, j, 2);
        setPlayer(1)
        return
      }
      
    }
  
  }

//block four in a row
for(let i=iStart; continueR(i,iEnds); i=i+iIncrement)
  for(let j=jStart; continueR(j,jEnds); j=j+jIncrement)
  {
    if(getValue(i,j)===0)
    {
      let count=0
      let pos=1
      while(pos<5 && j-pos>=0 && getValue(i,j-pos)===1)
      {
        count++;
        pos++;
      }
      pos=1
      while(pos<5 && j+pos<ts && getValue(i,j+pos)===1)
      {
        count++;
        pos++;
      }
      if(count>=3)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2)
        checkFiveRow(i, j, 2)
        setPlayer(1)
        return
      }
      
      count=0
      pos=1
      while(pos<5 && i+pos<ts && j-pos>=0 && getValue(i+pos,j-pos)===1)
      {
        count++;
        pos++;
      }
      pos=1
      while(pos<5 && i-pos>=0 && j+pos<ts && getValue(i-pos,j+pos)===1)
      {
        count++;
        pos++;
      }
      if(count>=3)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2)
        checkFiveRow(i, j, 2)
        setPlayer(1)
        return
      }
      
      count=0
      pos=1
      while(pos<5 && i+pos<ts && getValue(i+pos,j)===1)
      {
        count++;
        pos++;
      }
      pos=1
      while(pos<5 && i-pos>=0 && getValue(i-pos,j)===1)
      {
        count++;
        pos++;
      }
      if(count>=3)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2)
        checkFiveRow(i, j, 2)
        setPlayer(1)
        return
      }

      count=0
      pos=1
      while(pos<5 && i+pos<ts && j+pos<ts && getValue(i+pos,j+pos)===1)
      {
        count++;
        pos++;
      }
      pos=1
      while(pos<5 && i-pos>=0 && j-pos>=0 && getValue(i-pos,j-pos)===1)
      {
        count++;
        pos++;
      }
      if(count>=3)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2)
        checkFiveRow(i, j, 2)
        setPlayer(1)
        return
      }
      
    }

  }


  //block three in row
  for(let i=iStart; continueR(i,iEnds); i=i+iIncrement)
    for(let j=jStart; continueR(j,jEnds); j=j+jIncrement)
    {
      if(getValue(i,j)===1 && actualPlayer===2 && plays>0 && j-3>=0 && j+1<ts
        && getValue(i,j-1)===1
        && getValue(i,j-2)===1
        && getValue(i,j-3)!==2
        && getValue(i,j+1)===0
        )
      {
          setValue(i, j+1, 2)
          actualPlayer=1
          checkPair(i, j+1, 2)
          checkFiveRow(i, j+1, 2)
          setPlayer(1)
          return
      }
      if(getValue(i,j)===1 && actualPlayer===2 && plays>0 && j-3>=0 && j+1<ts && i+3<ts && i-1>=0
        && getValue(i+1,j-1)===1
        && getValue(i+2,j-2)===1
        && getValue(i+3,j-3)!==2
        && getValue(i-1,j+1)===0
        )
      {
          setValue(i-1, j+1, 2)
          actualPlayer=1
          checkPair(i-1, j+1, 2)
          checkFiveRow(i-1, j+1, 2)
          setPlayer(1)
          return
      }
      if(getValue(i,j)===1 && actualPlayer===2 && plays>0 && i+3<ts && i-1>=0
        && getValue(i+1,j)===1
        && getValue(i+2,j)===1
        && getValue(i+3,j)!==2
        && getValue(i-1,j)===0
        )
      {
          setValue(i-1, j, 2)
          actualPlayer=1
          checkPair(i-1, j, 2)
          checkFiveRow(i-1, j, 2)
          setPlayer(1)
          return
      }
      if(getValue(i,j)===1 && actualPlayer===2 && plays>0 && i+3<ts && i-1>=0 && j+3<ts && j-1>=0
        && getValue(i+1,j+1)===1
        && getValue(i+2,j+2)===1
        && getValue(i+3,j+3)!==2
        && getValue(i-1,j-1)===0
        )
      {
          setValue(i-1, j-1, 2)
          actualPlayer=1
          checkPair(i-1, j-1, 2)
          checkFiveRow(i-1, j-1, 2)
          setPlayer(1)
          return
      }
      if(getValue(i,j)===1 && actualPlayer===2 && plays>0 && j+3<ts && j-1>=0
        && getValue(i,j+1)===1
        && getValue(i,j+2)===1
        && getValue(i,j+3)!==2
        && getValue(i,j-1)===0
        )
      {
          setValue(i, j-1, 2)
          actualPlayer=1
          checkPair(i, j-1, 2)
          checkFiveRow(i, j-1, 2)
          setPlayer(1)
          return
      }
      if(getValue(i,j)===1 && actualPlayer===2 && plays>0 && j+3<ts && j-1>=0 && i-3>=0 && i+1<ts
        && getValue(i-1,j+1)===1
        && getValue(i-2,j+2)===1
        && getValue(i-3,j+3)!==2
        && getValue(i+1,j-1)===0
        )
      {
          setValue(i+1, j-1, 2)
          actualPlayer=1
          checkPair(i+1, j-1, 2)
          checkFiveRow(i+1, j-1, 2)
          setPlayer(1)
          return
      }
      if(getValue(i,j)===1 && actualPlayer===2 && plays>0 && i-3>=0 && i+1<ts
        && getValue(i-1,j)===1
        && getValue(i-2,j)===1
        && getValue(i-3,j)!==2
        && getValue(i+1,j)===0
        )
      {
          setValue(i+1, j, 2)
          actualPlayer=1
          checkPair(i+1, j, 2)
          checkFiveRow(i+1, j, 2)
          setPlayer(1)
          return
      }
      if(getValue(i,j)===1 && actualPlayer===2 && plays>0 && i-3>=0 && i+1<ts && j-3>=0 && j+1<ts
        && getValue(i-1,j-1)===1
        && getValue(i-2,j-2)===1
        && getValue(i-3,j-3)!==2
        && getValue(i+1,j+1)===0
        )
      {
          setValue(i+1, j+1, 2)
          actualPlayer=1
          checkPair(i+1, j+1, 2)
          checkFiveRow(i+1, j+1, 2)
          setPlayer(1)
          return
      }
    }

  

  //block multiple five in a row options
  for(let i=iStart; continueR(i,iEnds); i=i+iIncrement)
    for(let j=jStart; continueR(j,jEnds); j=j+jIncrement)
    {
      if(getValue(i,j)===0)
      {
        let penteCount=0
        let count=0
        let pos=1
        while(pos<4 && j-pos>=0)
        {
          if(getValue(i,j-pos)===1) {
            count++;
          }
          if(getValue(i,j-pos)===2) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++
        
        count=0
        pos=1
        while(pos<4 && i+pos<ts && j-pos>=0)
        {
          if(getValue(i+pos,j-pos)===1) {
            count++;
          }
          if(getValue(i+pos,j-pos)===2) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++

        count=0
        pos=1
        while(pos<4 && i+pos<ts)
        {
          if(getValue(i+pos,j)===1) {
            count++;
          }
          if(getValue(i+pos,j)===2) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++
  
        count=0
        pos=1
        while(pos<4 && i+pos<ts && j+pos<ts)
        {
          if(getValue(i+pos,j+pos)===1) {
            count++;
          }
          if(getValue(i+pos,j+pos)===2) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++

        count=0
        pos=1
        while(pos<4 && j+pos<ts)
        {
          if(getValue(i,j+pos)===1) {
            count++;
          }
          if(getValue(i,j+pos)===2) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++

        count=0
        pos=1
        while(pos<4 && i-pos>=0 && j+pos<ts)
        {
          if(getValue(i-pos,j+pos)===1) {
            count++;
          }
          if(getValue(i-pos,j+pos)===2) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++
  
        count=0
        pos=1
        while(pos<4 && i-pos>=0)
        {
          if(getValue(i-pos,j)===1) {
            count++;
          }
          if(getValue(i-pos,j)===2) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++

        count=0
        pos=1
        while(pos<4 && i-pos>=0 && j-pos>=0)
        {
          if(getValue(i-pos,j-pos)===1) {
            count++;
          }
          if(getValue(i-pos,j-pos)===2) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++
  

        if(penteCount>=2)
        {
          setValue(i, j, 2)
          actualPlayer=1
          checkPair(i, j, 2)
          checkFiveRow(i, j, 2)
          setPlayer(1)
          return
        }
      }
    
    }

//capture pair
for(let i=iStart; continueR(i,iEnds); i=i+iIncrement)
  for(let j=jStart; continueR(j,jEnds); j=j+jIncrement)
  {
    if(getValue(i,j)===0)
    {
      if(j-3>=0 && getValue(i,j-1)===1 
                && getValue(i,j-2)===1 
                && getValue(i,j-3)===2)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2)
        checkFiveRow(i, j, 2)
        setPlayer(1)
        return
      }
      
      if(i+3<ts && j-3>=0 && getValue(i+1,j-1)===1 
                && getValue(i+2,j-2)===1 
                && getValue(i+3,j-3)===2)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2)
        checkFiveRow(i, j, 2)
        setPlayer(1)
        return
      }
      
      if(i+3<ts && getValue(i+1,j)===1 
                && getValue(i+2,j)===1 
                && getValue(i+3,j)===2)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2)
        checkFiveRow(i, j, 2)
        setPlayer(1)
        return
      }

      if(i+3<ts && j+3<ts && getValue(i+1,j+1)===1 
                && getValue(i+2,j+2)===1 
                && getValue(i+3,j+3)===2)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2)
        checkFiveRow(i, j, 2)
        setPlayer(1)
        return
      }
      
      if(j+3<ts && getValue(i,j+1)===1 
                && getValue(i,j+2)===1 
                && getValue(i,j+3)===2)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2)
        checkFiveRow(i, j, 2)
        setPlayer(1)
        return
      }
      
      if(i-3>=0 && j+3<ts && getValue(i-1,j+1)===1 
                && getValue(i-2,j+2)===1 
                && getValue(i-3,j+3)===2)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2)
        checkFiveRow(i, j, 2)
        setPlayer(1)
        return
      }
      
      if(i-3>=0 && getValue(i-1,j)===1 
                && getValue(i-2,j)===1 
                && getValue(i-3,j)===2)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2)
        checkFiveRow(i, j, 2)
        setPlayer(1)
        return
      }
      
      if(i-3>=0 && j-3>=0 && getValue(i-1,j-1)===1 
                && getValue(i-2,j-2)===1 
                && getValue(i-3,j-3)===2)
      {
        setValue(i, j, 2)
        actualPlayer=1
        checkPair(i, j, 2)
        checkFiveRow(i, j, 2)
        setPlayer(1)
        return
      }
    }

  }

  //try capture pair
for(let i=iStart; continueR(i,iEnds); i=i+iIncrement)
for(let j=jStart; continueR(j,jEnds); j=j+jIncrement)
{
  if(getValue(i,j)===0)
  {
    if(j-3>=0 && getValue(i,j-1)===1 
              && getValue(i,j-2)===1 
              && getValue(i,j-3) in [2,0])
    {
      setValue(i, j, 2)
      actualPlayer=1
      checkPair(i, j, 2)
      checkFiveRow(i, j, 2)
      setPlayer(1)
      return
    }
    
    if(i+3<ts && j-3>=0 && getValue(i+1,j-1)===1 
              && getValue(i+2,j-2)===1 
              && getValue(i+3,j-3)===0)
    {
      setValue(i, j, 2)
      actualPlayer=1
      checkPair(i, j, 2)
      checkFiveRow(i, j, 2)
      setPlayer(1)
      return
    }
    
    if(i+3<ts && getValue(i+1,j)===1 
              && getValue(i+2,j)===1 
              && getValue(i+3,j)===0)
    {
      setValue(i, j, 2)
      actualPlayer=1
      checkPair(i, j, 2)
      checkFiveRow(i, j, 2)
      setPlayer(1)
      return
    }

    if(i+3<ts && j+3<ts && getValue(i+1,j+1)===1 
              && getValue(i+2,j+2)===1 
              && getValue(i+3,j+3)===0)
    {
      setValue(i, j, 2)
      actualPlayer=1
      checkPair(i, j, 2)
      checkFiveRow(i, j, 2)
      setPlayer(1)
      return
    }
    
    if(j+3<ts && getValue(i,j+1)===1 
              && getValue(i,j+2)===1 
              && getValue(i,j+3)===0)
    {
      setValue(i, j, 2)
      actualPlayer=1
      checkPair(i, j, 2)
      checkFiveRow(i, j, 2)
      setPlayer(1)
      return
    }
    
    if(i-3>=0 && j+3<ts && getValue(i-1,j+1)===1 
              && getValue(i-2,j+2)===1 
              && getValue(i-3,j+3)===0)
    {
      setValue(i, j, 2)
      actualPlayer=1
      checkPair(i, j, 2)
      checkFiveRow(i, j, 2)
      setPlayer(1)
      return
    }
    
    if(i-3>=0 && getValue(i-1,j)===1 
              && getValue(i-2,j)===1 
              && getValue(i-3,j)===0)
    {
      setValue(i, j, 2)
      actualPlayer=1
      checkPair(i, j, 2)
      checkFiveRow(i, j, 2)
      setPlayer(1)
      return
    }
    
    if(i-3>=0 && j-3>=0 && getValue(i-1,j-1)===1 
              && getValue(i-2,j-2)===1 
              && getValue(i-3,j-3)===0)
    {
      setValue(i, j, 2)
      actualPlayer=1
      checkPair(i, j, 2)
      checkFiveRow(i, j, 2)
      setPlayer(1)
      return
    }
  }

}


  //try making multiple five in a row options
  for(let i=iStart; continueR(i,iEnds); i=i+iIncrement)
    for(let j=jStart; continueR(j,jEnds); j=j+jIncrement)
    {
      if(getValue(i,j)===0)
      {
        let penteCount=0
        let count=0
        let pos=1
        while(pos<4 && j-pos>=0)
        {
          if(getValue(i,j-pos)===2) {
            count++;
          }
          if(getValue(i,j-pos)===1) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++
        
        count=0
        pos=1
        while(pos<4 && i+pos<ts && j-pos>=0)
        {
          if(getValue(i+pos,j-pos)===2) {
            count++;
          }
          if(getValue(i+pos,j-pos)===1) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++

        count=0
        pos=1
        while(pos<4 && i+pos<ts)
        {
          if(getValue(i+pos,j)===2) {
            count++;
          }
          if(getValue(i+pos,j)===1) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++
  
        count=0
        pos=1
        while(pos<4 && i+pos<ts && j+pos<ts)
        {
          if(getValue(i+pos,j+pos)===2) {
            count++;
          }
          if(getValue(i+pos,j+pos)===1) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++

        count=0
        pos=1
        while(pos<4 && j+pos<ts)
        {
          if(getValue(i,j+pos)===2) {
            count++;
          }
          if(getValue(i,j+pos)===1) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++

        count=0
        pos=1
        while(pos<4 && i-pos>=0 && j+pos<ts)
        {
          if(getValue(i-pos,j+pos)===2) {
            count++;
          }
          if(getValue(i-pos,j+pos)===1) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++
  
        count=0
        pos=1
        while(pos<4 && i-pos>=0)
        {
          if(getValue(i-pos,j)===2) {
            count++;
          }
          if(getValue(i-pos,j)===1) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++

        count=0
        pos=1
        while(pos<4 && i-pos>=0 && j-pos>=0)
        {
          if(getValue(i-pos,j-pos)===2) {
            count++;
          }
          if(getValue(i-pos,j-pos)===1) {
            count--;
          }
          pos++;
        }
        if(count>=2)
          penteCount++
  

        if(penteCount>=2)
        {
          setValue(i, j, 2)
          actualPlayer=1
          checkPair(i, j, 2)
          checkFiveRow(i, j, 2)
          setPlayer(1)
          return
        }
      }
    
    }

  
    //try to do 3 or more in a row
  // for(let i=iStart; continueR(i,iEnds); i=i+iIncrement)
  // for(let j=jStart; continueR(j,jEnds); j=j+jIncrement)
  // {
  //   if(getValue(i,j)===0)
  //   {
  //     let count=0
  //     let pos=1
  //     while(pos<5 && j-pos>=0 && getValue(i,j-pos)===2)
  //     {
  //       count++;
  //       pos++;
  //     }
  //     pos=1
  //     while(pos<5 && j+pos<ts && getValue(i,j+pos)===2)
  //     {
  //       count++;
  //       pos++;
  //     }
  //     if(count>=2)
  //     {
  //       setValue(i, j, 2)
  //       actualPlayer=1
  //       checkPair(i, j, 2)
  //       checkFiveRow(i, j, 2)
  //       setPlayer(1)
  //       return
  //     }
      
  //     count=0
  //     pos=1
  //     while(pos<5 && i+pos<ts && j-pos>=0 && getValue(i+pos,j-pos)===2)
  //     {
  //       count++;
  //       pos++;
  //     }
  //     pos=1
  //     while(pos<5 && i-pos>=0 && j+pos<ts && getValue(i-pos,j+pos)===2)
  //     {
  //       count++;
  //       pos++;
  //     }
  //     if(count>=2)
  //     {
  //       setValue(i, j, 2)
  //       actualPlayer=1
  //       checkPair(i, j, 2)
  //       checkFiveRow(i, j, 2)
  //       setPlayer(1)
  //       return
  //     }
      
  //     count=0
  //     pos=1
  //     while(pos<5 && i+pos<ts && getValue(i+pos,j)===2)
  //     {
  //       count++;
  //       pos++;
  //     }
  //     pos=1
  //     while(pos<5 && i-pos>=0 && getValue(i-pos,j)===2)
  //     {
  //       count++;
  //       pos++;
  //     }
  //     if(count>=2)
  //     {
  //       setValue(i, j, 2)
  //       actualPlayer=1
  //       checkPair(i, j, 2)
  //       checkFiveRow(i, j, 2)
  //       setPlayer(1)
  //       return
  //     }

  //     count=0
  //     pos=1
  //     while(pos<5 && i+pos<ts && j+pos<ts && getValue(i+pos,j+pos)===2)
  //     {
  //       count++;
  //       pos++;
  //     }
  //     pos=1
  //     while(pos<5 && i-pos>=0 && j-pos>=0 && getValue(i-pos,j-pos)===2)
  //     {
  //       count++;
  //       pos++;
  //     }
  //     if(count>=2)
  //     {
  //       setValue(i, j, 2)
  //       actualPlayer=1
  //       checkPair(i, j, 2)
  //       checkFiveRow(i, j, 2)
  //       setPlayer(1)
  //       return
  //     }
      
  //   }
  
  // }


  //other plays after blocking and searching for captures or pente opps.
  for(let i=iStart; continueR(i,iEnds); i=i+iIncrement)
    for(let j=jStart; continueR(j,jEnds); j=j+jIncrement)
    {
      if(getValue(i,j)===2 && actualPlayer===2 && plays>0)
      {
        let randomN = getRandomInt(8)
        let x=0
        let y=0
        if(randomN===1 && j>1) {
          y=y-2
        }
        if(randomN===2 && i<ts-2 && j>1) {
          x=x+2
          y=y-2
        }
        if(randomN===3 && i<ts-2) {
          x=x+2
        }
        if(randomN===4 && i<ts-2 && j<ts-2) {
          x=x+2
          y=y+2
        }
        if(randomN===5 && j<ts-2) {
          y=y+2
        }
        if(randomN===6 && i>1 && j<ts-2) {
          x=x-2
          y=y+2
        }
        if(randomN===7 && i>1) {
          x=x-2
        }
        if(randomN===8 && i>1 && j>1) {
          x=x-2
          y=y-2
        }
        
        let maxTries=0;
        while(getValue(i+x,j+y)!==0 && maxTries<20 && plays>0)
        {
          randomN = getRandomInt(8)
          maxTries++
          x=0
          y=0
          if(randomN===1 && j>1) {
            y=y-2
          }
          if(randomN===2 && i<ts-2 && j>1) {
            x=x+2
            y=y-2
          }
          if(randomN===3 && i<ts-2) {
            x=x+2
          }
          if(randomN===4 && i<ts-2 && j<ts-2) {
            x=x+2
            y=y+2
          }
          if(randomN===5 && j<ts-2) {
            y=y+2
          }
          if(randomN===6 && i>1 && j<ts-2) {
            x=x-2
            y=y+2
          }
          if(randomN===7 && i>1) {
            x=x-2
          }
          if(randomN===8 && i>1 && j>1) {
            x=x-2
            y=y-2
          }
        }

        if(getValue(i+x, j+y)===0)
        {
          setValue(i+x, j+y, 2)
          actualPlayer=1
          checkPair(i, j, 2)
          checkFiveRow(i, j, 2)
          setPlayer(1)
        }
        else
          return
      }
    }
}


function play(x, y) {
  setTable(
    prev => (
      prev.map(
        eachBlock => (eachBlock.x===x && eachBlock.y===y && eachBlock.value===0) ?
          {...eachBlock, value: player} : eachBlock
        )
    )
  )

  if(getValue(x,y)===0)
  {
    checkPair(x, y, player);
    checkFiveRow(x, y, player);

    setPlayer(
      prev => (
        prev === 1 ? 2 : 1
      )
    )
  }
}

const tableElements = table.map(box => (
  <Box 
      key={box.id} 
      id={box.id} 
      x={box.x}
      y={box.y}
      value={box.value}
      play={play}/>)
)

const tableGame = (
  <div className="box--table">{tableElements}</div>
)

function showRules() {
  setRules(true)
}

function setSinglePlayer() {
  setSingle(1)
}

function setMultiplayer() {
  setSingle(2)
}

function restartGame() {
  setPente(true)
}

const rulesWindow = (
  <div className="rules--window">
    <div className="rules--title">Pente Rules</div>
    <div className="rules--description">
      You win making a five consecutive row or by 
      capturing five pairs of the opponent.<br></br><br></br>

      Captures and five in a row can be done in any
      direction: Vertically, horizontally, diagonally.
    </div>
    <div className="go--back" onClick={restartGame}>Go Back</div>
  </div>
)

const modeWindow = (
  <div className="mode--window">
    <div className="mode--subwindow">
      <div className="mode--button" onClick={setSinglePlayer}>Single Player</div>
      <div className="mode--button" onClick={setMultiplayer}>Multiplayer</div>
      <div className="mode--button" onClick={showRules}>Game Rules</div>
    </div>
  </div>
  )

  const player1Score = (
    <span className="p1--score">P1 Score: {scorep1}</span>
  )

  const player2Score = (
    <span className="p2--score">P2 Score: {scorep2}</span>
  )

  const winnerText1 = (
    <span className="winner--text1">Player 1 Wins!</span>
  )

  const winnerText2 = (
    <span className="winner--text2">Player 2 Wins!</span>
  )

  const restartButton = (
    <div className="restart--game" onClick={restartGame}>Restart Game</div>
  )

return (
    <main>
      <div className="header">
        {single!==0 ? player1Score : ""}
        <span className="game--title">Pente</span>
        {single!==0 ? player2Score : ""}
      </div>
      <div className="body">
        {winner===1 ? winnerText1 : ""}
        {winner===2 ? winnerText2 : ""}
        {winner!==-1 ? restartButton : ""}
        {single===0 ? modeWindow : tableGame}
        {rules ? rulesWindow : ""}
        
      </div>
      <div className="footer">
        <h3 className="signature--created">Created by</h3>
          <div className="signature"> Francisco Castro</div>
        
      </div>
    </main>
  );
}


export default App;
