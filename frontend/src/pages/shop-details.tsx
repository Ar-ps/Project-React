import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import axios, { AxiosError } from 'axios';

type ProductImage = { id: number; url: string; sort_order?: number };
const API_BASE = 'http://localhost:5000/api';

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  description?: string | null;
  rating: number;
  label?: string | null;
  category_id: number | null;
  images?: ProductImage[];
};

const formatMoney = (n: number | string | null | undefined) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
    .format(Number(n || 0));

const ShopDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const productId = Number(params.id);

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [qty, setQty] = useState(1);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Buat axios instance setiap render (header token terbaru)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const axiosAuth = useMemo(
    () =>
      axios.create({
        baseURL: API_BASE,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      }),
    [token]
  );

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setErr(null);

        // 1) Detail produk
        const { data: p } = await axios.get<Product>(`${API_BASE}/products/${productId}`);
        if (ignore) return;
        setProduct(p);

        // 2) Related (kategori sama, exclude dirinya)
        const { data: all } = await axios.get<Product[]>(`${API_BASE}/products`);
        if (ignore) return;
        const rel = all
          .filter(x => x.id !== p.id && x.category_id != null && x.category_id === p.category_id)
          .slice(0, 4);
        setRelated(rel);

        // Reset thumbnail index tiap ganti produk
        setActiveIdx(0);
      } catch (e: any) {
        setErr(e?.response?.data?.message || 'Gagal mengambil data produk.');
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    if (!Number.isNaN(productId)) fetchData();
    else {
      setErr('ID produk tidak valid.');
      setLoading(false);
    }

    return () => { ignore = true; };
  }, [productId]);

  // Array gambar untuk gallery
  const imageUrls = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) {
      return [...product.images]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.id - b.id)
        .map(im => im.url);
    }
    return [product.image].filter(Boolean);
  }, [product]);

  // Jaga-jaga kalau activeIdx out of range
  const safeActiveIdx = Math.min(Math.max(0, activeIdx), Math.max(0, imageUrls.length - 1));
  const heroImage = imageUrls[safeActiveIdx] ?? '/assets/img/placeholder.png';

  const renderStars = (n: number) => {
    const full = Math.max(0, Math.min(5, Math.round(n || 0)));
    const empty = 5 - full;
    return (
      <div className="rating" aria-label={`Rating ${full} dari 5`}>
        {Array.from({ length: full }).map((_, i) => <i key={`f-${i}`} className="fa fa-star" />)}
        {Array.from({ length: empty }).map((_, i) => <i key={`e-${i}`} className="fa fa-star-o" />)}
        <span> - {full} / 5</span>
      </div>
    );
  };

  const onAddToCart = async () => {
    if (!product) return;
    if (qty < 1) return;

    try {
      setAdding(true);

      const payload = {
        product_id: product.id, // snake_case
        productId: product.id,  // camelCase (biar kompatibel backend mana pun)
        quantity: qty,
      };

      await axiosAuth.post('/cart/items', payload);
      alert(`Berhasil menambahkan ${product.name} (${qty}x) ke cart.`);
      // Arahkan user ke cart? (opsional)
      // navigate('/shopping-cart');
    } catch (e) {
      const ax = e as AxiosError<any>;
      const status = ax.response?.status;
      if (status === 401) {
        alert('Silakan login terlebih dahulu.');
        navigate('/login');
      } else if (status === 404) {
        // 404 biasanya karena route tidak match — beri hint
        alert('Endpoint cart tidak ditemukan. Pastikan backend mount: app.use("/api/cart", cartRoutes) dan POST ke /api/cart/items.');
      } else {
        const msg = ax.response?.data?.message || ax.message || 'Gagal menambahkan ke cart.';
        alert(msg);
      }
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <div className="container py-5">Memuat detail produk…</div>;
  if (err) return <div className="container py-5 text-danger">{err}</div>;
  if (!product) return <div className="container py-5">Produk tidak ditemukan.</div>;

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
          <button className="btn p-0" aria-label="Search">
            <img src="/assets/img/icon/search.png" alt="" />
          </button>
          <Link to="/wishlist">
            <img src="/assets/img/icon/heart.png" alt="" />
          </Link>
          <Link to="/shopping-cart">
            <img src="/assets/img/icon/cart.png" alt="" /> <span>0</span>
          </Link>
          <div className="price">{formatMoney(product.price)}</div>
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
                <Link to="/">
                  <img src="/assets/img/logo.png" alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li className="active"><Link to="/shop">Shop</Link></li>
                  <li>
                    <Link to="/about">Pages</Link>
                    <ul className="dropdown">
                      <li><Link to="/about">About Us</Link></li>
                      <li><Link to="/shop-details">Shop Details</Link></li>
                      <li><Link to="/shopping-cart">Shopping Cart</Link></li>
                      <li><Link to="/checkout">Check Out</Link></li>
                      <li><Link to="/blog-details">Blog Details</Link></li>
                    </ul>
                  </li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/contact">Contacts</Link></li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="header__nav__option">
                <button className="btn p-0" aria-label="Search">
                  <img src="/assets/img/icon/search.png" alt="" />
                </button>
                <Link to="/wishlist">
                  <img src="/assets/img/icon/heart.png" alt="" />
                </Link>
                <Link to="/shopping-cart">
                  <img src="/assets/img/icon/cart.png" alt="" /> <span>0</span>
                </Link>
                <div className="price">{formatMoney(product.price)}</div>
              </div>
            </div>
          </div>
          <div className="canvas__open">
            <i className="fa fa-bars" />
          </div>
        </div>
      </header>
      {/* Header Section End */}

      {/* Shop Details Section Begin */}
      <section className="shop-details">
        <div className="product__details__pic">
          <div className="container">
            {/* Breadcrumb */}
            <div className="row">
              <div className="col-lg-12">
                <div className="product__details__breadcrumb">
                  <Link to="/">Home</Link>
                  <Link to="/shop">Shop</Link>
                  <span>{product.name}</span>
                </div>
              </div>
            </div>
            <div className="row">
              {/* Thumbnails */}
              <div className="col-lg-3 col-md-3">
                <ul className="nav nav-tabs" role="tablist">
                  {imageUrls.map((src, idx) => (
                    <li className="nav-item" key={`thumb-${idx}`}>
                      <button
                        type="button"
                        className={`nav-link ${idx === safeActiveIdx ? 'active' : ''}`}
                        onClick={() => setActiveIdx(idx)}
                        style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
                        aria-label={`Tampilkan gambar ${idx + 1}`}
                      >
                        <div
                          className="product__thumb__pic set-bg"
                          style={{
                            backgroundImage: `url(${src})`,
                            width: 90, height: 90, backgroundSize: 'cover',
                            borderRadius: 8, border: idx === safeActiveIdx ? '2px solid #333' : '1px solid #ddd'
                          }}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Gambar besar */}
              <div className="col-lg-6 col-md-9">
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="product__details__pic__item">
                      <img src={heroImage} alt={`${product.name} - ${safeActiveIdx + 1}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>{/* row */}
          </div>
        </div>

        {/* Konten detail */}
        <div className="product__details__content">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <div className="product__details__text">
                  <h4>{product.name}</h4>
                  {renderStars(product.rating)}
                  <h3>{formatMoney(product.price)}</h3>

                  <p>{product.description ?? 'Deskripsi belum tersedia.'}</p>

                  <div className="product__details__option">
                    <div className="product__details__option__size">
                      <span>Size:</span>
                      <label htmlFor="xxl">xxl<input type="radio" id="xxl" /></label>
                      <label className="active" htmlFor="xl">xl<input type="radio" id="xl" /></label>
                      <label htmlFor="l">l<input type="radio" id="l" /></label>
                      <label htmlFor="sm">s<input type="radio" id="sm" /></label>
                    </div>
                    <div className="product__details__option__color">
                      <span>Color:</span>
                      <label className="c-1" htmlFor="sp-1"><input type="radio" id="sp-1" /></label>
                      <label className="c-2" htmlFor="sp-2"><input type="radio" id="sp-2" /></label>
                      <label className="c-3" htmlFor="sp-3"><input type="radio" id="sp-3" /></label>
                      <label className="c-4" htmlFor="sp-4"><input type="radio" id="sp-4" /></label>
                      <label className="c-9" htmlFor="sp-9"><input type="radio" id="sp-9" /></label>
                    </div>
                  </div>

                  <div className="product__details__cart__option">
                    <div className="quantity">
                      <div className="pro-qty">
                        <input
                          type="number"
                          min={1}
                          value={qty}
                          onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="primary-btn"
                      disabled={adding}
                      onClick={onAddToCart}
                    >
                      {adding ? 'Adding…' : 'Add to cart'}
                    </button>
                  </div>

                  <div className="product__details__btns__option">
                    <button className="btn btn-link p-0">
                      <i className="fa fa-heart" /> add to wishlist
                    </button>
                    <button className="btn btn-link p-0">
                      <i className="fa fa-exchange" /> Add To Compare
                    </button>
                  </div>

                  <div className="product__details__last__option">
                    <h5><span>Guaranteed Safe Checkout</span></h5>
                    <img src="/assets/img/shop-details/details-payment.png" alt="" />
                    <ul>
                      <li><span>SKU:</span> 3812912</li>
                      <li><span>Categories:</span> Clothes</li>
                      <li><span>Tag:</span> Clothes, Skin, Body</li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>

            {/* Tabs deskripsi bisa diteruskan seperti template asli */}
          </div>
        </div>
      </section>
      {/* Shop Details Section End */}

      {/* Related Section Begin */}
      <section className="related spad">
        <div className="container">
          <div className="row"><div className="col-lg-12"><h3 className="related-title">Related Product</h3></div></div>
          <div className="row">
            {related.map(rp => (
              <div key={rp.id} className="col-lg-3 col-md-6 col-sm-6">
                <div className="product__item">
                  <div
                    className="product__item__pic set-bg"
                    style={{ backgroundImage: `url(${rp.image})` }}
                  >
                    {rp.label && <span className="label">{rp.label}</span>}
                    <ul className="product__hover">
                      <li><button className="btn p-0"><img src="/assets/img/icon/heart.png" alt="" /></button></li>
                      <li><button className="btn p-0"><img src="/assets/img/icon/compare.png" alt="" /> <span>Compare</span></button></li>
                      <li><Link to={`/shop-details/${rp.id}`}><img src="/assets/img/icon/search.png" alt="" /></Link></li>
                    </ul>
                  </div>
                  <div className="product__item__text">
                    <h6>{rp.name}</h6>
                    <Link to={`/shop-details/${rp.id}`} className="add-cart">View Details</Link>
                    <div className="rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <i key={i} className={i < rp.rating ? "fa fa-star" : "fa fa-star-o"} />
                      ))}
                    </div>
                    <h3>{formatMoney(rp.price)}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Related Section End */}

      {/* Footer, Search, dll — biarkan sesuai template */}
      <footer className="footer">{/* ... */}</footer>

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

export default ShopDetails;
