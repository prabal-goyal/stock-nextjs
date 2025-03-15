import React from "react";

interface CategoryProps {
    categories: string[];
    activeCategory?: string | null;
    onCategorySelect?: (category: string) => void;
}

const Category: React.FC<CategoryProps> = ({ categories, activeCategory, onCategorySelect }) => {
    return (
        <div className="flex gap-4 mb-6 overflow-x-auto border-b pb-2">
            {categories?.map((category) => (
                <button
                    key={category}
                    className={`px-4 py-2 rounded-md transition ${activeCategory === category
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                        }`}
                    onClick={() => onCategorySelect && onCategorySelect(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default Category;
