"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Save, Loader2, Trash2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Timing = {
  from: string;
  to: string;
  doctor: string;
  specialty: string;
};

type DaySchedule = {
  day: string;
  timings: Timing[];
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  return slots;
};

const formatTime = (time: string | undefined): string => {
  if (!time) return 'Not set';
  const [hours, minutes] = time.split(':').map(Number);
  const suffix = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  return `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${suffix}`;
};

const timeSlots = generateTimeSlots();

const AdminTimeTablePage = () => {
  const [schedule, setSchedule] = useState<DaySchedule[]>([
    { day: 'Monday', timings: [{ from: '', to: '', doctor: '', specialty: '' }] },
  ]);

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchExistingSchedule = async () => {
      try {
        const response = await fetch('/api/time-table');
        if (response.ok) {
          const data = await response.json();
          if (data.schedule && data.schedule.length > 0) {
            setSchedule(data.schedule);
          }
        } else {
          toast({ title: 'Error', description: 'Failed to fetch existing schedule.', variant: 'destructive' });
        }
      } catch {
        toast({ title: 'Error', description: 'An unexpected error occurred while fetching the schedule.', variant: 'destructive' });
      }
    };

    fetchExistingSchedule();
  }, []);

  const handleAddDay = () => {
    setSchedule([...schedule, { day: '', timings: [{ from: '', to: '', doctor: '', specialty: '' }] }]);
  };

  const handleAddTiming = (index: number) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index].timings.push({ from: '', to: '', doctor: '', specialty: '' });
    setSchedule(updatedSchedule);
  };

  const handleInputChange = (
    index: number,
    timingIndex: number,
    field: keyof Timing,
    value: string
  ) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index].timings[timingIndex][field] = value;
    setSchedule(updatedSchedule);
  };

  const handleDeleteDay = (index: number) => {
    const updatedSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(updatedSchedule);
  };

  const handleDeleteTiming = (dayIndex: number, timingIndex: number) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[dayIndex].timings = updatedSchedule[dayIndex].timings.filter((_, i) => i !== timingIndex);
    setSchedule(updatedSchedule);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/time-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schedule }),
      });

      if (response.ok) {
        toast({ title: 'Success', description: 'Time table updated successfully.', variant: 'default' });
        router.push('/time-table');
      } else {
        toast({ title: 'Error', description: 'Failed to update time table.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'An unexpected error occurred.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Admin Panel - Time Table</CardTitle>
        </CardHeader>
        <CardContent>
          {schedule.map((day, index) => (
            <Card key={index} className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold">
                    Day: {day.day || `Day ${index + 1}`}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={day.day}
                      onValueChange={(value) => {
                        const updatedSchedule = [...schedule];
                        updatedSchedule[index].day = value;
                        setSchedule(updatedSchedule);
                      }}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a day" />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((d) => (
                          <SelectItem key={d} value={d}>
                            {d}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteDay(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => handleAddTiming(index)}
                  className="mb-4"
                  variant="outline"
                >
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Timing
                </Button>
                {day.timings.map((timing, timingIndex) => (
                  <div key={timingIndex} className="grid grid-cols-5 gap-4 mb-4 items-center">
                    <Select
                      value={timing.from}
                      onValueChange={(value) => handleInputChange(index, timingIndex, 'from', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="From">
                          {timing.from ? formatTime(timing.from) : 'From'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {formatTime(slot)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={timing.to}
                      onValueChange={(value) => handleInputChange(index, timingIndex, 'to', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="To">
                          {timing.to ? formatTime(timing.to) : 'To'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {formatTime(slot)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="text"
                      placeholder="Doctor"
                      value={timing.doctor}
                      onChange={(e) => handleInputChange(index, timingIndex, 'doctor', e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Specialty"
                      value={timing.specialty}
                      onChange={(e) => handleInputChange(index, timingIndex, 'specialty', e.target.value)}
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteTiming(index, timingIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
      <div className="flex gap-4 justify-end">
        <Button onClick={handleAddDay} variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Day
        </Button>
        <Button
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AdminTimeTablePage;