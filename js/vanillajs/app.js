let turn = 'x'

const eventHandlers = {
    click: ev => {
        const cell = ev.target

        if (cell.classList.contains('played')) {
            return
        }

        cell.innerHTML = turn

        cell.classList.add('played')
        cell.classList.remove('hover')

        if (isWin()) {
            winMessage()
            return
        }

        if (isDraw()) {
            drawMessage()
            return
        }

        turn = turn === 'x' ? 'o' : 'x'

        updateTurn()
    },

    mouseenter: ev => {
        const cell = ev.target

        if (cell.classList.contains('played')) {
            return
        }

        cell.classList.add('hover')
    },

    mouseleave: ev => {
        const cell = ev.target

        if (cell.classList.contains('played')) {
            return
        }

        cell.classList.remove('hover')
    }
}

document.querySelectorAll('.cell')
    .forEach(el => {
        el.addEventListener('click', eventHandlers.click)
        el.addEventListener('mouseenter', eventHandlers.mouseenter)
        el.addEventListener('mouseleave', eventHandlers.mouseleave)
    })

const isDraw = () => {
    return document.querySelectorAll('.cell.played').length === 9
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

        const cells = [...document.querySelectorAll('.cell')]

        const combinationCells = cells.filter((cell, index) => combination.includes(index))

        win = combinationCells.every(cell => {
            return cell.innerHTML === turn
        })

        if (win) {
           combinationCells.forEach(cell => cell.classList.add('win'))
        }
    })

    return win
}

const winMessage = () => {
    endGame(`${turn} wins!`)
}

const drawMessage = () => {
    endGame(`draw...`)
}

const endGame = (message) => {
    [...document.querySelectorAll('.cell')].forEach(cell => cell.classList.add('played'))

    replay = ` <span id="replay">replay?</span>`

    document.querySelector('h2').innerHTML = message + replay;

    document.querySelector('#replay').addEventListener('click', () => {
        window.location.reload()
    })

}

const updateTurn = () => {
    document.querySelector('h2 span').innerHTML = turn
}

