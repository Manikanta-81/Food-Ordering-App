import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link 
      to={`/menu/${category.id}`} 
      className="group card hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
          <h3 className="text-white text-lg font-bold">{category.name}</h3>
        </div>
      </div>
      
      {category.description && (
        <div className="p-4 bg-white">
          <p className="text-lightText text-sm">{category.description}</p>
        </div>
      )}
    </Link>
  );
} 