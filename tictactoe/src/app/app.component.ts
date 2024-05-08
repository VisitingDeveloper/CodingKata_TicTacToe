import {Component, OnDestroy} from '@angular/core';
import {CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatGridListModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  playerXTurn: boolean = true;
  playerXClaimed: number[] = [];
  playerOClaimed: number[] = [];
  winningCombinations: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  gameEnded: boolean = false;
  $destroy: Subject<void> = new Subject<void>();

  constructor(private _snackBar: MatSnackBar) {
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    }

  onClick(ev: Event) {
    var target = ev.target as HTMLElement;
    if(this.gameEnded) {
      this.openSnackBar("Das Spiel ist bereits beendet", "Close");
      return;
    }
    if(target.innerText === "X" || target.innerText === "O") {
      this.openSnackBar("Du kannst kein bereits gewähltes Feld wählen!", "Close");
      return
    }

    if (this.playerXTurn) {
      this.playerXClaimed.push(parseInt(target.innerText));
      target.innerText = "X";
      target.style.backgroundColor = "red";
      this.playerXTurn = false;
      if (this.checkWinner(this.playerXClaimed)) {
        this.openSnackBar("Player X wins", "Reset");
        this.gameEnded = true;
      }
      if (this.checkDraw()) {
        this.openSnackBar("Unentschieden", "Reset");
        this.gameEnded = true;
      }
      return;
    }
      this.playerOClaimed.push(parseInt(target.innerText));
      target.innerText = "O";
      target.style.backgroundColor = "blue";
      this.playerXTurn = true;
      if (this.checkWinner(this.playerOClaimed)) {
        this.openSnackBar("Player O wins", "Reset");
        this.gameEnded = true;
      }
      if (this.checkDraw()) {
        this.openSnackBar("Unentschieden", "Reset");
        this.gameEnded = true;
      }
  }

  private checkWinner(playerClaimed: number[]): boolean {
    for (let i = 0; i < this.winningCombinations.length; i++) {
      let count = 0;
      for (let j = 0; j < this.winningCombinations[i].length; j++) {
        if (playerClaimed.includes(this.winningCombinations[i][j])) {
          count++;
        }
        if (count === 3) {
          return true;
        }
      }
    }
    return false;
  }

  checkDraw(): boolean {
    return this.playerXClaimed.length + this.playerOClaimed.length === 9;
  }

  resetGame() {
    this.playerXTurn = true;
    this.playerXClaimed = [];
    this.playerOClaimed = [];
    this.gameEnded = false;

    for (let i = 1; i <= 9; i++) {
      let tile = document.getElementById(i.toString());
      if (tile) {
        tile.innerText = i.toString();
        tile.style.backgroundColor = "lightblue";
      }
    }
  }

  private openSnackBar(message: string, action: string) {
    let snackBarRef = this._snackBar.open(message, action);
    snackBarRef.onAction().pipe(
      takeUntil(this.$destroy))
      .subscribe(() => {
        if (this.gameEnded) {
          this.resetGame();
        }
      });
  }
}
