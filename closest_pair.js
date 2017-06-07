const sameXEdgeCase = [
  [5,1],
  [5,5],
  [5,7],
  [5,19],
]

const simpleSet = [
  [4,1],
  [5,2],
  [1,5],
  [3,3],
]
/* closest = 4,1 - 5,2
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
/* closest = 4,1 - 5,2
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

const hardSet = [
  [0,0],
  [5,5],
  [8,5],
  [5,2],
  [2,5],
  [3,9],
  [4,7],
]
/*
/* closest = 4,1 - 5,2
9    X
8
7      X
6
5  X     X     X
4
3
2        X
1
X1 2 3 4 5 6 7 8 9
*/
const closestPair = (ptsArr) => {
  ptsArr.sort((p1, p2) => p1[0] - p2[0]);
  const closest = orderedSearch(ptsArr);
  return closest;
}

const getDist = (p1, p2) => {
  return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
}

console.log(closestPair(biggerSet));

function orderedSearch(ordPtsArr){
  if (ordPtsArr.length) {
    if (ordPtsArr.length < 2) {
      return null;
    }
    if (ordPtsArr.length === 2) {
      return getDist(ordPtsArr[0], ordPtsArr[1]);
    }
    const xMid = (ordPtsArr[ordPtsArr.length - 1][0] + ordPtsArr[0][0]) / 2;

    if (xMid === ordPtsArr[0][0]) { // handle case where all pts have same x value
      const yOrderedArr = ordPtsArr.sort((p1, p2) => p1[1] - p2[1]);
      let minDist = yOrderedArr[1][1] - yOrderedArr[0][1];
      yOrderedArr.forEach((pt, idx) => {
        if (idx > 1) {
          const currentDist = pt[1] - yOrderedArr[idx - 1][1];
          if (currentDist < minDist) {
            minDist = currentDist;
          }
        }
      })
      return minDist;
    }

    console.log(xMid, ordPtsArr);
    const leftClosest = orderedSearch(ordPtsArr.filter((pt) => pt[0] < xMid));
    const rightClosest = orderedSearch(ordPtsArr.filter((pt) => pt[0] >= xMid));

    let minDist = leftClosest && rightClosest ?
                    Math.min(leftClosest, rightClosest) :
                    leftClosest || rightClosest;

    const leftStripPoints = ordPtsArr.filter((pt) => pt[0] <= xMid && xMid - pt[0] < minDist);
    const rightStripPoints = ordPtsArr.filter((pt) => pt[0] > xMid && pt[0] - xMid < minDist);

    if (leftStripPoints.length && rightStripPoints.length) {

      if (leftStripPoints.length === 1 && rightStripPoints.length === 1) {
        const stripDist = getDist(leftStripPoints[0], rightStripPoints[0]);
        return Math.min(stripDist, minDist);
      } else {

        const ySortedLeftStripPoints = leftStripPoints.slice();
        ySortedLeftStripPoints.sort((p1, p2) => p1[1] - p2[1]);

        const ySortedRightStripPoints = rightStripPoints.slice();
        ySortedRightStripPoints.sort((p1, p2) => p1[1] - p2[1]);

        let rightPointer = 0;
        leftStripPoints.forEach((pt, leftPointer) => {
          const upperBound = Math.min(pt[1] + minDist, ySortedRightStripPoints[ySortedRightStripPoints.length - 1][1]);
          // this while loop will have at most 4 cycles, because if two points
          // exist within the minDist bounded box on either side, they would have
          /// been evaluated as the value for minDist...
          while (ySortedRightStripPoints[rightPointer] &&
            ySortedRightStripPoints[rightPointer][1] - pt[1] < minDist) {
              const currentDist = getDist(pt, ySortedRightStripPoints[rightPointer]);
              if (currentDist < minDist) {
                minDist = currentDist;
              }
              rightPointer++;
            }
            if (leftPointer < ySortedLeftStripPoints.length - 1) {
              const nextLeft = ySortedLeftStripPoints[leftPointer + 1];
              while (ySortedRightStripPoints[rightPointer] &&
                      ySortedRightStripPoints[rightPointer][1] > nextLeft[1]) {
                rightPointer--;
              }
            }
          })
      }
    }

  return minDist;
  }
}

console.log(closestPair(hardSet));
console.log(closestPair(sameXEdgeCase));
