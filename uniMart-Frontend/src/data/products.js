import macbook from "../assets/products/macbook.png";
import powerBank from "../assets/products/power_bank.png";
import calculator from "../assets/products/calculator.png";
import keyboard from "../assets/products/keyboard.png";
import kettle from "../assets/products/kettle.png";
import watch from "../assets/products/watch.png";
import speaker from "../assets/products/speaker.png";
import charger from "../assets/products/charger.png";

const products = [
  {
    id: 1,
    name: "Macbook Air M1",
    price: 300,
    originalPrice: 420,
    discount: "29% OFF",
    rating: 4.7,
    inStock: true,
    image: macbook,
    category: "Electronics",
    description:
      "The MacBook Air M1 is Apple's most popular laptop, powered by the Apple M1 chip for incredible performance and up to 18 hours of battery life. It features a stunning 13.3-inch Retina display, 8GB unified memory, and a fanless design that stays silent under load.",
    features: ["Apple M1 Chip", "13.3-inch Retina Display", "Up to 18hr Battery", "8GB Unified Memory"],
    seller: { name: "Sarah Boateng", rating: 4.6, sales: 1204, location: "Volta Hall, UG", joined: 2024 },
  },
  {
    id: 2,
    name: "Power Bank",
    price: 200,
    originalPrice: 280,
    discount: "29% OFF",
    rating: 4.5,
    inStock: true,
    image: powerBank,
    category: "Electronics",
    description:
      "A high-capacity 20,000mAh power bank with dual USB-A and USB-C ports. Supports fast charging up to 22.5W, keeping your devices powered throughout the day. Compact and lightweight design fits easily in any bag.",
    features: ["20,000mAh Capacity", "22.5W Fast Charging", "Dual USB-A + USB-C", "LED Battery Indicator"],
    seller: { name: "Prince Owusu", rating: 4.3, sales: 876, location: "Commonwealth Hall, KNUST", joined: 2024 },
  },
  {
    id: 3,
    name: "Scientific Calculator",
    price: 110,
    originalPrice: 150,
    discount: "27% OFF",
    rating: 4.8,
    inStock: true,
    image: calculator,
    category: "Electronics",
    description:
      "A reliable scientific calculator ideal for engineering and science students. Supports over 400 functions including complex number calculations, matrix operations, and statistical analysis. Solar and battery powered.",
    features: ["400+ Functions", "Matrix & Vector Calculations", "Solar + Battery Powered", "Natural Textbook Display"],
    seller: { name: "Agyenim Aggrey", rating: 4.5, sales: 2100, location: "Mensah Sarbah Hall, UG", joined: 2023 },
  },
  {
    id: 4,
    name: "Keyboard",
    price: 500,
    originalPrice: 700,
    discount: "29% OFF",
    rating: 4.6,
    inStock: true,
    image: keyboard,
    category: "Electronics",
    description:
      "A compact mechanical keyboard with RGB backlighting and tactile switches. Features a tenkeyless layout perfect for desk setups. Compatible with Windows and macOS, with plug-and-play USB connectivity.",
    features: ["Mechanical Tactile Switches", "RGB Backlighting", "Tenkeyless Layout", "Windows & macOS Compatible"],
    seller: { name: "Kwaku Fanum", rating: 4.4, sales: 530, location: "Independence Hall, KNUST", joined: 2024 },
  },
  {
    id: 5,
    name: "Electric Kettle",
    price: 300,
    originalPrice: 400,
    discount: "25% OFF",
    rating: 4.4,
    inStock: true,
    image: kettle,
    category: "Electronics",
    description:
      "A sleek 1.7L electric kettle with rapid boil technology that heats water in under 3 minutes. Features an auto shut-off and boil-dry protection for safety. Stainless steel interior keeps water clean and odour-free.",
    features: ["1.7L Capacity", "Rapid Boil Technology", "Auto Shut-Off", "Stainless Steel Interior"],
    seller: { name: "James Appiah", rating: 4.8, sales: 2543, location: "Queen's Hall, KNUST", joined: 2025 },
  },
  {
    id: 6,
    name: "Apple Watch",
    price: 350,
    originalPrice: 550,
    discount: "30% OFF",
    rating: 4.8,
    inStock: true,
    image: watch,
    category: "Electronics",
    description:
      "The Apple Watch Series 10 is Apple's thinnest smartwatch yet, offering a more comfortable fit without compromising performance. It features a 1.96-inch display that is 40% brighter than previous models, with a maximum brightness of 2,000 nits, making it easier to view in bright sunlight. Available in 42mm and 46mm sizes.",
    features: ["Blood Oxygen Monitoring", "Sleep Apnea Detection", "ECG App", "Cycle Tracking"],
    seller: { name: "James Appiah", rating: 4.8, sales: 2543, location: "Queen's Hall, KNUST", joined: 2025 },
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    price: 600,
    originalPrice: 800,
    discount: "25% OFF",
    rating: 4.7,
    inStock: true,
    image: speaker,
    category: "Electronics",
    description:
      "A portable Bluetooth speaker with 360-degree surround sound and deep bass. IPX7 waterproof rating makes it perfect for outdoor use. Offers up to 12 hours of playtime on a single charge with a built-in microphone for hands-free calls.",
    features: ["360° Surround Sound", "IPX7 Waterproof", "12hr Battery Life", "Built-in Microphone"],
    seller: { name: "Samuel Banks", rating: 4.6, sales: 987, location: "Akuafo Hall, UG", joined: 2024 },
  },
  {
    id: 8,
    name: "Iphone Charger",
    price: 100,
    originalPrice: 140,
    discount: "29% OFF",
    rating: 4.3,
    inStock: true,
    image: charger,
    category: "Electronics",
    description:
      "An original Apple USB-C to Lightning cable and 20W power adapter. Supports fast charging for iPhone 8 and later, charging up to 50% in 30 minutes. MFi certified for full compatibility and safety.",
    features: ["20W Fast Charging", "USB-C to Lightning", "MFi Certified", "1m Cable Length"],
    seller: { name: "Peace Shenem", rating: 4.2, sales: 412, location: "Bani Hall, KNUST", joined: 2025 },
  },
];

export default products;
