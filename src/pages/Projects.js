// src/pages/Projects.jsx
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import ProjectCard from '../components/ProjectCard';
import FilterBar from '../components/FilterBar';
import AdSidebar from '../components/AdSidebar';
import SEO from '../components/SEO';

import allProjects from '../data/projects';
import { getDisplayCategory, getPrimaryCategory, getCseSubCategory } from '../utils/projectMetadata';
import { logProjectsSearch } from '../utils/localAnalytics';
const VALID_CATEGORIES = new Set(['CSE', 'EEE', 'ECE', 'MECH', 'MATLAB']);
const VALID_SUBCATEGORIES = new Set(['ML', 'WEB']);
const CSE_SUBCATEGORY_OPTIONS = [
  { value: 'ML', label: 'Machine Learning' },
  { value: 'WEB', label: 'Web Development' }
];
const CATEGORY_COLUMNS = ['CSE', 'EEE', 'MATLAB'];
const CATEGORY_PREVIEW_COUNT = 4;

const normalizeFilters = (next = {}) => {
  const rawCategory = next?.category ? String(next.category).trim().toUpperCase() : '';
  const category = VALID_CATEGORIES.has(rawCategory) ? rawCategory : '';
  const query = next?.query ? String(next.query).slice(0, 120) : '';
  const rawSub = next?.subCategory ? String(next.subCategory).trim().toUpperCase() : '';
  const subCategory = category === 'CSE' && VALID_SUBCATEGORIES.has(rawSub) ? rawSub : '';

  return { category, query, subCategory };
};

const parseFiltersFromSearch = (search = '') => {
  const params = new URLSearchParams(search);
  const categoryParam = params.get('category');
  const queryParam = params.get('query') ?? params.get('q');
  const subParam = params.get('sub') ?? params.get('subcategory');

  return normalizeFilters({
    category: categoryParam,
    query: queryParam,
    subCategory: subParam
  });
};

const SEARCH_SYNONYMS = {
  ai: ['artificial intelligence', 'machine learning', 'ml', 'deep learning'],
  ml: ['machine learning', 'artificial intelligence', 'deep learning'],
  'machine learning': ['ml', 'artificial intelligence', 'deep learning', 'neural networks'],
  'deep learning': ['neural networks', 'cnn', 'rnn'],
  iot: ['internet of things', 'embedded systems', 'smart devices'],
  robotic: ['robotics', 'automation', 'mechatronics'],
  robot: ['robotics', 'automation'],
  blockchain: ['web3', 'distributed ledger'],
  'web development': ['full stack', 'frontend', 'backend'],
  cloud: ['aws', 'azure', 'gcp', 'cloud computing'],
  'data science': ['analytics', 'machine learning', 'statistics'],
  matlab: ['simulink', 'mathworks'],
  'power systems': ['power', 'grid', 'electrical'],
  'image processing': ['computer vision', 'opencv'],
  vision: ['computer vision', 'image processing'],
  automation: ['robotics', 'iot', 'control systems'],
  biotech: ['bio technology', 'bioinformatics']
};

const tokenise = (value = '') =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9+/.\s-]+/g, ' ')
    .split(/[\s/,.+-]+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1);

const expandTokensWithSynonyms = (tokens) => {
  const expanded = new Set(tokens);

  tokens.forEach((token) => {
    const synonyms = SEARCH_SYNONYMS[token];
    if (Array.isArray(synonyms)) {
      synonyms.forEach((synonym) => {
        expanded.add(synonym.toLowerCase());
        tokenise(synonym).forEach((childToken) => expanded.add(childToken));
      });
    }
  });

  return expanded;
};

const Projects = () => {
  // Source data
  const projects = allProjects;
  const lastLoggedSearchRef = useRef('');

  const location = useLocation();
  const navigate = useNavigate();

  // Filters (supports category + search query)
  const [filters, setFilters] = useState(() => parseFiltersFromSearch(location.search));
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    const next = parseFiltersFromSearch(location.search);
    setFilters((prev) =>
      prev.category === next.category &&
      prev.query === next.query &&
      prev.subCategory === next.subCategory
        ? prev
        : next
    );
  }, [location.search]);

  const handleFilterChange = (next) => {
    const normalized = normalizeFilters(next);
    setFilters((prev) =>
      prev.category === normalized.category &&
      prev.query === normalized.query &&
      prev.subCategory === normalized.subCategory
        ? prev
        : normalized
    );

    const params = new URLSearchParams();
    if (normalized.category) params.set('category', normalized.category);
    if (normalized.query) params.set('query', normalized.query);
    if (normalized.subCategory) params.set('sub', normalized.subCategory);

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

  const searchState = useMemo(() => {
    let scopedProjects = projects;

    if (filters.category) {
      const wanted = String(filters.category).trim().toUpperCase();
      scopedProjects = scopedProjects.filter(
        (project) => getPrimaryCategory(project) === wanted
      );
    }

    if (filters.category === 'CSE' && filters.subCategory) {
      scopedProjects = scopedProjects.filter(
        (project) => getCseSubCategory(project) === filters.subCategory
      );
    }

    const normalizedQuery = (filters.query || '').toLowerCase();
    const trimmedQuery = normalizedQuery.trim();

    if (!trimmedQuery) {
      return {
        orderedProjects: scopedProjects,
        topMatches: [],
        matchingCount: 0,
        normalizedQuery: '',
        topMatchIds: [],
        scores: scopedProjects.map((project) => ({
          project,
          score: 0
        }))
      };
    }

    const queryTokens = tokenise(trimmedQuery);
    const expandedTokens = expandTokensWithSynonyms(queryTokens);
    expandedTokens.add(trimmedQuery);

    const scored = scopedProjects.map((project) => {
      const searchableText = [
        project.title,
        project.shortDescription,
        project.description,
        project.category,
        ...(Array.isArray(project.tags) ? project.tags : [])
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      let score = 0;

      if (searchableText.includes(trimmedQuery)) {
        score += 12;
      }

      const tags = Array.isArray(project.tags)
        ? project.tags.map((tag) => String(tag).toLowerCase())
        : [];

      expandedTokens.forEach((token) => {
        if (token.length < 2) return;
        if (searchableText.includes(token)) {
          score += 4;
        }
        if (tags.some((tag) => tag.includes(token))) {
          score += 3;
        }
      });

      return {
        project,
        score
      };
    });

    const matches = scored.filter((entry) => entry.score > 0);
    const nonMatches = scored.filter((entry) => entry.score <= 0);

    matches.sort((a, b) => b.score - a.score);
    nonMatches.sort((a, b) => {
      if (a.project.title && b.project.title) {
        return a.project.title.localeCompare(b.project.title);
      }
      return 0;
    });

    const ordered =
      matches.length > 0 ? [...matches, ...nonMatches] : scored.sort((a, b) => b.score - a.score);

    return {
      orderedProjects: ordered.map((entry) => entry.project),
      topMatches: matches.slice(0, 12),
      matchingCount: matches.length,
      normalizedQuery: trimmedQuery,
      topMatchIds: matches.slice(0, 5).map((entry) => entry.project.id),
      scores: ordered
    };
  }, [projects, filters.category, filters.subCategory, filters.query]);

  const filteredProjects = searchState.orderedProjects;

  const groupedProjects = useMemo(() => {
    const base = CATEGORY_COLUMNS.reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    const fallbackCategory = CATEGORY_COLUMNS[0];

    filteredProjects.forEach((project) => {
      const category = getPrimaryCategory(project);
      const targetCategory = CATEGORY_COLUMNS.includes(category) ? category : fallbackCategory;
      base[targetCategory].push(project);
    });

    return base;
  }, [filteredProjects]);

  const toggleCategoryExpansion = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  useEffect(() => {
    const trimmedQuery = searchState.normalizedQuery;
    if (trimmedQuery.length < 2) {
      lastLoggedSearchRef.current = '';
      return;
    }

    const categoryKey =
      filters.category === 'CSE' && filters.subCategory
        ? `CSE:${filters.subCategory}`
        : filters.category || 'All';
    const fingerprint = searchState.topMatchIds.join('|');
    const cacheKey = `${categoryKey}::${trimmedQuery.toLowerCase()}::${fingerprint}::${filteredProjects.length}`;

    if (lastLoggedSearchRef.current === cacheKey) return;
    lastLoggedSearchRef.current = cacheKey;

    logProjectsSearch({
      query: trimmedQuery,
      category: categoryKey,
      totalResults: searchState.topMatches.length,
      results: searchState.topMatches.slice(0, 5).map(({ project }, index) => ({
        id: project.id,
        title: project.title,
        category: getDisplayCategory(project),
        rank: index + 1
      }))
    });
  }, [
    filters.category,
    filters.subCategory,
    searchState.normalizedQuery,
    filteredProjects.length,
    searchState.topMatchIds,
    searchState.topMatches
  ]);

  // Schema.org (uses the SAME canonical category to avoid mismatch)
  const itemListSchema = useMemo(() => {
    if (!filteredProjects.length) return null;

    return {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Projects',
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
        title="Projects"
        description="Browse ready-to-submit CSE, EEE, and MATLAB academic project kits complete with documentation, source code, and implementation guides."
        canonical="https://projectmentorhub.com/projects"
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Projects</h1>
            <p className="text-gray-600 text-lg">
              Browse our collection of premium project kits
            </p>
          </motion.div>

          {/* Pass through without changing your FilterBar API */}
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            searchSummary={{
              query: filters.query,
              matching: searchState.matchingCount,
              total: filteredProjects.length
            }}
            subcategories={CSE_SUBCATEGORY_OPTIONS}
            onSubcategoryChange={(value) =>
              handleFilterChange({
                ...filters,
                category: 'CSE',
                subCategory: value
              })
            }
          />

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No projects found matching your filters</p>
            </div>
          ) : (
            <div className="space-y-6">
              {CATEGORY_COLUMNS.map((category) => {
                const projectsInCategory = groupedProjects[category] || [];
                const isExpanded = !!expandedCategories[category];
                const visibleProjects = isExpanded
                  ? projectsInCategory
                  : projectsInCategory.slice(0, CATEGORY_PREVIEW_COUNT);
                const projectCount = projectsInCategory.length;

                return (
                  <section
                    key={category}
                    className="bg-white border border-black/10 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-xl font-semibold">{category} Projects</h2>
                        <p className="text-xs uppercase tracking-wide text-gray-400">
                          {projectCount} project{projectCount === 1 ? '' : 's'}
                        </p>
                      </div>
                      {projectCount > CATEGORY_PREVIEW_COUNT && (
                        <button
                          type="button"
                          onClick={() => toggleCategoryExpansion(category)}
                          className="text-xs font-semibold uppercase tracking-wide border border-black px-3 py-1 hover:bg-black hover:text-white transition"
                        >
                          {isExpanded ? 'Show Less' : 'Show All'}
                        </button>
                      )}
                    </div>
                    <div className="mt-4 flex-1">
                      {projectCount === 0 ? (
                        <p className="text-sm text-gray-500 border border-dashed border-gray-200 rounded p-4 text-center">
                          No projects in this category yet.
                        </p>
                      ) : (
                        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                          {visibleProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>

        <AdSidebar />
      </div>
    </div>
  );
};

export default Projects;
