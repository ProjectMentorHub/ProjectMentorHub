import { useState, useEffect, useMemo } from 'react';
import ProjectCard from '../components/ProjectCard';
import FilterBar from '../components/FilterBar';
import LoadingSkeleton from '../components/LoadingSkeleton';
import AdSidebar from '../components/AdSidebar';
import { motion } from 'framer-motion';
import { projects as catalogProjects, CATALOG_VERSION } from '../data/data';
import SEO from '../components/SEO';
import { hasMatlabTag, getDisplayCategory } from '../utils/projectMetadata';

const Catalog = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: ''
  });

  useEffect(() => {
    // Load from localStorage if available
    const savedProjects = localStorage.getItem('projects');
    const savedVersion = localStorage.getItem('catalogVersion');

    if (!savedProjects || savedVersion !== CATALOG_VERSION) {
      localStorage.setItem('projects', JSON.stringify(catalogProjects));
      localStorage.setItem('catalogVersion', CATALOG_VERSION);
      setProjects(catalogProjects);
      setFilteredProjects(catalogProjects);
    } else {
      const parsed = JSON.parse(savedProjects);
      setProjects(parsed);
      setFilteredProjects(parsed);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let filtered = projects;

    // Category filter
    if (filters.category) {
      if (filters.category === 'MATLAB') {
        filtered = filtered.filter(
          (project) => project.category === 'MATLAB' || hasMatlabTag(project)
        );
      } else {
        filtered = filtered.filter(p => p.category === filters.category);
      }
    }

    setFilteredProjects(filtered);
  }, [filters, projects]);

  const itemListSchema = useMemo(() => {
    if (!filteredProjects.length) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Project Catalog',
      itemListElement: filteredProjects.slice(0, 12).map((project, index) => ({
        '@type': 'Product',
        position: index + 1,
        name: project.title,
        description: project.description,
        category: getDisplayCategory(project),
        url: `https://projectmentorhub.com/project/${project.id}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: project.price,
          availability: 'https://schema.org/InStock'
        }
      }))
    };
  }, [filteredProjects]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <SEO
        title="Project Catalog"
        description="Browse ready-to-submit CSE, EEE, and MATLAB academic project kits complete with documentation, source code, and implementation guides."
        canonical="https://projectmentorhub.com/catalog"
        type="website"
        schema={itemListSchema}
      />
      <div className="container mx-auto px-4 flex gap-8 max-w-7xl">
        <div className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Project Catalog</h1>
          <p className="text-gray-600 text-lg">Browse our collection of premium project kits</p>
        </motion.div>

        <FilterBar filters={filters} onFilterChange={setFilters} />

        {loading ? (
          <LoadingSkeleton />
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No projects found matching your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
        </div>
        
        <AdSidebar />
      </div>
    </div>
  );
};

export default Catalog;
