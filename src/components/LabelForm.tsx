import React, { useEffect } from 'react';
import { LabelData, FontSize } from '../types';

interface LabelFormProps {
  labelData: LabelData;
  onUpdateLabelData: (data: Partial<LabelData>) => void;
  onValidityChange: (isValid: boolean) => void;
}

const LabelForm: React.FC<LabelFormProps> = ({ 
  labelData, 
  onUpdateLabelData,
  onValidityChange
}) => {
  // Check if all required fields are filled
  useEffect(() => {
    const isValid = 
      labelData.productName.trim() !== '' &&
      labelData.price.trim() !== '' &&
      labelData.dueDate.trim() !== '' &&
      labelData.ingredients.trim() !== '' &&
      labelData.instructions.trim() !== '';
    
    onValidityChange(isValid);
  }, [labelData, onValidityChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      onUpdateLabelData({ [name]: checked });
    } else {
      onUpdateLabelData({ [name]: value });
    }
  };

  return (
    <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          Product Name*
        </label>
        <input
          type="text"
          name="productName"
          id="productName"
          value={labelData.productName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price (SEK)*
        </label>
        <input
          type="text"
          name="price"
          id="price"
          value={labelData.price}
          onChange={handleChange}
          placeholder="e.g., 59 kr"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
          Due Date*
        </label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          value={labelData.dueDate}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
      </div>

      <div className="col-span-2 sm:col-span-1">
        <label htmlFor="fontSize" className="block text-sm font-medium text-gray-700">
          Font Size
        </label>
        <select
          id="fontSize"
          name="fontSize"
          value={labelData.fontSize}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        >
          <option value="normal">Normal</option>
          <option value="small">Small</option>
          <option value="smallest">Smallest</option>
        </select>
      </div>

      <div className="col-span-2">
        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
          Ingredients*
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          rows={3}
          value={labelData.ingredients}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
      </div>

      <div className="col-span-2">
        <label htmlFor="allergens" className="block text-sm font-medium text-gray-700">
          Allergens
        </label>
        <input
          type="text"
          name="allergens"
          id="allergens"
          value={labelData.allergens}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>

      <div className="col-span-2">
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
          Consumption Guidelines/Instructions*
        </label>
        <textarea
          id="instructions"
          name="instructions"
          rows={2}
          value={labelData.instructions}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          required
        />
      </div>

      <div className="col-span-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={labelData.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>

      <div className="col-span-2">
        <div className="flex items-center">
          <input
            id="isVegan"
            name="isVegan"
            type="checkbox"
            checked={labelData.isVegan}
            onChange={handleChange}
            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <label htmlFor="isVegan" className="ml-2 block text-sm text-gray-700">
            Vegan Product
          </label>
        </div>
      </div>

      <div className="col-span-2 text-sm text-gray-500">
        Fields marked with * are required
      </div>
    </form>
  );
};

export default LabelForm;