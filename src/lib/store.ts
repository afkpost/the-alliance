import * as Rx from 'rxjs';

type User = {
    uid: string
};

interface Store {
    stream<T>(path: string): Rx.Observable<T>;
    currentUser(): Rx.Observable<User>;
    signin(): Promise<void>;
    update<T>(path: string, cb: (t: T) => (T | void)): Promise<void>;
    save<T>(path: string, value: T): Promise<void>;
    get<T>(path: string): Promise<T>;
}

export default Store;