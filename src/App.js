import React from "react";
import Box from "./Box";

function App() {

const [table, setTable] = React.useState([])

const[player, setPlayer] = React.useState(1)

const[winner, setWinner] = React.useState(-1)

const[scorep1, setScorep1] = React.useState(0)

const[scorep2, setScorep2] = React.useState(0)

const[pente, setPente] = React.useState(false)


React.useEffect(
  () => {
    initializeGame()
  }, []
)

function initializeGame() {
  if(table.length===0 || pente)
  {
      let temp=[]
      for(let i=0; i<15; i++)
        for(let j=0; j<15; j++)
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
      console.log(temp)
      setTable(temp)
      setPlayer(1)
      setWinner(-1)
      setScorep1(0)
      setScorep1(0)
      setPente(false)
  }
}

const tableElements = table.map(box => (
  <Box 
      key={box.id} 
      id={box.id} 
      x={box.x}
      y={box.y}
      value={box.value}/>
  )
)

return (
    <main>
      <div className="header blue--border">
      asdfad
      </div>
      <div className="main blue--border">
        <div className="box--table blue--border">{tableElements}</div>
      </div>
    </main>
  );
}


export default App;
