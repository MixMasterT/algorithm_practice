const pyramid = [
  [0],
  [1,2],
  [1,2,1],
  [3,3,1,0],
  [6,3,2,1,1],
  [9,9,9,1,0,1],
];


const pyramidDFS = (pyramid, currentPos = 0) => {
  if (pyramid.length < 1) { return 0; }

  const remainder = pyramid.slice(1)

  if (pyramid[0].length === 1) {
    return pyramid[0][0] + pyramidDFS(remainder, currentPos);
  } else {

    const leftPath = pyramid[0][currentPos] + pyramidDFS(remainder, currentPos);
    const rightPath = pyramid[0][currentPos + 1] + pyramidDFS(remainder, currentPos + 1);

    return Math.min(leftPath, rightPath);

  }
}

console.log(pyramidDFS(pyramid));
