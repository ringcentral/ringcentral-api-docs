module.exports = process.env.NODE_ENV === 'cli' 
  ? require('./ci.cjs') 
  : require('./vscode.cjs');