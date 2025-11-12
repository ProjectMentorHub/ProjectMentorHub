import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { getDisplayCategory } from '../utils/projectMetadata';

const ProjectCard = ({ project }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(project);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/checkout', {
      state: {
        buyNowItems: [{ ...project, quantity: 1 }],
        source: 'buy-now'
      }
    });
  };

  const displayCategory = getDisplayCategory(project);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Link to={`/project/${project.id}`} className="block h-full">
        <div className="bg-white border border-black/10 overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
          <div className="relative bg-gray-100 flex items-center justify-center overflow-hidden h-48 sm:h-52">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="max-h-full max-w-full object-contain transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
            )}
          </div>
          
          <div className="p-6 flex flex-col flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold group-hover:text-gray-600 transition-colors">
                {project.title}
              </h3>
              <span className="text-xs bg-black text-white px-2 py-1 ml-2 flex-shrink-0">
                {displayCategory}
              </span>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">₹{project.price.toLocaleString()}</span>
              </div>
              
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary px-3 py-2 text-xs"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn-secondary px-3 py-2 text-xs"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
