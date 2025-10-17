
  
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
