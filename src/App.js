import './App.css';
import { useState ,useEffect,useRef} from 'react';

import { getTileColor,getTextColor } from './Util';

function App() {


  const [grid, setGrid] = useState(() => Array.from({ length: 4 }, () => Array(4).fill(0)));
const gridRef = useRef(grid)
  


const[ score,setScore]=useState(0)
const [Gameover,setGameover] =useState(false)


useEffect(() => {
  gridRef.current = grid;
}, [grid]);





useEffect(()=>{


  InitializeGrid(grid)

},[])




console.log(grid,"grid befire initiliaze ")

  const InitializeGrid=(grid)=>{

let temp = JSON.parse(JSON.stringify(grid))
let i = Math.floor (Math.random()* 4)
let j = Math.floor (Math.random()* 4)

let k 
let l 


do {
    k = Math.floor(Math.random() * 4)
    l = Math.floor(Math.random() * 4)
  } while (k === i && l === j)  

temp[i][j]= 2
temp[k][l]=2


setGrid(temp)

  }




function GenerateRandom(grid) {
  const temp = JSON.parse(JSON.stringify(grid));
  const emptyCells = [];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (temp[i][j] === 0) emptyCells.push([i, j]);
    }
  }

  if (emptyCells.length === 0)
    {

    return temp;
    }

  const [x, y] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  temp[x][y] = Math.random() < 0.9 ? 2 : 4;

  return temp;
}








  useEffect(() => {
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        HandleArrowDown(gridRef.current)
        break
      case "ArrowUp":
      HandleArrowUP(gridRef.current)
        break
      case "ArrowRight":
         HandleArrowRight(gridRef.current)
        break
      case "ArrowLeft":
        HandleArrowLeft(gridRef.current)
        break
      default:
        break
    }
  }

  document.addEventListener("keydown", handleKeyDown)

  return () => {
    document.removeEventListener("keydown", handleKeyDown)
  }
}, [])




function HandleArrowUP(latestGrid){

  const newGrid = moveUp(latestGrid)

    if (JSON.stringify(newGrid) !== JSON.stringify(latestGrid)) {
    const gridWithRandom = GenerateRandom(newGrid)
    setGrid(gridWithRandom)
  }
 
  
}


function HandleArrowDown(latestGrid){

  const newGrid = moveDown(latestGrid)
    if (JSON.stringify(newGrid) !== JSON.stringify(latestGrid)) {
    const gridWithRandom = GenerateRandom(newGrid)
    setGrid(gridWithRandom)
  }
 
 
}



function HandleArrowRight(latestGrid){
    const newGrid = latestGrid.map(row => moveRowRight(row))

  if (JSON.stringify(newGrid) !== JSON.stringify(latestGrid)) {
    const gridWithRandom = GenerateRandom(newGrid); 
    setGrid(gridWithRandom); 
  }

}






function HandleArrowLeft(latestGrid) {
  const newGrid = latestGrid.map(row => moveRowLeft(row));

  if (JSON.stringify(newGrid) !== JSON.stringify(latestGrid)) {
    const gridWithRandom = GenerateRandom(newGrid); 
    setGrid(gridWithRandom); 
  }
}




function moveRowLeft(row) {
  let newRow = row.filter(val => val !== 0)
  while (newRow.length < 4)
    
    {
      newRow.push(0)

    }

  for (let i = 0; i < 3; i++) {
    if (newRow[i] !== 0 && newRow[i] === newRow[i + 1]) {
      newRow[i] += newRow[i + 1]
      newRow[i + 1] = 0
      setGrid(data=> data + newRow[i])
      setScore(score=> score + newRow[i])
    }
  }

  newRow = newRow.filter(val => val !== 0)
  while (newRow.length < 4) 
    
    {
      
      newRow.push(0)
    }
  return newRow;
}



function moveRowRight(row) {
  let newRow = row.filter(val => val !== 0)
  while (newRow.length < 4)
    
    {
      newRow.unshift(0)

    }

  for (let i = 3; i > 0; i--) {
    if (newRow[i] !== 0 && newRow[i] === newRow[i - 1]) {
      newRow[i] += newRow[i - 1]
      newRow[i - 1] = 0
      setGrid(data=> data + newRow[i])
       setScore( score => score + newRow[i])
    }
  }

  newRow = newRow.filter(val => val !== 0)
  while (newRow.length < 4) 
    
    {
      
      newRow.unshift(0)
    }
  return newRow;
}




function transpose(grid) {
  const result = [];

  for (let i = 0; i < 4; i++) {
    const newRow = [];
    for (let j = 0; j < 4; j++) {
      newRow.push(grid[j][i]);
    }
    result.push(newRow);
  }

  return result;
}



function moveUp(grid) {
  const transposed = transpose(grid);
  const moved = transposed.map(row => moveRowLeft(row));


  return transpose(moved);
}

function moveDown(grid) {
  const transposed = transpose(grid);
  const moved = transposed.map(row => moveRowRight(row));
  return transpose(moved);
}



const  HandleRestart = ()=>{



  const data =  Array.from({ length: 4 }, () => Array(4).fill(0))
  
InitializeGrid(data)

  setScore(0)
}




return (
  <div className="App">

    <div className="header">
      <div className="score-box">Score: {score}</div>
      <button className="restart-button" onClick={HandleRestart}>Restart</button>
    </div>

    <div className='Grid'>
      {grid.flat().map((data, index) => (
        <div key={index} className='Tile'  style={{
        backgroundColor: getTileColor(data),
        color:getTextColor(data),
        font:"bold",
        fontSize: data > 512 ? '16px' : '20px',
      }}>{data !== 0 ? data :""}</div>
      ))}
    </div>

  </div>
);
}
export default App;






