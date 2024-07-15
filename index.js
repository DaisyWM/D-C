const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const imageDownloader = require("image-downloader");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const fs = require("fs");
const mime = require("mime-types");
require("dotenv").config();
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");
const Airline = require("./models/Airline");
const AirlineModel = require("./models/AirLineBooking");
const SavedPlace = require("./models/PlacesSaved");
const SavedAirline = require("./models/AirlineSaved");
const ReviewHotel = require("./models/ReviewsOfHotels");
const ReviewAirplane = require("./models/ReviewsOfAirplanes");

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const Secret = process.env.SECRET;
const bucket = process.env.BUCKET_NAME;

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

async function uploadToS3(path, originalFilename, mimetype) {
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = originalFilename.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, Secret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.post('/register', async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: "Email already in use" });
    }

    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const userDoc = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
});

app.post("/login", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });

  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        Secret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
    } else {
      res.status(422).json("Incorrect Password");
    }
  } else {
    res.status(422).json("User not found");
  }
});


app.get("/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, Secret, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

app.get('/user', (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, Secret, {}, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      try {
        const user = await User.findById(decoded.id).exec();
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { link } = req.body;
  if (!link) {
    return res.status(400).json({ error: "Provide an image address" });
  }
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: "/tmp/" + newName,
  });
  const url = await uploadToS3(
    "/tmp/" + newName,
    newName,
    mime.lookup("/tmp/" + newName)
  );
  res.json(url);
});


const photosMiddleware = multer({ dest: "/tmp" });
app.post("/upload", photosMiddleware.array("photos", 100), async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname, mimetype } = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});

app.post("/places", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    title,
    address,
    contact,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, Secret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      contact,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });
    res.json(placeDoc);
  });
});

app.post("/airline", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    title,
    address,
    contact,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    boarding,
    passangers,
    price,
  } = req.body;
  jwt.verify(token, Secret, {}, async (err, userData) => {
    if (err) throw err;
    const airlineDoc = await Airline.create({
      owner: userData.id,
      title,
      address,
      contact,
      photos: addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      boarding,
      passangers,
      price,
    });
    res.json(airlineDoc);
  });
});

app.get("/user-places", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, Secret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/user-airline", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  jwt.verify(token, Secret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Airline.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.get("/airline/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { id } = req.params;
  res.json(await Airline.findById(id));
});

app.put("/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    contact,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, Secret, {}, async (err, userData) => {
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        contact,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.put("/airline", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    contact,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    boarding,
    passangers,
    price,
  } = req.body;
  jwt.verify(token, Secret, {}, async (err, userData) => {
    const airlineDoc = await Airline.findById(id);
    if (userData.id === airlineDoc.owner.toString()) {
      airlineDoc.set({
        title,
        address,
        contact,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        boarding,
        passangers,
        price,
      });
      await airlineDoc.save();
      res.json("ok");
    }
  });
});

app.get("/places", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json(await Place.find())
});

app.get("/airline", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json(await Airline.find());
});

app.post("/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const {
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    email,
    price,
  } = req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    email,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/airline-bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const {
    airline,
    checkIn,
    returnDate,
    passangers,
    name,
    phone,
    email,
    price,
  } = req.body;
  AirlineModel.create({
    airline,
    checkIn,
    returnDate,
    passangers,
    name,
    phone,
    email,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.get("/airline-bookings", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json(await AirlineModel.find({ user: userData.id }).populate("airline"));
});

app.get("/users-Booking", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  // places created by the user
  const userPlaces = await Place.find({ owner: userData.id }).select("_id");
  // bookings for the user's places
  const userBookings = await Booking.find({
    place: { $in: userPlaces },
  }).populate("place");
  res.json(userBookings);
});

app.get("/users-Airline-Booking", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);

  // Find all places created by the user
  const userAirlines = await Airline.find({ owner: userData.id }).select("_id");

  // Find bookings for the user's places
  const userBookings = await AirlineModel.find({
    airline: { $in: userAirlines },
  }).populate("airline");

  res.json(userBookings);
});

app.post("/saved", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const { place } = req.body;
  SavedPlace.create({
    place,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/users-Savings", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const userData = await getUserDataFromReq(req);
    if (!userData || !userData.id) {
      console.error("User data or user ID not found");
      return res.status(401).json({ error: "Unauthorized" });
    }
    const savedPlaces = await SavedPlace.find({ user: userData.id }).populate(
      "place"
    );
    res.json(savedPlaces);
  } catch (error) {
    console.error("Error fetching saved places:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/saved", async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    const savedPlaces = await SavedPlace.find({ user: userData.id }).populate(
      "place"
    );
    res.json(savedPlaces);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/deleteSaved/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const savedId = req.params.id;

  SavedPlace.findOneAndDelete({ _id: savedId, user: userData.id })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ error: "Saved place not found" });
      }
      res.json({ message: "Saved place deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post("/reviews", async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    const { placeId, content, rating } = req.body;

    const review = new ReviewHotel({
      place: placeId,
      user: userData.id,
      content,
      rating,
      createdAt: new Date(),
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/reviews/:placeId", async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const { placeId } = req.params;
    const reviews = await ReviewHotel.find({ place: placeId }).populate("user");
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/savedAirlines", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const { airline } = req.body;
  SavedAirline.create({
    airline,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get("/users-Savings-Airlines", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    const userData = await getUserDataFromReq(req);
    if (!userData || !userData.id) {
      console.error("User data or user ID not found");
      return res.status(401).json({ error: "Unauthorized" });
    }
    const savedAirlines = await SavedAirline.find({ user: userData.id }).populate(
      "airline"
    );
    res.json(savedAirlines);
  } catch (error) {
    console.error("Error fetching saved airlines:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/savedAirlines", async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    const savedAirlines = await SavedAirline.find({ user: userData.id }).populate(
      "airline"
    );
    res.json(savedAirlines);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/deleteSavedAirlines/:id", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const savedId = req.params.id;

  SavedAirline.findOneAndDelete({ _id: savedId, user: userData.id })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({ error: "Saved airline not found" });
      }
      res.json({ message: "Saved airline deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.post("/reviewsAirlines", async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    const { airlineId, content, rating } = req.body;

    const review = new ReviewAirplane({
      airline: airlineId,
      user: userData.id,
      content,
      rating,
      createdAt: new Date(),
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/reviewsAirlines/:airlineId", async (req, res) => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const { airlineId } = req.params;
    const reviews = await ReviewAirplane.find({ airline: airlineId }).populate("user");
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(4000, () => {
  console.log("Server running on Port 4000");
  
  mongoose.connect(process.env.MONGO_URL);

  const db = mongoose.connection;
  db.on('error', (error) => console.error('Connection error:', error));
  db.once('open', () => {
    console.log('Mongoose successfully connected');
  });
});

module.exports = app;
