const app = require('./app');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 

const corsOptions = {
  origin: [
    "https://rental-radar-eight.vercel.app/", // Your Vercel URL
    "http://localhost:5173" // For local dev
  ],
  credentials: true
};
app.use(cors(corsOptions));