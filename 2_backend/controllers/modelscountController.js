import Model from '../models/modelModel.js';

const modelsAndWehiclesCount = async (req, res) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};
export default modelsAndWehiclesCount;
