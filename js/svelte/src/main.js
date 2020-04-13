import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
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
});

export default app;
