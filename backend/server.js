const app = require('./app');
const cors = require('cors');

const corsOptions = {
  origin: [
    "https://rental-radar-eight.vercel.app", 
    "http://localhost:5173"
  ],
  credentials: true
};

// ✅ Apply middleware BEFORE starting server
app.use(cors(corsOptions));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is not defined. Are you running in Railway?");
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
