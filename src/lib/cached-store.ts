import Store from './store';
import * as Rx from 'rxjs';

type Dictionary = {[key: string]: {}};

export default class implements Store {

    private cache: Dictionary = {};

    constructor(private decoratee: Store) {}

    stream<T>(path: string) {
        return Rx.Observable.create((o: Rx.Observer<T>) => {
            const cached = this.cache[path];
            if (cached != null) {
                o.next(cached as T);
            }

            const subscription = this.decoratee.stream<T>(path).subscribe(x => {
                this.cache[path] = x;
                o.next(x);
            });

            return () => subscription.unsubscribe();
        });
    }

    currentUser() {
        return this.decoratee.currentUser();
    }

    signin() {
        return this.decoratee.signin();
    }

    update<T>(path: string, cb: (t: T) => void) {
        return this.decoratee.update(path, cb);
    }

    save<T>(path: string, value: T) {
        return this.decoratee.save(path, value);
    }

    get<T>(path: string) {
        return this.decoratee.get<T>(path);
    }
}