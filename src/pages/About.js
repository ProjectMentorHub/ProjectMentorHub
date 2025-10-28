import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const About = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About ProjectMentorHub',
    url: 'https://projectmentorhub.com/about',
    description:
      'Learn how ProjectMentorHub supports engineering students with premium academic project kits and documentation.'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="About ProjectMentorHub"
        description="Discover how ProjectMentorHub helps engineering students succeed with premium project kits, source code, and detailed documentation."
        canonical="https://projectmentorhub.com/about"
        schema={schema}
      />
      {/* Hero Section */}
      <section className="bg-black text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Empowering students with premium project kits and comprehensive documentation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At Projects, we believe that every student deserves access to high-quality project resources that can help them excel in their academic journey. Our mission is to provide comprehensive, well-documented project kits for CSE and EEE students that not only help them complete their assignments but also deepen their understanding of core concepts.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We understand the challenges students face when working on BTech projects - from finding the right resources to understanding implementation details. That's why we've curated a collection of premium projects with complete documentation, source code, and step-by-step guides.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              What We Offer
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive project solutions tailored for engineering students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Complete Documentation',
                description: 'Every project includes detailed reports, documentation, and implementation guides. No need to search for additional resources - everything is included.',
                icon: '📄'
              },
              {
                title: 'Source Code',
                description: 'Well-commented, production-ready source code for all projects. Learn from best practices and industry standards.',
                icon: '💻'
              },
              {
                title: 'Step-by-Step Guides',
                description: 'Clear, step-by-step instructions that make it easy to understand and implement each project component.',
                icon: '📚'
              },
              {
                title: 'Technical Support',
                description: 'Access to technical documentation and resources to help you overcome any implementation challenges.',
                icon: '🛠️'
              },
              {
                title: 'Latest Technologies',
                description: 'Projects built with modern frameworks and technologies used in industry, keeping you current with trends.',
                icon: '🚀'
              },
              {
                title: 'Academic Excellence',
                description: 'Projects designed to help you achieve better grades while building practical skills and knowledge.',
                icon: '🎓'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 border border-black/10 hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                Why Choose Us
              </h2>
              <div className="grid md:grid-cols-2 gap-12 text-left">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">For Students</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Save time with ready-to-use project solutions</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Learn from well-documented code and implementations</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Improve your grades with quality submissions</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Build a strong portfolio for future opportunities</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Our Commitment</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <svg className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Premium quality projects with comprehensive documentation</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Continuous updates with new projects and technologies</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Affordable pricing designed for student budgets</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-6 h-6 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Dedicated support to help you succeed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to Excel in Your Projects?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Browse our collection of premium project kits designed to help you succeed
            </p>
            <Link to="/catalog" className="bg-white text-black px-8 py-4 font-semibold hover:bg-gray-100 transition-colors inline-block">
              Explore Projects
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
