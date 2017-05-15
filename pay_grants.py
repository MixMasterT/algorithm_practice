def findGrantsCap(grantsArray, newBudget):
    total = sum(grantsArray)
    missing = total - newBudget

    if missing <= 0:
      return grantsArray

    else:
      mean = newBudget / len(grantsArray)

      cheap_grants = [i for (i, grant) in enumerate(grantsArray) if grant < mean]

      cheap_grants_total = 0

      for i, grant in enumerate(grantsArray):
          if i in cheap_grants:
              cheap_grants_total += grantsArray[i]

      remaining_funds = newBudget - cheap_grants_total

      num_expensive_grants = len(grantsArray) - len(cheap_grants)

      expensive_mean = remaining_funds / num_expensive_grants

      remainder = newBudget - (cheap_grants_total + expensive_mean * num_expensive_grants)

      grant_amounts = []

      for i in range(len(grantsArray)):
          if i in cheap_grants:
              grant_amounts.append(grantsArray[i])
          else:
              grant_amounts.append(expensive_mean)

    #   print(grant_amounts)

      return grant_amounts

findGrantsCap([2, 100, 50, 120, 1000], 190)


# vineelyalamarthy@gmail.com

# Venkata Vineel

# 385 210 9788
