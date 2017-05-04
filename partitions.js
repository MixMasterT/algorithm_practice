function partitionRecursive(x) {
  if (x <= 0) { return []; }
  if (x === 1) { return [[1]]; }

  else {
    const parts = [[x]];
    if (x > 1) {
      for (let i = 1; i < x; i++) {
        const diff = x - i;

        const subParts = partitionRecursive(i);
        subParts.forEach((sP) => {
          if (sP.every((v) => v <= diff)) {
            parts.push([diff, ...sP]);
          }
        })
      }
    }

    return parts;
  }
}

function partitionRecursiveMemoized(x) {
  var partsCache = partsCache || {};

  if (partsCache[x]) { return partsCache[x]; }
  else {
    if (x <= 0) { return []; }
    if (x === 1) { return [[1]]; }

    else {
      const parts = [[x]];
      if (x > 1) {
        for (let i = 1; i < x; i++) {
          const diff = x - i;

          const subParts = partitionRecursiveMemoized(i);
          subParts.forEach((sP) => {
            if (sP.every((v) => v <= diff)) {
              parts.push([diff, ...sP]);
            }
          })
        }
      }
      partsCache[x] = parts;
      return parts;
    }
  }
}

function partitionDynamic(x) {
  if (x < 1) { return []; }
  let parts = [[x]];

  let i = 1;
  while (i < x) {
    const lastPart = parts.slice(parts.length - 1, 1)
    console.log("i = ", i);
    console.log(lastPart);
    parts = parts.forEach((p, idx) => {
      const incrementedPart = p.slice();
      incrementedParts[idx]++;
      return incrementedParts;
    })
    parts.push(lastPart.push(1));
    i++;
  }
  return parts;
}

// console.log(partitionDynamic(1));
// console.log(partitionDynamic(2));
// console.log(partitionDynamic(3));
  // should output [[5], [4,1], [3,2], [3,1,1], [2,2,1], [2,1,1,1], [1,1,1,1,1]]
  // console.log(partitionRecursive(5));
  //
  // console.log(partitionRecursive(4));
  console.log(partitionRecursiveMemoized(3));
  // console.log(partitionRecursiveMemoized(10));
  // console.log(partitionRecursiveMemoized(30).length);
