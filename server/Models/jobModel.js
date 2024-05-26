import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: { type: Schema.Types.ObjectId, ref: "Companies" },
    jobTitle: { type: String, required: [true, "Job Title is required"] },
    jobType: { type: String, required: [true, "jobType is required"] },
    address: { type: String, required: [true, "address is required"] },
    salary: { type: String, required: [true, "Salary is required"] },
    vacancy: { type: Number },
    experiences: { type: Number, default: 0 },
    details: [{ desc: { type: String }, requirements: { type: String } }],
    application: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  {
    timestamps: true,
  },
);

const Jobs = mongoose.model("Jobs", jobSchema);
export default Jobs;
