import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="
            bg-gray-800
            text-white
            shadow-md
            hover:shadow-2xl
            transition-all duration-300
            rounded-xl
            border border-gray-700
            p-4
            hover:scale-[1.03]
            overflow-hidden
            relative
            group
        ">
            {product.image && (
                <div className="relative rounded-lg overflow-hidden border border-gray-700 shadow-md">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="
                            w-full
                            h-48
                            object-cover
                            rounded-t-lg
                            mb-4
                            /* Added shiny border styling below */
                            border-4
                            border-opacity-50
                            border-gradient-to-r from-purple-400 to-pink-600
                            transition-all duration-500
                            group-hover:border-opacity-100
                            group-hover:scale-[1.02] /* Added slight scale on hover with the border */
                        "
                    />

                </div>
            )}
            <div className="font-semibold text-xl text-white mt-2">{product.name}</div>
            <div className="text-yellow-400 text-lg font-semibold">Price: ${product.price.toFixed(2)}</div>
            <p className="
                text-gray-200  /* Changed text color to a lighter shade */
                text-base    /* Increased font size to base (16px) */
                mt-2
                line-clamp-2
            ">
                {product.description}
            </p>

        </div>
    );
};

export default ProductCard;
