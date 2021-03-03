def merge_sort(arr)
  broken_up_arrays = break_apart(arr)
  p "------ broken_up_arrays ------", broken_up_arrays 
  return merge(*broken_up_arrays)
end

def break_apart(arr)
  return [arr] if arr.length < 2
  half_idx = arr.length / 2
  first_half = break_apart(arr[0...half_idx])
  second_half = break_apart(arr[half_idx..-1])
  return [*first_half, *second_half]
end

def merge(*arrays)
  # Base Case
  return arrays[0] if arrays.length <= 1
  # If not Base Case... crunch away
  merged_remains = []
  # first, peel off and merge the first two elements
  first = arrays.shift
  second = arrays.shift
  # Apply merge_two logic -- the main workhorse of this algorithm
  merged_remains << recursive_merge_two(first, second)
  
  if arrays.length > 0 # prevent recursing on empty remains
    merged_remains << merge(*arrays)
  end

  return merge(*merged_remains)
end

def iterative_merge_two(first, second)
  sorted_result = []
  while first.length > 0 || second.length > 0
    if second.length == 0 || (first.length > 0 && first[0] < second[0])
      sorted_result << first.shift
    else
      sorted_result << second.shift
    end
  end
  return sorted_result
end

def recursive_merge_two(first, second, merged=[])
  if first.length == 0 && second.length == 0
    return merged
  else
    if second.length == 0 || (first.length > 0 && first[0] < second[0])
      merged << first.shift
    else
      merged << second.shift
    end
    return recursive_merge_two(first, second, merged)
  end
end

if __FILE__ == $0
  # puts "ran this file"
  # p break_apart([9,7,8,4, 62, 0, 3])
  # p merge([7],[4],[5], [3], [9], [0])
  p merge_sort([2, 3, 1])
  p merge_sort([5, 2, 0, 8])
  p merge_sort([5, 2, 6, 9, 22, 0, 8])
end
