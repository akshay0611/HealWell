import mongoose, { Document, Model } from 'mongoose';

interface ITiming {
  from: string;
  to: string;
  doctor: string;
  specialty: string;
}

interface IDaySchedule {
  day: string;
  timings: ITiming[];
}

interface ITimeTable extends Document {
  schedule: IDaySchedule[];
}

const TimingSchema = new mongoose.Schema<ITiming>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  doctor: { type: String, required: true },
  specialty: { type: String, required: true },
});

const DayScheduleSchema = new mongoose.Schema<IDaySchedule>({
  day: { type: String, required: true },
  timings: [TimingSchema],
});

const TimeTableSchema = new mongoose.Schema<ITimeTable>({
  schedule: [DayScheduleSchema],
});

const TimeTable: Model<ITimeTable> = mongoose.models.TimeTable || mongoose.model<ITimeTable>('TimeTable', TimeTableSchema);

export default TimeTable;