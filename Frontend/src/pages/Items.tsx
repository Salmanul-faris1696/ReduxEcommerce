import React, { useState } from "react";
import { Card, Col, Input, Row } from "antd";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { ApiClientPrivate } from "../utils/axios";
import { productImgUrl } from "../utils/urls";
import { FaHome } from "react-icons/fa";

const { Search } = Input;

const Items: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery("products", async () => {
    try {
      const response = await ApiClientPrivate.get("/products");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching Products");
    }
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching products</p>;
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products?.filter((product: any) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHomeButton = () => {
    navigate("/");
  };

  return (
    <div>
      <nav className="bg-white p-4 py-8 flex justify-between shadow-lg ">
        <div>
          <h1 className="text-4xl font-semibold font-serif">Products</h1>
        </div>

        <div className="flex items-center gap-5">
          <Search
            placeholder="Search products..."
            allowClear
            value={searchQuery}
            enterButton="Search"
            onChange={handleSearch}
            className="w-[400px] mr-4  bg-gray-500 p-2"
          />

          <div>
            <p
              className="border border-black rounded-full w-[50px] h-[50px] flex items-center justify-center text-[22px] text-black cursor-pointer"
              onClick={handleHomeButton}
            >
              <FaHome size={25} />
            </p>
          </div>
        </div>
      </nav>
      <div className="mx-auto mt-4">
        <Row gutter={[16, 16]}>
          {filteredProducts.map((product: any) => (
            <Col key={product._id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Link to={`/product/${product._id}`}>
                <Card
                  title={product.title}
                  bordered={false}
                  className="h-full cursor-pointer hover:scale-95 duration-300"
                >
                  <img
                    src={`${productImgUrl}/${product.image}`}
                    alt=""
                    className="h-40 w-full object-cover"
                  />
                  <p>Price: ${product.price}</p>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Items;
