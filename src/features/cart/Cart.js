import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemFromCartAsync,
  increment,
  incrementAsync,
  selectCart,
  selectCount,
  updateItemAsync,
} from "./cartSlice";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";

export function Cart() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const products = useSelector(selectCart);

  const totalAmount = products.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = products.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({ ...item, quantity: +e.target.value }));
  };

  const handleRemove = (e, itemId) => {
    dispatch(deleteItemFromCartAsync(itemId));
  };

  return (
    <>
      {!products.length && <Navigate to="/" replace={true}></Navigate>}
      <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {products.map((product) => (
                <li key={product.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      alt={product.title}
                      src={product.thumbnail}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={product.href}>{product.name}</a>
                        </h3>
                        <p className="ml-4">${product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="quantity"
                          className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <select
                          onChange={(e) => handleQuantity(e, product)}
                          value={product.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={(e) => handleRemove(e, product.id)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md
              border border-transparent bg-indigo-600 px-6 py-3 text-base
              font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              {" "}
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
