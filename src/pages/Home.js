import Navbar from "../features/navbar/navbar";
import ProductList from "../features/product-list/components/ProductList";

function Home() {
  return (
    <>
      <Navbar>
        {/* Passed in as a child */}
        <ProductList></ProductList>
      </Navbar>
    </>
  );
}

export default Home;
