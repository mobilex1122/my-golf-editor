export type GolfCodeString = string;
export type GolfCode = number[][];


const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";



export function decode(str: string): GolfCode {
  if (str.length % 2 !== 0) {
    throw new Error("String length must be even");
  }

  const result: GolfCode = [];

  for (let i = 0; i < str.length; i += 2) {
    const c1 = str[i]?? "0";
    const c2 = str[i + 1] ?? "0";

    const n1 = alphabet.indexOf(c1);
    const n2 = alphabet.indexOf(c2);

    if (n1 === -1 || n2 === -1) {
      throw new Error(`Invalid character in string: '${c1}${c2}'`);
    }

    result.push([n1, n2]);
  }

  return result;
}



export function encode(pairs: GolfCode): GolfCodeString {
  let result = "";

  for (const pair of pairs) {
    if (pair.length !== 2) {
      throw new Error("Each entry must contain exactly 2 numbers");
    }

    for (const n of pair) {
      if (n < 0 || n >= alphabet.length) {
        throw new RangeError(`Number out of range (0–61): ${n}`);
      }
      result += alphabet[n];
    }
  }

  return result;
}


export default {
    encode,
    decode
}