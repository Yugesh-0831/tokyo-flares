import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProductsAsync,
  fetchProductsByFiltersAsync,
  selectAllProducts,
} from "../productSlice";

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../../../app/constants";

const sortOptions = [
  { name: "Best Rating", sort: "rating", order: "desc", current: false },
  { name: "Price: Low to High", sort: "price", order: "asc", current: false },
  {
    name: "Price: High to Low",
    href: "#",
    sort: "price",
    order: "desc",
    current: false,
  },
];
const filters = [
  {
    id: "brand",
    name: "Brands",
    options: [
      {
        value: "Apple",
        label: "Apple",
        checked: false,
      },
      {
        value: "Samsung",
        label: "Samsung",
        checked: false,
      },
      {
        value: "OPPO",
        label: "OPPO",
        checked: false,
      },
      {
        value: "Huawei",
        label: "Huawei",
        checked: false,
      },
      {
        value: "Microsoft Surface",
        label: "Microsoft Surface",
        checked: false,
      },
      {
        value: "Infinix",
        label: "Infinix",
        checked: false,
      },
      {
        value: "HP Pavilion",
        label: "HP Pavilion",
        checked: false,
      },
      {
        value: "Impression of Acqua Di Gio",
        label: "Impression of Acqua Di Gio",
        checked: false,
      },
      {
        value: "Royal_Mirage",
        label: "Royal_Mirage",
        checked: false,
      },
      {
        value: "Fog Scent Xpressio",
        label: "Fog Scent Xpressio",
        checked: false,
      },
      {
        value: "Al Munakh",
        label: "Al Munakh",
        checked: false,
      },
      {
        value: "Lord - Al-Rehab",
        label: "Lord   Al Rehab",
        checked: false,
      },
      {
        value: "L'Oreal Paris",
        label: "L'Oreal Paris",
        checked: false,
      },
      {
        value: "Hemani Tea",
        label: "Hemani Tea",
        checked: false,
      },
      {
        value: "Dermive",
        label: "Dermive",
        checked: false,
      },
      {
        value: "ROREC White Rice",
        label: "ROREC White Rice",
        checked: false,
      },
      {
        value: "Fair & Clear",
        label: "Fair & Clear",
        checked: false,
      },
      {
        value: "Saaf & Khaas",
        label: "Saaf & Khaas",
        checked: false,
      },
      {
        value: "Bake Parlor Big",
        label: "Bake Parlor Big",
        checked: false,
      },
      {
        value: "Baking Food Items",
        label: "Baking Food Items",
        checked: false,
      },
      {
        value: "fauji",
        label: "fauji",
        checked: false,
      },
      {
        value: "Dry Rose",
        label: "Dry Rose",
        checked: false,
      },
      {
        value: "Boho Decor",
        label: "Boho Decor",
        checked: false,
      },
      {
        value: "Flying Wooden",
        label: "Flying Wooden",
        checked: false,
      },
      {
        value: "LED Lights",
        label: "LED Lights",
        checked: false,
      },
      {
        value: "luxury palace",
        label: "luxury palace",
        checked: false,
      },
      {
        value: "Golden",
        label: "Golden",
        checked: false,
      },
      {
        value: "Furniture Bed Set",
        label: "Furniture Bed Set",
        checked: false,
      },
      {
        value: "Ratttan Outdoor",
        label: "Ratttan Outdoor",
        checked: false,
      },
      {
        value: "Kitchen Shelf",
        label: "Kitchen Shelf",
        checked: false,
      },
      {
        value: "Multi Purpose",
        label: "Multi Purpose",
        checked: false,
      },
      {
        value: "AmnaMart",
        label: "AmnaMart",
        checked: false,
      },
      {
        value: "Professional Wear",
        label: "Professional Wear",
        checked: false,
      },
      {
        value: "Soft Cotton",
        label: "Soft Cotton",
        checked: false,
      },
      {
        value: "Top Sweater",
        label: "Top Sweater",
        checked: false,
      },
      {
        value: "RED MICKY MOUSE..",
        label: "RED MICKY MOUSE..",
        checked: false,
      },
      {
        value: "Digital Printed",
        label: "Digital Printed",
        checked: false,
      },
      {
        value: "Ghazi Fabric",
        label: "Ghazi Fabric",
        checked: false,
      },
      {
        value: "IELGY",
        label: "IELGY",
        checked: false,
      },
      {
        value: "IELGY fashion",
        label: "IELGY fashion",
        checked: false,
      },
      {
        value: "Synthetic Leather",
        label: "Synthetic Leather",
        checked: false,
      },
      {
        value: "Sandals Flip Flops",
        label: "Sandals Flip Flops",
        checked: false,
      },
      {
        value: "Maasai Sandals",
        label: "Maasai Sandals",
        checked: false,
      },
      {
        value: "Arrivals Genuine",
        label: "Arrivals Genuine",
        checked: false,
      },
      {
        value: "Vintage Apparel",
        label: "Vintage Apparel",
        checked: false,
      },
      {
        value: "FREE FIRE",
        label: "FREE FIRE",
        checked: false,
      },
      {
        value: "The Warehouse",
        label: "The Warehouse",
        checked: false,
      },
      {
        value: "Sneakers",
        label: "Sneakers",
        checked: false,
      },
      {
        value: "Rubber",
        label: "Rubber",
        checked: false,
      },
      {
        value: "Naviforce",
        label: "Naviforce",
        checked: false,
      },
      {
        value: "SKMEI 9117",
        label: "SKMEI 9117",
        checked: false,
      },
      {
        value: "Strap Skeleton",
        label: "Strap Skeleton",
        checked: false,
      },
      {
        value: "Stainless",
        label: "Stainless",
        checked: false,
      },
      {
        value: "Eastern Watches",
        label: "Eastern Watches",
        checked: false,
      },
      {
        value: "Luxury Digital",
        label: "Luxury Digital",
        checked: false,
      },
      {
        value: "Watch Pearls",
        label: "Watch Pearls",
        checked: false,
      },
      {
        value: "Bracelet",
        label: "Bracelet",
        checked: false,
      },
      {
        value: "LouisWill",
        label: "LouisWill",
        checked: false,
      },
      {
        value: "Copenhagen Luxe",
        label: "Copenhagen Luxe",
        checked: false,
      },
      {
        value: "Steal Frame",
        label: "Steal Frame",
        checked: false,
      },
      {
        value: "Darojay",
        label: "Darojay",
        checked: false,
      },
      {
        value: "Fashion Jewellery",
        label: "Fashion Jewellery",
        checked: false,
      },
      {
        value: "Cuff Butterfly",
        label: "Cuff Butterfly",
        checked: false,
      },
      {
        value: "Designer Sun Glasses",
        label: "Designer Sun Glasses",
        checked: false,
      },
      {
        value: "mastar watch",
        label: "mastar watch",
        checked: false,
      },
      {
        value: "Car Aux",
        label: "Car Aux",
        checked: false,
      },
      {
        value: "W1209 DC12V",
        label: "W1209 DC12V",
        checked: false,
      },
      {
        value: "TC Reusable",
        label: "TC Reusable",
        checked: false,
      },
      {
        value: "Neon LED Light",
        label: "Neon LED Light",
        checked: false,
      },
      {
        value: "METRO 70cc Motorcycle - MR70",
        label: "METRO 70cc Motorcycle   MR70",
        checked: false,
      },
      {
        value: "BRAVE BULL",
        label: "BRAVE BULL",
        checked: false,
      },
      {
        value: "shock absorber",
        label: "shock absorber",
        checked: false,
      },
      {
        value: "JIEPOLLY",
        label: "JIEPOLLY",
        checked: false,
      },
      {
        value: "Xiangle",
        label: "Xiangle",
        checked: false,
      },
      {
        value: "lightingbrilliance",
        label: "lightingbrilliance",
        checked: false,
      },
      {
        value: "Ifei Home",
        label: "Ifei Home",
        checked: false,
      },
      {
        value: "DADAWU",
        label: "DADAWU",
        checked: false,
      },
      {
        value: "YIOSI",
        label: "YIOSI",
        checked: false,
      },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      {
        value: "smartphones",
        label: "smartphones",
        checked: false,
      },
      {
        value: "laptops",
        label: "laptops",
        checked: false,
      },
      {
        value: "fragrances",
        label: "fragrances",
        checked: false,
      },
      {
        value: "skincare",
        label: "skincare",
        checked: false,
      },
      {
        value: "groceries",
        label: "groceries",
        checked: false,
      },
      {
        value: "home-decoration",
        label: "home decoration",
        checked: false,
      },
      {
        value: "furniture",
        label: "furniture",
        checked: false,
      },
      {
        value: "tops",
        label: "tops",
        checked: false,
      },
      {
        value: "womens-dresses",
        label: "womens dresses",
        checked: false,
      },
      {
        value: "womens-shoes",
        label: "womens shoes",
        checked: false,
      },
      {
        value: "mens-shirts",
        label: "mens shirts",
        checked: false,
      },
      {
        value: "mens-shoes",
        label: "mens shoes",
        checked: false,
      },
      {
        value: "mens-watches",
        label: "mens watches",
        checked: false,
      },
      {
        value: "womens-watches",
        label: "womens watches",
        checked: false,
      },
      {
        value: "womens-bags",
        label: "womens bags",
        checked: false,
      },
      {
        value: "womens-jewellery",
        label: "womens jewellery",
        checked: false,
      },
      {
        value: "sunglasses",
        label: "sunglasses",
        checked: false,
      },
      {
        value: "automotive",
        label: "automotive",
        checked: false,
      },
      {
        value: "motorcycle",
        label: "motorcycle",
        checked: false,
      },
      {
        value: "lighting",
        label: "lighting",
        checked: false,
      },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const dispatch = useDispatch();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector(selectAllProducts);
  const totalItems = 100;
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) newFilter[section.id].push(option.value);
      else {
        newFilter[section.id] = [option.value];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.value
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const newSort = { ...sort, _sort: option.sort };
    setSort(newSort);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    dispatch(fetchProductsByFiltersAsync({ filter, sort, pagination }));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [totalItems]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          handleFilter={handleFilter}
        ></MobileFilter>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              All products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          {({ focus }) => (
                            <p
                              onClick={(e) => handleSort(e, option)}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </p>
                          )}
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <DesktopFilter
                handleFilter={handleFilter}
                filters={filters}
              ></DesktopFilter>
              {/* Product grid */}
              <div className="lg:col-span-3">
                <ProductGrid products={products}></ProductGrid>
              </div>
              {/* Product grid end */}
            </div>
          </section>
          <Pagination
            page={page}
            setPage={setPage}
            handlePage={handlePage}
            totalItems={totalItems}
          ></Pagination>
        </main>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
}) {
  return (
    <Transition show={mobileFiltersOpen}>
      <Dialog
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <TransitionChild
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 z-40 flex">
          <TransitionChild
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e) =>
                                    handleFilter(e, section, option)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
function DesktopFilter({ handleFilter }) {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </DisclosureButton>
              </h3>
              <DisclosurePanel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) => handleFilter(e, section, option)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}
function Pagination({ page, setPage, handlePage, totalItems = 55 }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          >
            <div
              onClick={(e) => handlePage(page > 1 ? page - 1 : page)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}

            {Array.from({ length: totalPages }).map((el, index) => (
              <div
                key={index}
                onClick={(e) => handlePage(index + 1)}
                aria-current="page"
                className={`relative cursor-pointer z-10 inline-flex items-center ${
                  index + 1 === page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400"
                } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                {index + 1}
              </div>
            ))}

            <div
              onClick={(e) => handlePage(page < totalPages ? page + 1 : page)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            ></div>
            <span className="sr-only">Next</span>
            <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
          </nav>
        </div>
      </div>
    </div>
  );
}
function ProductGrid({ products }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link to="/product-detail">
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.thumbnail}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      <StarIcon className="w-3 h-3 inline"></StarIcon>
                      <span className="align-bottom">{product.rating}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      $
                      {Math.round(
                        product.price * (1 - product.discountPercentage / 100)
                      )}
                    </p>
                    <p className="text-sm line-through font-medium text-gray-400">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
