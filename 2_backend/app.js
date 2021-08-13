import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Models
import Model from './models/modelModel.js';
import Vehicle from './models/vehicleModel.js';

// Conecting mongoDb
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((response) => {
    console.log(`connected to mongdb`);
    app.listen(process.env.PORT, () =>
      console.log(`:) server is running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));

// midlewares
app.use(cors());
app.use(express.json());

// controllers
import {
  getModels,
  postModel,
  vehicleCountByModel,
} from './controllers/modelController.js';
import {
  getVehicles,
  postVehicle,
  getVehiclesByCountry,
} from './controllers/vehicleController.js';
// Routes
// --- MODELS ---
// GET
app.get('/models', getModels);

app.get('/modelscount', vehicleCountByModel);
// POST model
app.post('/models', postModel);
// --- VEHICLES
// GET /vehicles
//(paduos visus automobilius, kur model_id taps model name ir hour_price [su join padaryti]). Čia, automobilių kaina grąžinama su PVM.
app.get('/vehicles', getVehicles);
// POST vehicle
app.post('/vehicles', postVehicle);

app.get('/vehicles/:country', getVehiclesByCountry);
