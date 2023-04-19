const checkIfObject = (obj: unknown): obj is Record<string, unknown> =>
  typeof obj === 'object' && !Array.isArray(obj) && obj !== null;

const arraysEquality = (a: unknown[], b: unknown[]) => {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
};

const checkType = (value: unknown) => {
  if (checkIfObject(value)) {
    return 'object';
  } else if (Array.isArray(value)) {
    return 'array';
  } else if (typeof value === 'object') {
    return 'null';
  } else {
    return typeof value;
  }
};

export function differenceShow(
  baseValue: unknown,
  comparableValue: unknown,
  excludeAdditionalProperties = false,
) {
  // #region check objects difference
  if (checkIfObject(baseValue) && checkIfObject(comparableValue)) {
    const objToCheck = (
      excludeAdditionalProperties
        ? baseValue
        : { ...baseValue, ...comparableValue }
    ) as Record<string, unknown>;

    const differences = Object.keys(objToCheck).reduce((acc, key) => {
      const bV = (baseValue as Record<string, unknown>)[key];
      const cV = (comparableValue as Record<string, unknown>)[key];

      const diff = findDifference(bV, cV, excludeAdditionalProperties);

      if (diff !== undefined) acc[key] = diff;

      return acc;
    }, {} as Record<string, unknown>);

    const differencesCompare = Object.keys(differences).reduce((acc, key) => {
      const bV = (baseValue as Record<string, unknown>)[key];
      const cV = differences[key];

      acc[key] = [bV, cV];

      return acc;
    }, {} as Record<string, unknown>);

    return differencesCompare;
  }
  // #endregion check objects difference

  // #region check arrays difference
  if (
    Array.isArray(baseValue) &&
    Array.isArray(comparableValue) &&
    arraysEquality(baseValue, comparableValue)
  ) {
    return undefined;
  }
  // #endregion check arrays difference

  // #region check types difference
  if (checkType(baseValue) !== checkType(comparableValue)) {
    return `${JSON.stringify(baseValue)} -> ${JSON.stringify(
      comparableValue,
    )}}`;
  }
  // #endregion check types difference

  // #region check values difference
  if ((baseValue as any) !== comparableValue) {
    return JSON.stringify(comparableValue);
  }
  // #endregion check values difference
}

export function findDifference(
  baseValue: unknown,
  comparableValue: unknown,
  excludeAdditionalProperties = false,
) {
  // #region check types difference
  if (checkType(baseValue) !== checkType(comparableValue)) {
    return comparableValue;
  }
  // #endregion check types difference

  // #region check objects difference
  if (checkIfObject(baseValue) && checkIfObject(comparableValue)) {
    const objToCheck = (
      excludeAdditionalProperties
        ? baseValue
        : { ...baseValue, ...comparableValue }
    ) as Record<string, unknown>;

    const differences = Object.keys(objToCheck).reduce((acc, key) => {
      const bV = (baseValue as Record<string, unknown>)[key];
      const cV = (comparableValue as Record<string, unknown>)[key];

      const diff = findDifference(bV, cV, excludeAdditionalProperties);

      if (diff !== undefined) acc[key] = diff;

      return acc;
    }, {} as Record<string, unknown>);

    return differences;
  }
  // #endregion check objects difference

  // #region check arrays difference
  if (
    Array.isArray(baseValue) &&
    Array.isArray(comparableValue) &&
    arraysEquality(baseValue, comparableValue)
  ) {
    return undefined;
  }
  // #endregion check arrays difference

  // #region check values difference
  if ((baseValue as any) !== comparableValue) {
    return comparableValue;
  }
  // #endregion check values difference
}
