interface DishProps {
  id?: number;
  isSelected?: boolean;
  description: string;
  name: string;
  price: number;
  photo: string;
  isCustomer?: boolean;
  orderStarted?: boolean;
  options?: any;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
}

export const Dish: React.FC<DishProps> = ({
  id = 0,
  isSelected,
  description,
  name,
  price,
  photo,
  isCustomer = false,
  orderStarted = false,
  options,
  addItemToOrder,
  removeFromOrder,
  children: dishOptions,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
    }
    if (isSelected && removeFromOrder) {
      return removeFromOrder(id);
    }
  };

  return (
    <div
      className={` flex p-4 border cursor-pointer transition-all ${
        isSelected ? 'border-gray-800' : 'hover:border-gray-800'
      }`}
    >
      <div className="flex">

        <div className='flex flex-col justify-between w-2/3 pr-3'>
          <div>
        <h3 className="text-lg font-medium flex items-center leading-6">
          {name}{' '}
          {orderStarted && (
            <button
              className={`ml-3 py-1 px-3 focus:outline-none text-sm  text-white ${
                isSelected ? 'bg-red-500' : ' bg-lime-600'
              }`}
              onClick={onClick}
            >
              {isSelected ? 'Remove' : 'Add'}
            </button>
          )}
        </h3>
        <h4 className='font-light text-xs text-gray-600'>{description}</h4>
        </div>
        <span>${price}</span>
        </div>
        
    

    
      <div className='w-1/3'>
        <img src={photo} alt=""/>
        </div>
        </div>
      {isCustomer && options && options?.length !== 0 && (
        <div>
          <h5 className="mt-6 mb-3 font-medium">Dish Options:</h5>
          <div className="justify-start grid gap-2"> {dishOptions}</div>
          
        </div>
      )}
    </div>
  );
};