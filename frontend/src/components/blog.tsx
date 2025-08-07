const Blog = () => {
    return (
        <>
        <meta charSet="UTF-8" />
        <meta name="description" content="Male_Fashion Template" />
        <meta name="keywords" content="Male_Fashion, unica, creative, html" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Male-Fashion | Template</title>
        {/* Google Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Css Styles */}
        <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css" />
        <link rel="stylesheet" href="css/font-awesome.min.css" type="text/css" />
        <link rel="stylesheet" href="css/elegant-icons.css" type="text/css" />
        <link rel="stylesheet" href="css/magnific-popup.css" type="text/css" />
        <link rel="stylesheet" href="css/nice-select.css" type="text/css" />
        <link rel="stylesheet" href="css/owl.carousel.min.css" type="text/css" />
        <link rel="stylesheet" href="css/slicknav.min.css" type="text/css" />
        <link rel="stylesheet" href="css/style.css" type="text/css" />
        {/* Page Preloder */}
        <div id="preloder">
          <div className="loader" />
        </div>
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
                      <a href="./index.html">Home</a>
                    </li>
                    <li>
                      <a href="./shop.html">Shop</a>
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
                    <li className="active">
                      <a href="./blog.html">Blog</a>
                    </li>
                    <li>
                      <a href="./contact.html">Contacts</a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="col-lg-3 col-md-3">
                <div className="header__nav__option">
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
          data-setbg="img/breadcrumb-bg.jpg"
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
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog__item">
                  <div
                    className="blog__item__pic set-bg"
                    data-setbg="img/blog/blog-1.jpg"
                  />
                  <div className="blog__item__text">
                    <span>
                      <img src="img/icon/calendar.png" alt="" /> 16 February 2020
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
                    data-setbg="img/blog/blog-2.jpg"
                  />
                  <div className="blog__item__text">
                    <span>
                      <img src="img/icon/calendar.png" alt="" /> 21 February 2020
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
                    data-setbg="img/blog/blog-3.jpg"
                  />
                  <div className="blog__item__text">
                    <span>
                      <img src="img/icon/calendar.png" alt="" /> 28 February 2020
                    </span>
                    <h5>The Health Benefits Of Sunglasses</h5>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog__item">
                  <div
                    className="blog__item__pic set-bg"
                    data-setbg="img/blog/blog-4.jpg"
                  />
                  <div className="blog__item__text">
                    <span>
                      <img src="img/icon/calendar.png" alt="" /> 16 February 2020
                    </span>
                    <h5>Aiming For Higher The Mastopexy</h5>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog__item">
                  <div
                    className="blog__item__pic set-bg"
                    data-setbg="img/blog/blog-5.jpg"
                  />
                  <div className="blog__item__text">
                    <span>
                      <img src="img/icon/calendar.png" alt="" /> 21 February 2020
                    </span>
                    <h5>Wedding Rings A Gift For A Lifetime</h5>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog__item">
                  <div
                    className="blog__item__pic set-bg"
                    data-setbg="img/blog/blog-6.jpg"
                  />
                  <div className="blog__item__text">
                    <span>
                      <img src="img/icon/calendar.png" alt="" /> 28 February 2020
                    </span>
                    <h5>The Different Methods Of Hair Removal</h5>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog__item">
                  <div
                    className="blog__item__pic set-bg"
                    data-setbg="img/blog/blog-7.jpg"
                  />
                  <div className="blog__item__text">
                    <span>
                      <img src="img/icon/calendar.png" alt="" /> 16 February 2020
                    </span>
                    <h5>Hoop Earrings A Style From History</h5>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog__item">
                  <div
                    className="blog__item__pic set-bg"
                    data-setbg="img/blog/blog-8.jpg"
                  />
                  <div className="blog__item__text">
                    <span>
                      <img src="img/icon/calendar.png" alt="" /> 21 February 2020
                    </span>
                    <h5>Lasik Eye Surgery Are You Ready</h5>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="blog__item">
                  <div
                    className="blog__item__pic set-bg"
                    data-setbg="img/blog/blog-9.jpg"
                  />
                  <div className="blog__item__text">
                    <span>
                      <img src="img/icon/calendar.png" alt="" /> 28 February 2020
                    </span>
                    <h5>Lasik Eye Surgery Are You Ready</h5>
                    <a href="#">Read More</a>
                  </div>
                </div>
              </div>
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
                      <img src="img/footer-logo.png" alt="" />
                    </a>
                  </div>
                  <p>
                    The customer is at the heart of our unique business model, which
                    includes design.
                  </p>
                  <a href="#">
                    <img src="img/payment.png" alt="" />
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