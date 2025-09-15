const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const db = require('./services/db-service');
const { authenticateToken } = require('./middleware/auth');

// Set timezone to Santiago, Chile
process.env.TZ = 'America/Santiago';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Protected routes
app.use('/api/clients', authenticateToken, require('./routes/clients'));
app.use('/api/cars', authenticateToken, require('./routes/cars'));
app.use('/api/jobs', authenticateToken, require('./routes/jobs'));
app.use('/api/notifications', authenticateToken, require('./routes/notifications'));

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
  console.log(`🚀 Servidor corriendo en puerto ${port}`);
  console.log(`🌎 Zona horaria configurada: ${process.env.TZ || 'Sistema por defecto'}`);
  console.log(`📅 Hora actual en Santiago: ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}`);
});