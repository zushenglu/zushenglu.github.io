grid_9x9 = \
 [[4,1,0,0,6,0,0,7,8],
  [7,0,3,5,0,1,4,2,0],
  [0,0,8,4,7,3,0,6,0],
  [0,5,0,0,9,4,8,3,0],
  [3,9,0,0,1,0,7,0,0],
  [2,8,4,3,0,0,0,0,0],
  [6,0,0,0,0,0,0,8,0],
  [0,0,1,9,4,0,0,0,0],
  [0,4,9,0,2,8,0,0,0]];
 
import math

def solve_9x9(row,colume,grid):
    
    global end
    
    # if number here, skip
    if 0 != grid[row][colume]:
        
        # if at the right bot corner, return grid
        if colume == len(grid) - 1 and row == len(grid) -1:
           end = True
           return grid_9x9
        
        # if at the end of row, skip the next row
        elif colume == len(grid) -1:
            colume = 0
            solve_9x9(row + 1, 0,grid)
        
        # if not at the end of row, skip next colume
        else:
            solve_9x9(row,colume+1,grid)
            
    # if this place is zero, input a number
    elif grid[row][colume] == 0:
        
        # insert a number at current grid
        for num in range(1,10):
            
            # if the function already solved the puzzle, end the prgram
            if end == True:
                return grid_9x9
            
            # if not, try the next number
            else:
                grid[row][colume] = num
                
                # prints the grid
                for a in range(9):
                    print(grid[a],end="\n")
                print()
                
                # if no repeat: go to next grid
                if findRepeat(num,grid,row,colume) == False:
                    
                    # if not at last grid of row, go to next
                    if colume < len(grid[row])-1:
                        solve_9x9(row,colume+1,grid)
                    
                    # if at right bot corner, return grid
                    elif colume == len(grid[row])-1:
                        if row == len(grid)-1:
                            end = True
                            return grid
                    
                    # if at last grid of row, go to next row
                        solve_9x9(row+1,0,grid)
                        
                # testing code to fix the problem
                if not end:
                    grid[row][colume] = 0
            
# repeat detection         
def findRepeat(num,grid,row,colume):
    
    # detects repeat within the same row
    for colindex in range(9):
        if colindex != colume:
            if num == grid[row][colindex]:
                grid[row][colume] = 0
                return True
            
    # detects repeat within the same column
    for rowindex in range(9): 
        if  rowindex != row:
            if num == grid[rowindex][colume]:
                grid[row][colume] = 0
                return True
    
    # detectcs repeat within the same square region
    x = math.floor(colume/3)
    y = math.floor(row/3)
    
    for rowindex in range(0,3):
        for colindex in range(0,3):
            if colindex + 3*x != colume and rowindex + 3*y != row:
                if grid[rowindex + 3*y][colindex  + 3*x] == num:
                    grid[row][colume] = 0
                    return True
            
    # if none of the tests found repeat, return false
    return False
    
# runs the function
end = False
solve_9x9(0,0,grid_9x9)

# prints the answer
for a in range(9):
    print(grid_9x9[a],end="\n")
print()