import Vehicle from '../models/vehicleModel.js';

export const getVehicles = async (req, res) => {
  try {
    const populated = await Vehicle.find().populate('model_id');
    const data = await populated.map((vehicle) => {
      const { _id, number_plate, country_location } = vehicle;
      const { name, hour_price } = vehicle.model_id;
      const destructured = {
        _id: _id,
        model: name,
        hour_priceVAT: hour_price * 1.21,
        numbe_plate: number_plate,
        country_location: country_location,
      };
      return destructured;
    });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};

export const postVehicle = (req, res) => {
  const vehicle = new Vehicle(req.body);
  vehicle
    .save()
    .then((response) => res.json({ response, message: 'New Vehicle saved!' }))
    .catch((err) => {
      console.log(err);
      res.json({
        err,
        message:
          'Please check if all fields are selected and number plate is unique!',
      });
    });
};
export const getVehiclesByCountry = async (req, res) => {
  try {
    const country = req.params.country.toUpperCase();
    const populated = await Vehicle.find({
      country_location: country,
    }).populate('model_id');
    const data = populated.map((vehicle) => {
      const { _id, number_plate, country_location } = vehicle;
      const { name, hour_price } = vehicle.model_id;
      const destructured = {
        _id: _id,
        model: name,
        hour_priceVAT: hour_price * 1.21,
        numbe_plate: number_plate,
        country_location: country_location,
      };
      return destructured;
    });
    res.json(data);
  } catch (err) {
    console.log(err);
  }
};
