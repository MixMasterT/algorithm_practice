def gcd(num1, num2)
  higher = [num1, num2].max
  lower = [num1, num2].min
  if higher % lower == 0
    lower
  else
    gcd(higher % lower, lower)
  end
end

def lcm(n1, n2)
  n1 * n2 / gcd(n1, n2)
end
