import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    cells = [
        { hover: false, played: false, win: false, text: '' },
        { hover: false, played: false, win: false, text: '' },
        { hover: false, played: false, win: false, text: '' },

        { hover: false, played: false, win: false, text: '' },
        { hover: false, played: false, win: false, text: '' },
        { hover: false, played: false, win: false, text: '' },

        { hover: false, played: false, win: false, text: '' },
        { hover: false, played: false, win: false, text: '' },
        { hover: false, played: false, win: false, text: '' }
    ];

    header = 'x turn';

    playing = true;

    turn = 'x';

    mouseleave(cell) {
        console.log('mouseleave')
        cell.hover = false
    }
    mouseout(cell) {
        console.log('mouseout')
        cell.hover = false
    }
    mouseover(cell) {
        console.log('mouseover')
        cell.hover = this.playing
    }

    play(cell) {
        if (!this.playing) {
            return;
        }

        if (cell.played) {
            return;
        }

        cell.played = true;
        cell.text = this.turn;

        if (this.isWin()) {
            this.playing = false;
            this.header = `${this.turn} wins!`;
            return;
        }

        if (this.isDraw()) {
            this.playing = false;
            this.header = `draw...`;
            return;
        }

        this.turn = this.turn === 'x' ? 'o' : 'x';

        this.header = `${this.turn} turn`;
    }

    replay() {
        window.location.reload()
    }

    isDraw() {
        return this.cells.filter(cell => cell.played).length === 9
    }

    isWin() {
        const combinations = [

            // horizontal
            [ 0, 1, 2 ],
            [ 3, 4, 5 ],
            [ 6, 7, 8 ],

            // vertical
            [ 0, 3, 6 ],
            [ 1, 4, 7 ],
            [ 2, 5, 8 ],

            // diagonal
            [ 0, 4, 8 ],
            [ 2, 4, 6 ]

        ];

        let win = false

        combinations.forEach(combination => {
            if (win) {
                return;
            }

            const combinationCells = this.cells.filter((cell, index) => combination.includes(index));

            win = combinationCells.every(cell => {
                return cell.text === this.turn;
            });

            if (win) {
                combinationCells.forEach(cell => cell.win = true);
            }
        })

        return win;
    }
}
