import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { getDisplayCategory } from '../utils/projectMetadata';

const ProjectCard = ({ project }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(project);
  };

  const displayCategory = getDisplayCategory(project);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/project/${project.id}`} className="block">
        <div className="bg-white border border-black/10 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="aspect-video bg-gray-200 relative overflow-hidden">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
            )}
          </div>
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold group-hover:text-gray-600 transition-colors line-clamp-1">
                {project.title}
              </h3>
              <span className="text-xs bg-black text-white px-2 py-1 ml-2 flex-shrink-0">
                {displayCategory}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">
              {project.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">₹{project.price.toLocaleString()}</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={handleAddToCart}
                className="w-full btn-primary text-sm"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
