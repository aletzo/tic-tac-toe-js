const classList = classes => 
    Object
        .entries(classes)
        .filter(entry => entry[1])
        .map(entry => entry[0])
        .join(' ')

const isDraw = () => {
    return state.cells.filter(cell => cell.played).length === 9
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

        const combinationCells = state.cells.filter((cell, index) => combination.includes(index))

        win = combinationCells.every(cell => {
            return cell.text === state.turn
        })

        if (win) {
           combinationCells.forEach(cell => cell.win = true)
        }
    })

    return win
}

const mouseout = cell => {
    cell.hover = false
};

const mouseover = cell => {
    cell.hover = true
};

const play = cell => {
    if (!state.playing) {
        return
    }

    if (cell.played) {
        return
    }

    cell.played = true
    cell.text = state.turn

    if (isWin()) {
        state.playing = false
        state.header = `${state.turn} wins!`
        return
    }

    if (isDraw()) {
        state.playing = false
        state.header = `draw...`
        return
    }

    state.turn = state.turn === 'x' ? 'o' : 'x'

    state.header = `${state.turn} turn`
}

const root = document.querySelector('#app')

const state = {
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
}

const Replay = {
    view: () => m('span', {
        id: 'replay',
        class: state.playing ? 'hidden' : '',
        onclick: () => {
            window.location.reload()
        }
    }, 
    'replay?')
}

const Header = {
    view: () => m('h2', [
        m('span', state.header),
        m(Replay),
    ])
}

const Cell = {
    view: vnode => m('div', { 
        class: classList({
            cell: true,
            hover: vnode.attrs.hover,
            played: vnode.attrs.played,
            win: vnode.attrs.win
        }),
        onclick: () => { play(vnode.attrs) },
        onmouseout: () => { mouseout(vnode.attrs) },
        onmouseover: () => { mouseover(vnode.attrs) },
    }, vnode.attrs.text)
}

const Cells = {
    view: () => {
        const cells = state.cells.map(c => m(Cell, c))

        return m('div', { class: 'container' }, cells)
    }
}

const App = {
    view: () => m('div', [
        m(Header),
        m(Cells)
    ])
}

m.mount(root, App)

