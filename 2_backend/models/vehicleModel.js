import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const vehicleSchema = Schema({
  model_id: { type: Schema.Types.ObjectId, ref: 'model', required: true },
  number_plate: { type: String, required: true },
  country_location: { type: String, required: true },
});
const Vehicle = mongoose.model('vehicle', vehicleSchema);
export default Vehicle;
