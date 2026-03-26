import { useNavigate } from "react-router-dom";

export default function Shop() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Apple Watch Series 10",
      price: 350,
      oldPrice: 550,
      image: "/images/Apple-watch.jpg",
      rating: 4.8,
      reviews: 324,
      description:
        "The Apple Watch Series 10 is Apple's thinnest smartwatch yet, offering a more comfortable fit without compromising performance.",
      features: [
        "Blood Oxygen Monitoring",
        "Sleep Apnea Detection",
        "ECG App",
        "Cycle Tracking",
      ],
      seller: {
        name: "James Appiah",
        location: "Queen's Hall, KNUST",
        sales: 2543,
        rating: 4.8,
      },
    },
    {
      id: 2,
      name: "Sneakers",
      price: 200,
      oldPrice: 250,
      image: "/images/shoe.jpg",
      rating: 4.5,
      reviews: 210,
      description: "Comfortable running sneakers for daily workouts.",
      features: ["Lightweight", "Breathable", "Durable sole"],
      seller: {
        name: "ShoeStore Ltd",
        location: "Accra Mall",
        sales: 1340,
        rating: 4.6,
      },
    },
    {
      id: 3,
      name: "Exotic Designer Shoulder bag",
      price: 350,
      oldPrice: 450,
      image: "/images/bag.jpg",
      rating: 4.5,
      reviews: 210,
      description: "Elegant classic handbag for ladies",
      features: [
        "Lightweight",
        "Waterproof",
        "Soft",
        "Large capacity",
        "Fashionable",
      ],
      seller: {
        name: "Exotic",
        location: "Accra Mall",
        sales: 1340,
        rating: 4.6,
      },
    },
    {
      id: 4,
      name: "Designed Cotton Tshirt",
      price: 60,
      oldPrice: 70,
      image: "/images/dshirt.jpg",
      rating: 4.5,
      reviews: 410,
      description:
        "Classy and comfortable wear with elegant designs that elevate your style",
      features: [
        "Quality cotton",
        "Comfortable on the skin",
        "Heat repellant",
        "Fashionable",
        "Different colours available",
      ],
      seller: {
        name: "Nuella's Collection",
        location: "Brunei Complex",
        sales: 340,
        rating: 4.7,
      },
    },
    {
      id: 5,
      name: "Cotton Tshirt",
      price: 40,
      oldPrice: 45,
      image: "/images/shirts.jpg",
      rating: 4.5,
      reviews: 310,
      description: "Classy and comfortable wear for every outing",
      features: [
        "Quality cotton",
        "Comfortable on the skin",
        "Heat repellant",
        "Fashionable",
        "Different colours available",
      ],
      seller: {
        name: "Nuella's Collection",
        location: "Brunei Complex ",
        sales: 340,
        rating: 4.6,
      },
    },
    {
      id: 6,
      name: "Ladies Tote Bag",
      price: 350,
      oldPrice: 450,
      image: "/images/tote.jpg",
      rating: 4.5,
      reviews: 210,
      description: "Classic handbag for Commuting and Daily Use",
      features: [
        "Lightweight",
        "Waterproof",
        "Soft",
        "Large capacity",
        "Fashionable",
      ],
      seller: {
        name: "Ammy's Bags",
        location: "Accra Mall",
        sales: 1340,
        rating: 4.6,
      },
    },
  ];

  return (
    <div className="pt-24 px-6 md:px-16 pd-16 bg-[#dcd7c4]">
      <h1 className="text-3xl font-bold mb-6">Shop</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer transition duration-200"
          >
            <div
              className="bg-gray-200 p-4 flex w-full  items-center justify-center"
              onClick={() => navigate("/productdetails", { state: product })}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover rounded"
              />
            </div>
            <div className="p-4 bg-[#f8f7e9] ">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 font-bold mb-2">GH₵{product.price}</p>
              <p className="text-gray-700 font-bold">👤{product.seller.name}</p>
            </div>
            <div className="grid place-items-center bg-[#f8f7e9] py-3">
              <button
                onClick={() => navigate("/viewcart")}
                className="bg-[#f5ba25] text-center w-3/4 text-black px-16 py-3 rounded hover:bg-[#8d8793]"
              >
                Add to Cart
              </button>
            </div>
          </div>
                ))}
              </div>
            </div>
          );
        }
