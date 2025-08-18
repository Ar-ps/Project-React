import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

type Product = {
  id: number;
  name: string;
  image: string; // URL atau path
  price: number;
};

type CartItem = {
  id: number;           // cart_items.id
  cart_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  product: Product;
};

type CartResponse = {
  cartId: number;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
};

const API = 'http://localhost:5000/api';

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
const axiosAuth = axios.create({
  baseURL: API,
  headers: token ? { Authorization: `Bearer ${token}` } : undefined,
});

const formatMoney = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n || 0));

const ShoppingCart = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coupon, setCoupon] = useState('');

  const itemCount = useMemo(
    () => cart?.items.reduce((a, it) => a + it.quantity, 0) ?? 0,
    [cart]
  );

  const loadCart = async () => {
    try {
      setLoading(true);
      const { data } = await axiosAuth.get<CartResponse>('/cart');
      setCart(data);
    } catch (e: any) {
      console.error('Failed to load cart', e?.response?.data || e?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdateQty = async (itemId: number, quantity: number) => {
    if (quantity < 0) return;
    try {
      const { data } = await axiosAuth.patch<CartResponse>(`/cart/items/${itemId}`, { quantity });
      setCart(data);
    } catch (e: any) {
      console.error('Failed to update qty', e?.response?.data || e?.message);
    }
  };

  const onRemoveItem = async (itemId: number) => {
    try {
      const { data } = await axiosAuth.delete<CartResponse>(`/cart/items/${itemId}`);
      setCart(data);
    } catch (e: any) {
      console.error('Failed to remove item', e?.response?.data || e?.message);
    }
  };

  const onClearCart = async () => {
    try {
      const { data } = await axiosAuth.delete<CartResponse>('/cart/clear');
      setCart(data);
    } catch (e: any) {
      console.error('Failed to clear cart', e?.response?.data || e?.message);
    }
  };

  const onApplyCoupon = async (ev: React.FormEvent) => {
    ev.preventDefault();
    // Placeholder, backend contoh kita belum memproses kupon (discount = 0)
    try {
      setApplying(true);
      // Implementasi kupon bisa di POST ke endpoint validasi khusus.
      // Untuk sekarang re-load cart saja.
      await loadCart();
    } finally {
      setApplying(false);
    }
  };
    return (
        <>
        {/* Offcanvas Menu Begin */}
        <div className="offcanvas-menu-overlay" />
        <div className="offcanvas-menu-wrapper">
          <div className="offcanvas__option">
            <div className="offcanvas__links">
              <Link to="/login">Sign in</Link>
              <Link to="/faqs">FAQs</Link>
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
            <Link to="/wishlist">
            <img src="img/icon/heart.png" alt="" />
            </Link>
            <Link to="/shopping-cart">
            <img src="img/icon/cart.png" alt="" /> <span>{itemCount}</span>
          </Link>
          <div className="price">{formatMoney(cart?.total ?? 0)}</div>
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
                      <Link to="/login">Sign in</Link>
                      <Link to="/faqs">FAQs</Link>
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
                  <Link to="/wishlist">
                  <img src="img/icon/heart.png" alt="" />
                </Link>
                <Link to="/shopping-cart">
                  <img src="img/icon/cart.png" alt="" /> <span>{itemCount}</span>
                </Link>
                <div className="price">{formatMoney(cart?.total ?? 0)}</div>
              </div>
            </div>
            <div className="canvas__open">
              <i className="fa fa-bars" />
            </div>
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
                  <h4>Shopping Cart</h4>
                  <div className="breadcrumb__links">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <span>Shopping Cart</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Breadcrumb Section End */}
       {/* Shopping Cart Section Begin */}
<section className="shopping-cart spad">
  <div className="container">
    {loading ? (
      <p>Loading cart…</p>
    ) : (
      <div className="row">
        <div className="col-lg-8">
          <div className="shopping__cart__table">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cart?.items.length ? (
                  cart.items.map((it) => (
                    <tr key={it.id}>
                      <td className="product__cart__item">
                        <div className="product__cart__item__pic">
                          <img
                            src={it.product.image || '/assets/img/shopping-cart/cart-1.jpg'}
                            alt={it.product.name}
                            style={{ width: 90, height: 90, objectFit: 'cover' }}
                          />
                        </div>
                        <div className="product__cart__item__text">
                          <h6>{it.product.name}</h6>
                          <h5>{formatMoney(it.unit_price)}</h5>
                        </div>
                      </td>

                      <td className="quantity__item">
                        <div className="quantity">
                          <div className="pro-qty-2">
                            <input
                              type="number"
                              min={0}
                              value={it.quantity}
                              onChange={(e) =>
                                onUpdateQty(it.id, Math.max(0, Number(e.target.value)))
                              }
                              className="qty-input"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="cart__price">
                        {formatMoney(Number(it.unit_price) * it.quantity)}
                      </td>

                      <td className="cart__close">
                        <a
                          href="#"
                          onClick={(e) => { e.preventDefault(); onRemoveItem(it.id); }}
                          className="text-danger"
                          title="Remove"
                        >
                          <i className="fa fa-close" />
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center' }}>
                      Keranjang kosong. <Link to="/shop">Belanja sekarang</Link>.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="continue__btn">
                <Link to="/shop">Continue Shopping</Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="continue__btn update__btn">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); loadCart(); }}
                >
                  <i className="fa fa-spinner" /> Refresh cart
                </a>
              
                {cart?.items.length ? (
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); onClearCart(); }}
                  >
                    Clear cart
                  </a>
                ) : null}
              </div>
            </div>

          </div>
        </div>
          <div className="col-lg-4">
            <div className="cart__discount">
            <h6>Discount codes</h6>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onApplyCoupon(e);
              }}
            >
              <input
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button type="submit" disabled={applying}>
                {applying ? 'Applying…' : 'Apply'}
              </button>
            </form>
            </div>

          <div className="cart__total">
            <h6>Cart total</h6>
            <ul>
              <li>Subtotal <span>{formatMoney(cart?.subtotal ?? 0)}</span></li>
              <li>Discount <span>{formatMoney(cart?.discount ?? 0)}</span></li>
              <li>Total <span>{formatMoney(cart?.total ?? 0)}</span></li>
            </ul>
            {cart?.items.length ? (
            <Link
            to="/checkout"
            state={{ cart }}
            className="primary-btn"
          >
          Proceed to checkout
          </Link>
          ) : null   
          }
          </div>
          </div>
        </div>
        )}
        </div>
        </section>     
        {/* Shopping Cart Section End */}
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
  
  export default ShoppingCart;
  