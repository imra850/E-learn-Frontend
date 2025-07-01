import { getAllCategories } from "../../services/Category.service";
import { useState } from "react";
import { useEffect } from "react";
import CategoryView from "./CategorieView";
const Categories = () => {
    const [categoriesData, setCategoriesData] = useState(null);
  
    async function loadCategories() {
      const catData = await getAllCategories();
      console.log(catData);
      setCategoriesData(catData);
    }
  
    useEffect(() => {
      loadCategories();
    }, []);
  
    return (
      <div className="px-8 mt-16">
        <h1 className="text-3xl px-20  font-bold">Categories</h1>
        <div className="flex flex-col px-20  md:flex-row gap-3 mt-4 flex-wrap">
          {categoriesData?.content.map((cat, index) => (
            <CategoryView key={index} cat={cat} />
          ))}
        </div>
      </div>
    );
  };
  
  export default Categories;