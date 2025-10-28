import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const JournalServices = () => {
  const pricingPlans = [
    {
      name: 'Basic Publication',
      price: '₹5,000',
      features: [
        'Manuscript review and formatting',
        'Basic plagiarism check',
        'Submission to one journal',
        'Email support',
        'Publication timeline: 2-3 months'
      ]
    },
    {
      name: 'Standard Publication',
      price: '₹12,000',
      features: [
        'Comprehensive manuscript review',
        'Advanced plagiarism check',
        'Submission to multiple journals',
        'Priority support',
        'Revisions and resubmissions',
        'Publication timeline: 1-2 months'
      ]
    },
    {
      name: 'Premium Publication',
      price: '₹25,000',
      features: [
        'Complete manuscript development',
        'Expert review and editing',
        'Multiple journal submissions',
        'Dedicated project manager',
        'Unlimited revisions',
        'Fast-track publication',
        'Published within 30-45 days'
      ]
    }
  ];

  const contactInfo = {
    email: 'projectmentorhub166@gmail.com',
    phone: '+91 9392400166',
    workingHours: 'Mon-Sat: 9AM - 6PM IST'
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Journal Publication Services',
    provider: {
      '@type': 'Organization',
      name: 'ProjectMentorHub',
      url: 'https://projectmentorhub.com/'
    },
    areaServed: {
      '@type': 'Country',
      name: 'India'
    },
    offers: pricingPlans.map((plan) => ({
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: plan.price.replace(/[^0-9]/g, ''),
      name: plan.name,
      description: plan.features.join(', ')
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Journal Publication Support"
        description="Get expert help publishing your research in reputed journals. Choose from tailored publication support plans with end-to-end guidance."
        canonical="https://projectmentorhub.com/journals"
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
              Journal Publication Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Get your research papers published in reputed journals with our expert guidance
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Why Choose Our Publication Services
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                We help students and researchers publish their work in reputable journals. Our team of experts ensures your research meets journal standards and publication requirements.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: '📝',
                  title: 'Expert Review',
                  description: 'Your manuscript is reviewed by experienced researchers and academics'
                },
                {
                  icon: '✅',
                  title: 'Quality Assurance',
                  description: 'We ensure your research meets high academic standards'
                },
                {
                  icon: '🎯',
                  title: 'Targeted Journals',
                  description: 'Submission to journals most relevant to your research area'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center p-6 bg-gray-50"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Pricing Plans
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose the plan that best fits your publication needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-white border-2 ${
                  idx === 1 ? 'border-black border-4' : 'border-black/20'
                } p-8 hover:shadow-xl transition-all`}
              >
                {idx === 1 && (
                  <div className="bg-black text-white text-center py-2 mb-4 -mx-8 -mt-8">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start">
                      <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full btn-primary">
                  Contact Us
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                Contact Us for Publication Services
              </h2>
              <div className="space-y-6 mb-12">
                <div className="flex items-center justify-center gap-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${contactInfo.email}`} className="text-xl hover:text-gray-300 transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-xl hover:text-gray-300 transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
                <p className="text-gray-400">{contactInfo.workingHours}</p>
              </div>
              <Link to="/catalog" className="btn-secondary text-lg px-8 py-4 inline-block">
                Browse Projects
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JournalServices;
