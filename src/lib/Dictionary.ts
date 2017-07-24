type Dictionary<T> = { [key: string]: T };

const Dictionary = {
    keys: <T>(that?: Dictionary<T>) => that ? Object.keys(that) : [],
    length: <T>(that?: Dictionary<T>) => Dictionary.keys(that).length,
    values: <T>(that?: Dictionary<T>, orderBy?: (t: T) => string|number) => {
        if (!that) {
            return [];
        }
        const values = Object.keys(that)
            .map(x => that[x]);
        if (orderBy) {
            values.sort((a, b) => orderBy(a) < orderBy(b) ? -1 : 1);
        }
        return values;
    },
    toDictionary: <T>(elements: T[], keySelector: ((element: T) => string)) => {
        const res: Dictionary<T> = {};
        elements.forEach(e => {
            res[keySelector(e)] = e;
        });
        return res;
    }
};

export default Dictionary;