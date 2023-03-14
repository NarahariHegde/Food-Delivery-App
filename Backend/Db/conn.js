const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_CONNECTION_URL)
  .then(() => {
    console.log("db connection successful....");

    const fetched_data = mongoose.connection.db.collection("food");

    fetched_data.find({}).toArray(async (err, data) => {
      const foodcategory = await mongoose.connection.db.collection(
        "food_category"
      );

      foodcategory.find({}).toArray((err, catData) => {
        if (err) {
          console.log(err);
        } else {
          global.food = data;
          global.foodcategory = catData;
          // console.log(global.food);
        }
      });
    });
  })
  .catch(error => {
    console.log(error);
    console.log("connection failed...");
  });
