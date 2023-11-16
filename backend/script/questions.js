const OpenAI = require("openai");
const fs = require('fs');

const apiKey = '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';
const fileContent = fs.readFileSync('./kill.txt', 'utf-8');

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

    // Get the completion text from the OpenAI response.
    const completionText = completion.choices[0].text;

    // Print completionText for debugging.
    console.log("Completion Text:", completionText);

    // Adjust the regular expression based on the actual response format.
    
    // You might want to return something here based on your use case.
    return completionText;
  } catch (error) {
    // Handle errors appropriately
    throw new Error(`Error in OpenAI API request: ${error.message}`);
  }
}

// Example usage:
const billText = `
${fileContent}
give the response in a strict and straight to the point way and not too big... also the response should be in a very cautious and money-saving manner
`;

try {
  // Call the function and handle the result accordingly
  const result = await generateBillTotalAndPurpose(billText);
  // Do something with the result
} catch (error) {
  console.error(error.message);
}
