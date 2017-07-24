import * as Rx from 'rxjs/Rx';

class Dispatcher {
    private stream = new Rx.Subject<{}>();

    execute(action: {}) {
        this.stream.next(action);
    }

    on<T>(ctor: {new (...args: {}[]): T}, cb: (t: T) => void) {
        this.stream
            .filter(x => x instanceof ctor)
            .subscribe(x => cb(<T> x));
    }

}

export default new Dispatcher();