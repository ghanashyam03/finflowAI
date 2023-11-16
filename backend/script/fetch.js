// main file (fetch.js)

const OpenAI = require("openai");
const fs = require('fs');

let total, purpose; // Declare variables

const apiKey = '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';
const fileContent = fs.readFileSync('../bill.txt', 'utf-8');

/**
 * This function generates the total and purpose of a bill from the OpenAI API.
 */
async function generateBillTotalAndPurpose(billText) {
  const openai = new OpenAI({ apiKey });

  // Create a completion request.
  const completionRequest = {
    model: "gpt-3.5-turbo-instruct",
    prompt: billText,
    max_tokens: 100, // Adjust max_tokens as needed
    temperature: 0, // Adjust temperature as needed
  };

  // Send the completion request to the OpenAI API.
  try {
    const completion = await openai.completions.create(completionRequest);
    const completionText = completion.choices[0].text;

    // Adjust the regular expression based on the actual response format.
    const regex = /\[([^\]]+)]/; // Example: Match anything between [ and ]
    const match = completionText.match(regex);

    if (!match) {
      throw new Error("Invalid format in completionText");
    }

    // Extract values using the simplified regular expression.
    const [parsedTotal, parsedPurpose] = match[1].split(",").map((value) => value.trim());

    // Assign values to the variables
    total = parseFloat(parsedTotal);
    purpose = parsedPurpose.replace(/"/g, "");
  } catch (error) {
    throw new Error(`Error in OpenAI API request: ${error.message}`);
  }
}

// Async function to be called
async function fetchData() {
  // Example usage:
  const billText = `forget all the bill i send before
  this is a new bill for which I spend money on. 
  ${fileContent}
  give me what is the total expense for this bill and what is this bill for, like what did i do with the money like did i use this for like food, grocery or others etc.. NOTE : give me the output in an array format... that is like [total, what is this for] ...ex:[7000, food]
  `;

  try {
    // Call the function and handle the result accordingly
    await generateBillTotalAndPurpose(billText);
    console.log(total, purpose);
  } catch (error) {
    console.error(error.message);
  }
}

// Call the asynchronous function
fetchData();

// Export variables directly
module.exports = { total, purpose };
