import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Definisikan interface untuk tipe produk
interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
  rating: number;
  label?: string; // Menjadikan 'label' opsional karena tidak selalu ada
}

const Home = () => {
  const slides = [
    {
      id: 1,
      image: '/assets/img/hero/hero-1.jpg',
      subtitle: 'Summer Collection',
      title: 'Fall - Winter Collections 2030',
      description:
        'A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.',
    },
    {
      id: 2,
      image: '/assets/img/hero/hero-2.jpg',
      subtitle: 'Summer Collection',
      title: 'Fall - Winter Collections 2030',
      description:
        'A specialist label creating luxury essentials. Ethically crafted with an unwavering commitment to exceptional quality.',
    },
  ];

  // Menggunakan state untuk menyimpan data produk dari API
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<'all' | 'best-sellers' | 'new-arrivals' | 'hot-sales'>('all');

  // Mengambil data dari backend saat komponen dimuat
  useEffect(() => {
    // Perbaikan: Menambahkan type assertion <Product[]> ke axios.get
    axios.get<Product[]>('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products:", err));
  }, []); // [] memastikan hook hanya berjalan sekali setelah render pertama

  // Logika filter tetap sama, menggunakan data dari state `products`
  const filteredProducts = filter === 'all'
    ? products
    : products.filter((product) => product.category === filter);
  
  return (
  <>
  {/* Offcanvas Menu Begin */}
  <div className="offcanvas-menu-overlay" />
  <div className="offcanvas-menu-wrapper">
    <div className="offcanvas__option">
      <div className="offcanvas__links">
        <a href="#">Sign in</a>
        <a href="#">FAQs</a>
      </div>
      <div className="offcanvas__top__hover">
        <span>
          Usd <i className="arrow_carrot-down" />
        </span>
        <ul>
          <li>USD</li>
          <li>EUR</li>
          <li>USD</li>
        </ul>
      </div>
    </div>
    <div className="offcanvas__nav__option">
      <a href="#" className="search-switch">
        <img src="/assets/img/icon/search.png" alt="Search" />
      </a>
      <a href="#">
        <img src="/assets/img/icon/heart.png" alt="Heart" />
      </a>
      <a href="#">
        <img src="/assets/img/icon/cart.png" alt="Cart" />
        <span>0</span>
      </a>
      <div className="price">$0.00</div>
    </div>
    <div id="mobile-menu-wrap" />
    <div className="offcanvas__text">
      <p>Free shipping, 30-day return or refund guarantee.</p>
    </div>
  </div>
  {/* Offcanvas Menu End */}
  {/* Header Section Begin */}
  <header className="header">
    <div className="header__top">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-7">
            <div className="header__top__left">
              <p>Free shipping, 30-day return or refund guarantee.</p>
            </div>
          </div>
          <div className="col-lg-6 col-md-5">
            <div className="header__top__right">
              <div className="header__top__links">
                <a href="#">Sign in</a>
                <a href="#">FAQs</a>
              </div>
              <div className="header__top__hover">
                <span>
                  Usd <i className="arrow_carrot-down" />
                </span>
                <ul>
                  <li>USD</li>
                  <li>EUR</li>
                  <li>USD</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-3">
          <div className="header__logo">
            <a href="#">
            <img src="/assets/img/logo.png" alt="Logo" />
            </a>
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <nav className="header__menu mobile-menu">
            <ul>
              <li className="active">
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/pages">Pages</Link>
                <ul className="dropdown">
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/shop-details">Shop Details</Link>
                  </li>
                  <li>
                    <Link to="/shopping-cart">Shopping Cart</Link>
                  </li>
                  <li>
                    <Link to="/checkout">Check Out</Link>
                  </li>
                  <li>
                    <Link to="/blog-details">Blog Details</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contacts</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-lg-3 col-md-3">
          <div className="header__nav__option">
            <a href="#" className="search-switch">
              <img src="/assets/img/icon/search.png" alt="Search" />
            </a>
            <a href="#">
              <img src="/assets/img/icon/heart.png" alt="Heart" />
            </a>
            <a href="#">
              <img src="/assets/img/icon/cart.png" alt="Cart" /> <span>0</span>
            </a>
            <div className="price">$0.00</div>
          </div>
        </div>
      </div>
      <div className="canvas__open">
        <i className="fa fa-bars" />
      </div>
    </div>
  </header>
  {/* Header Section End */}
  {/* Hero Section Begin */}
  <section className="hero">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="hero__slider"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
          <div
            className="single-hero-item"
            style={{
              backgroundImage: `url(${slide.image})`,
              height: '100vh',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-5 col-lg-7 col-md-8">
                  <div className="hero__text" style={{ color: 'white' }}>
                    <h6>{slide.subtitle}</h6>
                    <h2>{slide.title}</h2>
                    <p>{slide.description}</p>
                    <a href="#" className="primary-btn">
                      Shop now <span className="arrow_right" />
                    </a>
                    <div className="hero__social">
                      <a href="#"><i className="fa fa-facebook" /></a>
                      <a href="#"><i className="fa fa-twitter" /></a>
                      <a href="#"><i className="fa fa-pinterest" /></a>
                      <a href="#"><i className="fa fa-instagram" /></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        ))}
      </Swiper>
    </section>
  {/* Hero Section End */}
  {/* Banner Section Begin */}
  <section className="banner spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-7 offset-lg-4">
          <div className="banner__item">
            <div className="banner__item__pic">
              <img src="/assets/img/banner/banner-1.jpg" alt="Banner1" />
            </div>
            <div className="banner__item__text">
              <h2>Clothing Collections 2030</h2>
              <a href="#">Shop now</a>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="banner__item banner__item--middle">
            <div className="banner__item__pic">
              <img src="/assets/img/banner/banner-2.jpg" alt="Banner2" />
            </div>
            <div className="banner__item__text">
              <h2>Accessories</h2>
              <a href="#">Shop now</a>
            </div>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="banner__item banner__item--last">
            <div className="banner__item__pic">
              <img src="/assets/img/banner/banner-3.jpg" alt="Banner3" />
            </div>
            <div className="banner__item__text">
              <h2>Shoes Spring 2030</h2>
              <a href="#">Shop now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Banner Section End */}
  {/* Product Section Begin */}
  <section className="product spad">
    <div className="container">
      <div className="row">
      <div className="col-lg-12">
      <ul className="filter__controls">
        <li
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          Best Sellers
        </li>
        <li
          className={filter === 'new-arrivals' ? 'active' : ''}
          onClick={() => setFilter('new-arrivals')}
        >
          New Arrivals
        </li>
        <li
          className={filter === 'hot-sales' ? 'active' : ''}
          onClick={() => setFilter('hot-sales')}
        >
          Hot Sales
        </li>
      </ul>
      </div>
      <div className="row product__filter">
    {filteredProducts.slice(0, 8).map((product) => (
    <div
      className={`col-lg-3 col-md-6 col-sm-6 mix ${product.category}`}
      key={product.id}
    >
      <div className="product__item">
        <div
          className="product__item__pic set-bg"
          style={{ backgroundImage: `url(${product.image})` }}
        >
          {/* Optional label, kamu bisa atur sesuai kebutuhan */}
          {product.label === 'New' && (
            <span className="label">New</span>
          )}
          {product.label === 'Sale' && (
            <span className="label">Sale</span>
          )}
          <ul className="product__hover">
            <li>
              <a href="#">
                <img src="/assets/img/icon/heart.png" alt="Heart" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/assets/img/icon/compare.png" alt="Compare" />
                <span>Compare</span>
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/assets/img/icon/search.png" alt="Search" />
              </a>
            </li>
          </ul>
        </div>
        <div className="product__item__text">
          <h6>{product.name}</h6>
          <a href="#" className="add-cart">
            + Add To Cart
          </a>
          <div className="rating">
            {[...Array(5)].map((_, index) => (
             <i
              key={index}
              className={`fa ${index < product.rating ? 'fa-star' : 'fa-star-o'}`}
              style={{ color: '#ffc107', fontSize: '16px', marginRight: '2px' }}
            />
          ))}
          </div>
          <h5>${product.price}</h5>
          <div className="product__color__select">
            <label htmlFor={`pc-${product.id}-1`}>
              <input type="radio" id={`pc-${product.id}-1`} />
            </label>
            <label className="active black" htmlFor={`pc-${product.id}-2`}>
              <input type="radio" id={`pc-${product.id}-2`} />
            </label>
            <label className="grey" htmlFor={`pc-${product.id}-3`}>
              <input type="radio" id={`pc-${product.id}-3`} />
            </label>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
</div>
</div>
</section>
  {/* Product Section End */}
  {/* Categories Section Begin */}
  <section className="categories spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <div className="categories__text">
            <h2>
              Clothings Hot <br /> <span>Shoe Collection</span> <br />{" "}
              Accessories
            </h2>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="categories__hot__deal">
            <img src="/assets/img/product-sale.png" alt="ProductSale" />
            <div className="hot__deal__sticker">
              <span>Sale Of</span>
              <h5>$29.99</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1">
          <div className="categories__deal__countdown">
            <span>Deal Of The Week</span>
            <h2>Multi-pocket Chest Bag Black</h2>
            <div className="categories__deal__countdown__timer" id="countdown">
              <div className="cd-item">
                <span>3</span>
                <p>Days</p>
              </div>
              <div className="cd-item">
                <span>1</span>
                <p>Hours</p>
              </div>
              <div className="cd-item">
                <span>50</span>
                <p>Minutes</p>
              </div>
              <div className="cd-item">
                <span>18</span>
                <p>Seconds</p>
              </div>
            </div>
            <a href="#" className="primary-btn">
              Shop now
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Categories Section End */}
  {/* Instagram Section Begin */}
  <section className="instagram spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="instagram__pic">
            <div
              className="instagram__pic__item set-bg"
              style={{ backgroundImage: `url("/assets/img/instagram/instagram-1.jpg")` }}
            />
            <div
              className="instagram__pic__item set-bg"
              style={{ backgroundImage: `url("/assets/img/instagram/instagram-2.jpg")` }}
            />
            <div
              className="instagram__pic__item set-bg"
              style={{ backgroundImage: `url("/assets/img/instagram/instagram-3.jpg")` }}
            />
            <div
              className="instagram__pic__item set-bg"
              style={{ backgroundImage: `url("/assets/img/instagram/instagram-4.jpg")` }}
            />
            <div
              className="instagram__pic__item set-bg"
              style={{ backgroundImage: `url("/assets/img/instagram/instagram-5.jpg")` }}
            />
            <div
              className="instagram__pic__item set-bg"
              style={{ backgroundImage: `url("/assets/img/instagram/instagram-6.jpg")` }}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="instagram__text">
            <h2>Instagram</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <h3>#Male_Fashion</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Instagram Section End */}
  {/* Latest Blog Section Begin */}
  <section className="latest spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="section-title">
            <span>Latest News</span>
            <h2>Fashion New Trends</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="blog__item">
            <div
              className="blog__item__pic set-bg"
              style={{ backgroundImage: `url("/assets/img/blog/blog-1.jpg")` }}
            />
            <div className="blog__item__text">
              <span>
                <img src="/assets/img/icon/calendar.png" alt="" /> 16 February 2020
              </span>
              <h5>What Curling Irons Are The Best Ones</h5>
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="blog__item">
            <div
              className="blog__item__pic set-bg"
              style={{ backgroundImage: `url("/assets/img/blog/blog-2.jpg")` }}
            />
            <div className="blog__item__text">
              <span>
                <img src="/assets/img/icon/calendar.png" alt="" /> 21 February 2020
              </span>
              <h5>Eternity Bands Do Last Forever</h5>
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="blog__item">
            <div
              className="blog__item__pic set-bg"
              style={{ backgroundImage: `url("/assets/img/blog/blog-3.jpg")` }}
            />
            <div className="blog__item__text">
              <span>
                <img src="/assets/img/icon/calendar.png" alt="" /> 28 February 2020
              </span>
              <h5>The Health Benefits Of Sunglasses</h5>
              <a href="#">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Latest Blog Section End */}
  {/* Footer Section Begin */}
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="footer__about">
            <div className="footer__logo">
              <a href="#">
                <img src="/assets/img/footer-logo.png" alt="" />
              </a>
            </div>
            <p>
              The customer is at the heart of our unique business model, which
              includes design.
            </p>
            <a href="#">
              <img src="/assets/img/payment.png" alt="" />
            </a>
          </div>
        </div>
        <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
          <div className="footer__widget">
            <h6>Shopping</h6>
            <ul>
              <li>
                <a href="#">Clothing Store</a>
              </li>
              <li>
                <a href="#">Trending Shoes</a>
              </li>
              <li>
                <a href="#">Accessories</a>
              </li>
              <li>
                <a href="#">Sale</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-3 col-sm-6">
          <div className="footer__widget">
            <h6>Shopping</h6>
            <ul>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Payment Methods</a>
              </li>
              <li>
                <a href="#">Delivary</a>
              </li>
              <li>
                <a href="#">Return &amp; Exchanges</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
          <div className="footer__widget">
            <h6>NewLetter</h6>
            <div className="footer__newslatter">
              <p>
                Be the first to know about new arrivals, look books, sales &amp;
                promos!
              </p>
              <form action="#">
                <input type="text" placeholder="Your email" />
                <button type="submit">
                  <span className="icon_mail_alt" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12 text-center">
          <div className="footer__copyright__text">
            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            <p>
              Copyright © 2020 All rights reserved | This template is made with{" "}
              <i className="fa fa-heart-o" aria-hidden="true" /> by{" "}
              <a href="https://colorlib.com" target="_blank">
                Colorlib
              </a>
            </p>
            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* Footer Section End */}
  {/* Search Begin */}
  <div className="search-model">
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div className="search-close-switch">+</div>
      <form className="search-model-form">
        <input type="text" id="search-input" placeholder="Search here....." />
      </form>
    </div>
  </div>
  {/* Search End */}
  {/* Js Plugins */}
</>

  );
};

export default Home;