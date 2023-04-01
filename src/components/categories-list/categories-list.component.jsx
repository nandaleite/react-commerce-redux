import "./categories-list.styles.scss";
import CategoryItem from "../category-item/category-item.component";
const categories = [
  {
    id: "1",
    title: "Hats",
    imageUrl:
      "https://images.pexels.com/photos/458649/pexels-photo-458649.jpeg?auto=compress&cs=tinysrgb&w=660&h=250&dpr=1",
    route: "shop/hats",
  },
  {
    id: "2",
    title: "Jackets",
    imageUrl:
      "https://images.pexels.com/photos/16170/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=660&h=250&dpr=2",
    route: "shop/jackets",
  },
  {
    id: "3",
    title: "Mens",
    imageUrl:
      "https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg?auto=compress&cs=tinysrgb&w=660&h=250&dpr=2",
    route: "shop/mens",
  },
  {
    id: "4",
    title: "Sneakers",
    imageUrl:
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=660&h=250&dpr=2",
    route: "shop/sneakers",
  },
  {
    id: "5",
    title: "Womens",
    imageUrl:
      "https://images.pexels.com/photos/985685/pexels-photo-985685.jpeg?auto=compress&cs=tinysrgb&w=660&h=250&dpr=2",
    route: "shop/womens",
  },
];
const CategoriesList = () => {
  return (
    <div className="categories">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
export default CategoriesList;
