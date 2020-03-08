const vm = new Vue({
    el: '#app',
    data: {
        cells: [
            { hover: false, played: false, win: false, text: '' },
            { hover: false, played: false, win: false, text: '' },
            { hover: false, played: false, win: false, text: '' },

            { hover: false, played: false, win: false, text: '' },
            { hover: false, played: false, win: false, text: '' },
            { hover: false, played: false, win: false, text: '' },

            { hover: false, played: false, win: false, text: '' },
            { hover: false, played: false, win: false, text: '' },
            { hover: false, played: false, win: false, text: '' }
        ],
        header: 'x turn',
        playing: true,
        turn: 'x',
    },
    methods: {
        play: (cell) => {
            if (!vm.playing) {
                return
            }

            if (cell.played) {
                return
            }

            cell.played = true
            cell.text = vm.turn

            if (isWin()) {
                vm.playing = false
                vm.header = `${vm.turn} wins!`
                return
            }

            if (isDraw()) {
                vm.playing = false
                vm.header = `draw...`
                return
            }

            vm.turn = vm.turn === 'x' ? 'o' : 'x'

            vm.header = `${vm.turn} turn`
        },
        replay: () => {
            window.location.reload()
        }
    }
})

const isDraw = () => {
    return vm.cells.filter(cell => cell.played).length === 9
}

const isWin = () => {
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
            return
        }

        const combinationCells = vm.cells.filter((cell, index) => combination.includes(index))

        win = combinationCells.every(cell => {
            return cell.text === vm.turn
        })

        if (win) {
           combinationCells.forEach(cell => cell.win = true)
        }
    })

    return win
}

