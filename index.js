const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(cors());

const config = {
  user: 'consultas',
  password: 'ConsultaVerona',
  server: '192.168.15.47',
  database: 'ERP50',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    instanceName: 'SQLEXPRESS'
  }
};

// Ruta principal para probar que la API está viva
app.get('/', (req, res) => {
  res.send('✅ API funcionando. Usa /datos para ver los datos de SQL Server.');
});

// Ruta para consultar los datos
app.get('/datos', async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM cuentasconceptos');
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en la conexión');
  }
});

app.listen(3000, () => {
  console.log('API ejecutándose en http://localhost:3000');
});