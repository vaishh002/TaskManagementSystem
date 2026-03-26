import { model, Schema } from "mongoose";

const reportSchema = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: "Task",
      required: true
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    reportText: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }, { timestamps: true }
);

const Report = model("Report", reportSchema);
export default Report;
