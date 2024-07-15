import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../userSlice";
import { discountedPrice } from "../../../app/constants";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, [dispatch]);

  return (
    <div>
      {orders &&
        orders.map((order) => (
          <div key={order.id}>
            <div>
              <div className="mx-auto mt-12 bg-gray-200 max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="border-t border-black px-4 py-6 sm:px-6">
                  <h1 className="text-4xl my-5 font-bold tracking-tight text-black">
                    Order # {order.id}
                  </h1>
                  <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                    Order Status : {order.status}
                  </h3>
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-black">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-black">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-black">
                                <h3>
                                  <a href={item.product.id}>
                                    {item.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4">
                                  ${discountedPrice(item.product)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-black">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-black">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-black"
                                >
                                  Qty :{item.quantity}
                                </label>
                              </div>

                              <div className="flex"></div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-black px-4 py-6 sm:px-6">
                  <div className="flex justify-between my-2 text-base font-medium text-black">
                    <p>Subtotal</p>
                    <p>$ {order.totalAmount}</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-black">
                    <p>Total Items in Cart</p>
                    <p>{order.totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-black">
                    Shipping Address :
                  </p>
                  <div className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-black">
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-black">
                          {order.selectedAddress && order.selectedAddress.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-black">
                          {order.selectedAddress &&
                            order.selectedAddress.street}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-black">
                          {order.selectedAddress &&
                            order.selectedAddress.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-black">
                        Phone:{" "}
                        {order.selectedAddress && order.selectedAddress.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {order.selectedAddress && order.selectedAddress.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
