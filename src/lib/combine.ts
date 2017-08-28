export const combine = <T, TEx>(t: T, ...ts: TEx[]) => 
    ts.reduce((acc, x) => Object.assign({}, acc, x), t) as T & TEx;