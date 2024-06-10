// const express = require("express");
// const router = express.Router();

// router.post("/foodData", (req, res) => {
//   try {
//     res.send([global.food_items],[global.foodCategory]);
  
//     // console.log(global.food_items);
//   } catch (error) {
//     console.error(error.message);
//     res.send("Server Error");
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// router.post("/foodData", (req, res) => {
//   try {
//     if (global.food_items && global.foodCategory) {
//       res.json({ food_items: global.food_items, foodCategory: global.foodCategory });
//       //console.log("Sent data:", global.food_items, global.foodCategory);
//     } else {
//       res.status(500).send("Data not initialized");
//       console.log("Data not initialized");
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  try {
    if (global.food_items && global.foodCategory) {
      res.json({ food_items: global.food_items, foodCategory: global.foodCategory });
    } else {
      res.status(500).json({ error: "Data not initialized" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
