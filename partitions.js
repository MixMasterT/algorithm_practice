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

function generateMemoizedPartitioner() {
  var partsCache = partsCache || {};

  return function recursivePartitioner(x) {

    if (partsCache[x]) { return partsCache[x]; }

    else {

      if (x <= 0) { return []; }
      if (x === 1) { return [[1]]; }

      else {
        const parts = [[x]];
        if (x > 1) {
          for (let i = 1; i < x; i++) {
            const diff = x - i;

            const subParts = recursivePartitioner(i);
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
}

function partitionDynamic(x) {
  const dynamicPartitioner = generateMemoizedPartitioner();
  return dynamicPartitioner(x)
}

// console.log(partitionDynamic(1));
// console.log(partitionDynamic(2));
// console.log(partitionDynamic(3));
  // should output [[5], [4,1], [3,2], [3,1,1], [2,2,1], [2,1,1,1], [1,1,1,1,1]]
  // console.log(partitionRecursive(5));
  //
  // console.log(partitionRecursive(4));
  // console.log(partitionRecursiveMemoized(3));
  // console.log(partitionDynamic(1));
  // console.log(partitionDynamic(2));
  // console.log(partitionDynamic(3));
  // console.log(partitionRecursiveMemoized(10));
  // const memParts = generateMemoizedPartitioner();
  // console.log(memParts(30).length);
  // console.log(partitionRecursive(25).length);
  console.log(partitionDynamic(50).length);
