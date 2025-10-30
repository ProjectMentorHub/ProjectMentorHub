const isString = (value) => typeof value === 'string';

export const hasMatlabTag = (project = {}) => {
  const tags = Array.isArray(project?.tags) ? project.tags : [];
  return tags.some((tag) => isString(tag) && tag.toLowerCase().includes('matlab'));
};

export const getDisplayCategory = (project = {}) => {
  if (project?.category === 'MATLAB') {
    return 'MATLAB';
  }

  if (hasMatlabTag(project)) {
    return 'MATLAB';
  }

  return project?.category || 'General';
};

export const getPrimaryCategory = (project = {}) => {
  if (!project || typeof project !== 'object') {
    return 'CSE';
  }

  const category = isString(project.category) ? project.category.trim().toUpperCase() : '';

  if (category === 'EEE') {
    return 'EEE';
  }

  if (category === 'MATLAB' || hasMatlabTag(project)) {
    return 'MATLAB';
  }

  return 'CSE';
};
