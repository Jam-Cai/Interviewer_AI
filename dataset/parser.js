const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const inputFilePath = path.join(__dirname, 'dataset.csv');
const outputFilePath = path.join(__dirname, 'problems.json');

const output = [];

fs.createReadStream(inputFilePath)
  .on('error', (err) => {
    console.error('Error reading CSV file:', err);
  })
  .pipe(csv())
  .on('data', (row) => {
    const id = row['id'];
    const title = row['title'];
    const difficulty = row['difficulty'];


    const description = row['description'];


    const descriptionPortions = description.split(/\n+Example \d+:\n+/);
    
    let explanation = "";
    let examples = [];
    let constraints = "";

    for (let i = 0; i < descriptionPortions.length; i++) {
      if (i === 0) {
        explanation = descriptionPortions[i].trim();
      } else if (i === descriptionPortions.length - 1) {
        const parts = descriptionPortions[i].split("\n\nConstraints:\n");
        if (parts.length > 1) {
          examples.push(parts[0].trim());
          constraints = parts[1].trim();
        } else {
          examples.push( descriptionPortions[i].trim());
        }
      } else {
        examples.push(descriptionPortions[i].trim());
      }
    }

    const entry = {
      id: id,
      title: title,
      difficulty: difficulty,
      explanation: explanation,
      examples: examples,
      constraints: constraints
    };

    output.push(entry);
  })
  .on('end', () => {
    fs.writeFile(outputFilePath, JSON.stringify(output, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('JSON file successfully saved to', outputFilePath);
      }
    });
  });