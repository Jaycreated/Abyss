import React, { useState } from 'react';

interface Category {
  name: string;
  subcategories: Category[];
}

const FamilyTree: React.FC<{ category: Category }> = ({ category }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [subcategories, setSubcategories] = useState(category.subcategories);
  const [newSubcategoryName, setNewSubcategoryName] = useState('');

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCreateSubcategory = () => {
    if (newSubcategoryName.trim() === '') return;

    const newSubcategory: Category = {
      name: newSubcategoryName,
      subcategories: [],
    };

    setSubcategories([...subcategories, newSubcategory]);
    setNewSubcategoryName('');
  };

  return (
      <div className="flex flex-col items-center">
        <div className="flex items-center">
          <button
              className={`mr-2 ${isExpanded ? 'text-red-500' : 'text-green-500'}`}
              onClick={handleToggleExpand}
          >
            {isExpanded ? '-' : '+'}
          </button>
          <p>{category.name}</p>
        </div>
        {isExpanded && (
            <div className="ml-4 mt-2 border-l-2 pl-2">
              <ul className="space-y-2">
                {subcategories.map((subcategory, index) => (
                    <li key={index}>
                      <FamilyTree category={subcategory} />
                    </li>
                ))}
              </ul>
              <div className="flex mt-2">
                <input
                    type="text"
                    value={newSubcategoryName}
                    onChange={(e) => setNewSubcategoryName(e.target.value)}
                    placeholder="Enter subcategory name"
                    className="mr-2 px-2 py-1 border"
                />
                <button
                    onClick={handleCreateSubcategory}
                    className="bg-black hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                >
                  Add Subcategory
                </button>
              </div>
            </div>
        )}
      </div>
  );
};

const App: React.FC = () => {
  const initialCategories: Category[] = [
    {
      name: 'Category',
      subcategories: [],
    },
  ];

  return (
      <div className="flex min-h-screen flex-col items-center p-24">
        {initialCategories.map((category, index) => (
            <FamilyTree key={index} category={category} />
        ))}
      </div>
  );
};

export default App;
