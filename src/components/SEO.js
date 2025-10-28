import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'ProjectMentorHub';
const SITE_URL = 'https://projectmentorhub.com';
const DEFAULT_TITLE = `${SITE_NAME} – Premium BTech Project Kits`;
const DEFAULT_DESCRIPTION =
  'Discover premium CSE & EEE project kits with complete documentation, source code, and mentorship-ready resources.';
const DEFAULT_IMAGE = `${SITE_URL}/logo512.png`;

const resolveCanonical = (canonical) => {
  if (canonical) return canonical;
  if (typeof window === 'undefined') return SITE_URL;
  return `${SITE_URL}${window.location.pathname}${window.location.search}`;
};

const buildTitle = (title) => (title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE);

const ensureAbsoluteUrl = (url) => {
  if (!url) return DEFAULT_IMAGE;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
};

const jsonLdToString = (schema) => {
  if (!schema) return null;
  try {
    return JSON.stringify(schema);
  } catch (error) {
    console.error('Failed to serialize JSON-LD schema', error);
    return null;
  }
};

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image,
  type = 'website',
  noIndex = false,
  schema
}) => {
  const fullTitle = buildTitle(title);
  const canonicalUrl = resolveCanonical(canonical);
  const shareImage = ensureAbsoluteUrl(image);
  const schemaString = jsonLdToString(schema);

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={description} />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={shareImage} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
      <meta name="twitter:creator" content="@ProjectMentorHub" />
      {schemaString && (
        <script type="application/ld+json">{schemaString}</script>
      )}
    </Helmet>
  );
};

export default SEO;
