'use client';

import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

type Appointment = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  department: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

const AdminAppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointment');
        if (response.ok) {
          const data = await response.json();
          setAppointments(data.data);
        } else {
          toast({
            title: 'Error',
            description: 'Failed to fetch appointments.',
            variant: 'destructive',
          });
        }
      } catch {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred while fetching appointments.',
          variant: 'destructive',
        });
      }
    };

    fetchAppointments();
  }, []);

  const handleDeleteAppointment = async (appointmentId: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this appointment?');
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`/api/appointment?appointmentId=${appointmentId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Appointment deleted successfully.',
          variant: 'default',
        });
  
        setAppointments(appointments.filter((appt) => appt._id !== appointmentId));
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete appointment.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl bg-gray-50 rounded-lg shadow-md">
      <Card className="mb-8 bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-blue-600">
            Admin Panel - Appointments
          </CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <p className="text-center text-gray-500">No appointments available.</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th> {/* Added department column */}
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id} className="border-b">
                    <td className="px-6 py-3 text-sm text-gray-700">{appointment.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{appointment.phone}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{appointment.email}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{appointment.department}</td> {/* Display department */}
                    <td className="px-6 py-3 text-sm text-gray-700">{appointment.preferredDate}</td>
                    <td className="px-6 py-3 text-sm text-gray-700">{appointment.preferredTime}</td>
                    <td className="px-6 py-3 text-sm text-gray-700 flex items-center space-x-3">
                      <Button
                        onClick={() => handleDeleteAppointment(appointment._id)}
                        variant="destructive"
                        size="icon"
                        className="bg-red-600 text-white hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAppointmentsPage;