import { useState } from "react";
import { Plus, Trash2, Eye, Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../../features/auth/userSlice";
import UserForm from "./UserForm";
import { Sheet, SheetContent } from "@/components/ui/sheet";

function Users() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const { data, isLoading, isError, error } = useGetAllUsersQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const [deleteUser] = useDeleteUserMutation();

  const handleOpenDrawer = (update = false, userId = null) => {
    setIsUpdate(update);
    setSelectedUserId(userId);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedUserId(null);
  };

  const handleDeletion = async (userId) => {
    try {
      await deleteUser(userId);
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && data?.pagination?.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
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
          Error: {error?.data?.message || "Unable to fetch users"}
        </p>
      </div>
    );
  }

  const { pagination, data: users } = data;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Users</h2>
        <Button onClick={() => handleOpenDrawer(false)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Name</th>
              <th className="px-4 py-2 text-left font-semibold">Email</th>
              <th className="px-4 py-2 text-left font-semibold">Role</th>
              <th className="px-4 py-2 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleOpenDrawer(true, user._id)}
                        className="p-2 rounded hover:bg-gray-100"
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => console.log("View clicked")}
                        className="p-2 rounded hover:bg-gray-100"
                        aria-label="View"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeletion(user._id)}
                        className="p-2 rounded hover:bg-red-100"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <Button
          variant="outline"
          onClick={() => handlePageChange("prev")}
          disabled={!pagination?.hasPreviousPage}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {pagination?.currentPage} of {pagination?.totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => handlePageChange("next")}
          disabled={!pagination?.hasNextPage}
        >
          Next
        </Button>
      </div>

      {/* Drawer */}
      <Sheet open={isDrawerOpen} onClose={handleCloseDrawer}>
        <SheetContent side="right" className="w-[400px]">
          <UserForm
            isUpdate={isUpdate}
            userId={selectedUserId}
            onClose={handleCloseDrawer}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Users;
