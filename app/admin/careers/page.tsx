'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CareerApplication {
  _id: string;
  name: string;
  email: string;
  phone: string;
  positionApplied: string;
  experience: number;
  message: string;
  references?: string;
}

const CareersAdminPanel = () => {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all career applications
  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/careers');
      const data = await response.json();
      if (response.ok) {
        setApplications(data.data);
      } else {
        setError('Failed to load applications');
      }
    } catch {
      setError('An error occurred while fetching applications.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/careers?id=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (response.ok) {
        fetchApplications(); // Refresh the application list after deletion
      } else {
        setError(data.error || 'An unexpected error occurred.');
      }
    } catch {
      setError('An error occurred while deleting the application.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-6xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Career Applications</h1>
            <Button
              onClick={fetchApplications}
              variant="outline"
              size="icon"
              className="text-white border-white hover:bg-white/20"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded" role="alert">
              <p>{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-10">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-500" />
              <p className="mt-2 text-gray-600">Loading applications...</p>
            </div>
          ) : applications.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application._id}>
                    <TableCell className="font-medium">{application.name}</TableCell>
                    <TableCell>{application.email}</TableCell>
                    <TableCell>{application.positionApplied}</TableCell>
                    <TableCell>{application.experience} years</TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => handleDelete(application._id)}
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-900 hover:bg-red-100"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-gray-500 py-10">No applications found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CareersAdminPanel;