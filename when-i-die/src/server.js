const express = require('express');
const path = require('path');
const { generatePDF } = require('./pdf');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/api/generate-pdf', (req, res) => {
  const data = req.body;

  if (!data || !data.documentTitle) {
    return res.status(400).json({ error: 'Missing required document data' });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="when-i-die-${Date.now()}.pdf"`
  );

  const doc = generatePDF(data);
  doc.pipe(res);
  doc.end();
});

app.listen(PORT, () => {
  console.log(`When I Die app running at http://localhost:${PORT}`);
});
