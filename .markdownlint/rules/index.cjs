module.exports = process.env.NODE_ENV === 'cli' ? {
  "default": false,
  "DPW001": true,
  "DPW002": true,
  "DPW003": true,
} : {
  "default": true,
  "MD013": false,
  "MD033": false,
};