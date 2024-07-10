import { Cart } from "../features/cart/Cart";
import Navbar from "../features/navbar/navbar";

function CartPage() {
  return (
    <>
      <Navbar>
        <Cart></Cart>
      </Navbar>
    </>
  );
}

export default CartPage;
