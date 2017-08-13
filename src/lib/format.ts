const strings = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 
    'ten'];

export function asString(n: number) {
    return strings[n] || n.toString();
}