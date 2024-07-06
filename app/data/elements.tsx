// HERE IS THE DATA OF EVERY AND, NOT, PIN, CUSTOM CHIP

import Cip from "../class/Cip";
import Pin from "../class/Pin";

export const Inputs: Pin[] = [
    new Pin({
        type: 'input',
        y: 100,
    }),
    new Pin({
        type: 'input',
        y: 150,
    })
];


export const Cips: Cip[] = [
    new Cip({
        color: "#dd3333",
        tag: "NOT",
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        inputsNum : 1,
        outputsNum : 1

    })
]