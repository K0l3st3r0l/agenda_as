const express = require('express');
const cron = require('node-cron');
const db = require('./services/db-service');

const app = express();
const port = 3001;

app.use(express.json());

// Initialize database
require('./services/db-service');

// Routes
app.use('/api/clients', require('./routes/clients'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/notifications', require('./routes/notifications'));

// Cron job for reminders (runs every day at 9 AM)
cron.schedule('0 9 * * *', () => {
  console.log('Checking for upcoming jobs...');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split('T')[0];

  db.all('SELECT j.*, c.email FROM jobs j JOIN clients c ON j.client_id = c.id WHERE j.scheduled_date LIKE ? AND j.status = "pending"', [`${dateStr}%`], (err, rows) => {
    if (err) {
      console.error('Error fetching jobs:', err);
      return;
    }
    rows.forEach(job => {
      // Here you would send email using nodemailer
      console.log(`Sending reminder for job ${job.id} to ${job.email}`);
      // Implement email sending logic here
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});