import { motion } from 'framer-motion';

const AdBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-gray-50 to-gray-100 border-y border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Advertisement Banner */}
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-[120px] flex flex-col items-center justify-center hover:shadow-lg transition-all">
            <div className="text-gray-400 mb-3">
              <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-600 font-medium">Advertisement Space</p>
            <p className="text-xs text-gray-400 mt-1">728x90 Leaderboard</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdBanner;

