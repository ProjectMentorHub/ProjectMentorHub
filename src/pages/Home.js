import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Home = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ProjectMentorHub',
    url: 'https://projectmentorhub.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://projectmentorhub.com/catalog?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Premium BTech Project Kits & Documentation"
        description="ProjectMentorHub delivers curated CSE and EEE project kits complete with documentation, source code, and implementation support."
        schema={schema}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
              ProjectMentorHub
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed">
              Discover cutting-edge CSE & EEE project kits with complete documentation, code, and resources
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog" className="btn-primary text-lg px-8 py-4">
                Explore Catalog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive project kits designed for academic excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Complete Documentation',
                description: 'Detailed reports, code comments, and implementation guides'
              },
              {
                title: 'Expert Support',
                description: 'Access to resources and documentation for smooth execution'
              },
              {
                title: 'Latest Technologies',
                description: 'Projects built with modern frameworks and practices'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-8 bg-white border border-black/10 hover:shadow-xl transition-all"
              >
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get started with our projects in simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: '01',
                title: 'Browse Projects',
                description: 'Explore our catalog of CSE and EEE projects'
              },
              {
                step: '02',
                title: 'Select & Add to Cart',
                description: 'Choose the projects that match your requirements'
              },
              {
                step: '03',
                title: 'Complete Purchase',
                description: 'Proceed to checkout and complete your order'
              },
              {
                step: '04',
                title: 'Download & Learn',
                description: 'Access complete documentation and source code'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-gray-200 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto text-center">
            {[
              { number: '50+', label: 'Projects Available' },
              { number: '1000+', label: 'Happy Students' },
              { number: '100%', label: 'Satisfaction Rate' }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Browse our collection of premium project kits today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog" className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-900 transition-colors inline-block">
                View Catalog
              </Link>
              <Link to="/about" className="border-2 border-black text-black px-8 py-4 font-semibold hover:bg-black hover:text-white transition-colors inline-block">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
