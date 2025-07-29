import { useState } from "react";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} from "../features/auth/OrderSlice";
import ReusableTable from "../components/Table";
import OrderForm from "./OrderForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Trash2, Pencil, Eye, Loader2 } from "lucide-react";

function Orders() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const {
    data: ordersData,
    isLoading,
    isError,
    error,
  } = useGetAllOrdersQuery({ page: currentPage, limit: pageSize });

  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();

  const handleDeletion = async (id) => {
    try {
      await deleteOrder(id).unwrap();
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const handleEdit = (id) => {
    setSelectedOrderId(id);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedOrderId(null);
  };

  const calculateTotalAmount = (items) => {
    if (!Array.isArray(items)) return 0;
    return items.reduce((total, item) => total + (item.totalAmount || 0), 0);
  };

  const columns = [
    { label: "User Name", accessor: "userName" },
    { label: "Quantity", accessor: "quantity" },
    { label: "Contact", accessor: "contact" },
    { label: "Address", accessor: "shippingAddress" },
    { label: "Total Amount", accessor: "totalAmount" },
  ];

  const formattedData = ordersData?.data.map((order) => ({
    userName: order.user?.name || "N/A",
    quantity:
      Array.isArray(order.items) && order.items.length > 0
        ? order.items.reduce((acc, item) => acc + item.quantity, 0)
        : "No items",
    contact: order.contact || "N/A",
    shippingAddress: order.shippingAddress || "N/A",
    totalAmount: `$${calculateTotalAmount(order.items).toFixed(2) || "0.00"}`,
    id: order._id,
  }));

  const renderActions = (order) => (
    <div className="flex justify-center gap-2">
      <button 
        onClick={() => handleEdit(order.id)}
        className="p-2 rounded-md hover:bg-gray-100"
        aria-label="Edit"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button>
        <Eye className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDeletion(order.id)}
        className="p-2 rounded-md hover:bg-red-100 disabled:opacity-50"
        aria-label="Delete"
        disabled={deleting}
      >
        <Trash2 className="w-4 h-4 text-red-500" />
      </button>
    </div>
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (ordersData?.pagination?.hasNextPage) setCurrentPage(currentPage + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">
          Error: {error?.data?.message || "Unable to fetch orders"}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>

      {ordersData?.data?.length > 0 ? (
        <ReusableTable
          columns={columns}
          data={formattedData}
          renderActions={renderActions}
        />
      ) : (
        <p className="text-center text-gray-500 text-lg">No orders available.</p>
      )}

      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={handlePreviousPage}
          disabled={!ordersData?.pagination?.hasPreviousPage}
        >
          Previous
        </Button>
        <p>
          Page {ordersData?.pagination?.currentPage} of{" "}
          {ordersData?.pagination?.totalPages}
        </p>
        <Button
          onClick={handleNextPage}
          disabled={!ordersData?.pagination?.hasNextPage}
        >
          Next
        </Button>
      </div>

      <Sheet open={isDrawerOpen} onClose={handleCloseDrawer}>
        <SheetContent side="right" className="w-[400px]">
          <OrderForm id={selectedOrderId} onCancel={handleCloseDrawer} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Orders;
