package org.example;

public class Board {
  private final char[][] board;

  public Board() {
    this.board = new char[][]{
            {'-', '-', '-'},
            {'-', '-', '-'},
            {'-', '-', '-'}
    };
  }

  public char[][] getBoard() {
    return board;
  }

  public void setCharacter(int x, int y, char character) {
    this.board[x][y] = character;
  }

  public boolean isEmpty(int x, int y) {
    return this.board[x][y] == '-';
  }

  public boolean isInsideBoard(int x, int y) {
    return x >= 0 && x < this.board.length && y >= 0 && y < board.length;
  }

  public void printBoard() {
    System.out.print("  ");
    for (int i = 0; i < board.length; i++) {
      System.out.print(i + 1 + " ");
    }
    System.out.println();

    for (int i = 0; i < board.length; i++) {
      System.out.print(i + 1 + " ");
      for (char c : board[i]) {
        System.out.print(c + " ");
      }
      System.out.println();
    }
  }

  public boolean isFull() {
    for (int i = 0; i < board.length; i++) {
      for (int j = 0; j < board[i].length; j++) {
        if (board[i][j] == '-') {
          return false;
        }
      }
    }
    return true;
  }

  public char getWinner() {
    for (int i = 0; i < 3; i++) {
      if (board[i][0] != '-' && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
        return board[i][0];
      }
    }

    for (int j = 0; j < 3; j++) {
      if (board[0][j] != '-' && board[0][j] == board[1][j] && board[1][j] == board[2][j]) {
        return board[0][j];
      }
    }

    if (board[0][0] != '-' && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
      return board[0][0];
    }
    if (board[0][2] != '-' && board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
      return board[0][2];
    }

    return '-';
  }

}
