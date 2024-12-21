const corsOptions = {
  origin: "http://localhost:5173", // Allow this origin
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Specify the methods you want to allow
  allowedHeaders: ["Content-Type", "Authorization", "Authentication"], // Allow the Authentication header
  credentials: true, // Allow credentials
};

module.exports = corsOptions;
