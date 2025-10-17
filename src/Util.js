
  
  export function getTileColor(value) {
  switch (value) {
    case 0: return '#ccc0b3';      
    case 2: return '#eee1d9';      
    case 4: return '#f3d6b7';      
    case 8: return '#f2b179';
    case 16: return '#f59563';
    case 32: return '#f67c5f';
    case 64: return '#f65e3b';
    case 128: return '#edcf72';
    case 256: return '#edcc61';
    case 512: return '#edc850';
    case 1024: return '#edc53f';
    case 2048: return '#edc22e';
    default: return '#3c3a32';      
  }
}


export function getTextColor(value) {
  return value > 4 ? 'white' : 'black';
}



export function CheckStatus(grid){

if(grid.flat().includes(2048))

  {

return "win"

  }


if (grid.flat(grid).includes(0))
{

  return 'continue'


}


for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (i < 3 && grid[i][j] === grid[i + 1][j]) 
        
        {
          return 'continue'
        }

      if (j < 3 && grid[i][j] === grid[i][j + 1]) 
        
        {
        return 'continue'
        }
    }
  }



return "lose"

}