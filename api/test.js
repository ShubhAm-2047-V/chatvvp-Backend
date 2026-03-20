module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    message: 'API working 🚀',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
};
