const { google } = require('googleapis');
const readline = require('readline');
require('dotenv').config();

API_KEY = process.env.SECRET_KEY

DISCOVERY_URL =
    'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

google.discoverAPI(DISCOVERY_URL)
    .then(client => {
        rl.question('Enter the text: ', (userInput) => {

            const analyzeRequest = {
              comment: {
                text: userInput,
              },
              requestedAttributes: {
                TOXICITY: {},
              },
            };
            client.comments.analyze(
                {
                  key: API_KEY,
                  resource: analyzeRequest,
                },
                (err, response) => {
                  if (err) throw err;

                  const toxicityScore = response.data.attributeScores.TOXICITY.summaryScore.value;
                  console.log(`Toxicity Score: ${toxicityScore}`);

                  const toxicThreshold = 0.5;

                  if(toxicityScore >= toxicThreshold) {
                    console.log('text is classified as toxic ;)')
                  } else {
                    console.log('Text is classified as not toxic :)');
                  }

                  rl.close();
                });
        })

    })
    .catch(err => {
      throw err;
    });