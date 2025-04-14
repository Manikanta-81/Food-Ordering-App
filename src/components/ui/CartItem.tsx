import { PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { item: foodItem, quantity } = item;
  
  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={foodItem.image}
          alt={foodItem.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium text-darkText">{foodItem.name}</h3>
            <p className="mt-1 text-sm text-lightText">${foodItem.price.toFixed(2)}</p>
          </div>
          <p className="text-right font-medium text-darkText">
            ${(foodItem.price * quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-gray-200 rounded-md">
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-primary"
              onClick={() => updateQuantity(foodItem.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="px-2 py-1 text-sm">{quantity}</span>
            <button
              type="button"
              className="p-1 text-gray-600 hover:text-primary"
              onClick={() => updateQuantity(foodItem.id, quantity + 1)}
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            className="text-red-500 hover:text-red-700"
            onClick={() => removeFromCart(foodItem.id)}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 