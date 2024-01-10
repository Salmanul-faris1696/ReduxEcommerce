import { Button, Modal, Table } from 'antd';
import { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';
import { PiShoppingCart } from 'react-icons/pi';
import { useMutation, useQuery, useQueryClient, } from 'react-query';
import { ApiClientPrivate } from '../../../utils/axios';
import { productImgUrl } from '../../../utils/urls';
import EditProductModal from '../EditProductModal';
import { useNavigate } from 'react-router-dom';
import Category from './../../Category';


interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  categories: string[];
}

const ProductTable: React.FC = () => {
  const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');



  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data, isLoading, isError, refetch } = useQuery<Product[], Error>('products', async () => {
    try {
      const response = await ApiClientPrivate.get<Product[]>('/products');
      return response.data;
    } catch (error) {
      throw new Error('Error fetching data');
    }
  });
   const queryClient = useQueryClient();

  const deleteProductMutation = useMutation(
    (id: string) => ApiClientPrivate.delete(`/products/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
      },
    }
  );
const updateProductMutation = useMutation(
  async (updatedProduct: Product) => {
    try {
      const response = await ApiClientPrivate.put(`/products/${updatedProduct._id}`, updatedProduct);
      return response.data; // Return the updated product data
    } catch (error) {
      throw new Error('Error updating product');
    }
  },
  {
    onSuccess: (data) => {
      queryClient.invalidateQueries('products');
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
  }
);

  const handleDelete = async (id: string) => {
    try {
      await deleteProductMutation.mutateAsync(id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditModalSuccess = (updatedProduct: Product) => {
  try {
    updateProductMutation.mutate(updatedProduct);
    // window.location.reload(); // Refresh the page after successful edit
    refetch()
  } catch (error) {
    console.error('Error updating product:', error);
  }
};


  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setSelectedProduct(null);
  };

  const handleHomeButton = () =>{
    navigate('/');

}
 const handleDashBoardHome = () =>{
    navigate('/DashBoard');

}






  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',

      render: (text: string, record: Product) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
            ellipsis: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (record: string) => <img src={`${productImgUrl}/${record}`} alt={record} style={{ width: '50px' }} />,
    },
    {
      title: 'Categories',
      dataIndex: 'categories',
      key: 'categories',
      render: (categories:[]) => categories.map(it => it),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: Product) => (
        <>
          <Button className='bg-blue-700 text-white' onClick={() => handleEdit(record)}>Edit</Button>
          <Button className='bg-red-600 text-white'  onClick={() => {
              Modal.confirm({
                title: 'Confirm',
                content: 'Are you sure you want to delete this product?',
                onOk() {
                  handleDelete(record._id);
                },
              });
            }}>Delete</Button>
        </>
      ),
    },
  ];
const filteredProducts = data?.filter(
  (product) =>
    product.title?.toLowerCase().includes(searchQuery?.toLowerCase() ?? '') ||
    product.description?.toLowerCase().includes(searchQuery?.toLowerCase() ?? '')
);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // console.log(!isLoading && {data});
  

  return (
    <div className='m-3 rounded-lg  bg-orange-300 border shadow-gray-500 shadow-md'>
      <div className='mt-3 ml-3 font-bold flex items-center justify-between mr-5  '>
        <p className='p-3 flex items-center gap-3'>
          Product TABLE <PiShoppingCart size={25} />
        </p>
        <div className='flex justify-center my-3 '>
        <input
          type='text'
          placeholder='Search by name of Product or category'
          value={searchQuery}
          onChange={handleSearch}
          className='p-2 border rounded-md w-80 font-normal'
        />
      </div>


        <div className='flex gap-5'>

        <p className='border border-black rounded-full w-[50px] h-[50px] flex items-center justify-center text-[22px]   text-black ' onClick={handleHomeButton}>
          <FaHome size={25}/>
        </p>
        <p className='border border-black rounded-full w-[50px] h-[50px] flex items-center justify-center text-[22px]   text-black ' onClick={handleDashBoardHome}>
          <MdDashboardCustomize size={25}/>
        </p>
        </div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
        <Table columns={columns} dataSource={filteredProducts ? filteredProducts : data} pagination={{ pageSize: 10 }} scroll={{ y: 540 }}  className='p-2 w-full' rowKey='_id' />
        )}
        <EditProductModal
        open={isEditModalVisible}
       onCancel={handleEditModalCancel}
       productId={selectedProduct?._id || ''}
       initialProduct={selectedProduct || {}}
       onSuccess={handleEditModalSuccess}
     />
    </div>
  );
};

export default ProductTable;
