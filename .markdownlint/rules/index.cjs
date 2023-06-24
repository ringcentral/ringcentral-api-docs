module.exports = process.env.NODE_ENV === 'cli' ? {
  "default": false,
  "DPW001": true,
  "DPW002": true,
  "DPW003": true,
  "MD013": false,
} : {
  "default": true,
  "MD013": false,
  "MD033": false,
  "DPW003": true,
};