import AdminProductDetail from "../features/admin/components/AdminProductDetail";
import ProductForm from "../features/admin/components/ProductForm";
import Navbar from "../features/navbar/navbar";
import ProductDetail from "../features/product/components/productDetail";

function AdminProductFormPage() {
  return (
    <>
      <Navbar>
        <ProductForm></ProductForm>
      </Navbar>
    </>
  );
}

export default AdminProductFormPage;
