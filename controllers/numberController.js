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
  if (num < 2) return false;
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
  if (num < 0) return false;
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
  const isNegative = num < 0;
  const digits = Math.abs(num).toString().split("").map(Number);
  const sum = digits.reduce((acc, digit) => acc + digit, 0);

  return isNegative ? -sum : sum;
};

const isValidNumber = (number) => /^-?\d+$/.test(number);

const classifyNumber = async (req, res) => {
  const { number } = req.query;

  // Check if the number parameter is provided
  const trimmedNumber = number?.trim();
  if (!trimmedNumber || !isValidNumber(trimmedNumber)) {
    return res.status(400).json({
      number: number || null,
      error: true,
    });
  }

  const parsedNumber = parseInt(trimmedNumber, 10);

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
