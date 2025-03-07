import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import ProductDetails from './ProductDetails';
import { useCountContext } from '../hooks/UseCountContext';
import { BiSort } from "react-icons/bi";

const CatalogueContent = () => {
    const [data, setData] = useState([]); // Stores original data
    const [filteredData, setFilteredData] = useState([]); // Stores search results
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { cartItems } = useCountContext();
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setData(response.data);
                setFilteredData(response.data); // Initialize filteredData with all products
            })
            .catch(err => console.log(err));
    }, []);

    // 🔹 Update filteredData when searchValue changes
    useEffect(() => {
        if (!searchValue.trim()) {
            setFilteredData(data);
        } else {
            // Normalize search by removing spaces
            const normalizedSearch = searchValue.replace(/\s+/g, "").toLowerCase();

            const results = data.filter(product =>
                product.title.replace(/\s+/g, "").toLowerCase().includes(normalizedSearch)
            );

            setFilteredData(results);
        }
    }, [searchValue, data]);




    const selectPagehandler = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= Math.ceil(filteredData.length / itemsPerPage) && selectedPage !== page) {
            setPage(selectedPage);
        }
    };

    const startItem = (page - 1) * itemsPerPage;
    const endItem = Math.min(page * itemsPerPage, filteredData.length);

    return (
        <>
            <div className="flex-1 flex justify-center items-center h-[40px] font-normal my-4  bg-[#FFF9E5] w-[80%] m-auto p-3 shadow-md rounded-lg">
                <div className="flex gap-4 md:gap-8 items-center w-full px-4 py-2">
                    {/* Search Input */}
                    <div className="flex items-center gap-2">
                        <img src="./src/assets/akar-icons_search.svg" alt="search-icon" className="w-5 h-5" />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Search..."
                            className="border border-gray-500 bg-white w-[350px] px-3 py-1 rounded-full outline-none focus:ring-2 focus:ring-gray-400 w-48"
                        />
                    </div>

                    {/* Sorting Icon */}
                    <div className="cursor-pointer flex items-center">
                        <BiSort />
                    </div>

                    {/* Results Count */}
                    <div className="text-gray-700 font-medium ml-auto">
                        Showing {startItem + 1} - {endItem} of {filteredData.length} results
                    </div>
                </div>
            </div>

            <div className="mb-10">
                {selectedProduct ? (
                    <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-4 mx-5 md:mx-12 mt-10 pb-1">
                        {filteredData.slice(startItem, endItem).map(product => (
                            <Card
                                key={product.id}
                                product={product}
                                onClick={() => setSelectedProduct(product)}
                            />
                        ))}
                    </div>
                )}

                {filteredData.length > 0 && (
                    <div className="flex justify-center gap-4 px-3 md:px-0">
                        <span
                            className={`p-3 rounded-lg hover:cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-[#FFF9E5] 
                                ${page === 1 ? 'bg-[#f5f0df] text-gray-500 cursor-not-allowed' : ''}`}
                            onClick={() => selectPagehandler(page - 1)}
                        >
                            Previous
                        </span>
                        {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map((_, i) => (
                            <span
                                onClick={() => selectPagehandler(i + 1)}
                                key={i}
                                className={`p-3 rounded-lg hover:cursor-pointer bg-[#FFF9E5] hover:shadow-lg transition-shadow duration-200 ${page === i + 1 ? 'bg-[#eee0b1]' : ''}`}>
                                {i + 1}
                            </span>
                        ))}
                        <span
                            className={`p-3 rounded-lg hover:cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-[#FFF9E5] 
                                ${page === Math.ceil(filteredData.length / itemsPerPage) ? 'bg-[#f5f0df] text-gray-500 cursor-not-allowed' : ''}`}
                            onClick={() => selectPagehandler(page + 1)}
                        >
                            Next
                        </span>
                    </div>
                )}
            </div>
        </>
    );
};

const Catalogue = () => {
    return <CatalogueContent />;
};

export default Catalogue;
