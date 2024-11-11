const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://sheikhtanvirsiddiki55:ppp175980@cluster0.5ufyb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String
});

const User = mongoose.model('User', userSchema);

// Signup API
app.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.json({ success: false, message: 'Email already exists' });

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const user = new User({ name, email, phone, password: hashedPassword });
  await user.save();

  res.json({ success: true });
});

// Login API
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: 'Invalid email or password' });

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ success: false, message: 'Invalid email or password' });

  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
