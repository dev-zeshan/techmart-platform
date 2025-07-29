import { useState } from "react";
import { useGetAllProductsQuery } from "@/features/auth/ProductSlice";
import { useAddToCartMutation } from "@/features/auth/cartSlice";
import { useSelector } from "react-redux";
import elec from "../../assets/electronics.jpeg";
import { Eye, ShoppingCart, X } from "lucide-react";
import ProductDetails from "./ProductDetails";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

function Products() {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isSheetOpen, setSheetOpen] = useState(false);

  const { data, isLoading, isError } = useGetAllProductsQuery({ page, limit });
  const [addToCartMutation] = useAddToCartMutation();
  const userId = useSelector((state) => state.auth.user?._id);

  const products = Array.isArray(data?.data) ? data.data : [];

  const openProductDetails = (productId) => {
    setSelectedProductId(productId);
    setSheetOpen(true);
  };

  const closeProductDetails = () => {
    setSelectedProductId(null);
    setSheetOpen(false);
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!userId) {
      alert("Please log in to add products to the cart.");
      return;
    }

    try {
      await addToCartMutation({ userId, productId, quantity }).unwrap();
      alert("Product added to cart!");
    } catch (err) {
      alert(
        err.data?.message || "Failed to add product to cart. Please try again."
      );
    }
  };

  const handleNextPage = () => {
    if (data?.pagination?.hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (data?.pagination?.hasPreviousPage) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 animate-pulse"
          >
            <div className="h-48 bg-gray-300 rounded-lg"></div>
            <div className="mt-4 space-y-2">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 text-center mt-10 font-semibold">
        Failed to load products. Please try again later.
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className=" rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden border border-gray-200"
            >
              <img
                src={product.image || elec}
                alt={product.name}
                className="w-full h-48 object-cover transition-transform duration-200 hover:scale-105"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-2 text-lg font-medium">
                  ${product.price}
                </p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {product.details}
                </p>
              </div>
              <div className="p-4 flex justify-between items-center border-t border-gray-200">
                <Button onClick={() => addToCart(product._id)} className="bg-orange-500 hover:bg-orange-600 text-white">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>

                <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-gray-600 hover:text-gray-800"
                      onClick={() => openProductDetails(product._id)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>
                  </SheetTrigger>

                  <SheetContent className="w-[400px] sm:w-[500px] overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Product Details
                      </h2>
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          onClick={closeProductDetails}
                          className="text-gray-600 hover:text-red-600"
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </SheetClose>
                    </div>
                    {selectedProductId && (
                      <ProductDetails id={selectedProductId} />
                    )}
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600 text-lg">
            No products available
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={handlePreviousPage}
          disabled={!data?.pagination?.hasPreviousPage}
          variant="outline"
        >
          Previous
        </Button>
        <span className="text-gray-700 font-medium text-xs">
          Page {page} of {data?.pagination?.totalPages || 1}
        </span>
        <Button
          onClick={handleNextPage}
          disabled={!data?.pagination?.hasNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Products;
