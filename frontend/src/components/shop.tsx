import 'swiper/swiper-bundle.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  rating: number;
  label: string | null;
  category: string;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

useEffect(() => {
  axios.get<Product[]>('http://localhost:5000/api/products')
    .then(res => setProducts(res.data))
    .catch(err => console.error("Error fetching products:", err));
}, []);
  // Hitung index untuk potong array
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);
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
        <img src="/assets/img/icon/search.png" alt="" />
      </a>
      <a href="#">
        <img src="/assets/img/icon/heart.png" alt="" />
      </a>
      <a href="#">
        <img src="/assets/img/icon/cart.png" alt="" /> <span>0</span>
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
            <a href="./index.html">
              <img src="/assets/img/logo.png" alt="" />
            </a>
          </div>
        </div>
        <div className="col-lg-6 col-md-6">
          <nav className="header__menu mobile-menu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="active">
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <a href="#">Pages</a>
                <ul className="dropdown">
                  <li>
                    <a href="./about.html">About Us</a>
                  </li>
                  <li>
                    <a href="./shop-details.html">Shop Details</a>
                  </li>
                  <li>
                    <a href="./shopping-cart.html">Shopping Cart</a>
                  </li>
                  <li>
                    <a href="./checkout.html">Check Out</a>
                  </li>
                  <li>
                    <a href="./blog-details.html">Blog Details</a>
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
              <img src="/assets/img/icon/search.png" alt="" />
            </a>
            <a href="#">
              <img src="/assets/img/icon/heart.png" alt="" />
            </a>
            <a href="#">
              <img src="/assets/img/icon/cart.png" alt="" /> <span>0</span>
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
  {/* Breadcrumb Section Begin */}
  <section className="breadcrumb-option">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb__text">
            <h4>Shop</h4>
            <div className="breadcrumb__links">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Breadcrumb Section End */}
  {/* Shop Section Begin */}
  <section className="shop spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-3">
          <div className="shop__sidebar">
            <div className="shop__sidebar__search">
              <form action="#">
                <input type="text" placeholder="Search..." />
                <button type="submit">
                  <span className="icon_search" />
                </button>
              </form>
            </div>
            <div className="shop__sidebar__accordion">
              <div className="accordion" id="accordionExample">
                <div className="card">
                  <div className="card-heading">
                    <a data-toggle="collapse" data-target="#collapseOne">
                      Categories
                    </a>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="shop__sidebar__categories">
                        <ul className="nice-scroll">
                          <li>
                            <a href="#">Men (20)</a>
                          </li>
                          <li>
                            <a href="#">Women (20)</a>
                          </li>
                          <li>
                            <a href="#">Bags (20)</a>
                          </li>
                          <li>
                            <a href="#">Clothing (20)</a>
                          </li>
                          <li>
                            <a href="#">Shoes (20)</a>
                          </li>
                          <li>
                            <a href="#">Accessories (20)</a>
                          </li>
                          <li>
                            <a href="#">Kids (20)</a>
                          </li>
                          <li>
                            <a href="#">Kids (20)</a>
                          </li>
                          <li>
                            <a href="#">Kids (20)</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-heading">
                    <a data-toggle="collapse" data-target="#collapseTwo">
                      Branding
                    </a>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse show"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="shop__sidebar__brand">
                        <ul>
                          <li>
                            <a href="#">Louis Vuitton</a>
                          </li>
                          <li>
                            <a href="#">Chanel</a>
                          </li>
                          <li>
                            <a href="#">Hermes</a>
                          </li>
                          <li>
                            <a href="#">Gucci</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-heading">
                    <a data-toggle="collapse" data-target="#collapseThree">
                      Filter Price
                    </a>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse show"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="shop__sidebar__price">
                        <ul>
                          <li>
                            <a href="#">$0.00 - $50.00</a>
                          </li>
                          <li>
                            <a href="#">$50.00 - $100.00</a>
                          </li>
                          <li>
                            <a href="#">$100.00 - $150.00</a>
                          </li>
                          <li>
                            <a href="#">$150.00 - $200.00</a>
                          </li>
                          <li>
                            <a href="#">$200.00 - $250.00</a>
                          </li>
                          <li>
                            <a href="#">250.00+</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-heading">
                    <a data-toggle="collapse" data-target="#collapseFour">
                      Size
                    </a>
                  </div>
                  <div
                    id="collapseFour"
                    className="collapse show"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="shop__sidebar__size">
                        <label htmlFor="xs">
                          xs
                          <input type="radio" id="xs" />
                        </label>
                        <label htmlFor="sm">
                          s
                          <input type="radio" id="sm" />
                        </label>
                        <label htmlFor="md">
                          m
                          <input type="radio" id="md" />
                        </label>
                        <label htmlFor="xl">
                          xl
                          <input type="radio" id="xl" />
                        </label>
                        <label htmlFor="2xl">
                          2xl
                          <input type="radio" id="2xl" />
                        </label>
                        <label htmlFor="xxl">
                          xxl
                          <input type="radio" id="xxl" />
                        </label>
                        <label htmlFor="3xl">
                          3xl
                          <input type="radio" id="3xl" />
                        </label>
                        <label htmlFor="4xl">
                          4xl
                          <input type="radio" id="4xl" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-heading">
                    <a data-toggle="collapse" data-target="#collapseFive">
                      Colors
                    </a>
                  </div>
                  <div
                    id="collapseFive"
                    className="collapse show"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="shop__sidebar__color">
                        <label className="c-1" htmlFor="sp-1">
                          <input type="radio" id="sp-1" />
                        </label>
                        <label className="c-2" htmlFor="sp-2">
                          <input type="radio" id="sp-2" />
                        </label>
                        <label className="c-3" htmlFor="sp-3">
                          <input type="radio" id="sp-3" />
                        </label>
                        <label className="c-4" htmlFor="sp-4">
                          <input type="radio" id="sp-4" />
                        </label>
                        <label className="c-5" htmlFor="sp-5">
                          <input type="radio" id="sp-5" />
                        </label>
                        <label className="c-6" htmlFor="sp-6">
                          <input type="radio" id="sp-6" />
                        </label>
                        <label className="c-7" htmlFor="sp-7">
                          <input type="radio" id="sp-7" />
                        </label>
                        <label className="c-8" htmlFor="sp-8">
                          <input type="radio" id="sp-8" />
                        </label>
                        <label className="c-9" htmlFor="sp-9">
                          <input type="radio" id="sp-9" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-heading">
                    <a data-toggle="collapse" data-target="#collapseSix">
                      Tags
                    </a>
                  </div>
                  <div
                    id="collapseSix"
                    className="collapse show"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="shop__sidebar__tags">
                        <a href="#">Product</a>
                        <a href="#">Bags</a>
                        <a href="#">Shoes</a>
                        <a href="#">Fashio</a>
                        <a href="#">Clothing</a>
                        <a href="#">Hats</a>
                        <a href="#">Accessories</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <div className="shop__product__option">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="shop__product__option__left">
                  <p>Showing 1–12 of 126 results</p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="shop__product__option__right">
                  <p>Sort by Price:</p>
                  <select>
                    <option value="">Low To High</option>
                    <option value="">$0 - $55</option>
                    <option value="">$55 - $100</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
          {currentProducts.map((product) => (
          <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
          <div className={`product__item ${product.label === 'Sale' ? 'sale' : ''}`}>
          <div className="product__item__pic">
          {product.label && <span className="label">{product.label}</span>}
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
          <ul className="product__hover">
            <li><a href="#"><img src="/assets/img/icon/heart.png" alt="" /></a></li>
            <li><a href="#"><img src="/assets/img/icon/compare.png" alt="" /><span>Compare</span></a></li>
            <li><a href="#"><img src="/assets/img/icon/search.png" alt="" /></a></li>
          </ul>
        </div>
        <div className="product__item__text">
          <h6>{product.name}</h6>
          <a href="#" className="add-cart">+ Add To Cart</a>
          <div className="rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <i
                key={index}
                className={`fa ${index < product.rating ? 'fa-star' : 'fa-star-o'}`}
                style={{ color: '#f7941d', marginRight: '2px' }}
              />
            ))}
          </div>
          <h5>${Number(product.price).toFixed(2)}</h5>
        </div>
      </div>
    </div>
      ))}
    </div>
    {/* Pagination */}
    <div className="row">
    <div className="col-lg-12">
    <div className="product__pagination">
      {Array.from({ length: totalPages }).map((_, index) => (
        <a
          key={index}
          href="#"
          className={currentPage === index + 1 ? 'active' : ''}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage(index + 1);
          }}
        >
          {index + 1}
        </a>
        ))}
      </div>
    </div>
  </div>
        </div>
      </div>
    </div>
  </section>
  {/* Shop Section End */}
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
  
  export default Shop;