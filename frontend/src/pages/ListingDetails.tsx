import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const ListingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [owner, setOwner] = useState<any>(null);
  const [ownerDialogOpen, setOwnerDialogOpen] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/listing/${id}`);
        setListing(res.data);
        const ownerRes = await axios.get(`http://localhost:5000/user/${res.data.owner}`);
        setOwner(ownerRes.data);
        console.log(listing);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchListing();
  }, [id]);

  if (loading) {
    return <div className="text-center pt-24">Loading...</div>;
  }

  if (error || !listing) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Listing not found</h2>
              <Button onClick={() => navigate('/home')}>
                Return to Listings
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Listing not found</h2>
              <Button onClick={() => navigate('/home')}>
                Return to Listings
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  const handleSellerClick = () => {
    setOwnerDialogOpen(true);
  };
  // Format the date
  const formattedDate = new Date(listing.datePosted).toLocaleDateString();
  // const formattedDate = `${postedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  const na = listing.owner.name;
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/home"
            className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to listings
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="bg-muted rounded-lg overflow-hidden">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-full object-cover max-h-[500px]"
              />
            </div>

            {/* Details */}
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="mb-2">
                    {listing.category}
                  </Badge>
                  <p className="text-gray-500 text-sm">Posted on {formattedDate}</p>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                <p className="text-2xl font-semibold text-primary">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(listing.price)}
                </p>

              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{listing.description}</p>
              </div>
              <Card className="mb-6">


                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold mb-3">Seller Information</h2>
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-3">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>

                      <p className="font-medium">{owner.name}</p>
                      <p className="font-medium">{owner.email}</p>
                      <p className="font-medium">{owner.phone}</p>
                    </div>
                  </div>
                </CardContent>
                <Button className="w-full mb-3 bg-primary hover:bg-primary/90 flex items-center justify-center"
                  onClick={handleSellerClick}>
                  Contact Seller
                </Button>
              </Card>



              <p className="text-center text-gray-500 text-sm">
                Remember to meet in a public location on campus for safety
              </p>
            </div>
          </div>
        </div>
        <Dialog open={ownerDialogOpen} onOpenChange={setOwnerDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Seller Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-2 mt-4">
              <p className="font-medium text-gray-700">Name: {owner.name}</p>
              <p className="font-medium text-gray-700">Email: {owner.email}</p>
              <p className="font-medium text-gray-700">Phone: {owner.phone}</p>
            </div>

            <DialogFooter className="flex justify-end mt-6">
              <Button variant="outline" onClick={() => setOwnerDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </main>
      <Footer />
    </div>
  );
};

export default ListingDetails;
