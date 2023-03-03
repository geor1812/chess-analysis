import fs from 'fs'
import path from 'path'
import { Worker } from 'node:worker_threads'
//const stockfish = require('stockfish')
const STOCKFISH_PATH = './node_modules/stockfish/src/stockfish.js'

const wasmSupported =
    typeof WebAssembly === 'object' &&
    WebAssembly.validate(
        Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00)
    )
console.log('wasm supported:', wasmSupported)

console.log('Starting stockfish')
const stockfish = new Worker(STOCKFISH_PATH)

stockfish.on('error', (error) => console.log(error))
stockfish.on('exit', (exitCode) => console.log(exitCode))
stockfish.on('message', (message) => console.log(data))

stockfish.postMessage('INIT_ENGINE()')
