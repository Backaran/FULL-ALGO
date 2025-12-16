enum FizzBuzzEnum {
    Fizz = 1,
    Buzz = 2,
}

type Rule = {
    divider: number; 
    content: FizzBuzzEnum;
}

type Result = {
    index: number;
    results: FizzBuzzEnum[];
}

function* fizzbuzz (
    start: number,
    end: number,
    rules: Rule[]
): Generator<Result> { 
    if (start > end) {
        throw new Error("start must be less than or equal to end");
    }
    if (!rules || rules.length === 0) {
        throw new Error("rules cannot be null or empty");
    }
    if (rules.some(rule => rule.divider === 0)) {
        throw new Error("rules cannot contain a zero divider");
    }
    for (let i = start; i <= end; i++) {
        const results: FizzBuzzEnum[] = rules
            .filter(rule => i % rule.divider === 0)
            .map(rule => rule.content);
        yield ({ index: i, results });
    }
};

const rules: Rule[] = [
    { divider: 3, content: FizzBuzzEnum.Fizz },
    { divider: 5, content: FizzBuzzEnum.Buzz },
];

const renderFizzBuzz: Record<FizzBuzzEnum, string> = {
  [FizzBuzzEnum.Fizz]: "Fizz",
  [FizzBuzzEnum.Buzz]: "Buzz",
};

const withBonus: boolean = false;

for (const test of fizzbuzz(1, 20, rules)) {
    const output: string = test.results.length === 0
        ? test.index.toString()
        : test.results.map(result => renderFizzBuzz[result]).join('');
    console.log(output);
    if (withBonus && rules.length == test.results.length) {
        break;
    }
}
