import { useState } from 'react';
import { Button, Modal, Form, Input,Select, Upload, UploadProps, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useMutation } from 'react-query';
import { ApiClientPrivate } from '../../utils/axios';

const EditProductModal = ({ open, onCancel, productId, initialProduct, onSuccess }: any) => {
  const [form] = Form.useForm();
  const [product, setProduct] = useState(initialProduct);

  const updateProductMutation = useMutation(
    (updatedProduct) => ApiClientPrivate.put(`/products/${productId}`, updatedProduct,{
      headers:{
         "Content-Type":"multipart/form-data"
      }
    }),
    {
      onSuccess: () => {
        onSuccess();
        onCancel();
      },
    }
  );

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      console.log({values});
    
      // const formdata = new FormData()
      // values.image && formdata.append("image",values.image[0].originFileObj)

      
      let updatedProduct :any= {  ...values };
      if(values.image){
        updatedProduct.image = values?.image[0]?.originFileObj
      } 
      console.log({updatedProduct});
      
      // const updatedProduct = { ...product, ...values };
      await updateProductMutation.mutateAsync(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
   const handleCategoryChange = (selectedCategories: string[]) => {
    setProduct({ ...product, categories: selectedCategories });
  };

  const props: UploadProps = {
  name: 'image',
  multiple:false,
  listType:"picture",
  // action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  headers: {
    "Content-Type":"multipart/form-data"
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    // if (info.file.status === 'done') {
    //   message.success(`${info.file.name} file uploaded successfully`);
    // } else if (info.file.status === 'error') {
    //   message.error(`${info.file.name} file upload failed.`);
    // }
  },
};


const normFile = (e:any) => {
 if(Array.isArray(e)){
  return e
 }

 return e && e.fileList
}
  return (
    <Modal
      open={open}
      title="Edit Product"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdate}>
          Update
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={product}
        onValuesChange={(changedValues) => setProduct({ ...product, ...changedValues })}
      >
        <Form.Item label="Title" name="title" rules={[{  }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="desc">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{  pattern: /^\d+(\.\d{1,2})?$/,
      message: 'Please enter a valid price',}]}>
          <Input type="text" />
        </Form.Item>

        <Form.Item label="Image" name="image" valuePropName='fileList' getValueFromEvent={normFile}>
   <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
</Form.Item>

         <Form.Item label="Category" name="categories">
          <Select
            mode="multiple"
            value={product.categories}
            onChange={handleCategoryChange}
            className="w-full"
          >
            <Select.Option value="fruits">Fruits</Select.Option>
            <Select.Option value="vegetable">Vegetable</Select.Option>
            <Select.Option value="snacks">Snacks</Select.Option>
            <Select.Option value="fast-foods">Fast foods</Select.Option>
            <Select.Option value="bakeries">Bakeries</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;
