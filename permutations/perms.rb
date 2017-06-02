def permutations(str)
  result = []
  return result if str.length == 0
  return [str] if str.length == 1
  str.chars.each_with_index do |ch, i|
    current_str = str[0..-1]
    current_str.slice!(i)
    current_round = permutations(current_str)
    result += current_round.map { |sub_perm| ch + sub_perm }
  end
  result
end

if __FILE__ == $0
  p permutations('abcde')
end
