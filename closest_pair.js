const simpleSet = [
  [4,1],
  [5,2],
  [1,5],
  [3,3],
]
/*
5X
4
3    X
2        X
1      X
 1 2 3 4 5
*/

const biggerSet = [
  [4,1],
  [5,2],
  [1,5],
  [3,3],
  [0,0],
  [7,8],
  [3,9],
  [4,8],
  [9,1],
  [6,2],
]
/*
9    X
8      X     X
7
6
5X
4
3    X
2        X X
1      X         1
X1 2 3 4 5 6 7 8 9
*/

const closestPair = (ptsArr) => {
  ptsArr.sort((p1, p2) => p1[0] - p2[0]);
  const closest = orderedSearch(ptsArr);
  return closest;
}

console.log(closestPair(biggerSet));

const orderedSearch = (ordPtsArr) => {
  if (ordPtsArr.length) {
    if (ordPtsArr.length === 2) {
      return Math.sqrt(ordPtsArr[0] * ordPtsArr[0] + ordPtsArr[1] * ordPtsArr[1]);
    }
    const xMid = (ordPts[ordPts.length - 1][0] + ordPts[0][0]) / 2;
    const firstClosest = orderedSearch(ordPtsArr.filter((pt) => pt[0] < xMid)));
    const secondClosest = orderedSearch(ordPtsArr.filter((pt) => pt[0] >= xMid));

    const shorter = math.min(firstClosest, secondClosest);

    const leftStripPoints = ordPtsArr.filter((pt) => pt[0] < xMid && xMid - pt[0] < shorter);
    const rightStripPoints = ordPtsArr.filter((pt) => pt[0] > xMid && pt[0] - xMid < shorter);

    const ySortedLeftStripPoints = leftStripPoints.slice();
    ySortedLeftStripPoints.sort((p1, p2) => p1[1] - p2[1]);

    leftStripPoints.forEach((pt) => {
      // find closest y above and closest y below
    })
    if (ordPtsArr.length === 3) {

    }
  }
}
