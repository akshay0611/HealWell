'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, RefreshCw, Mail, Eye } from 'lucide-react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: string;
}

const ContactsAdminPanel = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const { toast } = useToast();

  // Fetch all contact messages
  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      if (response.ok) {
        setMessages(data.data);
      } else {
        setError('Failed to load messages');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load messages",
        });
      }
    } catch {
      setError('An error occurred while fetching messages.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while fetching messages.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (response.ok) {
        fetchMessages(); // Refresh the messages list after deletion
        toast({
          title: "Success",
          description: "The message has been successfully deleted.",
        });
      } else {
        setError(data.error || 'An unexpected error occurred.');
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error || 'An unexpected error occurred while deleting the message.',
        });
      }
    } catch {
      setError('An error occurred while deleting the message.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while deleting the message.",
      });
    }
  };

  const handleSendEmail = async (email: string, name: string) => {
    try {
      const response = await fetch('/api/send-confirmation-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          type: 'contact',
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast({
          title: "Email Sent",
          description: `Confirmation email sent successfully to ${name}`,
        });

        // Update the status in the UI
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message.email === email
              ? { ...message, status: 'Email Sent' }
              : message
          )
        );
      } else {
        setError(data.message || 'Failed to send confirmation email');
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || 'Failed to send confirmation email',
        });
      }
    } catch {
      setError('An error occurred while sending confirmation email.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while sending confirmation email.",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-6xl mx-auto shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Contact Messages</h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={fetchMessages}
                      variant="outline"
                      size="icon"
                      className="text-white border-white hover:bg-white/20 transition-colors duration-200"
                    >
                      <RefreshCw className="h-5 w-5 text-red-500 hover:text-red-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Refresh messages</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded animate-pulse" role="alert">
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-20">
                <RefreshCw className="h-12 w-12 animate-spin mx-auto text-blue-500" />
                <p className="mt-4 text-lg text-gray-600">Loading messages...</p>
              </div>
            ) : messages.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Name</TableHead>
                      <TableHead className="w-[200px]">Email</TableHead>
                      <TableHead className="w-[250px]">Subject</TableHead>
                      <TableHead className="w-[300px]">Message</TableHead>
                      <TableHead className="w-[150px]">Status</TableHead>
                      <TableHead className="text-right w-[150px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow key={message._id} className="hover:bg-gray-50 transition-colors duration-150">
                        <TableCell className="font-medium">{message.name}</TableCell>
                        <TableCell>{message.email}</TableCell>
                        <TableCell>{message.subject}</TableCell>
                        <TableCell>{message.message}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${
                              message.status === 'Email Sent'
                                ? 'bg-green-100 text-green-800'
                                : message.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {message.status || 'Pending'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => setSelectedMessage(message)}
                                  variant="ghost"
                                  size="icon"
                                  className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>View details</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => handleDelete(message._id)}
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-600 hover:text-red-800 hover:bg-red-100"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete message</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  onClick={() => handleSendEmail(message.email, message.name)}
                                  variant="ghost"
                                  size="icon"
                                  className="text-green-600 hover:text-green-800 hover:bg-green-100"
                                >
                                  <Mail className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Send confirmation email</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-lg">
                <p className="text-xl text-gray-500">No messages found.</p>
                <Button onClick={fetchMessages} variant="outline" className="mt-4">
                  Refresh Messages
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Contact Details</DialogTitle>
              <DialogDescription>
                Full information for the selected contact message.
              </DialogDescription>
            </DialogHeader>
            {selectedMessage && (
              <ScrollArea className="h-[60vh] pr-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Name</h3>
                    <p>{selectedMessage.name}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p>{selectedMessage.email}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Subject</h3>
                    <p>{selectedMessage.subject}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Message</h3>
                    <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                  </div>
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <Toaster />
    </>
  );
};

export default ContactsAdminPanel;