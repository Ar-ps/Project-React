import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../public/assets/css/bootstrap.min.css';
import '../public/assets/css/elegant-icons.css';
import '../public/assets/css/nice-select.css';
import '../public/assets/css/font-awesome.min.css';
import '../public/assets/css/magnific-popup.css';
import '../public/assets/css/owl.carousel.min.css';
import '../public/assets/css/slicknav.min.css';
import '../public/assets/css/style.css';

// Import components
import Home from './components/home';
import Shop from './components/shop';
import Blog from './components/blog';
import Contacts from './components/contact';

// Import pages
import About from './pages/about';
import Checkout from './pages/checkout';
import ShoppingCart from './pages/shopping-cart';
import BlogDetails from './pages/blog-details';
import ShopDetail from './pages/shop-details';

function App() {
  return (
    <Router>
      <Routes>
        {/* Components */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contacts />} />

        {/* Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/blog/:id" element={<BlogDetails />} /> {/* ← route dinamis */}
        <Route path="/shop-details" element={<ShopDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
