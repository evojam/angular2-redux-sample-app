// Type definitions for monet.js v0.8.7
// Project: https://github.com/cwmyers/monet.js
// Definitions by: Jakub Strojewski <https://github.com/ulfryk>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare namespace monet {

    function apply2<T>(a1: Monad<T>, a2: Monad<T>, f: Function): Monad<T>;

    interface Monad<T> {
        bind<V>(fn: (val: T) => Monad<V>): Monad<V>;
        flatMap<V>(fn: (val: T) => Monad<V>): Monad<V>;
        chain<V>(fn: (val: T) => Monad<V>): Monad<V>;
        map<V>(fn: (val: T) => V): Monad<V>;
        join<V>(): Monad<V>; // if T is Monad<V>
        takeLeft(m: Monad<T>): Monad<T>;
        takeRight(m: Monad<T>): Monad<T>;
    }

    interface IMonadStatic extends Function {
        <T>(val: T): Monad<T>;
        new <T>(val: T): Monad<T>;
        //of()
        map2<T, V, N>(fn: (val1: T, val2: V) => N): (m1: Monad<T>, m2: Monad<V>) => Monad<N>;
    }

    class Identity<T> implements Monad<T> {
        constructor(value: T);
        map<V>(fn: (val: T) => V): Identity<V>;
        bind<V>(fn: (val: T) => Identity<V>): Identity<V>;
        flatMap<V>(fn: (val: T) => Identity<V>): Identity<V>;
        chain<V>(fn: (val: T) => Identity<V>): Identity<V>;
        init<V>(val: V): void;
        get(): T;
        join<V>(): Identity<V>; // if T is Identity<V>
        takeLeft(m: Identity<T>): Identity<T>;
        takeRight(m: Identity<T>): Identity<T>;
    }

    interface IIdentityStatic extends IMonadStatic {
        <V>(value: V): Identity<V>;
        new <V>(value: V): Identity<V>;
    }

    class Maybe<T> implements Monad<T> {
        static Some: ISomeStatic;
        static None: INoneStatic;
        static Just: ISomeStatic;
        static Nothing: INoneStatic;
        static fromNull<V>(val: V): Maybe<V>;

        init<T>(isValue: boolean, val?: T): void;

        map<V>(fn: (val: T) => V): Maybe<V>;

        filter(fn: (val: T) => boolean): Maybe<T>;

        bind<V>(fn: (val: T) => Maybe<V>): Maybe<V>;
        flatMap<V>(fn: (val: T) => Maybe<V>): Maybe<V>;
        chain<V>(fn: (val: T) => Maybe<V>): Maybe<V>;

        join<V>(): Maybe<V>; // if T is Identity<V>
        takeLeft(m: Maybe<T>): Maybe<T>;
        takeRight(m: Maybe<T>): Maybe<T>;

        cata<Z>(none: () => Z, some: (val: T) => Z): Z;

        isSome(): boolean;
        isJust(): boolean;
        isNone(): boolean;
        isNothing(): boolean;

        some(): T;
        just(): T;

        orSome(val: T): T;
        orJust(val: T): T;

        orElse(maybe: Maybe<T>): Maybe<T>;

        ap<V>(maybeFn: Maybe<(val: T) => V>): Maybe<V>;

        toList(): List<T>;
        toEither<E>(fail?: E): Either<E, T>;
        toValidation<E>(fail?: E): Validation<E, T>;

        fold<V>(val: V): (fn: (val: T) => V) => V;
    }

    interface ISomeStatic {
        <V>(value: V): Maybe<V>;
        new <V>(value: V): Maybe<V>;
    }

    var Some: ISomeStatic;
    var Just: ISomeStatic;

    interface INoneStatic {
        <V>(): Maybe<V>;
        new <V>(): Maybe<V>;
    }

    var None: INoneStatic;
    var Nothing: INoneStatic;

    interface IMaybeStatic extends IMonadStatic {
        Some<V>(value: V): Maybe<V>;
        None<V>(): Maybe<V>;
        fromNull<V>(val: V): Maybe<V>;
    }

    class Either<E, T> implements Monad<T> {
        static Right: IRightStatic;
        static Left: ILeftStatic;

        map<V>(fn: (val: T) => V): Either<E, V>;

        bind<V>(fn: (val: T) => Either<E, V>): Either<E, V>;
        flatMap<V>(fn: (val: T) => Either<E, V>): Either<E, V>;
        chain<V>(fn: (val: T) => Either<E, V>): Either<E, V>;

        join<V>(): Either<E, V>; // if T is Either<V>
        takeLeft(m: Either<E, T>): Either<E, T>;
        takeRight(m: Either<E, T>): Either<E, T>;

        ap<V>(eitherFn: Either<E, (val: T) => V>): Either<E, V>;

        cata<Z>(leftFn: (err: E) => Z, rightFn: (val: T) => Z): Z;

        bimap<Z, V>(leftFn: (err: E) => Z, rightFn: (val: T) => V): Either<Z, V>;

        isRight(): boolean;
        isLeft(): boolean;

        right(): T;
        left(): E;

        toValidation(): Validation<E, T>;

        toMaybe(): Maybe<T>;
    }

    interface IRightStatic {
        <F, V>(val: V): Either<F, V>;
        new <F, V>(val: V): Either<F, V>;
    }

    var Right: IRightStatic;

    interface ILeftStatic {
        <F, V>(val: F): Either<F, V>;
        new <F, V>(val: F): Either<F, V>;
    }

    var Left: ILeftStatic;

    interface IEitherStatic extends IMonadStatic {
        Right<F, V>(val: V): Either<F, V>;
        Left<F, V>(val: F): Either<F, V>;
    }

    class Validation<E, T> implements Monad<T> {
        static success<E, T>(val: T): Validation<E, T>;
        static fail<E, T>(err: E): Validation<E, T>;
        bind<V>(fn: (val: T) => Validation<E, V>): Validation<E, V>;
        flatMap<V>(fn: (val: T) => Validation<E, V>): Validation<E, V>;
        chain<V>(fn: (val: T) => Validation<E, V>): Validation<E, V>;
        map<V>(fn: (val: T) => V): Validation<E, V>;
        isSuccess(): boolean;
        isFail(): boolean;
        success(): T;
        fail(): E;
        ap<V>(eitherFn: Validation<E, (val: T) => V>): Validation<E, V>;
        cata<Z>(failFn: (err: E) => Z, successFn: (val: T) => Z): Z;
        toEither(): Either<E, T>;
        toMaybe(): Maybe<T>;
        join<V>(): Validation<E, V>; // if T is Validation<E, V>
        takeLeft(m: Validation<E, T>): Validation<E, T>;
        takeRight(m: Validation<E, T>): Validation<E, T>;
    }

    interface IValidationStatic extends IMonadStatic {
        success<E, T>(val: T): Validation<E, T>;
        fail<E, T>(err: E): Validation<E, T>;
    }

    interface ListFoldLeftFn<A, B> {
        (acc: B, element: A): B;
    }

    interface ListFoldRightFn<A, B> {
        (element: A, acc: B): B;
    }

    class List<T> {
        cons(a: T): List<T>;
        map<V>(fn: (val: T) => V): List<V>;
        bind<V>(fn: (val: T) => List<V>): List<V>;
        flatMap<V>(fn: (val: T) => List<V>): List<V>;
        head(): T;
        headMaybe(): Maybe<T>;
        filter(fn: (val: T) => boolean): List<T>;
        foldLeft<V>(initial: V): (fn: ListFoldLeftFn<T, V>) => V;
        foldRight<V>(initial: V): (fn: ListFoldRightFn<T, V>) => V;
        append(list: List<T>): List<T>;
        concat(list: List<T>): List<T>;

        // if T extends Monad<V>
        //sequence<V>(m: IMonadStatic): Monad<List<V>>;
        //sequence<E, V>(m: IMaybeStatic): Maybe<List<V>>;
        //sequence<E, V>(m: IEitherStatic): Either<E, List<V>>;
        //sequence<E, V>(m: IValidationStatic): Validation<List<E>, List<V>>;
        //
        //sequence<U extends IMonadStatic, R extends Monad<List<any>>>(m: U): R;

        //sequenceMaybe<V, T extends Maybe<V>>(): Maybe<List<V>>;
        //sequenceEither<E, V, T extends Either<E, V>>(): Either<E, List<V>>;
        //sequenceValidation<E, V, T extends Validation<E, V>>(): Validation<List<E>, List<V>>;
        //sequenceIO<V, T extends IO<V>>(): IO<List<V>>;
        //sequenceReader<V, T extends Reader<V>>(): Reader<List<V>>;
        reverse(): List<T>;
    }

    interface IListStatic {
        <T>(val: T, tail: List<T>): List<T>;
    }

    class IO<T> implements Monad<T> {
        constructor(fn: () => T);
        bind<V>(fn: (val: T) => IO<V>): IO<V>;
        flatMap<V>(fn: (val: T) => IO<V>): IO<V>;
        chain<V>(fn: (val: T) => IO<V>): IO<V>;
        map<V>(fn: (val: T) => V): IO<V>;
        run(): void;
        perform(): void;
        join<V>(): IO<V>; // if T is IO<V>
        takeLeft(m: IO<T>): IO<T>;
        takeRight(m: IO<T>): IO<T>;
    }

    interface IIOStatic {
        <T>(fn: () => T): IO<T>;
    }

}

declare module "monet" {
    export = monet;
}

//declare var Identity: monet.IIdentityStatic;
//declare var Maybe: monet.IMaybeStatic;
//declare var Just: monet.ISomeStatic;
//declare var Some: monet.ISomeStatic;
//declare var None: monet.INoneStatic;
//declare var Nothing: monet.INoneStatic;
//
//declare var Either: monet.IEitherStatic;
//
//declare var Validation: monet.IValidationStatic;
//
//declare var List: monet.IListStatic;
//
//declare var IO: monet.IIOStatic;