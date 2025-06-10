export const objectsUtil = {
  mapObjectByAttributes<T, K extends Partial<T> = Partial<T>>(
    object: T,
    attributes: (keyof T)[]
  ): K {
    const result: Partial<T> = {};

    attributes.forEach((attribute) => {
      result[attribute] = object[attribute];
    });

    return result as K;
  },
};
