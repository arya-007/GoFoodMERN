// const mongoose = require("mongoose");
//
// const mongoDB = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect("mongodb+srv://gofood:arya1234@cluster0.qggreqh.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0",
//     {
//       useUnifiedTopology: true
//     });
//     console.log("Connected to MongoDB");
//
//     // Fetch data from the "food_items" collection
//     const fetchedData = await mongoose.connection.db
//       .collection("food_items")
//       .find({})
//       .toArray();
//     global.food_items = fetchedData;
//     //console.log(global.food_items);
//     // Fetch data from the "foodCategory" collection
//     const foodCategory = await mongoose.connection.db
//       .collection("foodCategory")
//       .find({})
//       .toArray();
//     global.foodCategory = foodCategory;
//
//     console.log("Data fetched successfully");
//    // console.log(global.foodCategory);
//   } catch (err) {
//     console.error("Failed to connect to MongoDB", err);
//     throw err; // Throw error to handle it in the calling function
//   }
// };
//
// module.exports = mongoDB;

const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI is not set");
    }

    await mongoose.connect(uri);

    console.log("Connected to MongoDB");

    const fetchedData = await mongoose.connection.db
        .collection("food_items")
        .find({})
        .toArray();
    global.food_items = fetchedData;

    const foodCategory = await mongoose.connection.db
        .collection("foodCategory")
        .find({})
        .toArray();
    global.foodCategory = foodCategory;

    console.log("Data fetched successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};

module.exports = mongoDB;
