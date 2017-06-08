def make_change(cost, paid, coins_arr)
  change_amount = paid - cost
  ret_arr = [0] * coins_arr.length
  coins_arr.each_with_index do |coin, idx|
    while change_amount >= coin
      ret_arr[idx] += 1
      change_amount -= coin
    end
  end
  ret_arr
end

if __FILE__ == $0
  p make_change(5.22, 10.0, [1,0.25, 0.10, 0.05, 0.01])
end
