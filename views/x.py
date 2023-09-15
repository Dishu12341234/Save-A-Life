a = [1,23,4,5,6]
b = [1,2,4,67,6]

for x in range(0,len(a)):
    if a[x] != b[x]:
        print(f'{a[x]} ≠ {b[x]} at index {x}')
