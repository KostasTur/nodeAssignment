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
import vehicleCountByModel from './controllers/modelscountController.js';
// Routes
// --- MODELS ---
// GET
app.get('/models', (req, res) => {
  Model.find({})
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});
app.get('/modelscount', async (req, res) => {
  const modelsAndCars = await Model.aggregate([
    {
      $lookup: {
        from: 'vehicles', //The collection you're getting the items from
        localField: '_id', //The local field you're using to lookup
        foreignField: 'model_id', //The field the document you're using to match
        as: 'vehicles', //The name of the field that will be populated with the results
      },
    },
    { $addFields: { vehicles_count: { $size: '$vehicles' } } },
    // select onli the relevant fields
    { $project: { vehicles: 0 } },
  ]);
  res.json(modelsAndCars);
});
// butu galima padaryti validationa kad neleistu tokio pacio unique contraint ar pan
// POST model
app.post('/models', (req, res) => {
  const model = new Model(req.body);
  model
    .save()
    .then((response) => res.json({ response, message: 'New Model saved' }))
    .catch((err) =>
      res.json({
        err,
        message: 'Model name is alredy used. Please inserst unique model name',
      })
    );
});
// --- VEHICLES
// GET /vehicles
//(paduos visus automobilius, kur model_id taps model name ir hour_price [su join padaryti]). Čia, automobilių kaina grąžinama su PVM.
app.get('/vehicles', async (req, res) => {
  const populated = await Vehicle.find().populate(
    'model_id',
    '-_id name hour_price'
  );
  //   add VAT of 21%
  populated.forEach((vehicle) => {
    vehicle.model_id.hour_price *= 1.21;
  });

  res.json(populated);
  console.log(populated);
});
// POST vehicle
app.post('/vehicles', (req, res) => {
  const vehicle = new Vehicle(req.body);
  vehicle
    .save()
    .then((response) => res.json({ response, message: 'New Vehicle saved!' }))
    .catch((err) => {
      console.log(err);
      res.json({
        err,
        message: 'Please inserst unique number plate!',
      });
    });
});

app.get('/vehicles/:country', async (req, res) => {
  const country = req.params.country.toUpperCase();
  const populated = await Vehicle.find({ country_location: country }).populate(
    'model_id',
    '-_id name hour_price'
  );
  populated.forEach((vehicle) => {
    vehicle.model_id.hour_price *= 1.21;
  });

  res.json(populated);
  // console.log(populated);
});

app.get('/test', async (req, res) => {
  // get populated collection
  const populated = await Vehicle.find().populate('model_id');
  //  destructure and select wanted field
  const data = populated.map((vehicle) => {
    const { _id, number_plate, country_location } = vehicle;
    const { name, hour_price } = vehicle.model_id;
    const destructured = {
      _id: _id,
      model: name,
      //   add VAT of 21%
      hour_priceVAT: hour_price * 1.21,
      numbe_plate: number_plate,
      country_location: country_location,
    };
    return destructured;
  });
  console.log('THIS IS', data);
  res.json(data);
});
/* REST API
GET     /api/users      - get all users
GET     /api/users/:id  - get single user (for example based on id) (or few users based on some criteria)
POST    /api/users      - add single user
PUT     /api/users/:id  - update single user (for example based on id)
DELETE  /api/users/:id  - delete single user (for example based on id)
*/
