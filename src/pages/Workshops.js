import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const upcomingHighlights = [
  {
    title: 'Hands-on Machine Learning',
    description:
      'A guided walkthrough building an ML project from dataset preparation to model deployment using Python and Streamlit.',
    tags: ['Python', 'Streamlit', 'Deployment']
  },
  {
    title: 'Full-Stack Web App in a Day',
    description:
      'Learn to scaffold a MERN-stack web application with authentication, payments, and admin dashboards.',
    tags: ['React', 'Node.js', 'Stripe']
  },
  {
    title: 'Project Documentation Masterclass',
    description:
      'Understand the structure of professional project reports, presentation decks, and viva readiness tips.',
    tags: ['Reports', 'Presentations', 'Viva']
  }
];

const WorkshopTimeline = () => (
  <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8">
    <h2 className="text-2xl font-semibold mb-4">Tentative Schedule</h2>
    <p className="text-gray-600 text-sm mb-6">
      Final dates will be announced here and emailed to registered students. We typically run two live cohorts every month.
    </p>
    <div className="space-y-4">
      {[
        {
          label: 'Batch 1',
          timeframe: 'Last week of July 2024',
          status: 'Registration opens soon'
        },
        {
          label: 'Batch 2',
          timeframe: 'Mid August 2024',
          status: 'Join waitlist to get early access'
        },
        {
          label: 'Mini Sessions',
          timeframe: 'Every Saturday evening (1-hour live demo)',
          status: 'Details will be posted here weekly'
        }
      ].map((entry) => (
        <div key={entry.label} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border border-black/5 rounded-2xl px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">{entry.label}</p>
            <p className="text-sm text-gray-500">{entry.timeframe}</p>
          </div>
          <span className="text-xs uppercase tracking-wide text-gray-600">{entry.status}</span>
        </div>
      ))}
    </div>
  </div>
);

const Workshops = () => {
  const breadcrumbs = [
    { name: 'Home', to: '/' },
    { name: 'Workshops', to: '/workshops' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 md:py-24">
      <SEO
        title="Live Workshops & Training | ProjectMentorHub"
        description="Join ProjectMentorHub live workshops to build real projects, understand documentation standards, and get exam-ready. Dates announced right on this page."
        canonical="https://projectmentorhub.com/workshops"
        noIndex={false}
      />

      <div className="container mx-auto px-4 max-w-6xl space-y-16">
        <div>
          <nav className="text-xs uppercase tracking-wide text-gray-500 mb-4 space-x-2">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.to}>
                <Link to={crumb.to} className="hover:text-gray-900">
                  {crumb.name}
                </Link>
                {index < breadcrumbs.length - 1 && <span className="mx-2 text-gray-300">/</span>}
              </span>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid gap-8 md:grid-cols-[2fr,1fr]"
          >
            <div className="bg-white border border-black/10 rounded-3xl p-8 space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Live Workshop Series</h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We are launching interactive, instructor-led workshop cohorts to help you build capstone-ready projects,
                  polish your documentation, and prepare for viva presentations. Each workshop combines live coding, guided documentation,
                  and Q&A with our mentors.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">What to expect</h2>
                <ul className="space-y-3 text-gray-600">
                  {[
                    'Live sessions with step-by-step project implementation',
                    'Session recordings and reusable project templates',
                    'Dedicated time for doubt clearing and viva preparation',
                    'Certificate of participation for every attendee'
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gray-900" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-4">Workshop spotlight</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {upcomingHighlights.map((item) => (
                    <div key={item.title} className="border border-black/10 rounded-2xl p-5 bg-white">
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Coming soon</p>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-gray-900 text-white p-6 space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Notify me</p>
                <p className="text-2xl font-semibold">Want early access to workshop dates?</p>
                <p className="text-white/70">
                  Drop us a mail at <a href="mailto:dontfear166@gmail.com" className="underline">dontfear166@gmail.com</a> with your name,
                  branch, and preferred topic. We will share the registration link as soon as dates are finalised.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <WorkshopTimeline />

              <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8 space-y-4">
                <h2 className="text-2xl font-semibold">Stay Updated</h2>
                <p className="text-sm text-gray-600">
                  We also post workshop announcements and registration links on:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>
                    <span className="font-semibold text-gray-900">Instagram:</span> upcoming projects demos & polls
                  </li>
                  <li>
                    <span className="font-semibold text-gray-900">LinkedIn:</span> event pages with reminders
                  </li>
                  <li>
                    <span className="font-semibold text-gray-900">Email:</span> priority access for newsletter subscribers
                  </li>
                </ul>
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition"
                >
                  Explore Projects While You Wait
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Workshops;
