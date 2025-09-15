const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

// Create database path
const dbPath = path.join(__dirname, 'db/agenda.db');
console.log('Database path:', dbPath);
console.log('Current directory:', __dirname);
console.log('Database file exists:', require('fs').existsSync(dbPath));

// Connect to SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Connected to SQLite database.');
  populateDatabase();
});

// Sample data for Chilean clients
const clientsData = [
  { name: 'María González', email: 'maria.gonzalez@email.cl', phone: '+56912345678' },
  { name: 'Carlos Rodríguez', email: 'carlos.rodriguez@email.cl', phone: '+56923456789' },
  { name: 'Ana Martínez', email: 'ana.martinez@email.cl', phone: '+56934567890' },
  { name: 'Pedro Sánchez', email: 'pedro.sanchez@email.cl', phone: '+56945678901' },
  { name: 'Laura López', email: 'laura.lopez@email.cl', phone: '+56956789012' },
  { name: 'Diego Torres', email: 'diego.torres@email.cl', phone: '+56967890123' },
  { name: 'Valentina Ramírez', email: 'valentina.ramirez@email.cl', phone: '+56978901234' },
  { name: 'Felipe Herrera', email: 'felipe.herrera@email.cl', phone: '+56989012345' },
  { name: 'Camila Morales', email: 'camila.morales@email.cl', phone: '+56990123456' },
  { name: 'Sebastián Castro', email: 'sebastian.castro@email.cl', phone: '+56901234567' }
];

// Sample cars data (Chilean market)
const carsData = [
  // Cliente 1 - María González
  [
    { make: 'Chevrolet', model: 'Sail', year: 2022, license_plate: 'AB-CD-12' },
    { make: 'Kia', model: 'Rio', year: 2021, license_plate: 'EF-GH-34' }
  ],
  // Cliente 2 - Carlos Rodríguez
  [
    { make: 'Hyundai', model: 'Creta', year: 2023, license_plate: 'IJ-KL-56' }
  ],
  // Cliente 3 - Ana Martínez
  [
    { make: 'Toyota', model: 'Corolla', year: 2020, license_plate: 'MN-OP-78' },
    { make: 'Suzuki', model: 'Swift', year: 2022, license_plate: 'QR-ST-90' }
  ],
  // Cliente 4 - Pedro Sánchez
  [
    { make: 'Nissan', model: 'Versa', year: 2021, license_plate: 'UV-WX-12' }
  ],
  // Cliente 5 - Laura López
  [
    { make: 'Mazda', model: 'Mazda3', year: 2023, license_plate: 'YZ-AB-34' },
    { make: 'Peugeot', model: '208', year: 2022, license_plate: 'CD-EF-56' }
  ],
  // Cliente 6 - Diego Torres
  [
    { make: 'Volkswagen', model: 'Virtus', year: 2021, license_plate: 'GH-IJ-78' }
  ],
  // Cliente 7 - Valentina Ramírez
  [
    { make: 'Honda', model: 'City', year: 2022, license_plate: 'KL-MN-90' },
    { make: 'Renault', model: 'Logan', year: 2020, license_plate: 'OP-QR-12' }
  ],
  // Cliente 8 - Felipe Herrera
  [
    { make: 'Ford', model: 'Focus', year: 2023, license_plate: 'ST-UV-34' }
  ],
  // Cliente 9 - Camila Morales
  [
    { make: 'Citroën', model: 'C4 Cactus', year: 2021, license_plate: 'WX-YZ-56' }
  ],
  // Cliente 10 - Sebastián Castro
  [
    { make: 'Mitsubishi', model: 'L200', year: 2022, license_plate: 'AB-CD-78' },
    { make: 'Jeep', model: 'Compass', year: 2023, license_plate: 'EF-GH-90' }
  ]
];

// Sample jobs data
const jobsData = [
  {
    clientIndex: 0, // María González
    carIndex: 0, // Chevrolet Sail
    description: 'Instalación de alarma volumétrica con sensor de movimiento y sirena',
    scheduledDate: '2025-09-20T10:00:00',
    status: 'pending'
  },
  {
    clientIndex: 2, // Ana Martínez
    carIndex: 1, // Suzuki Swift
    description: 'Corte de corriente para instalación de accesorios eléctricos',
    scheduledDate: '2025-09-18T14:30:00',
    status: 'pending'
  },
  {
    clientIndex: 4, // Laura López
    carIndex: 0, // Mazda Mazda3
    description: 'Trabajos eléctricos: instalación de cargador inalámbrico y luces LED',
    scheduledDate: '2025-09-22T09:00:00',
    status: 'completed'
  },
  {
    clientIndex: 6, // Valentina Ramírez
    carIndex: 0, // Honda City
    description: 'Reposición de llave de auto con chip transponder - llave original perdida',
    scheduledDate: '2025-09-25T11:15:00',
    status: 'pending'
  },
  {
    clientIndex: 8, // Camila Morales
    carIndex: 0, // Citroën C4 Cactus
    description: 'Instalación completa de alarma con GPS y aplicación móvil',
    scheduledDate: '2025-09-19T16:00:00',
    status: 'pending'
  }
];

async function populateDatabase() {
  console.log('🧹 Limpiando datos existentes...');

  // Clear existing data (except admin user)
  await runQuery('DELETE FROM jobs');
  await runQuery('DELETE FROM cars');
  await runQuery('DELETE FROM clients');

  console.log('📝 Insertando 10 clientes de prueba...');

  // Insert clients
  const clientIds = [];
  for (const client of clientsData) {
    const result = await runQuery(
      'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)',
      [client.name, client.email, client.phone]
    );
    clientIds.push(result.lastID);
    console.log(`✅ Cliente creado: ${client.name}`);
  }

  console.log('🚗 Insertando vehículos para los clientes...');

  // Insert cars for each client
  const carIds = [];
  for (let i = 0; i < clientsData.length; i++) {
    const clientCars = carsData[i];
    const clientCarIds = [];

    for (const car of clientCars) {
      const result = await runQuery(
        'INSERT INTO cars (client_id, make, model, year, license_plate) VALUES (?, ?, ?, ?, ?)',
        [clientIds[i], car.make, car.model, car.year, car.license_plate]
      );
      clientCarIds.push(result.lastID);
      console.log(`✅ Vehículo creado: ${car.make} ${car.model} para ${clientsData[i].name}`);
    }
    carIds.push(clientCarIds);
  }

  console.log('🔧 Insertando 5 trabajos de prueba...');

  // Insert jobs
  for (const job of jobsData) {
    const clientId = clientIds[job.clientIndex];
    const carId = carIds[job.clientIndex][job.carIndex];

    await runQuery(
      'INSERT INTO jobs (client_id, car_id, description, scheduled_date, status) VALUES (?, ?, ?, ?, ?)',
      [clientId, carId, job.description, job.scheduledDate, job.status]
    );

    const clientName = clientsData[job.clientIndex].name;
    const carInfo = carsData[job.clientIndex][job.carIndex];
    console.log(`✅ Trabajo creado: ${job.description.split(' - ')[0]} para ${clientName} (${carInfo.make} ${carInfo.model})`);
  }

  console.log('\n🎉 ¡Base de datos poblada exitosamente!');
  console.log('📊 Resumen:');
  console.log(`   👥 ${clientsData.length} clientes creados`);
  console.log(`   🚗 ${carsData.flat().length} vehículos creados`);
  console.log(`   🔧 ${jobsData.length} trabajos creados`);

  console.log('\n📋 Servicios incluidos:');
  console.log('   • Instalación de alarmas');
  console.log('   • Corte de corriente');
  console.log('   • Trabajos eléctricos');
  console.log('   • Reposición de llaves con chip');

  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
}

function runQuery(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }
    });
  });
}