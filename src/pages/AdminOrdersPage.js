import AdminOrders from "../features/admin/components/AdminOrders";
import Navbar from "../features/navbar/navbar";

function AdminOrdersPage() {
  return (
    <>
      <Navbar>
        <AdminOrders></AdminOrders>
      </Navbar>
    </>
  );
}

export default AdminOrdersPage;
