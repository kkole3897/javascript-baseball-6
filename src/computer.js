import { MissionUtils } from "@woowacourse/mission-utils";

const NUMBER_LENGTH = 3;
const MIN_NUMBER = 1;
const MAX_NUMBER = 9;

const toUniqueNumbers = (answer) => {
  const numbers = [
    ...new Set(
      answer
        .split("")
        .map((character) => parseInt(character))
    )
  ];

  return numbers;
}

class Computer {
  constructor() {
    this.numbers = [];
  }

  selectNumbers() {
    const numbers = [];

    while (numbers.length < NUMBER_LENGTH) {
      const number = MissionUtils.Random.pickNumberInRange(MIN_NUMBER, MAX_NUMBER);

      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }

    this.numbers = [...numbers];
  }

  getNumbers() {
    return [...this.numbers];
  }

  static validateAnswerLength(answer) {
    return answer.length === NUMBER_LENGTH;
  }

  static validateAnswerCharacter(answer) {
    const pattern = /^[1-9]*$/;

    return pattern.test(answer);
  }

  static validateAnswerUnique(answer) {
    const uniqueNumbers = toUniqueNumbers(answer);

    return uniqueNumbers.length === NUMBER_LENGTH;
  }

  calculateResult(answer) {
    const userNumbers = toUniqueNumbers(answer);

    const result = userNumbers.reduce((result, userNumber, index) => {
      const { strike, ball } = result;

      const matchedIndex = this.numbers.findIndex((computerNumber) => userNumber === computerNumber);

      if (matchedIndex === index) {
        return {
          ball,
          strike: strike + 1
        };
      } else if (matchedIndex !== -1) {
        return {
          strike,
          ball: ball + 1
        };
      } else {
        return {
          ball,
          strike,
        };
      }
    }, {
      strike: 0,
      ball: 0,
    });

    return result;
  }
}

export default Computer;