const isString = (v) => typeof v === 'string' && v.trim().length > 0;

export const hasMatlabTag = (project = {}) => {
  const tags = Array.isArray(project?.tags) ? project.tags : [];
  // Accept variations like "MATLAB/Simulink", "mat lab", etc.
  return tags.some((t) =>
    isString(t) && t.toLowerCase().replace(/\s+/g, '').includes('matlab')
  );
};

/**
 * Normalize to a single, canonical category used for BOTH filtering and display.
 * Rule: If it has a MATLAB tag, it's MATLAB (even if category says EEE/CSE).
 */
export const getDisplayCategory = (project = {}) => {
  if (hasMatlabTag(project)) return 'MATLAB';

  const raw = isString(project?.category) ? project.category.trim().toUpperCase() : '';
  if (['CSE', 'EEE', 'ECE', 'MECH', 'MATLAB'].includes(raw)) return raw;
  return 'GENERAL';
};
