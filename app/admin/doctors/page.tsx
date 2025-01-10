'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash, Edit, Plus, Star } from 'lucide-react';
import { Doctor } from '@/lib/doctor';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({
    name: '',
    specialty: '',
    bio: '',
    experience: '',
    email: '',
    phone: '',
    availability: '',
    image: '',
    rating: 0,
  });
  const [editingDoctor, setEditingDoctor] = useState<Partial<Doctor> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddingDoctor, setIsAddingDoctor] = useState(false);
  const [isEditingDoctor, setIsEditingDoctor] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/doctor');
        const data = await response.json();
        if (response.ok) {
          setDoctors(data.data);
        } else {
          setError(data.message);
        }
      } catch {
        setError('Failed to fetch doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleAddDoctor = async () => {
    if (!newDoctor.name || !newDoctor.specialty || !newDoctor.bio || !newDoctor.experience || !newDoctor.email || !newDoctor.phone || !newDoctor.availability || !newDoctor.image || newDoctor.rating === 0) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoctor),
      });
      const data = await response.json();
      if (response.ok) {
        setDoctors((prev) => [...prev, data.data]);
        setNewDoctor({
          name: '',
          specialty: '',
          bio: '',
          experience: '',
          email: '',
          phone: '',
          availability: '',
          image: '',
          rating: 0,
        });
        setIsAddingDoctor(false);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Failed to add doctor');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoctor = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/doctor?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setDoctors((prev) => prev.filter((doctor) => doctor._id !== id));
      } else {
        setError('Failed to delete doctor');
      }
    } catch {
      setError('Failed to delete doctor');
    } finally {
      setLoading(false);
    }
  };

  const handleEditDoctor = async () => {
    if (!editingDoctor) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/doctor?id=${editingDoctor._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDoctor),
      });
      const data = await response.json();
      if (response.ok) {
        setDoctors((prev) => prev.map((doctor) => (doctor._id === editingDoctor._id ? data.data : doctor)));
        setEditingDoctor(null);
        setIsEditingDoctor(false);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Failed to update doctor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Doctors</h1>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6"
          role="alert"
        >
          <p>{error}</p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Dialog open={isAddingDoctor} onOpenChange={setIsAddingDoctor}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              <Plus className="w-5 h-5 mr-2" /> Add New Doctor
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Doctor</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={newDoctor.name}
                  onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="specialty" className="text-right">
                  Specialty
                </Label>
                <Input
                  id="specialty"
                  className="col-span-3"
                  value={newDoctor.specialty}
                  onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  className="col-span-3"
                  value={newDoctor.bio}
                  onChange={(e) => setNewDoctor({ ...newDoctor, bio: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="experience" className="text-right">
                  Experience
                </Label>
                <Input
                  id="experience"
                  className="col-span-3"
                  value={newDoctor.experience}
                  onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="col-span-3"
                  value={newDoctor.email}
                  onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  className="col-span-3"
                  value={newDoctor.phone}
                  onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="availability" className="text-right">
                  Availability
                </Label>
                <Input
                  id="availability"
                  className="col-span-3"
                  value={newDoctor.availability}
                  onChange={(e) => setNewDoctor({ ...newDoctor, availability: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image"
                  className="col-span-3"
                  value={newDoctor.image}
                  onChange={(e) => setNewDoctor({ ...newDoctor, image: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rating" className="text-right">
                  Rating
                </Label>
                <Input
                  id="rating"
                  type="number"
                  className="col-span-3"
                  value={newDoctor.rating}
                  onChange={(e) => setNewDoctor({ ...newDoctor, rating: parseFloat(e.target.value) })}
                />
              </div>
            </div>
            <Button onClick={handleAddDoctor} disabled={loading}>
              {loading ? 'Adding...' : 'Add Doctor'}
            </Button>
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full text-center text-xl text-gray-600"
            >
              Loading...
            </motion.div>
          ) : (
            doctors.map((doctor) => (
              <motion.div
                key={doctor._id as string}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">{doctor.name}</CardTitle>
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={doctor.image} alt={doctor.name} />
                      <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{doctor.specialty}</p>
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < doctor.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm mb-4">{doctor.bio}</p>
                    <div className="flex justify-between mt-4">
                      <Dialog open={isEditingDoctor} onOpenChange={setIsEditingDoctor}>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setEditingDoctor(doctor)}>
                            <Edit className="w-4 h-4 mr-2" /> Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Doctor</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-name" className="text-right">
                                Name
                              </Label>
                              <Input
                                id="edit-name"
                                className="col-span-3"
                                value={editingDoctor?.name || ''}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-specialty" className="text-right">
                                Specialty
                              </Label>
                              <Input
                                id="edit-specialty"
                                className="col-span-3"
                                value={editingDoctor?.specialty || ''}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-bio" className="text-right">
                                Bio
                              </Label>
                              <Textarea
                                id="edit-bio"
                                className="col-span-3"
                                value={editingDoctor?.bio || ''}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, bio: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-experience" className="text-right">
                                Experience
                              </Label>
                              <Input
                                id="edit-experience"
                                className="col-span-3"
                                value={editingDoctor?.experience || ''}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, experience: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-email" className="text-right">
                                Email
                              </Label>
                              <Input
                                id="edit-email"
                                type="email"
                                className="col-span-3"
                                value={editingDoctor?.email || ''}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-phone" className="text-right">
                                Phone
                              </Label>
                              <Input
                                id="edit-phone"
                                className="col-span-3"
                                value={editingDoctor?.phone || ''}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, phone: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-availability" className="text-right">
                                Availability
                              </Label>
                              <Input
                                id="edit-availability"
                                className="col-span-3"
                                value={editingDoctor?.availability || ''}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, availability: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-image" className="text-right">
                                Image URL
                              </Label>
                              <Input
                                id="edit-image"
                                className="col-span-3"
                                value={editingDoctor?.image || ''}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, image: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-rating" className="text-right">
                                Rating
                              </Label>
                              <Input
                                id="edit-rating"
                                type="number"
                                className="col-span-3"
                                value={editingDoctor?.rating || 0}
                                onChange={(e) => setEditingDoctor({ ...editingDoctor, rating: parseFloat(e.target.value) })}
                              />
                            </div>
                          </div>
                          <Button onClick={handleEditDoctor} disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteDoctor(doctor._id as string)}
                        disabled={loading}
                      >
                        <Trash className="w-4 h-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}