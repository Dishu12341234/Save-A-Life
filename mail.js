const crypto = require('crypto');
const fs = require('fs');


function generateSecureId(length = 16) {
  if (length <= 0 || typeof length !== 'number') {
      throw new Error('Invalid length for secure ID');
  }

  const bytes = crypto.randomBytes(Math.ceil(length / 2));
  return bytes.toString('hex').slice(0, length);
}

let x = []

for(let i = 0; i < 10000; i++)
{
  x.push(generateSecureId(4))
}

console.log(x)


fs.writeFile('./test.txt', `${x}`, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});