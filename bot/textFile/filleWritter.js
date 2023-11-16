const fs = require('fs');


function writeToFile(data, filePath) {
    return new Promise((resolve,reject)=>{
        try {
            fs.writeFileSync(filePath, data);
            resolve("data added successfully") 
        } catch (error) {
            reject(error.message)
        }
    })
 
  
}



module.exports=writeToFile