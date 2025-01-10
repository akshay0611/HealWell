'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash, Edit } from 'lucide-react';
import { Doctor } from '@/lib/doctor';

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
        setEditingDoctor(null); // Close the modal after saving
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
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Manage Doctors</h1>

      {/* Error State */}
      {error && <div className="text-red-600 mb-4">{error}</div>}

      {/* Add New Doctor Form */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">Add New Doctor</h2>
        <Input
          placeholder="Doctor Name"
          value={newDoctor?.name || ''}
          onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
        />
        <Input
          placeholder="Specialty"
          value={newDoctor?.specialty || ''}
          onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
        />
        <Input
          placeholder="Bio"
          value={newDoctor?.bio || ''}
          onChange={(e) => setNewDoctor({ ...newDoctor, bio: e.target.value })}
        />
        <Input
          placeholder="Experience"
          value={newDoctor?.experience || ''}
          onChange={(e) => setNewDoctor({ ...newDoctor, experience: e.target.value })}
        />
        <Input
          placeholder="Email"
          value={newDoctor?.email || ''}
          onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
        />
        <Input
          placeholder="Phone"
          value={newDoctor?.phone || ''}
          onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
        />
        <Input
          placeholder="Availability"
          value={newDoctor?.availability || ''}
          onChange={(e) => setNewDoctor({ ...newDoctor, availability: e.target.value })}
        />
        <Input
          placeholder="Image URL"
          value={newDoctor?.image || ''}
          onChange={(e) => setNewDoctor({ ...newDoctor, image: e.target.value })}
        />
        <Input
          placeholder="Rating"
          type="number"
          value={newDoctor?.rating || 0}
          onChange={(e) => setNewDoctor({ ...newDoctor, rating: parseFloat(e.target.value) })}
        />
        <Button onClick={handleAddDoctor} disabled={loading}>
          {loading ? 'Adding...' : 'Add Doctor'}
        </Button>
      </div>

      {/* Doctors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <div>Loading...</div>}
        {doctors.map((doctor) => (
          <div key={doctor._id as string} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-900">{doctor.name}</h3>
            <p>{doctor.specialty}</p>
            <div className="flex justify-between mt-4">
              <Button onClick={() => setEditingDoctor(doctor)}>
                <Edit className="w-5 h-5 mr-2" /> Edit
              </Button>
              <Button onClick={() => handleDeleteDoctor(doctor._id as string)} className="bg-red-500 hover:bg-red-600 text-white">
                <Trash className="w-5 h-5 mr-2" /> Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Editing Doctor Modal */}
      {editingDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">Edit Doctor</h3>
            <Input
              placeholder="Doctor Name"
              value={editingDoctor.name || ''}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
            />
            <Input
              placeholder="Specialty"
              value={editingDoctor.specialty || ''}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })}
            />
            <Input
              placeholder="Bio"
              value={editingDoctor.bio || ''}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, bio: e.target.value })}
            />
            <Input
              placeholder="Experience"
              value={editingDoctor.experience || ''}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, experience: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={editingDoctor.email || ''}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, email: e.target.value })}
            />
            <Input
              placeholder="Phone"
              value={editingDoctor.phone || ''}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, phone: e.target.value })}
            />
            <Input
              placeholder="Availability"
              value={editingDoctor.availability || ''}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, availability: e.target.value })}
            />
            <Input
              placeholder="Image URL"
              value={editingDoctor.image || ''}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, image: e.target.value })}
            />
            <Input
              placeholder="Rating"
              type="number"
              value={editingDoctor.rating || 0}
              onChange={(e) => setEditingDoctor({ ...editingDoctor, rating: parseFloat(e.target.value) })}
            />
            <Button onClick={handleEditDoctor} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}