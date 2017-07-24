import * as Firebase from 'firebase';
import * as Rx from 'rxjs/Rx';
import Store from './store';

const debug = false;

function log(tag: string, msg: {}) {
    if (debug) {
        console.log(tag, msg);
    }
}

type Configuration = {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string
};

function asPromise(promise: Firebase.Promise<void>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        promise
            .then(() => resolve())
            .catch(err => reject(err));
    });
}

export default class implements Store {
    private db: Firebase.database.Database;
    private auth: Firebase.auth.Auth;

    constructor(conf: Configuration) {
        Firebase.initializeApp(conf);
        this.db = Firebase.database();
        this.auth = Firebase.auth();
    }

    stream<T>(path: string): Rx.Observable<T> {
        return Rx.Observable.create((o: Rx.Observer<T>) => {
            log('streaming', path);
            const cb = (snapshot: Firebase.database.DataSnapshot) => o.next(snapshot.val());
            const ref = this.db.ref(path);
            
            ref.on('value', cb);
            return () => {
                log('closing', path);
                ref.off('value', cb);
            };
        });
    }

    get<T>(path: string) {
        return this.stream<T>(path).first().toPromise();   
    }

    currentUser(): Rx.Observable<Firebase.User> {
        return Rx.Observable.create((o: Rx.Observer<Firebase.User>) => {
            const dispose = this.auth.onAuthStateChanged(o);
            return () => dispose();
        });
    }

    signin() {
        return asPromise(this.auth.signInAnonymously());
    }

    update<T>(path: string, cb: (t: T) => void) {
        return asPromise(this.db.ref(path).transaction(val => {
            val = cb(val) || val;
            return val;
        }));
    }

    save<T>(path: string, value: T) {
        return asPromise(this.db.ref(path).update(value));
    }
}
