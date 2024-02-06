//  npm install quicktype-core

import {
    quicktype,
    InputData,
    jsonInputForTargetLanguage,
  } from "quicktype-core";
  
  async function quicktypeJSON(targetLanguage, typeName, jsonString) {
    const jsonInput = jsonInputForTargetLanguage(targetLanguage);
  
    // We could add multiple samples for the same desired
    // type, or many sources for other types. Here we're
    // just making one type from one piece of sample JSON.
    await jsonInput.addSource({
      name: typeName,
      samples: [jsonString],
    });
  
    const inputData = new InputData();
    inputData.addInput(jsonInput);
  
    return await quicktype({
      inputData,
      lang: targetLanguage,
    });
  }
  
  async function main() {
    const jsonString = `
    {
          "description": {
            "title": "Contiguous U.S., Average Temperature",
            "units": "Degrees Fahrenheit",
            "base_period": "1901-2000"
          },
          "data": {
            "189512": {
              "value": "50.34",
              "anomaly": "-1.68"
            },
            "189612": {
              "value": "51.99",
              "anomaly": "-0.03"
            },
            "189712": {
              "value": "51.56",
              "anomaly": "-0.46"
            }
          }
    }
        `;
    // 語言, className, 要轉的字串
    const { lines } = await quicktypeJSON("csharp", "Person", jsonString);
    const output = lines.join("\n");
    console.log(output);
    return output;
  }
  
  main();
  