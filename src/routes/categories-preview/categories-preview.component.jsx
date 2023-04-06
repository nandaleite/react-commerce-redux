import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

import "./categories-preview.styles.scss";
const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <div className="categories-preview-container">
      <div className="products-container">
        {Object.keys(categoriesMap).map((title) => {
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products}></CategoryPreview>;
        })}
      </div>
    </div>
  );
};
export default CategoriesPreview;
