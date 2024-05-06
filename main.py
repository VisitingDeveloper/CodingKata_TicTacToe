# Function to handle player move
def player_move(player):
    while True:
        print("Player ", player, "'s turn. Which spot?")
        move = input()
        if board[int(move)] == ' ':
            board[int(move)] = player
            break
        else:
            print("Invalid move. Try again.")


# Define the board
board = [' ' for _ in range(9)]

# Function to draw the board
def draw_board():
    row1 = '| {} | {} | {} |'.format(board[0], board[1], board[2])
    row2 = '| {} | {} | {} |'.format(board[3], board[4], board[5])
    row3 = '| {} | {} | {} |'.format(board[6], board[7], board[8])

    print(row1)
    print(row2)
    print(row3)

# Function to check for a win
def check_win(player):
    win_conditions = [(0, 1, 2), (3, 4, 5), (6, 7, 8), (0, 3, 6), (1, 4, 7), (2, 5, 8), (0, 4, 8), (2, 4, 6)]
    for condition in win_conditions:
        if board[condition[0]] == board[condition[1]] == board[condition[2]] == player:
            return True
    return False

# Main game loop
while True:
    draw_board()
    player_move('X')
    if check_win('X'):
        draw_board()
        print('Player X wins!')
        break
    draw_board()
    player_move('O')
    if check_win('O'):
        draw_board()
        print('Player O wins!')
        break
    if ' ' not in board:
        draw_board()
        print('The game is a draw!')
        break