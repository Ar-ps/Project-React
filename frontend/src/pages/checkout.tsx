// src/pages/checkout.tsx
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

type CartItem = {
  id: number;         // cart_items.id
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

const formatMoney = (n: number | string | null | undefined) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(Number(n || 0));

const Checkout = () => {
  const location = useLocation() as { state?: { cart?: CartResponse } };
  const initialCartFromState = location.state?.cart;

  const [cart, setCart] = useState<CartResponse | null>(initialCartFromState ?? null);
  const [loading, setLoading] = useState(!initialCartFromState);
  const [placing, setPlacing] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Billing form (contoh sederhana; bisa kamu jadikan controlled form sesuai kebutuhan)
  const [billing, setBilling] = useState({
    firstName: '',
    lastName: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    notes: '',
    payment: 'cod', // contoh: 'cod' / 'paypal'
  });

  useEffect(() => {
    // Kalau tidak ada state cart, ambil dari backend
    const load = async () => {
      try {
        setLoading(true);
        setErr(null);
        const { data } = await axiosAuth.get<CartResponse>('/cart');
        setCart(data);
      } catch (e: any) {
        setErr(e?.response?.data?.message || e?.message || 'Gagal memuat cart.');
      } finally {
        setLoading(false);
      }
    };
    if (!initialCartFromState) load();
  }, [initialCartFromState]);

  const itemCount = useMemo(
    () => cart?.items.reduce((a, it) => a + it.quantity, 0) ?? 0,
    [cart]
  );

  const handleChange =
    (key: keyof typeof billing) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setBilling((s) => ({ ...s, [key]: e.target.value }));

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart || !cart.items.length) return;

    try {
      setPlacing(true);
      setSuccessMsg(null);
      setErr(null);

      // Kirim ke endpoint checkout kamu (menyesuaikan backend)
      // Misal: /api/cart/checkout menerima { notes, payment, ... }
      const payload = {
        notes: billing.notes,
        payment: billing.payment,
        // Opsional: sertakan informasi billing jika backend butuh
        billing,
      };

      const { data } = await axiosAuth.post<{ orderId: number; total: number }>(
        '/cart/checkout',
        payload
      );

      // Di sini TIDAK pakai alert; tampilkan pesan sukses inline
      setSuccessMsg(`Order berhasil dibuat. Order ID: ${data.orderId}.`);
      // Jika backend membuat cart baru kosong, ambil ulang cart:
      const { data: freshCart } = await axiosAuth.get<CartResponse>('/cart');
      setCart(freshCart);
    } catch (e: any) {
      setErr(e?.response?.data?.message || e?.message || 'Gagal membuat order.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <>
      {/* Offcanvas / Header dibiarkan seperti aslinya */}
      <div className="offcanvas-menu-overlay" />
      <div className="offcanvas-menu-wrapper">
        <div className="offcanvas__option">
          <div className="offcanvas__links">
            <a href="#">Sign in</a>
            <a href="#">FAQs</a>
          </div>
          <div className="offcanvas__top__hover">
            <span>Usd <i className="arrow_carrot-down" /></span>
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
          <a href="#"><img src="img/icon/heart.png" alt="" /></a>
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

      <header className="header">
        {/* ... header original kamu ... */}
      </header>

      {/* Breadcrumb */}
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

      {/* Checkout */}
      <section className="checkout spad">
        <div className="container">
          {loading ? (
            <p>Memuat cart…</p>
          ) : err ? (
            <p className="text-danger">{err}</p>
          ) : (
            <div className="checkout__form">
              <form onSubmit={placeOrder}>
                <div className="row">
                  {/* Billing form */}
                  <div className="col-lg-8 col-md-6">
                    <h6 className="coupon__code">
                      <span className="icon_tag_alt" /> Have a coupon?{' '}
                      <a href="#">Click here</a> to enter your code
                    </h6>
                    <h6 className="checkout__title">Billing Details</h6>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>First Name<span>*</span></p>
                          <input type="text" value={billing.firstName} onChange={handleChange('firstName')} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>Last Name<span>*</span></p>
                          <input type="text" value={billing.lastName} onChange={handleChange('lastName')} />
                        </div>
                      </div>
                    </div>

                    <div className="checkout__input">
                      <p>Country<span>*</span></p>
                      <input type="text" value={billing.country} onChange={handleChange('country')} />
                    </div>

                    <div className="checkout__input">
                      <p>Address<span>*</span></p>
                      <input
                        type="text"
                        placeholder="Street Address"
                        className="checkout__input__add"
                        value={billing.address1}
                        onChange={handleChange('address1')}
                      />
                      <input
                        type="text"
                        placeholder="Apartment, suite, unit (optional)"
                        value={billing.address2}
                        onChange={handleChange('address2')}
                      />
                    </div>

                    <div className="checkout__input">
                      <p>Town/City<span>*</span></p>
                      <input type="text" value={billing.city} onChange={handleChange('city')} />
                    </div>

                    <div className="checkout__input">
                      <p>Country/State<span>*</span></p>
                      <input type="text" value={billing.state} onChange={handleChange('state')} />
                    </div>

                    <div className="checkout__input">
                      <p>Postcode / ZIP<span>*</span></p>
                      <input type="text" value={billing.zip} onChange={handleChange('zip')} />
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>Phone<span>*</span></p>
                          <input type="text" value={billing.phone} onChange={handleChange('phone')} />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>Email<span>*</span></p>
                          <input type="text" value={billing.email} onChange={handleChange('email')} />
                        </div>
                      </div>
                    </div>

                    {/* Notes tanpa checkbox */}
                    <div className="checkout__input">
                      <p>Order notes</p>
                      <input
                        type="text"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        value={billing.notes}
                        onChange={handleChange('notes')}
                      />
                    </div>
                  </div>

                  {/* Ringkasan / tabel order */}
                  <div className="col-lg-4 col-md-6">
                    <div className="checkout__order">
                      <h4 className="order__title">Your order</h4>
                      <div className="checkout__order__products">
                        Product <span>Total</span>
                      </div>

                      {/* TABEL ITEM CART */}
                      <ul className="checkout__total__products" style={{ maxHeight: 280, overflowY: 'auto' }}>
                        {cart?.items.map((it, idx) => (
                          <li key={it.id}>
                            {String(idx + 1).padStart(2, '0')}. {it.product.name} x {it.quantity}
                            <span>{formatMoney(it.unit_price * it.quantity)}</span>
                          </li>
                        ))}
                      </ul>

                      {/* TOTALS */}
                      <ul className="checkout__total__all">
                        <li>Subtotal <span>{formatMoney(cart?.subtotal ?? 0)}</span></li>
                        <li>Discount <span>{formatMoney(cart?.discount ?? 0)}</span></li>
                        <li>Total <span>{formatMoney(cart?.total ?? 0)}</span></li>
                      </ul>

                      {/* Metode pembayaran (contoh sederhana) */}
                      <div className="checkout__input__checkbox">
                        <label htmlFor="payment-cod">
                          Cash on Delivery
                          <input
                            type="radio"
                            id="payment-cod"
                            name="payment"
                            checked={billing.payment === 'cod'}
                            onChange={() => setBilling((s) => ({ ...s, payment: 'cod' }))}
                          />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="checkout__input__checkbox">
                        <label htmlFor="payment-paypal">
                          Paypal
                          <input
                            type="radio"
                            id="payment-paypal"
                            name="payment"
                            checked={billing.payment === 'paypal'}
                            onChange={() => setBilling((s) => ({ ...s, payment: 'paypal' }))}
                          />
                          <span className="checkmark" />
                        </label>
                      </div>

                      <button type="submit" className="site-btn" disabled={!cart?.items.length || placing}>
                        {placing ? 'PLACING…' : 'PLACE ORDER'}
                      </button>

                      {successMsg && <p className="mt-3 text-success">{successMsg}</p>}
                      {err && <p className="mt-3 text-danger">{err}</p>}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        {/* ... footer original kamu ... */}
      </footer>

      {/* Search */}
      <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="search-close-switch">+</div>
          <form className="search-model-form">
            <input type="text" id="search-input" placeholder="Search here....." />
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
