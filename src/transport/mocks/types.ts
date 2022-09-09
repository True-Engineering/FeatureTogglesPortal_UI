export type NullAsUndefined<T> = {
  [key in keyof T]: T[key] extends Array<infer Ar>
    ? Array<NullAsUndefined<Ar>>
    : undefined extends T[key]
    ? NullAsUndefined<T[key]> | null
    : NullAsUndefined<T[key]>;
};
