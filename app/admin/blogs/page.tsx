'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2, Trash2, Edit2, ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null);
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
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 bg-white shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-extrabold">
              Admin Panel - Blogs
            </CardTitle>
            <CardDescription className="text-blue-100">
              Manage your blog posts with ease
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {editMode ? 'Edit Blog' : 'Create New Blog'}
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter blog title"
                      value={newBlog.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      placeholder="Enter author name"
                      value={newBlog.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Enter a brief excerpt"
                    value={newBlog.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your blog content here"
                    value={newBlog.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    className="mt-1"
                    rows={6}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="readTime">Read Time</Label>
                    <Input
                      id="readTime"
                      placeholder="e.g., 5 min read"
                      value={newBlog.readTime}
                      onChange={(e) => handleInputChange('readTime', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      placeholder="Enter image URL"
                      value={newBlog.imageUrl}
                      onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newBlog.category}
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger id="category" className="w-full mt-1">
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
                  </div>
                </div>
                <Button
                  onClick={handleAddOrUpdateBlog}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <PlusCircle className="mr-2 h-4 w-4" />
                  )}
                  {loading
                    ? 'Saving...'
                    : editMode
                    ? 'Update Blog'
                    : 'Add Blog'}
                </Button>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Existing Blogs</h2>
            <ScrollArea className="h-[400px] rounded-md border p-4">
              <AnimatePresence>
                {blogs.map((blog) => (
                  <motion.div
                    key={String(blog._id)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="mb-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <CardHeader className="cursor-pointer" onClick={() => setExpandedBlog(expandedBlog === blog._id ? null : blog._id)}>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl font-semibold text-gray-800">
                            {blog.title}
                          </CardTitle>
                          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${expandedBlog === blog._id ? 'transform rotate-180' : ''}`} />
                        </div>
                      </CardHeader>
                      <AnimatePresence>
                        {expandedBlog === blog._id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <CardContent>
                              <p className="text-gray-600 mb-2">{blog.excerpt}</p>
                              <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>By {blog.author}</span>
                                <span>{blog.readTime}</span>
                              </div>
                              <div className="mt-4 flex justify-end space-x-2">
                                <Button
                                  variant="outline"
                                  onClick={() => handleEditBlog(blog)}
                                  className="bg-blue-100 text-blue-600 hover:bg-blue-200 transition duration-300"
                                >
                                  <Edit2 className="w-4 h-4 mr-2" />
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleDeleteBlog(String(blog._id))}
                                  className="bg-red-100 text-red-600 hover:bg-red-200 transition duration-300"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </Button>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminBlogsPage;

