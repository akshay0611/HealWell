'use client';

import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, Clock, User, Phone, Mail, Building } from 'lucide-react';

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
  const [loadingEmail, setLoadingEmail] = useState<string | null>(null);

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

  const handleSendConfirmationEmail = async (appointment: Appointment) => {
    setLoadingEmail(appointment._id); // Set loading state for the specific appointment
    try {
      const response = await fetch('/api/send-confirmation-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: appointment.email,
          name: appointment.name,
          preferredDate: appointment.preferredDate,
          preferredTime: appointment.preferredTime,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Confirmation email sent successfully.',
          variant: 'default',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to send confirmation email.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred while sending the email.',
        variant: 'destructive',
      });
    } finally {
      setLoadingEmail(null); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Card className="overflow-hidden shadow-xl rounded-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <CardTitle className="text-3xl font-extrabold text-white flex items-center">
              <Calendar className="mr-2 h-8 w-8" />
              Admin Panel - Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-white p-6">
            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-16 w-16 text-gray-400" />
                <p className="mt-4 text-xl font-semibold text-gray-600">No appointments available.</p>
                <p className="mt-2 text-gray-500">New appointments will appear here when scheduled.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appointments.map((appointment) => (
                      <tr key={appointment._id} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <User className="h-5 w-5 text-gray-400 mr-3" />
                            <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="flex items-center text-sm text-gray-500">
                              <Phone className="h-4 w-4 text-gray-400 mr-2" />
                              {appointment.phone}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Mail className="h-4 w-4 text-gray-400 mr-2" />
                              {appointment.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Building className="h-5 w-5 text-gray-400 mr-3" />
                            <div className="text-sm text-gray-900">{appointment.department}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                              {appointment.preferredDate}
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              {appointment.preferredTime}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            onClick={() => handleDeleteAppointment(appointment._id)}
                            variant="destructive"
                            size="sm"
                            className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                          <Button
                            onClick={() => handleSendConfirmationEmail(appointment)}
                            variant="outline"
                            size="sm"
                            className="ml-2 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
                            disabled={loadingEmail === appointment._id} // Disable button if loading
                          >
                            {loadingEmail === appointment._id ? 'Sending...' : 'Send Confirmation'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAppointmentsPage;