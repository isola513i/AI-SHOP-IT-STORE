import { Product, Brand } from './types';

export const BRANDS: Brand[] = [
  { id: 1, name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/172px-Apple_logo_grey.svg.png' },
  { id: 2, name: 'ASUS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/1280px-ASUS_Logo.svg.png' },
  { id: 3, name: 'NVIDIA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Nvidia_logo.svg/200px-Nvidia_logo.svg.png' },
  { id: 4, name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/1024px-Dell_Logo.svg.png' },
  { id: 5, name: 'Logitech', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Logitech_logo.svg/2560px-Logitech_logo.svg.png' },
];

export const ALL_PRODUCTS: Product[] = [
  // GPUs
  {
    id: 'gpu-1',
    title: 'GeForce RTX 4090 Gaming OC',
    brand: 'NVIDIA',
    description: 'The ultimate GeForce GPU. It brings an enormous leap in performance, efficiency, and AI-powered graphics.',
    price: 1599,
    originalPrice: 1699,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80',
    category: 'GPU',
    rating: 4.9,
    reviews: 342,
    badge: 'Flagship'
  },
  {
    id: 'gpu-2',
    title: 'GeForce RTX 4080 Super',
    brand: 'Gigabyte',
    description: 'Supercharged performance and efficiency for 4K gaming and creation.',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80',
    category: 'GPU',
    rating: 4.8,
    reviews: 128
  },
  {
    id: 'gpu-3',
    title: 'Radeon RX 7900 XTX',
    brand: 'AMD',
    description: 'Experience the most advanced graphics for gamers and creators.',
    price: 999,
    originalPrice: 1099,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80',
    category: 'GPU',
    rating: 4.7,
    reviews: 89
  },
  {
    id: 'gpu-4',
    title: 'GeForce RTX 4070 Ti',
    brand: 'MSI',
    description: 'The sweet spot for 1440p gaming with high refresh rates.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80',
    category: 'GPU',
    rating: 4.8,
    reviews: 210
  },
  {
    id: 'gpu-5',
    title: 'Radeon RX 7800 XT',
    brand: 'Sapphire',
    description: 'Incredible performance for 1440p gaming.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=500&q=80',
    category: 'GPU',
    rating: 4.6,
    reviews: 156
  },

  // Notebooks
  {
    id: 'nb-1',
    title: 'MacBook Pro 16 M3 Max',
    brand: 'Apple',
    description: 'Mind-blowing performance. Even longer battery life.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=500&q=80',
    category: 'Notebook',
    rating: 4.9,
    reviews: 856,
    badge: 'New'
  },
  {
    id: 'nb-2',
    title: 'Dell XPS 15 OLED',
    brand: 'Dell',
    description: 'Immersive display and premium craftsmanship.',
    price: 2199,
    originalPrice: 2399,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=500&q=80',
    category: 'Notebook',
    rating: 4.7,
    reviews: 432
  },
  {
    id: 'nb-3',
    title: 'ROG Zephyrus G14',
    brand: 'ASUS',
    description: 'The world\'s most powerful 14-inch gaming laptop.',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=500&q=80',
    category: 'Notebook',
    rating: 4.8,
    reviews: 567
  },
  {
    id: 'nb-4',
    title: 'Razer Blade 14',
    brand: 'Razer',
    description: 'Ultra-thin, ultra-powerful gaming laptop.',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=500&q=80',
    category: 'Notebook',
    rating: 4.6,
    reviews: 234
  },
  {
    id: 'nb-5',
    title: 'Alienware x16',
    brand: 'Alienware',
    description: 'Our most advanced gaming laptop yet.',
    price: 2899,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=500&q=80',
    category: 'Notebook',
    rating: 4.7,
    reviews: 123
  },

  // Best Sellers (Accessories)
  {
    id: 'acc-1',
    title: 'MX Master 3S',
    brand: 'Logitech',
    description: 'An icon remastered. Performance meets precision.',
    price: 99,
    originalPrice: 110,
    image: 'https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-3s/gallery/mx-master-3s-mouse-top-view-graphite.png',
    category: 'Accessory',
    rating: 4.9,
    reviews: 2341,
    badge: 'Best Seller'
  },
  {
    id: 'acc-2',
    title: 'Keychron Q1 Pro',
    brand: 'Keychron',
    description: 'Wireless custom mechanical keyboard.',
    price: 199,
    image: 'https://cdn.shopify.com/s/files/1/0059/0630/1017/products/Keychron-Q1-Pro-QMK-VIA-wireless-custom-mechanical-keyboard-carbon-black-fully-assembled-knob-program-macro-compatible-with-mac-windows-linux_1800x1800.jpg',
    category: 'Accessory',
    rating: 4.8,
    reviews: 342
  },
  {
    id: 'acc-3',
    title: 'Sony WH-1000XM5',
    brand: 'Sony',
    description: 'Industry-leading noise cancellation.',
    price: 348,
    originalPrice: 399,
    image: 'https://www.sony.co.th/image/6145c1d32e6ac8e63a46c912ef8a7477?fmt=png-alpha&wid=660&hei=660',
    category: 'Accessory',
    rating: 4.8,
    reviews: 1543
  },
  {
    id: 'acc-4',
    title: 'Samsung 990 Pro 2TB',
    brand: 'Samsung',
    description: 'Ultimate SSD performance.',
    price: 169,
    image: 'https://image-us.samsung.com/SamsungUS/home/computing/memory-and-storage/9-27-22/990-pro-with-heatsink/Gallery-Images-1.jpg',
    category: 'Accessory',
    rating: 4.9,
    reviews: 890
  },
  {
    id: 'acc-5',
    title: 'LG UltraFine Ergo',
    brand: 'LG',
    description: '32-inch 4K monitor with ergonomic stand.',
    price: 499,
    originalPrice: 599,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c4603e1?auto=format&fit=crop&w=500&q=80',
    category: 'Accessory',
    rating: 4.7,
    reviews: 123
  }
];