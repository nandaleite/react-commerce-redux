import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  LogoContainer,
  NavigationContainer,
  NavigationList,
  NavigationListItem,
} from "./navigation.styles";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../contexts/cart.context";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  const signOutHandler = async () => {
    await signOutUser();
  };
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <Logo className="logo" />
        </LogoContainer>
        <nav className="navigation-main">
          <NavigationList>
            <NavigationListItem>
              <a href="/shop">Shop</a>
            </NavigationListItem>
            <NavigationListItem>
              <a href="/shop/hats">Hats</a>
            </NavigationListItem>
            <NavigationListItem>
              <a href="/shop/jackets">Jackets</a>
            </NavigationListItem>
            <NavigationListItem>
              <a href="/shop/mens">Mens</a>
            </NavigationListItem>
            <NavigationListItem>
              <a href="/shop/sneakers">Sneakers</a>
            </NavigationListItem>
            <NavigationListItem>
              <a href="/shop/womens">Womens</a>
            </NavigationListItem>
            <NavigationListItem>
              {currentUser ? <a onClick={signOutHandler}>Sign Out</a> : <a href="/auth">Sign In</a>}
            </NavigationListItem>
            <CartIcon />
          </NavigationList>
          {isCartOpen && <CartDropdown />}
        </nav>
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
