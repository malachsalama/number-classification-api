const axios = require("axios");

// Check if a number is prime
const isPrime = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Check if a number is perfect
const isPerfect = (num) => {
  let sum = 1;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num;
};

// Check if a number is an Armstrong number
const isArmstrong = (num) => {
  const digits = num.toString().split("");
  const power = digits.length;
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(parseInt(digit), power),
    0
  );
  return sum === num;
};

// Calculate the sum of digits
const digitSum = (num) => {
  return num
    .toString()
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit), 0);
};

const classifyNumber = async (req, res) => {
  const { number } = req.query;

  // Check if the number parameter is provided
  if (!number) {
    return res.status(400).json({
      number: "alphabet",
      error: true,
    });
  }

  const parsedNumber = parseInt(number, 10);

  // Check if the provided number is a valid integer
  if (isNaN(parsedNumber)) {
    return res.status(400).json({
      number: number,
      error: true,
    });
  }

  const properties = [];
  if (isArmstrong(parsedNumber)) properties.push("armstrong");
  properties.push(parsedNumber % 2 === 0 ? "even" : "odd");

  try {
    const response = await axios.get(
      `http://numbersapi.com/${parsedNumber}/math`
    );
    const fun_fact = response.data;

    return res.json({
      number: parsedNumber,
      is_prime: isPrime(parsedNumber),
      is_perfect: isPerfect(parsedNumber),
      properties,
      digit_sum: digitSum(parsedNumber),
      fun_fact,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch fun fact." });
  }
};

module.exports = { classifyNumber };
