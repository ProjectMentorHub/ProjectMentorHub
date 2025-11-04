// src/pages/Catalog.jsx
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import ProjectCard from '../components/ProjectCard';
import FilterBar from '../components/FilterBar';
import AdSidebar from '../components/AdSidebar';
import SEO from '../components/SEO';

import catalogProjects from '../data/catalogProjects';
import { getDisplayCategory, getPrimaryCategory } from '../utils/projectMetadata';
import { logCatalogSearch } from '../utils/localAnalytics';
const VALID_CATEGORIES = new Set(['CSE', 'EEE', 'ECE', 'MECH', 'MATLAB']);

const normalizeFilters = (next = {}) => {
  const rawCategory = next?.category ? String(next.category).trim().toUpperCase() : '';
  const category = VALID_CATEGORIES.has(rawCategory) ? rawCategory : '';
  const query = next?.query ? String(next.query).trim() : '';

  return { category, query };
};

const parseFiltersFromSearch = (search = '') => {
  const params = new URLSearchParams(search);
  const categoryParam = params.get('category');
  const queryParam = params.get('query') ?? params.get('q');

  return normalizeFilters({
    category: categoryParam,
    query: queryParam
  });
};

const Catalog = () => {
  // Source data
  const projects = catalogProjects;
  const lastLoggedSearchRef = useRef('');

  const location = useLocation();
  const navigate = useNavigate();

  // Filters (supports category + search query)
  const [filters, setFilters] = useState(() => parseFiltersFromSearch(location.search));

  useEffect(() => {
    const next = parseFiltersFromSearch(location.search);
    setFilters((prev) =>
      prev.category === next.category && prev.query === next.query ? prev : next
    );
  }, [location.search]);

  const handleFilterChange = (next) => {
    const normalized = normalizeFilters(next);
    setFilters((prev) =>
      prev.category === normalized.category && prev.query === normalized.query
        ? prev
        : normalized
    );

    const params = new URLSearchParams();
    if (normalized.category) params.set('category', normalized.category);
    if (normalized.query) params.set('query', normalized.query);

    const nextSearch = params.toString();
    const currentSearch = location.search.startsWith('?')
      ? location.search.slice(1)
      : location.search;

    if (currentSearch !== nextSearch) {
      navigate(
        {
          pathname: location.pathname,
          search: nextSearch ? `?${nextSearch}` : ''
        },
        { replace: true }
      );
    }
  };

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

  useEffect(() => {
    const trimmedQuery = (filters.query || '').trim();
    if (trimmedQuery.length < 2) {
      lastLoggedSearchRef.current = '';
      return;
    }

    const categoryKey = filters.category || 'All';
    const fingerprint = filteredProjects.slice(0, 5).map((project) => project.id).join('|');
    const cacheKey = `${categoryKey}::${trimmedQuery.toLowerCase()}::${fingerprint}::${filteredProjects.length}`;

    if (lastLoggedSearchRef.current === cacheKey) return;
    lastLoggedSearchRef.current = cacheKey;

    logCatalogSearch({
      query: trimmedQuery,
      category: categoryKey,
      totalResults: filteredProjects.length,
      results: filteredProjects.slice(0, 5).map((project) => ({
        id: project.id,
        title: project.title,
        category: getDisplayCategory(project)
      }))
    });
  }, [filters.category, filters.query, filteredProjects]);

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
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />

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
