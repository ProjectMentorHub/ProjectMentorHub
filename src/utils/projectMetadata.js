const isString = (v) => typeof v === 'string' && v.trim().length > 0;
const normalizeCategory = (value) =>
  isString(value) ? value.trim().toUpperCase() : '';

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
  const source = normalizeCategory(project?._sourceCategory);
  if (source === 'MATLAB' || hasMatlabTag(project)) return 'MATLAB';

  if (['CSE', 'EEE', 'ECE', 'MECH'].includes(source)) return source;

  const raw = normalizeCategory(project?.category);
  if (['CSE', 'EEE', 'ECE', 'MECH', 'MATLAB'].includes(raw)) return raw;
  return 'GENERAL';
};

/**
 * Returns the primary bucket we use for filtering in the catalog view.
 * Falls back to CSE so mixed/unknown categories appear under a sensible tab.
 */
export const getPrimaryCategory = (project = {}) => {
  const source = normalizeCategory(project?._sourceCategory);
  if (source === 'MATLAB' || hasMatlabTag(project)) return 'MATLAB';
  if (['EEE', 'ECE', 'MECH'].includes(source)) return source;
  if (source === 'CSE') return 'CSE';

  const canonical = getDisplayCategory(project);

  if (canonical === 'MATLAB') return 'MATLAB';
  if (canonical === 'EEE') return 'EEE';
  if (canonical === 'ECE') return 'ECE';
  if (canonical === 'MECH') return 'MECH';

  // Treat everything else (including GENERAL) as CSE to avoid an empty filter bucket.
  return 'CSE';
};
