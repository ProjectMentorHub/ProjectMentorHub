// src/pages/Catalog.jsx
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

import ProjectCard from '../components/ProjectCard';
import FilterBar from '../components/FilterBar';
import AdSidebar from '../components/AdSidebar';
import SEO from '../components/SEO';

import { projects as catalogProjects } from '../data/data';
import { getDisplayCategory, getPrimaryCategory } from '../utils/projectMetadata';

const Catalog = () => {
  // Source data
  const projects = catalogProjects;

  // Filters (supports category + search query)
  const [filters, setFilters] = useState({ category: '', query: '' });

  // Derived list using the canonical category and search term
  const filteredProjects = useMemo(() => {
    let results = projects;

    if (filters.category) {
      const wanted = String(filters.category).trim().toUpperCase();
      results = results.filter((project) => getPrimaryCategory(project) === wanted);
    }

    if (filters.query) {
      const search = filters.query.trim().toLowerCase();
      if (search) {
        results = results.filter((project) => {
          const titleMatch = project.title?.toLowerCase().includes(search);
          const descriptionMatch = project.description?.toLowerCase().includes(search);
          const tagMatch = Array.isArray(project.tags)
            ? project.tags.some((tag) => String(tag).toLowerCase().includes(search))
            : false;
          return titleMatch || descriptionMatch || tagMatch;
        });
      }
    }

    return results;
  }, [projects, filters.category, filters.query]);

  // Schema.org (uses the SAME canonical category to avoid mismatch)
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
            <p className="text-gray-600 text-lg">
              Browse our collection of premium project kits
            </p>
          </motion.div>

          {/* Pass through without changing your FilterBar API */}
          <FilterBar
            filters={filters}
            onFilterChange={(next) => {
              // normalize category to uppercase for consistent comparisons
              const category = next?.category ? String(next.category).toUpperCase() : '';
              setFilters({ ...next, category });
            }}
          />

          {filteredProjects.length === 0 ? (
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
