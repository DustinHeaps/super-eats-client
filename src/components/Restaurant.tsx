import { Link } from 'react-router-dom';

interface RestaurantProps {
  id: string;
  image: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<RestaurantProps> = ({
  id,
  image,
  name,
  categoryName,
}) => {
  console.log(id)
  return (
  <Link to={`/restaurants/${id}`}>
  <div className="flex flex-col">
    <div
      style={{ backgroundImage: `url('${image}')` }}
      className="mb-3 bg-center bg-cover py-28"
    ></div>
    <h3 className="text-xl font-medium">{name}</h3>
    <span className="py-2 mt-2 text-xs border-t border-gray-400 opacity-50">
      {categoryName}
    </span>
  </div>
</Link>
  )
}
 