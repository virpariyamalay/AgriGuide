import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import { motion } from 'framer-motion';

const schema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  category: yup.string().required('Category is required'),
  description: yup.string().required('Description is required'),
  price: yup.number().positive('Price must be positive').required('Price is required'),
  unit: yup.string(),
  stock: yup.number().integer().min(0, 'Stock must be 0 or more'),
});

const ProductForm = ({ onSubmit, initialData = null, loading = false }) => {
  const [imagePreview, setImagePreview] = useState(initialData?.image || '');
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitForm = (data) => {
    onSubmit({ ...data, imageFile });
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            {...register('category')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            <option value="seeds">Seeds</option>
            <option value="fertilizers">Fertilizers</option>
            <option value="tools">Tools & Equipment</option>
            <option value="soils">Soils & Substrates</option>
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
          <select
            {...register('unit')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select unit</option>
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="litre">litre</option>
            <option value="ml">ml</option>
            <option value="piece">piece</option>
            <option value="bag">bag</option>
            <option value="pack">pack</option>
          </select>
          {errors.unit && (
            <p className="mt-1 text-sm text-red-600">{errors.unit.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stock / Quantity</label>
          <input
            type="number"
            {...register('stock')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Available stock"
            min={0}
          />
          {errors.stock && (
            <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Enter product description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              step="0.01"
              {...register('price')}
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto h-32 w-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview('');
                    setImageFile(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </>
            )}
          </div>
        </div>
      </div>

      <motion.button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isUploading || loading}
      >
        {isUploading ? (
          <div className="flex items-center">
            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
            Uploading...
          </div>
        ) : loading ? (
          <div className="flex items-center">
            <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
            Saving...
          </div>
        ) : initialData ? (
          'Update Product'
        ) : (
          'Add Product'
        )}
      </motion.button>
    </motion.form>
  );
};

export default ProductForm;