export const keyDict = {
  a:1,
  b:2,
  c:3,
  d:4,
  e:5,
  f:6,
  g:7,
  h:8
}

export const fileDict = {
  1: 'a',
  2: 'b',
  3: 'c',
  4: 'd',
  5: 'e',
  6: 'f',
  7: 'g',
  8: 'h'
}
function extractPosition(pos){
  const beforePOS = parseInt(pos[1]);
  const afterPOS = keyDict[pos[0]];
  console.log((beforePOS -1) * 8 + afterPOS)
  return (beforePOS -1) * 8 + afterPOS;
}

export { extractPosition }