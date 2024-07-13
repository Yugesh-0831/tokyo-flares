import Navbar from "../features/navbar/navbar";
import ProductDetail from "../features/product/components/productDetail";
import UserOrders from "../features/user/components/UserOrders";
import UserProfile from "../features/user/components/UserProfile";

function UserProfilePage() {
  return (
    <>
      <Navbar>
        <UserProfile></UserProfile>
      </Navbar>
    </>
  );
}

export default UserProfilePage;
