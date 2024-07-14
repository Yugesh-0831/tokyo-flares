import AdminProductDetail from "../features/admin/components/AdminProductDetail";
import Navbar from "../features/navbar/navbar";
import ProductDetail from "../features/product/components/productDetail";

function AdminProductDetailPage() {
  return (
    <>
      <Navbar>
        <AdminProductDetail></AdminProductDetail>
      </Navbar>
    </>
  );
}

export default AdminProductDetailPage;
