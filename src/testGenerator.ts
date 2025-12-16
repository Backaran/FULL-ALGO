export interface TestRule<T> {
  id: string;
  test: (input: T) => boolean;
}

export type TestResult<T> = {
  value: T;
  successRules: TestRule<T>[];
}

export function* testGenerator<T>(
  values: Iterable<T>,
  rules: TestRule<T>[]
): Generator<TestResult<T>> {
  for (const value of values) {
    yield ({
      value,
      successRules: rules.filter(rule => rule.test(value))
    });
  }
};