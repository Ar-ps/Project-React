// src/server.ts
import app from './app';
import { sequelize } from './config/db';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected');
    // await sequelize.sync({ alter: true });
    const PORT = 5000;
    app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}`));
  } catch (e) {
    console.error('DB error', e);
    process.exit(1);
  }
  // LOG setiap request (opsional, kalau belum)
app.use((req, _res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// ERROR HANDLER GLOBAL — letakkan SEBELUM 404 handler
// (kalau 404 handler kamu sudah ada, pastikan error handler diletakkan sebelum itu)
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('🔥 Uncaught error:', err?.message);
  if (err?.stack) console.error(err.stack);
  res.status(err?.status || 500).json({
    message: err?.message || 'Internal Server Error',
  });
});

// 404 (di paling akhir)
app.use((req, res) => {
  console.error('[404]', req.method, req.originalUrl);
  res.status(404).json({ message: 'Not found' });
});

})();
