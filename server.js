const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const { initPassport } = require('./src/config/passport/passport.config');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Handlebars
const { engine } = require('express-handlebars');
app.engine('handlebars', engine({
  helpers: {
    eq: (a, b) => a === b
  },
  partialsDir: path.join(__dirname, 'src/views/partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));

//Passport
initPassport();
app.use(passport.initialize());

//Rutas
const sessionRoutes = require('./src/routes/api/sessions.routes');
const roomRoutes = require('./src/routes/api/rooms.routes');
const reservationRoutes = require('./src/routes/api/reservations.routes');
const viewRoutes = require('./src/routes/views/public.routes');

app.use('/api/sessions', sessionRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/', viewRoutes);

//Conexiónes
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🟢 Conectado a MongoDB');
    app.listen(PORT, () => console.log(`✅ Servidor activo en http://localhost:${PORT}`));
  })
  .catch(err => console.error('🔴 Error al conectar a MongoDB:', err));
