<script>
	export let cells;
	export let header;
	export let playing;
	export let turn;

    const play = (cell, i) => {
        if (!playing) {
            return;
        }

        if (cell.played) {
            return;
        }

        cells[i].played = true;
        cells[i].text = turn;

        if (isWin()) {
            playing = false;
            header = `${turn} wins!`;
            return;
        }

        if (isDraw()) {
            playing = false;
            header = `draw...`;
            return;
        }

        turn = turn === 'x' ? 'o' : 'x';

        header = `${turn} turn`;
    };

    const isDraw = () => {
        return cells.filter(cell => cell.played).length === 9
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

            const combinationCells = cells.filter((cell, index) => combination.includes(index))

            win = combinationCells.every(cell => {
                return cell.text === turn
            })

            if (win) {
                combinationCells.forEach(cell => cell.win = true)
            }
        })

        return win
    }

    const replay = () => {
        window.location.reload();
    }
</script>

<main>
    <h2>
        <span>{ header }</span>
        {#if playing === false}
        <span
            id="replay"
            on:click="{replay}"
        >
            replay?
        </span>
        {/if}
    </h2>

    <div class="container">
        {#each cells as cell, i}
        <div 
            class="cell"
	        class:hover="{cell.hover === true}"
	        class:win="{cell.win === true}"
            on:click="{play(cell, i)}"
            on:mouseover="{() => cell.hover = playing}"
            on:mouseleave="{() => cell.hover = false}"
        >
            { cell.text }
        </div>
        {/each}
    </div>
</main>

