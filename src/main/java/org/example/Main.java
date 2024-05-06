package org.example;

import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Board board = new Board();
    Scanner input = new Scanner(System.in);
    char turn = 'X';

    System.out.println("Das Spiel TicTacToe hat gestartet!");

    while (!board.isFull() && board.getWinner() == '-') {
      turn = switchTurn(turn);
      board.printBoard();
      System.out.print(turn + " ist dran! ");

      int row;
      int column;

      do {
        System.out.println("Wo möchtest du dein Zeichen setzen?");
        column = getUserInput(input, "Spalte ↓ : ") - 1;
        row = getUserInput(input, "Reihe → : ") - 1;

      } while (!validatePosition(row, column, board));

      board.setCharacter(row, column, turn);
    }

    System.out.println();
    System.out.println("Spiel beendet! " + board.getWinner() + " hat gewonnen!");
    board.printBoard();
    input.close();
  }

  private static char switchTurn(char currentTurn) {
    return currentTurn == 'X' ? 'O' : 'X';
  }

  private static int getUserInput(Scanner scanner, String text) {
    System.out.print(text);
    while (!scanner.hasNextInt()) {
      System.out.println("Bitte gib eine gültige Nummer ein!");
      scanner.next();
      System.out.print(text);
    }
    return scanner.nextInt();
  }

  private static boolean validatePosition(int row, int col, Board board) {
    if (!board.isInsideBoard(row, col)) {
      System.out.println("Dieses Feld ist außerhalb des Spielbretts! Bitte wähle einen anderen Ort.");
      return false;
    }

    if (!board.isEmpty(row, col)) {
      System.out.println("Auf diesem Feld befindet sich bereits ein anderes Zeichen! Bitte wähle einen anderen Ort!");
      return false;
    }

    return true;
  }
}
