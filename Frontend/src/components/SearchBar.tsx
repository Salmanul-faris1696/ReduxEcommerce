import { IoIosSearch } from "react-icons/io";
import { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import prodData from "../data/feature.json";

const SearchBar = () => {
    const [activeSearchBar, setActiveSearchBar] = useState<any[]>([]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTerm: string = e.target.value;

        if (searchTerm === '') {
            setActiveSearchBar([]);
            return false;
        }

        const filteredProducts = prodData.filter((product: any) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setActiveSearchBar(filteredProducts);
    };

    return (
        <div>
            <div>
                <input 
                    type="text" 
                    placeholder="Search products" 
                    className="bg-[#f2f3f5] border-none outline-none px-6 py-3 rounded-[30px] w-full hover:scale-105 duration-300" 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e)}
                />
                <IoIosSearch size={20} className="absolute top-0 right-0 mt-4 mr-5 text-gray-500" />
            </div>

            {activeSearchBar.length > 0 && (
                <div className="absolute top-20 p-4 bg-slate-200  text-black w-full rounded-xl left-1/2 -translate-x-1/2 grid gap-3 ">
                    {activeSearchBar.map((product: any) => (
                        <Link key={product.id} to={`/product/${product.id}`} className="text-black hover:text-blue-500">
                            <div className="flex items-center gap-2">
                                <img src={product.img} alt={product.name} className="h-8 w-8" />
                                <span>{product.name}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
