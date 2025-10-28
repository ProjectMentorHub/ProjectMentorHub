import { motion } from 'framer-motion';

const AdSidebar = () => {
  return (
    <aside className="hidden lg:block w-64">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="sticky top-24"
      >
        {/* Ad Container */}
        <div className="space-y-4">
          {/* Advertisement 1 */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center min-h-[300px] flex flex-col items-center justify-center">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 font-medium">Advertisement Space</p>
            <p className="text-xs text-gray-400 mt-2">300x250</p>
          </div>

          {/* Advertisement 2 */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center min-h-[250px] flex flex-col items-center justify-center">
            <div className="text-gray-400 mb-2">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500 font-medium">Advertisement Space</p>
            <p className="text-xs text-gray-400 mt-2">300x250</p>
          </div>

          {/* Quick Links */}
          <div className="bg-white border border-black/10 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-3">Need Help?</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@projectmentorhub.com" className="text-gray-600 hover:text-black transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <a href="/journals" className="text-gray-600 hover:text-black transition-colors">
                  Journal Publishing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </aside>
  );
};

export default AdSidebar;

