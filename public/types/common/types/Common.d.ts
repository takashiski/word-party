export declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
export declare type valueOf<T> = T[keyof T];
