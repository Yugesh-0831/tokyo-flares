import Navbar from "../features/navbar/navbar";
import ProductDetail from "../features/product/components/productDetail";
import UserOrders from "../features/user/components/UserOrders";

function UserOrdersPage() {
  return (
    <>
      <Navbar>
        <UserOrders></UserOrders>
      </Navbar>
    </>
  );
}

export default UserOrdersPage;
