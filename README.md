# Number Classification API

This API returns interesting mathematical properties of a given number, along with a fun fact in JSON format.

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) 
- [Git](https://git-scm.com/)

### Running the Project Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/malachsalama/number-classification-api.git
   cd number-classification-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```
4. Access the API at `http://localhost:3000/api/classify-number?number=371`

---

## API Documentation

### Endpoint

- **URL:** `https://number-classification-api-lyart.vercel.app/`
- **Method:** `GET`
- **Query Parameter:**
    - `number`(required) – the integer you want to classify.
 
### Example Usage

Visit `https://number-classification-api-lyart.vercel.app/api/classify-number?number=371`

### Response Format

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is a narcissistic number."
}

```
### Error Response (400 Bad Request)
```json
{
  "number": "alphabet",
  "error": true
}
```
## Related Links
- [Interested in Node.js developers? Visit HNG](https://hng.tech/hire/nodejs-developers)
