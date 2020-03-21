import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function classList(classes) {
  return Object
    .entries(classes)
    .filter(entry => entry[1])
    .map(entry => entry[0])
    .join(' ');
}

class Cell extends React.Component {
  render() {
    return (
        <div
        className={
            classList({
                cell: true,
                hover: this.props.hover,
                played: this.props.played,
                win: this.props.win
            })
        }
        onClick={this.props.onClick}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        >
            {this.props.text}
        </div>
    );
  }
}

const isDraw = (state) => {
    return state.cells.filter(cell => cell.played).length === 9
}

const isWin = (state) => {
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

    let winningCells = [];

    combinations.forEach(combination => {
        if (winningCells.length) {
            return
        }

        const combinationCells = state.cells.filter((cell, index) => combination.includes(index))

        const isWin = combinationCells.every(cell => {
            return cell.text === state.turn
        })

        if (isWin) {
            winningCells = [...combination]
        }
    })

    return winningCells
}

const updateWinningCells = (cells, winningCells) => {
    cells.map((cell, i) => cell.win = winningCells.includes(i))

    return cells;
}

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    };
  }

  onClick(i) {
    if (!this.state.playing) {
      return;
    }

    const cells = [...this.state.cells];

    const cell = cells[i];

    if (cell.played) {
        return;
    }

    cell.played = true;
    cell.text = this.state.turn === 'x' ? 'x' : 'o'

    const winningCells = isWin(this.state);

    if (winningCells.length) {
        this.setState({
            cells: updateWinningCells(cells, winningCells),
            header: `${this.state.turn} wins!`,
            playing: false,
            turn: this.state.turn,
        });

        return
    }

    if (isDraw(this.state)) {
        this.setState({
            cells: cells,
            header: 'draw...',
            playing: false,
            turn: this.state.turn,
        });
        return
    }

    this.setState({
      cells: cells,
      header: this.state.turn === 'x' ? 'o turn' : 'x turn',
      playing: true,
      turn: this.state.turn === 'x' ? 'o' : 'x',
    });
  }

  onMouseOut(i) {
    const cells = [...this.state.cells];

    const cell = cells[i];

    cell.hover = false
    
    this.setState({
      cells: cells,
      turn: this.state.turn,
    });
  }

  onMouseOver(i) {
    const cells = [...this.state.cells];

    const cell = cells[i];

    cell.hover = true
    
    this.setState({
      cells: cells,
      turn: this.state.turn,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header 
            header={this.state.header} 
            playing={this.state.playing} 
        />
        <div className="container">
            {
            this.state.cells.map((cell, i) => {return (
                <Cell
                    hover={cell.hover}
                    key={i}
                    played={cell.played}
                    text={cell.text}
                    win={cell.win}
                    onClick={() => {this.onClick(i)}}
                    onMouseOut={() => {this.onMouseOut(i)}}
                    onMouseOver={() => {this.onMouseOver(i)}}
                />
            )})
            }
        </div>
      </React.Fragment>
    );
  }
}

class Header extends React.Component {
  replay() {
    window.location.reload()
  }

  render() {
    return (
        <h2>
            <span>
                {this.props.header}
            </span>
            <span
                id="replay"
                onClick={this.replay}
                className={this.props.playing ? 'hidden' : ''}
            >
                replay?
            </span>
        </h2>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Container />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
