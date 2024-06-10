// // // const mongoose = require('mongoose');
// // // const mongoURI='mongodb+srv://gofood:arya1234@cluster0.qggreqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// // // const monogDB=async()=>{
// // //     await mongoose.connect(mongoURI,{useNewUrlParser: true },(err,result)=>{
// // //         if(err) console.log(".....",err);
// // //         else{
// // //         console.log("Connected successfully");
// // //         }
// // //     });
// // // }

// // //  module.exports= monogDB;

// // const mongoose = require('mongoose');

// // const mongoDB = async () => {
// //     try {
// //         // Connect to MongoDB
// //         await mongoose.connect('mongodb+srv://gofood:arya1234@cluster0.qggreqh.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0', {
// //             useNewUrlParser: true,
// //             useUnifiedTopology: true,
// //         });
// //         console.log('Connected to MongoDB');

// //         // Fetch data from the "food_items" collection
// //         const fetched_data = await mongoose.connection.db.collection("food_items");
// //         fetched_data.find({}).toArray(function(err,data){
// //             if(err) console.log(err);
// //             else{
// //                 global.food_items=data;
// //                 //console.log(global.food.items);
// //             }
// //         });
// //         console.log();

// //     } catch (err) {
// //         console.error('Failed to connect to MongoDB', err);
// //     }
// // };

// // module.exports = mongoDB;

// const mongoose = require("mongoose");

// const mongoDB = async () => {
//   try {
//     // Connect to MongoDB

//     await mongoose.connect(
//       "mongodb+srv://gofood:arya1234@cluster0.qggreqh.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );
//     console.log("Connected to MongoDB");

//     // Fetch data from the "food_items" collection
//     const fetched_data = await mongoose.connection.db.collection("food_items");
//     fetched_data.find({}).toArray(async function (err, data) {
//       const foodCategory = await mongoose.connection.db.collection(
//         "foodCategory"
//       );
//       foodCategory.find({}).toArray(function (err, catData) {
//         if (err) {
//           console.log("Error fetching data:", err);
//         } else {
//           global.food_items = data;
//           global.foodCategory=catData;
//         }
//       });
//       // if (err) {
//       //     console.log('Error fetching data:', err);
//       // } else {
//       //     global.food_items = data;

//       // }
//     });
//   } catch (err) {
//     console.error("Failed to connect to MongoDB", err);
//   }
// };

// module.exports = mongoDB;





// const mongoose = require("mongoose");

// const mongoDB = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(
//       "mongodb+srv://gofood:arya1234@cluster0.qggreqh.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );
//     console.log("Connected to MongoDB");

//     // Fetch data from the "food_items" collection
//     const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
//     global.food_items = fetched_data;
//     //console.log("Fetched food_items:", global.food_items);

//     // Fetch data from the "foodCategory" collection
//     const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
//     global.foodCategory = foodCategory;
//     //console.log("Fetched foodCategory:", global.foodCategory);

//     console.log('Data fetched successfully');

//   } catch (err) {
//     console.error("Failed to connect to MongoDB", err);
//   }
// };

// module.exports = mongoDB;


const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb+srv://gofood:arya1234@cluster0.qggreqh.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0",
    {
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");

    // Fetch data from the "food_items" collection
    const fetchedData = await mongoose.connection.db
      .collection("food_items")
      .find({})
      .toArray();
    global.food_items = fetchedData;
    //console.log(global.food_items);
    // Fetch data from the "foodCategory" collection
    const foodCategory = await mongoose.connection.db
      .collection("foodCategory")
      .find({})
      .toArray();
    global.foodCategory = foodCategory;

    console.log("Data fetched successfully");
   // console.log(global.foodCategory);
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err; // Throw error to handle it in the calling function
  }
};

module.exports = mongoDB;
