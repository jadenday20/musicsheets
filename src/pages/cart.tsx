import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import formatPrice from '@/components/FormatPrice';

interface Song {
  _id: number;
  name: string;
  composer: string;
  price: number;
  file: string;
  audioFiles: string[];
  category: string;
  instruments: string[];
}

export default function Cart() {
    const [cartItems, setCartItems] = useState<Song[]>([]);

    useEffect(() => {
        // Retrieve cart items from localStorage when the component mounts on the client side
        const cartItemsString = localStorage.getItem('sheetMusicCartItems');
        const parsedCartItems: Song[] = cartItemsString ? JSON.parse(cartItemsString) : [];
        setCartItems(parsedCartItems);
    }, []); // Empty dependency array ensures this runs only once after the component mounts

    //Function to calculate total price
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    // Function to remove an item from the cart
    const removeFromCart = (itemId: number) => {
        const updatedCart = cartItems.filter(item => item._id !== itemId);
        setCartItems(updatedCart);
        // Update localStorage with the updated cart items
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    return (
        <Layout>
          <h2>Cart</h2>
            <div>
                {cartItems.length > 0 ? (
                    <div className='p-3'>
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index} className='rounded p-3 border-gray-600 border-2 my-2'>
                                    <div className='flex gap-6 justify-between text-xl'>
                                        {/* Display cart item details */}
                                        <a href={`/products/${item._id}`} className='underline decoration-1 hover:bg-black rounded-sm hover:text-white duration-700 p-2'>{item.name}</a>
                                        <p className='p-2'>{formatPrice(item.price)}</p>
                                    </div>
                                    <button onClick={() => removeFromCart(item._id)} className='text-red-800 underline decoration-1 text-sm rounded-sm hover:bg-red-800 p-2 hover:text-white duration-700'>Delete</button>
                                </li>
                            ))}
                        </ul>
                        <p className='text-right text-xl'>Total: {formatPrice(calculateTotalPrice())}</p>
                    </div>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
            <div>
                <Button linkTitle="Checkout" href='/checkout' center />
                <span className='w-96 h-px bg-slate-800 my-2 block mx-auto'></span>
                <Button linkTitle="Shop for More" href='/shop' center />
            </div>
        </Layout>
    );
}