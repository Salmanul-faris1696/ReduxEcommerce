import { Button, Modal, Table } from 'antd';
import { PiShoppingCart } from 'react-icons/pi';
import { useMutation, useQuery } from 'react-query';
import { ApiClientPrivate } from '../../../utils/axios';
import { useQueryClient } from 'react-query';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  categories: string[];
}

const ProductTable: React.FC = () => {
  const { data, isLoading, isError } = useQuery<Product[], Error>('products', async () => {
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

  const handleDelete = async (id: string) => {
    try {
      await deleteProductMutation.mutateAsync(id);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


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
      render: (text: string, record: Product) => <img src={text} alt={record.title} style={{ width: '50px' }} />,
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
          <Button className='bg-blue-700 text-white'>Edit</Button>
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

//   console.log(!isLoading && {data});
  

  return (
    <div className='m-3 rounded-lg bg-orange-300 border shadow-gray-500 shadow-md'>
      <div className='mt-3 ml-3 font-bold'>
        <p className='p-3 flex items-center gap-3'>
          Product TABLE <PiShoppingCart size={25} />
        </p>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
        <Table columns={columns} dataSource={data} className='p-2 w-full' rowKey='_id' />
      )}
    </div>
  );
};

export default ProductTable;
