const fs = require('fs');

var template = `exports.api_key = '<api_key>';
exports.cookie = \`
<cookie>
\`
exports.devices = [
  '<device-token>',
];
`

fs.writeFile('envVar.js', template, (error) => {
  if(error) throw error;

  console.log('env generate success');
});

fs.writeFile('log.log', '', (error) => {
  if(error) throw error;

  console.log('log generate success');
})
