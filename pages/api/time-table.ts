import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import TimeTable from '@/lib/timeTableModel';

// Define types for schedule data
interface Timing {
  from: string;
  to: string;
  doctor: string;
  specialty: string;
}

interface DaySchedule {
  day: string;
  timings: Timing[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { schedule } = req.body;

      console.log('Received schedule:', JSON.stringify(schedule, null, 2));

      if (!schedule || !Array.isArray(schedule)) {
        return res.status(400).json({ error: 'Invalid schedule format. "schedule" must be an array.' });
      }

      // Validate and filter the schedule
      const filteredSchedule = schedule
        .map((day: DaySchedule) => {
          if (!day.day || !day.timings || !Array.isArray(day.timings)) return null;

          // Filter timings to include only valid entries
          const validTimings = day.timings.filter(
            (timing: Timing) =>
              timing.from && timing.to && timing.doctor && timing.specialty
          );

          return validTimings.length > 0 ? { day: day.day, timings: validTimings } : null;
        })
        .filter((day) => day !== null); // Remove null entries

      if (filteredSchedule.length === 0) {
        return res.status(400).json({
          error: 'No valid schedule entries found. Ensure all entries include day, from, to, doctor, and specialty.',
        });
      }

      console.log('Filtered schedule to update:', JSON.stringify(filteredSchedule, null, 2));

      // Replace the entire document in the database
      const result = await TimeTable.findOneAndReplace(
        {},
        { schedule: filteredSchedule },
        { upsert: true, new: true }
      );

      console.log('Updated TimeTable:', JSON.stringify(result, null, 2));

      res.status(200).json({ message: 'Time table updated successfully', schedule: filteredSchedule });
    } catch (error) {
      console.error('Error updating timetable:', error);
      res.status(500).json({ error: 'Failed to update time table. Please try again later.' });
    }
  } else if (req.method === 'GET') {
    try {
      const timeTable = await TimeTable.findOne().lean();

      if (!timeTable) {
        return res.status(404).json({ error: 'Time table not found.' });
      }

      console.log('Retrieved TimeTable:', JSON.stringify(timeTable, null, 2));

      // Ensure all fields are included in the response
      const formattedSchedule = timeTable.schedule.map((day: DaySchedule) => ({
        day: day.day,
        timings: day.timings.map((timing: Timing) => ({
          from: timing.from,
          to: timing.to,
          doctor: timing.doctor,
          specialty: timing.specialty,
        })),
      }));

      console.log('Formatted schedule:', JSON.stringify(formattedSchedule, null, 2));

      res.status(200).json({ schedule: formattedSchedule });
    } catch (error) {
      console.error('Error fetching timetable:', error);
      res.status(500).json({ error: 'Failed to fetch time table. Please try again later.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Only GET and POST are supported.' });
  }
}