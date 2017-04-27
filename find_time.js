function findTime(slotsA, slotsB, dur) {
  let i = 0;
  let j = 0;
  while ( i < slotsA.length && j < slotsB.length) {
    if (slotsA[i][1] < slotsB[j][0]) {
      //end of A is less than beginning of B, so move B forward

      i++;
    } else if (slotsA[i][0] > slotsB[j][1]) {
      //end of B is less than beginning of A so move A forward

      j++;
    } else {
      let f = Math.min(slotsA[i][1], slotsB[j][1]);
      let s = Math.max(slotsA[i][0], slotsB[j][0]);

      if (f - s >= dur) {
        return [s, s + dur];
      }
      i++;
    }
  }
  return null;
}

const overlap = findTime([[8,18], [22,28], [30,32]], [[8,16], [22,26], [30,35]], 8);

console.log(overlap);
