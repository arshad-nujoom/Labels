import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Leaf, FileDown, FileCheck } from 'lucide-react';
import LabelForm from './components/LabelForm';
import LabelDocument from './components/LabelDocument';
import { LabelData, FontSize } from './types';

const initialLabelData: LabelData = {
  productName: '',
  price: '',
  dueDate: '',
  ingredients: '',
  allergens: '',
  instructions: '',
  description: '',
  isVegan: false,
  fontSize: 'normal'
};

function App() {
  const [labelData, setLabelData] = useState<LabelData>(initialLabelData);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleUpdateLabelData = (data: Partial<LabelData>) => {
    setLabelData(prev => ({ ...prev, ...data }));
  };

  const handleValidityChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center">
          <Leaf className="h-8 w-8 text-green-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Food Label Generator</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Enter Label Information</h2>
              <LabelForm 
                labelData={labelData}
                onUpdateLabelData={handleUpdateLabelData}
                onValidityChange={handleValidityChange}
              />
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              {isFormValid ? (
                <PDFDownloadLink
                  document={<LabelDocument labelData={labelData} />}
                  fileName="food-labels.pdf"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  {({ loading }) => 
                    loading ? (
                      <>
                        <FileDown className="mr-2 h-5 w-5" />
                        Preparing PDF...
                      </>
                    ) : (
                      <>
                        <FileCheck className="mr-2 h-5 w-5" />
                        Download PDF
                      </>
                    )
                  }
                </PDFDownloadLink>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-400 cursor-not-allowed"
                >
                  <FileDown className="mr-2 h-5 w-5" />
                  Download PDF
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;