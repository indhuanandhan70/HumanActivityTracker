const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors(
  {
    origin:["https://humanactivitytracker123.vercel.app/"],
    methods:["POST","GET"],
    credentials: true
  }
  ));
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
  // Exit the process on connection error
  process.exit(1);
});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello, MERN Stack!');
});

app.get('/', (req, res) => {
  res.send('Welcome to the Music Listening App API');
});
const HealthSchema = new mongoose.Schema({
  age:String,
  weight: String,
  height: String,
  bmi: String,
  bloodPressure: String,
  dailyCaloricIntake: String,
  nutrientBalance: String,
  exerciseFrequency: String,
  exerciseType: String,
  exerciseDuration: String,
  stressLevel: String,
  sleepPattern: String,
  chronicConditions: String,
  medications: String,
  familyHistory: String,
  gender:String,
  heartrate:String,
  CholestrolLevels:String,
  SleepDuration:String,
  SleepDisorders:String,
  HRV:String
});

const healthRoutes = require('./routes/healthRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

app.use('/api/health', healthRoutes);
app.use('/api/payments', paymentRoutes);

// Serve static assets in production (optional)
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
