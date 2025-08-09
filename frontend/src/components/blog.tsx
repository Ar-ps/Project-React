import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Blog {
    id: number;
    title: string;
    content: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  }
  
const Blog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get<Blog[]>('http://localhost:5000/api/blogs');
          setBlogs(response.data);
        } catch (error) {
          console.error('Gagal mengambil data blog:', error);
        }
      };
  
      fetchBlogs();
    }, []);
  
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
              <img src="img/icon/search.png" alt="" />
            </a>
            <a href="#">
              <img src="img/icon/heart.png" alt="" />
            </a>
            <a href="#">
              <img src="img/icon/cart.png" alt="" /> <span>0</span>
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
                    <img src="img/logo.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <nav className="header__menu mobile-menu">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/shop">Shop</Link>
                    </li>
                    <li>
                      <Link to="/about">Pages</Link>
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
                    <li className="active">
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
                    <img src="assets/img/icon/search.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="assets/img/icon/heart.png" alt="" />
                  </a>
                  <a href="#">
                    <img src="assets/img/icon/cart.png" alt="" /> <span>0</span>
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
        <section
          className="breadcrumb-blog set-bg"
          style={{ backgroundImage: `url("assets/img/breadcrumb-bg.jpg")` }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h2>Our Blog</h2>
              </div>
            </div>
          </div>
        </section>
        {/* Breadcrumb Section End */}
        {/* Blog Section Begin */}
        <section className="blog spad">
          <div className="container">
            <div className="row">
              {blogs.length > 0 ? (
                blogs.slice(0, 10).map((blog, index) => (
                  <div className="col-lg-4 col-md-6 col-sm-6" key={blog.id ?? index}>
                    <div className="blog__item">
              <div
                className="blog__item__pic set-bg"
                style={{
                  backgroundImage: `url(${blog.image ?? '/assets/img/default.jpg'})`,
                }}
              />
              <div className="blog__item__text">
                <span>
                  <img src="/assets/img/icon/calendar.png" alt="" />{" "}
                  {new Date(blog.createdAt ?? "").toLocaleDateString("en-GB")}
                </span>
                <h5>{blog.title}</h5>
                <Link to={`/blog/${blog.id}`}>Read More</Link>
                </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center w-100">Loading blogs...</p>
      )}
        </div>
        </div>
        </section>
        {/* Blog Section End */}
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
  
  export default Blog;