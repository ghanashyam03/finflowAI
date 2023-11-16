const Tesseract = require('tesseract.js');
const fs = require('fs');

function extractTextFromImage(imagePath) {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(
      imagePath,
      'eng', // Language code, you may need to adjust this based on your language
      {
        logger: (info) => {
          console.log(info); // Log OCR progress and debug information
        },
      }
    )
      .then(({ data: { text } }) => {
        console.log(text);
        resolve(text);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Example usage




module.exports=extractTextFromImage