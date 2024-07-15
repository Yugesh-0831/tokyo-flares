import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { useEffect, useState } from "react";
import { discountedPrice, ITEMS_PER_PAGE } from "../../../app/constants";
import {
  XMarkIcon,
  EyeIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const orders = useSelector(selectOrders);
  let totalOrders = useSelector(selectTotalOrders);
  totalOrders = 21;
  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handleEdit = (e, order) => {
    console.log("idhr aaya");
    setEditableOrderId(order.id);
  };
  const handleShow = () => {};
  const handleUpdate = (e, order) => {
    const updateOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updateOrder));
    setEditableOrderId(-1);
  };

  const handleSort = (option) => {
    console.log("idhr aay" + option.sort + option.order);
    const newSort = { ...sort, _sort: option.sort, _order: option.order };
    setSort(newSort);
  };
  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const handlePage = (page) => {
    setPage(page);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };
  return (
    <>
      <div className="overflow-x-auto">
        <div className=" bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?.order == "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order #
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th className="py-3 px-6 text-center">Total Amount</th>
                    <th className="py-3 px-6 text-center">Adddress</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.product.thumbnail}
                              />
                            </div>
                            <span>
                              {item.product.title} x {item.product.quantity} - $
                              {discountedPrice(item.product)}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="">
                          <div>
                            <strong> {order.selectedAddress.name}</strong>
                            <div>{order.selectedAddress.number}</div>
                            <div>{order.selectedAddress.streetAddress}</div>
                            <div>{order.selectedAddress.city}</div>
                            <div>{order.selectedAddress.region}</div>
                            <div>{order.selectedAddress.pinCode}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id != editableOrderId ? (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        ) : (
                          <select onChange={(e) => handleUpdate(e, order)}>
                            <option value="pending">pending</option>
                            <option value="dispatched">dispatched</option>
                            <option value="delivered">delivered</option>
                            <option value="cancelled">cancelled</option>
                          </select>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon onClick={(e) => handleShow(e, order)} />
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon onClick={(e) => handleEdit(e, order)} />
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        ></Pagination>
      </div>
    </>
  );
}

export default AdminOrders;
