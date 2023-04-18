import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector";
import { Spinner } from "../../components/spinner/spinner.component";

import "./categories-preview.styles.scss";
const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  console.log("AAAAAAA", isLoading);
  return (
    <div className="categories-preview-container">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="products-container">
          {Object.keys(categoriesMap).map((title) => {
            const products = categoriesMap[title];
            return (
              <CategoryPreview key={title} title={title} products={products}></CategoryPreview>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default CategoriesPreview;
