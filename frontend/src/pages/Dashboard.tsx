import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { truncate } from "fs/promises";

const Dashboard = () => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("active");
  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/protected", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        toast.error("Please log in again");
        navigate("/login");
      }
    };

    fetchUser();
  }, []);



  useEffect(() => {
    if (!user) return;

    const fetchListings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/mylistings", {
          withCredentials: true,
        });
        setListings(res.data);
      } catch (err) {
        toast.error("Failed to fetch listings");
      }
    };

    fetchListings();
  }, [user]);

  const handleMarkSold = async (id: string) => {
    if (!id) return;
    try {
      await axios.post(`http://localhost:5000/marksold/${id}`, {}, {
        withCredentials: true,
      });
      toast.success("Listing Marked Sold successfully");
      setListings(prev =>
        prev.map(listing =>
          listing._id === id ? { ...listing, status: 'sold' } : listing
        )
      );
    } catch (err) {
      toast.error("Failed To Mark");
    }
  };


  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/listing/${itemToDelete}`, {
        withCredentials: true,
      });
      toast.success("Listing deleted successfully");
      setListings((prev) => prev.filter((item) => item._id !== itemToDelete));
    } catch (err) {
      toast.error("Failed to delete listing");
    } finally {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      setIsDeleting(false);
    }
  };


  const filteredListings = listings.filter(
    (listing) => (activeTab === "active" && listing.status === "active") ||
      (activeTab === "sold" && listing.status === "sold")
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
            <Link to="/post">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-5 w-5 mr-2" /> Post New Listing
              </Button>
            </Link>
          </div>

          {/* User Info Card */}
          {user && (
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}


          {/* Listings */}
          <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
          <Tabs defaultValue="active" className="mb-6" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="active">Active Listings</TabsTrigger>
              <TabsTrigger value="sold">Sold Items</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-0">
              {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
                    <Card key={listing.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                          <Badge variant="outline">{listing.category}</Badge>
                        </div>
                        <p className="text-primary font-semibold mb-4">
                          {new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                          }).format(listing.price)}
                        </p>

                        <div className="flex justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center"
                            onClick={() => navigate(`/listing/${listing._id}`)}
                          >
                            View
                          </Button>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center"
                              onClick={() => handleMarkSold(listing._id)}
                            >
                              <Pencil className="h-4 w-4 mr-1" /> Mark as Sold
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center text-destructive hover:text-destructive"
                              onClick={() => handleDeleteClick(listing._id)}

                            >
                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No active listings found</p>
                  <Link to="/post">
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="h-5 w-5 mr-2" /> Post New Listing
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="sold" className="mt-0">
              {filteredListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {filteredListings.map((listing) => (
                    <Card key={listing.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden bg-muted relative">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="h-full w-full object-cover opacity-70"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Badge className="bg-accent text-white px-3 py-1 text-lg">SOLD</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                          <Badge variant="outline">{listing.category}</Badge>
                        </div>
                        <p className="text-primary font-semibold mb-4">
                          {new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                          }).format(listing.price)}
                        </p>

                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center"
                          onClick={() => navigate(`/listing/${listing._id}`)}
                        >
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No sold items yet</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Listing</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this listing? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>

            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
