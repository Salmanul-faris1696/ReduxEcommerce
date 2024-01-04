import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-query';
import { ApiClientPrivate } from '../utils/axios';

export type Product = {
  title: string;
  desc: string;
  price: number;
  image: File | null ;
  categories:  string[];
  size: string;
}

const CreateProduct = () => {
  const [product, setProduct] = useState<Product>({
    title: '',
    desc: '',
    price: 0,
    image: null,
    categories: [],
    size: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
    }
  };



    const createProductMutation = useMutation({
      mutationFn:(data: Product) => {
      
        return ApiClientPrivate.post("/products", data,{
          headers:{
            "Content-Type":"multipart/form-data   "
          }
        })
      },
      onSuccess: (data:any) => {
        console.log({data});
        
      },
      onError(error:any) {
        console.log({error});
      },

    })


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createProductMutation.mutateAsync(product);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setProduct({ ...product, categories: selectedOptions });
  };


  return (
    <div className="relative h-screen bg-opacity-70 bg-login bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="mx-auto opacity-80">
        <form className="flex flex-col max-w-md mx-auto h-[550px] p-5" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold font-serif mb-2 text-center">Create Product</h2>

          <div className="mb-3">
            <label htmlFor="title" className="block text-black font-bold mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={product.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="desc" className="block text-black font-bold mb-1">
              Description
            </label>
            <textarea
              name="desc"
              id="desc"
              value={product.desc}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-3 h-[100px] px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="block text-black font-bold mb-1">
              Image
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="block text-black font-bold mb-1">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="block text-black font-bold mb-1">
              Category
            </label>
            <select
              name="category" multiple
              value={product.categories}
              onChange={handleCategoryChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="fruits">Fruits</option>
              <option value="vegetable">Vegetable</option>
              <option value="snacks">Snacks</option>
              <option value="fast-foods">Fast foods</option>
              <option value="bakeries">Bakeries</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="size" className="block text-black font-bold mb-1">
              Size
            </label>
            <select
              name="size"
              value={product.size}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>

          <div className="mb-3 text-center ">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600 w-full" onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
