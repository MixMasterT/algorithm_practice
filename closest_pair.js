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
  [4,6],
  [1,5],
  [9,9],
  [0,0],
  [0,0],
  [3,9],
  [9,1],
  [6,3],
  [90,70],
]
/* closest = 4,1 - 5,2
9    X           X
8
7
6      X         X
5X
4
3          X
2
1      X         X
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
  [4,2],
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
2      X X
1
X1 2 3 4 5 6 7 8 9
*/

const degenerateSet = [
  [5,5],
  [5,2],
  [5,9],
  [5,6],
]
/*
/* closest = 4,1 - 5,2
9        X
8
7
6        X
5        X
4
3
2        X
1
 1 2 3 4 5 6 7 8 9
*/
const closestPair = (ptsArr) => {
  ptsArr.sort((p1, p2) => p1[0] - p2[0]); // O(n * log(n))
  const closest = orderedSearch(ptsArr); // O( )
  return closest;
}

const getDist = (p1, p2) => {
  return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
}

function orderedSearch(ordPtsArr){
  if (ordPtsArr.length) {
    if (ordPtsArr.length < 2) {
      return null;
    }
    if (ordPtsArr.length === 2) {
      return getDist(ordPtsArr[0], ordPtsArr[1]);
    }
    const xMid = (ordPtsArr[ordPtsArr.length - 1][0] + ordPtsArr[0][0]) / 2;
    // console.log(xMid);

    if (ordPtsArr[0][0] === xMid) {
      // all points are along same x coord
      const yOrdPts = ordPtsArr.sort((p1, p2) => p1[1] - p2[1]);
      let minDist = yOrdPts[1][1] - yOrdPts[0][1];
      yOrdPts.forEach((pt, idx) => {
        if (idx > 0) {
          const dist = pt[1] - yOrdPts[idx - 1][1];
          if (dist < minDist) {
            minDist = dist;
          }
        }
      });
      return minDist;
    } else {
      // console.log(xMid, ordPtsArr);
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
          // console.log("exactly two matched");
          return Math.min(stripDist, minDist);
        } else {

          const ySortedLeftStripPoints = leftStripPoints.slice();
          ySortedLeftStripPoints.sort((p1, p2) => p1[1] - p2[1]);

          const ySortedRightStripPoints = rightStripPoints.slice();
          ySortedRightStripPoints.sort((p1, p2) => p1[1] - p2[1]);

          // console.log(ySortedRightStripPoints);
          // console.log(ySortedLeftStripPoints);

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
              // console.log("current point is: ", pt);
              // console.log(`rightPointer: ${rightPointer}, rightPoint is ${ySortedRightStripPoints[rightPointer]}`);
              rightPointer++;
            }

            if (leftPointer < ySortedLeftStripPoints.length - 1) {
              const nextLeft = ySortedLeftStripPoints[leftPointer + 1];
              // console.log("next left = ", nextLeft);

              // lower rightPointer down to either 0 or one past the lowest index within minDist
              // of nextLeft[1] ( y-axis )
              while (
                rightPointer >= ySortedRightStripPoints.length ||
                rightPointer > 0 && ySortedRightStripPoints[rightPointer][1] >= nextLeft[1] - minDist
              ) {
                rightPointer--;
              }
            }
          })
        }
      }
      return minDist;
    }
  }
}

console.log("hardSet");
console.log(closestPair(hardSet));
console.log(closestPair(hardSet) === 1);
console.log("simpleSet");
console.log(closestPair(simpleSet));
console.log(closestPair(simpleSet) === 1.4142135623730951);
console.log('biggerSet');
console.log(closestPair(biggerSet));
// sqrt of 2
console.log(closestPair(biggerSet) === 2.8284271247461903);
console.log('degenerateSet');
console.log(closestPair(degenerateSet));
console.log(closestPair(degenerateSet) === 1);
// console.log(closestPair(hardSet));
