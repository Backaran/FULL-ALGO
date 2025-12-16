import { TestRule, testGenerator } from './testGenerator'

const values = Array.from(Array(20).keys()).map(x => x + 1);

const dividerTest = (divider: number) => ((input: number) => input % divider === 0);

const rules: TestRule<number>[] = [
  { id: 'Fizz', test: dividerTest(3) },
  { id: 'Buzz', test: dividerTest(5) },
];

for (const test of testGenerator<number>(values, rules)) {
  const output: string = test.successRules.length === 0
    ? test.value.toString()
    : test.successRules.map(rule => rule.id).join('');
  console.log(output);
}