'use client'; 

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, Mail, Loader2, RefreshCw, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

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
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loadingEmail, setLoadingEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const { toast } = useToast();

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/appointment');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.data);
        setFilteredAppointments(data.data);
        toast({
          title: 'Appointments Loaded',
          description: `${data.data.length} appointments loaded successfully.`,
          variant: 'default',
        });
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    const filtered = appointments.filter(
      (appointment) =>
        appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAppointments(filtered);
  }, [searchTerm, appointments]);

  const handleDeleteAppointment = async (appointmentId: string) => {
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
    setLoadingEmail(appointment._id);
    try {
      const response = await fetch('/api/send-confirmation-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: appointment.email,
          name: appointment.name,
          type: 'appointment',
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
      setLoadingEmail(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Card className="overflow-hidden shadow-xl rounded-lg">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-extrabold text-white flex items-center">
                <Calendar className="mr-2 h-8 w-8" />
                Admin Panel - Appointments
              </CardTitle>
              <Button
                variant="outline"
                size="icon"
                onClick={fetchAppointments}
                className="text-white border-white hover:bg-white/20"
              >
                <RefreshCw className="h-5 w-5 text-red-500 hover:text-red-500" />
                <span className="sr-only">Refresh Appointments</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="bg-white p-6">
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-16 w-16 text-gray-400" />
                <p className="mt-4 text-xl font-semibold text-gray-600">No appointments available.</p>
                <p className="mt-2 text-gray-500">New appointments will appear here when submitted.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Name</TableHead>
                      <TableHead className="w-[150px]">Department</TableHead>
                      <TableHead className="w-[200px]">Date & Time</TableHead>
                      <TableHead className="w-[150px]">Status</TableHead>
                      <TableHead className="w-[200px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAppointments.map((appointment) => (
                      <TableRow key={appointment._id} className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
                        <TableCell className="font-medium">{appointment.name}</TableCell>
                        <TableCell>{appointment.department}</TableCell>
                        <TableCell>
                          <div>{appointment.preferredDate}</div>
                          <div className="text-sm text-gray-500">{appointment.preferredTime}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                            Pending
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                     className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                                    onClick={() => setSelectedAppointment(appointment)}
                                  >
                                    <Eye className="h-4 w-4" />
                                    <span className="sr-only">View Details</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View Details</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                     variant="ghost"
                                     size="icon"
                                    onClick={() => handleSendConfirmationEmail(appointment)}
                                    disabled={loadingEmail === appointment._id}
                                    className="text-green-600 hover:text-green-800 hover:bg-green-100"
                                  >
                                    {loadingEmail === appointment._id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Mail className="h-4 w-4" />
                                    )}
                                    <span className="sr-only">Send Confirmation Email</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Send Confirmation Email</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                     variant="ghost"
                                     size="icon"
                                     className="text-red-600 hover:text-red-800 hover:bg-red-100"
                                    onClick={() => handleDeleteAppointment(appointment._id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete Appointment</span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete Appointment</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              Full information for the selected appointment.
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <ScrollArea className="h-[60vh] pr-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Name</h3>
                  <p>{selectedAppointment.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p>{selectedAppointment.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p>{selectedAppointment.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Preferred Date & Time</h3>
                  <p>{selectedAppointment.preferredDate} - {selectedAppointment.preferredTime}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Message</h3>
                  <p>{selectedAppointment.message}</p>
                </div>
              </div>
            </ScrollArea>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedAppointment(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
};

export default AdminAppointmentsPage;
