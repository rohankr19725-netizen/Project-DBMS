
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

const ListingCard = ({ id, title, price, image, description }: ListingCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const isNew = Math.random() > 0.5;
  const isTrending = Math.random() > 0.7;

  return (
    <Link to={`/listing/${id}`} className="group block animate-fade-in">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 relative">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex gap-2">
            {isNew && (
              <Badge className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">New</Badge>
            )}
            {isTrending && (
              <Badge className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">🔥 Hot</Badge>
            )}
          </div>
          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform shadow-md"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-pink-600 text-pink-600' : 'text-gray-600'}`} />
          </button>
        </div>
        <CardContent className="p-4 relative z-10">
          <h3 className="font-semibold text-base line-clamp-1 text-gray-900">{title}</h3>
          <p className="text-gray-500 text-xs line-clamp-2 mt-1 h-8">{description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between relative z-10">
          <span className="font-bold text-lg text-pink-600">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
            }).format(price)}
          </span>
          <Button size="sm" className="bg-pink-600 hover:bg-pink-700 rounded-full px-4 text-xs shadow-md hover:shadow-lg transition-all hover:scale-105">
            Add
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ListingCard;
