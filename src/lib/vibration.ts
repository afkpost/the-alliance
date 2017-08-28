import { combine } from './combine';

const f = (pattern: number|number[]) => navigator.vibrate && navigator.vibrate(pattern);

export const vibrate = combine(
    f,
    {
        long: () => f(600),
        short: () => f(200)
    }
);