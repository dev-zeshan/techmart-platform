import { useState } from "react";
import ReusableTable from "../components/Table";
import ProductForm from "./ProductForm";
import { Plus, Trash2, Eye, Pencil, Loader2 } from "lucide-react";
import {
  useGetAllProductsQuery,
  useDeleteProductMutation,
} from "../features/auth/ProductSlice";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";

function Product() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading, error } = useGetAllProductsQuery({ page, limit });

  const [deleteProduct] = useDeleteProductMutation();
  const [deletingProductId, setDeletingProductId] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const handleOpenDrawer = (update = false, productId = null) => {
    setIsUpdate(update);
    setSelectedProductId(productId);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProductId(null);
  };

  const handleDeletion = async (id) => {
    if (!id) return;
    setDeletingProductId(id);
    try {
      await deleteProduct(id).unwrap();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeletingProductId(null);
    }
  };

  const columns = [
    { label: "Name", accessor: "name" },
    { label: "Brand", accessor: "company" },
    { label: "Category", accessor: "category.name" },
    { label: "SubCategory", accessor: "subCategory.name" },
    { label: "Price", accessor: "price" },
    { label: "Description", accessor: "details" },
  ];

  const renderActions = (product) => (
    <div className="flex justify-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleOpenDrawer(true, product._id)}
      >
        <Pencil className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon">
        <Eye className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleDeletion(product._id)}
        disabled={deletingProductId === product._id}
      >
        {deletingProductId === product._id ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4 text-red-500" />
        )}
      </Button>
    </div>
  );

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
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-gray-700" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="mt-10 text-center text-sm text-red-600">
        Error loading products
      </p>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <Button onClick={() => handleOpenDrawer(false)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <ReusableTable
          columns={columns}
          data={data?.data || []}
          renderActions={renderActions}
        />
      </Card>

      <div className="flex justify-between items-center mt-6">
        <Button
          variant="secondary"
          onClick={handlePreviousPage}
          disabled={!data?.pagination?.hasPreviousPage}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          onClick={handleNextPage}
          disabled={!data?.pagination?.hasNextPage}
        >
          Next
        </Button>
      </div>

      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <ProductForm
            isUpdate={isUpdate}
            id={selectedProductId}
            onClose={handleCloseDrawer}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Product;
