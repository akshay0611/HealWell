'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Save, Loader2, Trash2, Clock, User, Stethoscope } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
          toast({
            title: 'Error',
            description: 'Failed to fetch existing schedule.',
            variant: 'destructive',
          });
        }
      } catch {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred while fetching the schedule.',
          variant: 'destructive',
        });
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
        toast({
          title: 'Success',
          description: 'Time table updated successfully.',
          variant: 'default',
        });
        router.push('/time-table');
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update time table.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-extrabold">
              Admin Panel - Time Table
            </CardTitle>
            <CardDescription className="text-blue-100">
              Manage your weekly schedule with ease
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ScrollArea className="h-[600px] rounded-md border p-4">
              <Accordion type="single" collapsible className="w-full">
                {schedule.map((day, index) => (
                  <AccordionItem value={`day-${index}`} key={index}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2">
                          <Select
                            value={day.day}
                            onValueChange={(value) => {
                              const updatedSchedule = [...schedule];
                              updatedSchedule[index].day = value;
                              setSchedule(updatedSchedule);
                            }}
                          >
                            <SelectTrigger className="w-[180px] bg-white text-gray-700">
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
                          <span className="text-sm text-gray-500">
                            {day.timings.length} time slot(s)
                          </span>
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteDay(index);
                          }}
                          className="bg-red-600 text-white hover:bg-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Button
                          onClick={() => handleAddTiming(index)}
                          className="w-full bg-blue-600 text-white hover:bg-blue-700"
                          variant="outline"
                        >
                          <PlusCircle className="mr-2 h-4 w-4" /> Add Timing
                        </Button>
                        <AnimatePresence>
                          {day.timings.map((timing, timingIndex) => (
                            <motion.div
                              key={timingIndex}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="grid grid-cols-5 gap-4 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                            >
                              <div className="col-span-2 flex items-center space-x-2">
                                <Clock className="text-blue-500" />
                                <Select
                                  value={timing.from}
                                  onValueChange={(value) =>
                                    handleInputChange(index, timingIndex, 'from', value)
                                  }
                                >
                                  <SelectTrigger className="w-[120px] bg-gray-50 text-gray-800 border border-gray-300">
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
                                <span>-</span>
                                <Select
                                  value={timing.to}
                                  onValueChange={(value) =>
                                    handleInputChange(index, timingIndex, 'to', value)
                                  }
                                >
                                  <SelectTrigger className="w-[120px] bg-gray-50 text-gray-800 border border-gray-300">
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
                              </div>
                              <div className="flex items-center space-x-2">
                                <User className="text-green-500" />
                                <Input
                                  type="text"
                                  placeholder="Doctor"
                                  value={timing.doctor}
                                  onChange={(e) =>
                                    handleInputChange(index, timingIndex, 'doctor', e.target.value)
                                  }
                                  className="border border-gray-300 rounded-md text-gray-800"
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Stethoscope className="text-purple-500" />
                                <Input
                                  type="text"
                                  placeholder="Specialty"
                                  value={timing.specialty}
                                  onChange={(e) =>
                                    handleInputChange(index, timingIndex, 'specialty', e.target.value)
                                  }
                                  className="border border-gray-300 rounded-md text-gray-800"
                                />
                              </div>
                              <Button
                                variant="destructive"
                                size="icon"
                                onClick={() => handleDeleteTiming(index, timingIndex)}
                                className="bg-red-600 text-white hover:bg-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </CardContent>
        </Card>
        <div className="flex gap-4 justify-end">
          <Button
            onClick={handleAddDay}
            variant="outline"
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Day
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className={`${
              loading ? 'bg-gray-400 text-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
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
      </motion.div>
    </div>
  );
};

export default AdminTimeTablePage;