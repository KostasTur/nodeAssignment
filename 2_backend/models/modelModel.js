import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const modelSchema = Schema({
  name: { type: String, required: true, unique: true },
  hour_price: { type: Number, required: true },
});
const Model = mongoose.model('model', modelSchema);
export default Model;
