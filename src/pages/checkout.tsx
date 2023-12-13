import React, { useState, useEffect, ReactNode, FormEvent } from 'react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import formatPrice from '@/components/FormatPrice';
import FormSubmit from '@/components/FormSubmit'
import CountryOptions from '@/components/CountryOptions';

interface CartItem {
    name: ReactNode;
    _id: any;
    // Define the structure of your cart item
    price: number;
    // other properties if any
}

interface FormData {
    customerPhone: string;
    customerEmail: string;
    customerFName: string;
    customerLName: string;
    country: string;
    StreetAddress: string;
    StreetAddress2: string;
    City: string;
    State: string;
    Zip: string;
    CardNum: string;
    Expiration: string;
    CVC: string;
}

export default function Checkout() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Check if running in the browser before accessing localStorage
        if (typeof window !== 'undefined') {
            const cartItemsString = localStorage.getItem('sheetMusicCartItems');
            const parsedCartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
            setCartItems(parsedCartItems);
        }
    }, []);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const [cardNumber, setCardNumber] = useState('');

    const handleCardNumberChange = (event: { target: { value: string; }; }) => {
        let formattedInput = event.target.value.replace(/[^\d]/g, ''); // Remove non-digit characters

        // Add a space after every fourth character
        formattedInput = formattedInput.replace(/(\d{4})(?=\d)/g, '$1 ');

        setCardNumber(formattedInput);
    };

    const d = new Date();
    const year = d.getFullYear();
    const yearFinalDigits = year % 100;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const data: FormData = {
            customerPhone: formData.get('customerPhone') as string,
            customerEmail: formData.get('customerEmail') as string,
            customerFName: formData.get('customerFName') as string,
            customerLName: formData.get('customerLName') as string,
            country: formData.get('country') as string,
            StreetAddress: formData.get('StreetAddress') as string,
            StreetAddress2: formData.get('StreetAddress2') as string,
            City: formData.get('City') as string,
            State: formData.get('State') as string,
            Zip: formData.get('Zip') as string,
            CardNum: formData.get('CardNum') as string,
            Expiration: formData.get('Expiration') as string,
            CVC: formData.get('CVC') as string
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Handle success
            } else {
                // Handle errors
            }
        } catch (error) {
            // Handle network errors
        }
    };

    return (
        <>
            <Layout>
                <h2>Checkout</h2>
                <form action="" className='max-w-md w-full text-xl' onSubmit={handleSubmit}>
                    <fieldset className='rounded p-3 border-gray-600 border-2 w-full my-2'>
                        <h3>Your Cart:</h3>
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index}>
                                    <div className='flex gap-6 justify-between'>
                                        {/* Display cart item details */}
                                        <p className='p-1'>{item.name}</p>
                                        <p className='p-1'>{formatPrice(item.price)}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <p className='mt-6 text-right text-2xl'>Total Price: {formatPrice(calculateTotalPrice())}</p>
                    </fieldset>
                    <fieldset className='rounded p-3 border-gray-600 border-2 w-full my-2'>
                        <h3>Contact Information</h3>
                        <label htmlFor="customerPhone" className='my-2 block'>Phone: <input required type="tel" name="customerPhone" id="customerPhone" className='py-1 px-2 w-full' placeholder='(000) 000-0000' /></label>
                        <label htmlFor="customerEmail" className='my-2 block'>Email: <input required type="email" name="customerEmail" id="customerEmail" className='py-1 px-2 w-full' placeholder='johndoe@something.com' /></label>
                    </fieldset>
                    <fieldset className='rounded p-3 border-gray-600 border-2 w-full my-2'>
                        <h3>Billing Information</h3>
                        <label htmlFor="customerFName" className='my-2 block'>First Name: <input required type="text" name="customerFName" id="customerFName" className='py-1 px-2 w-full' /></label>
                        <label htmlFor="customerLName" className='my-2 block'>Last Name: <input required type="text" name="customerLName" id="customerLName" className='py-1 px-2 w-full' /></label>
                        <label htmlFor="Country" className='my-2 block'>Country / Region: <select id="country" name="country" className='py-1 px-2 w-full' >
                            <CountryOptions/>
                        </select></label>
                        <label htmlFor="StreetAddress" className='my-2 block'>Street Address: <input required type="text" name="StreetAddress" id="StreetAddress" className='py-1 px-2 w-full' /></label>
                        <label htmlFor="StreetAddress2" className='my-2 block'>Apartment, Suite, Unit (Optional): <input type="text" name="StreetAddress2" id="StreetAddress2" className='py-1 px-2 w-full' /></label>
                        <label htmlFor="City" className='my-2 block'>Town / City: <input required type="text" name="City" id="City" className='py-1 px-2 w-full' /></label>
                        <label htmlFor="State" className='my-2 block'>State / Province: <input required type="text" name="State" id="State" className='py-1 px-2 w-full' /></label>
                        <label htmlFor="Zip" className='my-2 block'>Zip / Postal Code: <input required type="text" name="Zip" id="Zip" className='py-1 px-2 w-full' /></label>

                    </fieldset>
                    <fieldset className='rounded p-3 border-gray-600 border-2 w-full my-2'>
                        <h3>Payment Information</h3>
                        <label htmlFor="CardNum" className='my-2 block'>
                            Card Number:{' '}
                            <input
                                required
                                type="text"
                                name="CardNum"
                                id="CardNum"
                                className='py-1 px-2 w-full'
                                pattern="[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="1234 1234 1234 1234"
                                title="1234 1234 1234 1234"
                                maxLength={19}
                            />
                        </label>
                        <div className='flex gap-2'>
                            <div className='flex flex-col'><label htmlFor="Expiration" className='my-2 block'>Expiration: <input required type="text" name="Expiration" id="Expiration" className='py-1 px-2 w-full' pattern="(?:0[1-9]|1[0-2])/[0-9]{2}"
                                title="Enter a date in this format MM/YY" placeholder={`12/${yearFinalDigits}`} /></label></div>
                            <div className='flex flex-col'><label htmlFor="CVC" className='my-2 block'>CVC: <input required type="num]" maxLength={3} name="CVC" id="CVC" className='py-1 px-2 w-full' pattern="[0-9]{3}" title="Enter a date in this format 123" placeholder='123' /></label></div>
                        </div>
                    </fieldset>
                    <FormSubmit linkTitle="Submit Order" center />
                    {/* <FormSubmit linkTitle={'Submit Order'} center></FormSubmit> */}
                </form>
                <span className='w-96 h-px bg-slate-800 my-2 block mx-auto'></span>
                <Button linkTitle="Shop for More" href='/shop' />
            </Layout >
        </>
    );
}