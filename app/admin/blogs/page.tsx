'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2, Trash2, Edit2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IBlog } from '@/lib/blogModel';

const categories = ['Health', 'Fitness', 'Nutrition', 'Wellness', 'Mental Health'];

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [newBlog, setNewBlog] = useState<Partial<IBlog>>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    date: new Date(),
    readTime: '',
    category: categories[0],
    imageUrl: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (response.ok) {
          const data: { blogs: IBlog[] } = await response.json();
          setBlogs(data.blogs);
        } else {
          toast({
            title: 'Error',
            description: 'Failed to fetch blogs.',
            variant: 'destructive',
          });
        }
      } catch {
        toast({
          title: 'Error',
          description: 'An unexpected error occurred while fetching blogs.',
          variant: 'destructive',
        });
      }
    };

    fetchBlogs();
  }, []);

  const handleInputChange = (field: keyof IBlog, value: string) => {
    setNewBlog({ ...newBlog, [field]: value });
  };

  const handleAddOrUpdateBlog = async () => {
    setLoading(true);
    try {
      const endpoint = editMode
        ? `/api/blogs/${editingBlogId}`
        : '/api/blogs';
      const method = editMode ? 'PATCH' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: editMode ? 'Blog updated successfully.' : 'Blog created successfully.',
          variant: 'default',
        });
        setNewBlog({
          title: '',
          excerpt: '',
          content: '',
          author: '',
          date: new Date(),
          readTime: '',
          category: categories[0],
          imageUrl: '',
        });
        setEditMode(false);
        setEditingBlogId(null);
        router.refresh();
      } else {
        toast({
          title: 'Error',
          description: 'Failed to save blog.',
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

  const handleEditBlog = (blog: IBlog) => {
    setEditMode(true);
    setEditingBlogId(blog._id);
    setNewBlog({ ...blog });
  };

  const handleDeleteBlog = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Blog deleted successfully.',
          variant: 'default',
        });
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        toast({
          title: 'Error',
          description: 'Failed to delete blog.',
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
    <div className="container mx-auto px-6 py-16 max-w-4xl bg-gray-50 rounded-lg shadow-md">
      <Card className="mb-8 bg-white">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-blue-600">
            Admin Panel - Blogs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h2 className="text-xl font-bold">
              {editMode ? 'Edit Blog' : 'Create New Blog'}
            </h2>
            <div className="space-y-4">
              <Input
                placeholder="Title"
                value={newBlog.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
              <Input
                placeholder="Excerpt"
                value={newBlog.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
              />
              <Input
                placeholder="Content"
                value={newBlog.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
              />
              <Input
                placeholder="Author"
                value={newBlog.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
              />
              <Input
                placeholder="Read Time"
                value={newBlog.readTime}
                onChange={(e) => handleInputChange('readTime', e.target.value)}
              />
              <Input
                placeholder="Image URL"
                value={newBlog.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              />
              <Select
                value={newBlog.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger className="w-[180px] bg-white text-gray-700">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                onClick={handleAddOrUpdateBlog}
                className="w-full bg-blue-600 text-white"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" /> : <PlusCircle />}
                {loading
                  ? 'Saving...'
                  : editMode
                  ? 'Update Blog'
                  : 'Add Blog'}
              </Button>
            </div>
          </div>
          <h2 className="text-xl font-bold">Existing Blogs</h2>
          <div>
            {blogs.map((blog) => (
              <Card key={String(blog._id)} className="mb-4 bg-blue-50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-blue-700">
                      {blog.title}
                    </CardTitle>
                    
  <div className="flex space-x-4 items-center">
  <Button
    variant="default"
    onClick={() => handleEditBlog(blog)}
    className="bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md transition duration-300 rounded-full p-2"
  >
    <Edit2 className="w-5 h-5" />
  </Button>
  <Button
    variant="destructive"
    onClick={() => handleDeleteBlog(String(blog._id))}
    className="bg-red-500 text-white hover:bg-red-600 hover:shadow-md transition duration-300 rounded-full p-2"
  >
    <Trash2 className="w-5 h-5" />
  </Button>
</div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogsPage;