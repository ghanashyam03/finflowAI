import OpenAI from "openai";

const openai = new OpenAI({apiKey: "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"});

async function main() {
  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `this is a bill for which I spend money on. 

        HOTEL XYZ
Address: 123 ABC Street, City
Phone: +91 123 456 7890
GSTIN: 12ABCDE1234F1Z5
Invoice No: 20231111001
Date: November 11, 2023


Description     Quantity   Price   Total

1. Paneer Butter Masala   2 servings   ₹200.00   ₹400.00
2. Chicken Biryani       1 serving    ₹250.00   ₹250.00
3. Garlic Naan          3 pieces     ₹30.00    ₹90.00
4. Mineral Water Bottle 2 bottles    ₹20.00    ₹40.00
5. Gulab Jamun           4 pieces     ₹40.00    ₹40.00

        Subtotal      ₹820.00
        GST (18%)       ₹147.60
        Service Charge (5%)   ₹41.00
        Total       ₹1,008.60


Thank you for dining with us! Please visit again.

give me what is the total for this bill and what is this bill for like why did i use this for like food, grocery or others etc.. NOTE : give me the output in a array format... that is like [total, what is this for] ...ex:[7000, food]`,
    max_tokens: 50,
    temperature: 0,
  });

  // Try to parse the completion string using the eval() function.
  try {
    const completionArray = eval(completion);

    console.log(completion)
  } catch (error) {
    // If the completion string cannot be parsed using the eval() function, then it is not a valid completion.
    console.log("The completion string is not a valid JSON.");
  }
}

main();