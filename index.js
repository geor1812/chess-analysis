import Stockfish from 'stockfish.wasm'

Stockfish().then((engine) => {
    engine.addMessageListener((message) => {
        console.log(message)
    })

    engine.postMessage('uci')
    engine.postMessage('position fen 4k2r/6r1/8/8/8/8/3R4/R3K3 w Qk - 0 1.')
    engine.postMessage('d')
    engine.postMessage('go depth 5')
})
