import { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const companySchema = new Schema({
  name: {
    type: String,
    required: [true, "Company name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: true,
  },
  contact: { type: String },
  address: { type: String },
  profileUrl: { type: String },
  about: { type: String },
  jobPosts: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
});

companySchema.pre("save", async function () {
  if (!this.isModified) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
companySchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// JWT TOKEN
companySchema.methods.createToken = async function () {
  return JWT.sign({ userId: this.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};
const Companies = mongoose.model("Companies", companySchema);

export default Companies;
