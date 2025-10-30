import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';
import { getDisplayCategory } from '../utils/projectMetadata';

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'CSE',
    price: '',
    tags: '',
    features: ''
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    try {
      const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      setProjects(savedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const projectData = {
        id: `PROJECT_${Date.now()}`,
        ...formData,
        price: parseFloat(formData.price),
        tags: formData.tags.split(',').map(t => t.trim()),
        features: formData.features.split('\n').filter(f => f.trim()),
        image: image ? URL.createObjectURL(image) : 'https://via.placeholder.com/800x600',
        createdAt: new Date().toISOString()
      };

      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      existingProjects.push(projectData);
      localStorage.setItem('projects', JSON.stringify(existingProjects));
      
      toast.success('Project added successfully!');
      setFormData({
        title: '',
        description: '',
        category: 'CSE',
        price: '',
        tags: '',
        features: ''
      });
      setImage(null);
      fetchProjects();
    } catch (error) {
      console.error('Error adding project:', error);
      toast.error('Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
      const updatedProjects = existingProjects.filter(p => p.id !== id);
      localStorage.setItem('projects', JSON.stringify(updatedProjects));
      toast.success('Project deleted');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="Admin Panel"
        description="Manage ProjectMentorHub catalog entries, pricing, and content."
        canonical="https://projectmentorhub.com/admin"
        noIndex
      />
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-serif font-bold mb-8">Admin Panel</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Add Project Form */}
            <div className="bg-white p-8 border border-black/10">
              <h2 className="text-2xl font-semibold mb-6">Add New Project</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black"
                  >
                    <option value="CSE">CSE</option>
                    <option value="EEE">EEE</option>
                    <option value="MATLAB">MATLAB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="AI, IoT, Web"
                    className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Features (one per line)</label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Feature 1&#10;Feature 2"
                    className="w-full px-4 py-2 border border-black/20 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cover Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary"
                >
                  {loading ? 'Adding...' : 'Add Project'}
                </button>
              </form>
            </div>

            {/* Existing Projects */}
            <div className="bg-white p-8 border border-black/10">
              <h2 className="text-2xl font-semibold mb-6">Existing Projects</h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-gray-600">{getDisplayCategory(project)} - ₹{project.price}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
