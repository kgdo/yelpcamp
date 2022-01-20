const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect(dbUrl, {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 10; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "615de00f3c7627972ef44af7",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry : { 
        type : "Point", 
        coordinates : [ cities[random1000].longitude, 
                      cities[random1000].latitude, 
      ] 
    },
      images: [
        {
          url: "https://res.cloudinary.com/kendo/image/upload/v1636122408/YelpCamp/gojvj3ggqma6esf1lbb9.jpg",
          filename: "YelpCamp/gojvj3ggqma6esf1lbb9",
        },
        {
          url: "https://res.cloudinary.com/kendo/image/upload/v1636122408/YelpCamp/fqnvbhb5xutfkeuamiw2.jpg",
          filename: "YelpCamp/fqnvbhb5xutfkeuamiw2",
        },
      ],
      description:
        " Still nessi skeye goist heene my., ipsum dolor sit amet consectetur dontbeadouchebag adipisicing elit. Maxime nisi natus tinkboutothers nojusyersel  quo modi? handl efail urewi thind iffer ence nemo rerum, doloremque id, deleniti sunt commodi ex provident, voluptates libero est. Voluptas nulla maiores voluptatum.",
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
