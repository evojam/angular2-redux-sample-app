interface ObjectConstructor {
    assign<T, S>(target: T, source: S): T & S;
    assign<T, S1, S2>(target: T, source1: S1, source2: S2): T & S1 & S2;
}