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

// Calculating the sum of digits
const digitSum = (num) => {
  return num
    .toString()
    .split("")
    .reduce((acc, digit) => acc + parseInt(digit), 0);
};

const classifyNumber = async (req, res) => {
  const { number } = req.query;
  const num = parseInt(number);

  if (isNaN(num)) {
    return res.status(400).json({ number, error: true });
  }

  const properties = [];
  if (isArmstrong(num)) properties.push("armstrong");
  properties.push(num % 2 === 0 ? "even" : "odd");

  try {
    const response = await axios.get(`http://numbersapi.com/${num}/math`);
    const fun_fact = response.data;

    return res.json({
      number: num,
      is_prime: isPrime(num),
      is_perfect: isPerfect(num),
      properties,
      digit_sum: digitSum(num),
      fun_fact,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch fun fact." });
  }
};

module.exports = { classifyNumber };
