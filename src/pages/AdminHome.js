import AdminProductList from "../features/admin/components/AdminProductList";
import Navbar from "../features/navbar/navbar";
import ProductList from "../features/product/components/ProductList";

function AdminHome() {
  return (
    <>
      <Navbar>
        <AdminProductList></AdminProductList>
      </Navbar>
    </>
  );
}

export default AdminHome;
