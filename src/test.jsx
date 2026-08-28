import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Test() {
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const styles = {
    main: {
      padding: "20px",
    },
    title: {
      color: "#5C6AC4",
    },
  };
  const handleSearch = () => {
    const queryList = products.filter((product) =>
      product.title.toLowerCase().includes(searchInput.toLowerCase()),
    );
    setSearchProducts(queryList);
  };
  const fectchData = async () => {
    try {
      const productsList = await axios.get("https://dummyjson.com/products");
      console.log(productsList);
      setProducts(productsList?.data?.products);
      setSearchProducts(productsList?.data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fectchData();
  }, []);

  return (
    <div className="m-4 p-4 ">
      <div className="flex gap-2">
        <input
          className=" p-2 rounded-lg border-2 border-black"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          className="mx-2 p-2 rounded-lg bg-green-200 cursor-pointer"
          onClick={() => handleSearch()}
        >
          Search
        </button>
      </div>
      <div className="border rounded-lg flex flex-wrap flex-row gap-1">
        {searchProducts.map((product) => {
          const { id, title, description, images } = product;
          return (
            <div
              className="w-60 h-xl m-4 p-2 flex flex-col flex-wrap items-center rounded-lg bg-slate-300 hover:bg-slate-500 cursor-pointer"
              key={id}
            >
              <div className="flex flex-wrap justify-between text-center gap-0">
                {images.map((image, index) => (
                  <img
                    className={`size-[52/${index + 1}] shadow-2xl rounded-lg`}
                    id={id + "_" + index}
                    alt="alternate"
                    src={image}
                  />
                ))}
              </div>
              <h1 className="font-bold text-2xl text-center">{title}</h1>
              <h2 className="font-medium text-center text-wrap">
                {description}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Test;
