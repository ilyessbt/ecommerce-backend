import { Transform, TransformFnParams } from 'class-transformer';

export const ParseInt = () =>
  Transform(({ value }: TransformFnParams) =>
    Array.isArray(value)
      ? value.map((v) => Number.parseInt(v))
      : Number.parseInt(value),
  );
