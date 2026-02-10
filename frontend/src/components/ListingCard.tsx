
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
}

const ListingCard = ({ id, title, price, image, description }: ListingCardProps) => {
  return (
    <Link to={`/listing/${id}`}>
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md">
        <div className="aspect-square w-full overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 mt-1 h-10">{description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          <span className="font-bold text-lg text-primary">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
            }).format(price)}
          </span>

          <span className="text-xs text-gray-500">View Details</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ListingCard;
