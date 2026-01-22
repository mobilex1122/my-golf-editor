export type Rotation = number;
export type Flip = number;

const ROT_MASK = 0b11;       // bits 0–1
const FLIP_MASK = 0b1100;    // bits 2–3

const wrapNumber = (num: number) => num > 3 ? 0 : (num < 0 ? 3 : num)

function encode(rotation: Rotation, flip: Flip): number {
    return ((wrapNumber(flip) & 0b11) << 2) | (wrapNumber(rotation) & 0b11);
}

function getRotation(value: number): Rotation {
    return (value & ROT_MASK) as Rotation;
}

function getFlip(value: number): Flip {
    return ((value >> 2) & 0b11) as Flip;
}

function setRotation(value: number, rotation: Rotation): number {

    return (value & ~ROT_MASK) | (wrapNumber(rotation) & 0b11);
}

function setFlip(value: number, flip: Flip): number {
    return (value & ~FLIP_MASK) | ((wrapNumber(flip) & 0b11) << 2);
}

export default {
    encode,
    getRotation,
    setRotation,
    getFlip,
    setFlip
}
