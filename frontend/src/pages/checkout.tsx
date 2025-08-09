import { Link } from 'react-router-dom';

const Checkout = () => {
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
                    <li className="active">
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
        <section className="breadcrumb-option">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb__text">
                  <h4>Check Out</h4>
                  <div className="breadcrumb__links">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <span>Check Out</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Breadcrumb Section End */}
        {/* Checkout Section Begin */}
        <section className="checkout spad">
          <div className="container">
            <div className="checkout__form">
              <form action="#">
                <div className="row">
                  <div className="col-lg-8 col-md-6">
                    <h6 className="coupon__code">
                      <span className="icon_tag_alt" /> Have a coupon?{" "}
                      <a href="#">Click here</a> to enter your code
                    </h6>
                    <h6 className="checkout__title">Billing Details</h6>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Fist Name<span>*</span>
                          </p>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Last Name<span>*</span>
                          </p>
                          <input type="text" />
                        </div>
                      </div>
                    </div>
                    <div className="checkout__input">
                      <p>
                        Country<span>*</span>
                      </p>
                      <input type="text" />
                    </div>
                    <div className="checkout__input">
                      <p>
                        Address<span>*</span>
                      </p>
                      <input
                        type="text"
                        placeholder="Street Address"
                        className="checkout__input__add"
                      />
                      <input
                        type="text"
                        placeholder="Apartment, suite, unite ect (optinal)"
                      />
                    </div>
                    <div className="checkout__input">
                      <p>
                        Town/City<span>*</span>
                      </p>
                      <input type="text" />
                    </div>
                    <div className="checkout__input">
                      <p>
                        Country/State<span>*</span>
                      </p>
                      <input type="text" />
                    </div>
                    <div className="checkout__input">
                      <p>
                        Postcode / ZIP<span>*</span>
                      </p>
                      <input type="text" />
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Phone<span>*</span>
                          </p>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Email<span>*</span>
                          </p>
                          <input type="text" />
                        </div>
                      </div>
                    </div>
                    <div className="checkout__input__checkbox">
                      <label htmlFor="acc">
                        Create an account?
                        <input type="checkbox" id="acc" />
                        <span className="checkmark" />
                      </label>
                      <p>
                        Create an account by entering the information below. If you
                        are a returning customer please login at the top of the page
                      </p>
                    </div>
                    <div className="checkout__input">
                      <p>
                        Account Password<span>*</span>
                      </p>
                      <input type="text" />
                    </div>
                    <div className="checkout__input__checkbox">
                      <label htmlFor="diff-acc">
                        Note about your order, e.g, special noe for delivery
                        <input type="checkbox" id="diff-acc" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="checkout__input">
                      <p>
                        Order notes<span>*</span>
                      </p>
                      <input
                        type="text"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="checkout__order">
                      <h4 className="order__title">Your order</h4>
                      <div className="checkout__order__products">
                        Product <span>Total</span>
                      </div>
                      <ul className="checkout__total__products">
                        <li>
                          01. Vanilla salted caramel <span>$ 300.0</span>
                        </li>
                        <li>
                          02. German chocolate <span>$ 170.0</span>
                        </li>
                        <li>
                          03. Sweet autumn <span>$ 170.0</span>
                        </li>
                        <li>
                          04. Cluten free mini dozen <span>$ 110.0</span>
                        </li>
                      </ul>
                      <ul className="checkout__total__all">
                        <li>
                          Subtotal <span>$750.99</span>
                        </li>
                        <li>
                          Total <span>$750.99</span>
                        </li>
                      </ul>
                      <div className="checkout__input__checkbox">
                        <label htmlFor="acc-or">
                          Create an account?
                          <input type="checkbox" id="acc-or" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adip elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                      <div className="checkout__input__checkbox">
                        <label htmlFor="payment">
                          Check Payment
                          <input type="checkbox" id="payment" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="checkout__input__checkbox">
                        <label htmlFor="paypal">
                          Paypal
                          <input type="checkbox" id="paypal" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <button type="submit" className="site-btn">
                        PLACE ORDER
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        {/* Checkout Section End */}
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
  
  export default Checkout;