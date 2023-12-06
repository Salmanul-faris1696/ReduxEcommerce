import React from 'react';

interface PaymentPromptProps {
    product: { name: string; price: string };
    onConfirm: () => void;
    onCancel: () => void;
    isOpen: boolean;
}

const PaymentPrompt: React.FC<PaymentPromptProps> = ({ product, onConfirm, onCancel, isOpen }) => {
    if (!isOpen) {
        return null; // Do not render the prompt if isOpen is false
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-md ">
                <h2 className="text-xl font-bold mb-4 text-center">Confirm Payment</h2>
                <p>You are about to purchase {product.name} </p>
                    
                    <p className='text-center'>   Amount : {product.price}.</p>
                 
                    <p className='text-red-600'>Do you want to proceed with the payment?</p> 
                <div className="mt-6 flex justify-center">
                    <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded-md" onClick={onConfirm}>
                        OK
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPrompt;
