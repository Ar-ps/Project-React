import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

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
  images?: ProductImage[]; // Gambar-gambar dari product_images
};


const ShopDetails = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [qty, setQty] = useState(1);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);


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
        setActiveIdx(0);

        // 2) Related (dari kategori yang sama, exclude dirinya)
        const { data: all } = await axios.get<Product[]>(`${API_BASE}/products`);
        if (ignore) return;
        const rel = all
          .filter(x => x.id !== p.id && x.category_id != null && x.category_id === p.category_id)
          .slice(0, 4);
        setRelated(rel);
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

  // Susun array URL gambar: pakai product.images; fallback ke product.image
  const imageUrls = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) {
      return [...product.images]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.id - b.id)
        .map(im => im.url);  // Memastikan gambar diambil berdasarkan urutan
    }
    return [product.image]; // Menggunakan gambar utama jika tidak ada gambar tambahan
  }, [product]);

  const renderStars = (n: number) => {
    const full = Math.max(0, Math.min(5, Math.round(n)));
    const empty = 5 - full;
    return (
      <div className="rating">
        {Array.from({ length: full }).map((_, i) => <i key={`f-${i}`} className="fa fa-star" />)}
        {Array.from({ length: empty }).map((_, i) => <i key={`e-${i}`} className="fa fa-star-o" />)}
        <span> - {full} / 5</span>
      </div>
    );
  };

  const price = !isNaN(Number(product?.price))
  ? Number(product?.price).toFixed(2)
  : '0.00'; // Default if price is not a valid number


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
                  <a href="./inex.html">
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
                        className={`nav-link ${idx === activeIdx ? 'active' : ''}`}
                        onClick={() => setActiveIdx(idx)}
                        style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer' }}
                    >
                    <div
                        className="product__thumb__pic set-bg"
                        style={{
                            backgroundImage: `url(${src})`,
                            width: 90, height: 90, backgroundSize: 'cover',
                            borderRadius: 8, border: idx === activeIdx ? '2px solid #333' : '1px solid #ddd'
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
                        <img src={imageUrls[activeIdx]} alt={`${product.name} - ${activeIdx + 1}`} />
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
                    <h3>${Number(product.price).toFixed(2)}</h3>

                    <p>{product.description ?? 'Deskripsi belum tersedia.'}</p>
                    {/* Opsi contoh (statis). Kalau punya size/color di DB, tinggal render dari API */}
                    <div className="rating">
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star-o" />
                      <span> - 5 Reviews</span>
                    </div>
                    <p>
                      Coat with quilted lining and an adjustable hood. Featuring long
                      sleeves with adjustable cuff tabs, adjustable asymmetric hem
                      with elastic side tabs and a front zip fastening with placket.
                    </p>
                    <div className="product__details__option">
                      <div className="product__details__option__size">
                        <span>Size:</span>
                        <label htmlFor="xxl">
                          xxl
                          <input type="radio" id="xxl" />
                        </label>
                        <label className="active" htmlFor="xl">
                          xl
                          <input type="radio" id="xl" />
                        </label>
                        <label htmlFor="l">
                          l
                          <input type="radio" id="l" />
                        </label>
                        <label htmlFor="sm">
                          s
                          <input type="radio" id="sm" />
                        </label>
                      </div>
                      <div className="product__details__option__color">
                        <span>Color:</span>
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
                        <label className="c-9" htmlFor="sp-9">
                          <input type="radio" id="sp-9" />
                        </label>
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
                      <a href="#" className="primary-btn">
                        add to cart
                      </a>
                    </div>
                    <div className="product__details__btns__option">
                      <a href="#">
                        <i className="fa fa-heart" /> add to wishlist
                      </a>
                      <a href="#">
                        <i className="fa fa-exchange" /> Add To Compare
                      </a>
                    </div>
                    <div className="product__details__last__option">
                      <h5>
                        <span>Guaranteed Safe Checkout</span>
                      </h5>
                      <img src="img/shop-details/details-payment.png" alt="" />
                      <ul>
                        <li>
                          <span>SKU:</span> 3812912
                        </li>
                        <li>
                          <span>Categories:</span> Clothes
                        </li>
                        <li>
                          <span>Tag:</span> Clothes, Skin, Body
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="product__details__tab">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#tabs-5"
                          role="tab"
                        >
                          Description
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#tabs-6"
                          role="tab"
                        >
                          Customer Previews(5)
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#tabs-7"
                          role="tab"
                        >
                          Additional information
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane active" id="tabs-5" role="tabpanel">
                        <div className="product__details__tab__content">
                          <p className="note">
                            Nam tempus turpis at metus scelerisque placerat nulla
                            deumantos solicitud felis. Pellentesque diam dolor,
                            elementum etos lobortis des mollis ut risus. Sedcus
                            faucibus an sullamcorper mattis drostique des commodo
                            pharetras loremos.
                          </p>
                          <div className="product__details__tab__content__item">
                            <h5>Products Infomation</h5>
                            <p>
                              A Pocket PC is a handheld computer, which features many
                              of the same capabilities as a modern PC. These handy
                              little devices allow individuals to retrieve and store
                              e-mail messages, create a contact file, coordinate
                              appointments, surf the internet, exchange text messages
                              and more. Every product that is labeled as a Pocket PC
                              must be accompanied with specific software to operate
                              the unit and must feature a touchscreen and touchpad.
                            </p>
                            <p>
                              As is the case with any new technology product, the cost
                              of a Pocket PC was substantial during it’s early
                              release. For approximately $700.00, consumers could
                              purchase one of top-of-the-line Pocket PCs in 2003.
                              These days, customers are finding that prices have
                              become much more reasonable now that the newness is
                              wearing off. For approximately $350.00, a new Pocket PC
                              can now be purchased.
                            </p>
                          </div>
                          <div className="product__details__tab__content__item">
                            <h5>Material used</h5>
                            <p>
                              Polyester is deemed lower quality due to its none
                              natural quality’s. Made from synthetic materials, not
                              natural like wool. Polyester suits become creased easily
                              and are known for not being breathable. Polyester suits
                              tend to have a shine to them compared to wool and cotton
                              suits, this can make the suit look cheap. The texture of
                              velvet is luxurious and breathable. Velvet is a great
                              choice for dinner party jacket and can be worn all year
                              round.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane" id="tabs-6" role="tabpanel">
                        <div className="product__details__tab__content">
                          <div className="product__details__tab__content__item">
                            <h5>Products Infomation</h5>
                            <p>
                              A Pocket PC is a handheld computer, which features many
                              of the same capabilities as a modern PC. These handy
                              little devices allow individuals to retrieve and store
                              e-mail messages, create a contact file, coordinate
                              appointments, surf the internet, exchange text messages
                              and more. Every product that is labeled as a Pocket PC
                              must be accompanied with specific software to operate
                              the unit and must feature a touchscreen and touchpad.
                            </p>
                            <p>
                              As is the case with any new technology product, the cost
                              of a Pocket PC was substantial during it’s early
                              release. For approximately $700.00, consumers could
                              purchase one of top-of-the-line Pocket PCs in 2003.
                              These days, customers are finding that prices have
                              become much more reasonable now that the newness is
                              wearing off. For approximately $350.00, a new Pocket PC
                              can now be purchased.
                            </p>
                          </div>
                          <div className="product__details__tab__content__item">
                            <h5>Material used</h5>
                            <p>
                              Polyester is deemed lower quality due to its none
                              natural quality’s. Made from synthetic materials, not
                              natural like wool. Polyester suits become creased easily
                              and are known for not being breathable. Polyester suits
                              tend to have a shine to them compared to wool and cotton
                              suits, this can make the suit look cheap. The texture of
                              velvet is luxurious and breathable. Velvet is a great
                              choice for dinner party jacket and can be worn all year
                              round.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane" id="tabs-7" role="tabpanel">
                        <div className="product__details__tab__content">
                          <p className="note">
                            Nam tempus turpis at metus scelerisque placerat nulla
                            deumantos solicitud felis. Pellentesque diam dolor,
                            elementum etos lobortis des mollis ut risus. Sedcus
                            faucibus an sullamcorper mattis drostique des commodo
                            pharetras loremos.
                          </p>
                          <div className="product__details__tab__content__item">
                            <h5>Products Infomation</h5>
                            <p>
                              A Pocket PC is a handheld computer, which features many
                              of the same capabilities as a modern PC. These handy
                              little devices allow individuals to retrieve and store
                              e-mail messages, create a contact file, coordinate
                              appointments, surf the internet, exchange text messages
                              and more. Every product that is labeled as a Pocket PC
                              must be accompanied with specific software to operate
                              the unit and must feature a touchscreen and touchpad.
                            </p>
                            <p>
                              As is the case with any new technology product, the cost
                              of a Pocket PC was substantial during it’s early
                              release. For approximately $700.00, consumers could
                              purchase one of top-of-the-line Pocket PCs in 2003.
                              These days, customers are finding that prices have
                              become much more reasonable now that the newness is
                              wearing off. For approximately $350.00, a new Pocket PC
                              can now be purchased.
                            </p>
                          </div>
                          <div className="product__details__tab__content__item">
                            <h5>Material used</h5>
                            <p>
                              Polyester is deemed lower quality due to its none
                              natural quality’s. Made from synthetic materials, not
                              natural like wool. Polyester suits become creased easily
                              and are known for not being breathable. Polyester suits
                              tend to have a shine to them compared to wool and cotton
                              suits, this can make the suit look cheap. The texture of
                              velvet is luxurious and breathable. Velvet is a great
                              choice for dinner party jacket and can be worn all year
                              round.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Shop Details Section End */}
        {/* Related Section Begin */}
        <section className="related spad">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h3 className="related-title">Related Product</h3>
        </div>
      </div>
      <div className="row">
        {related.map(product => (
          <div
            key={product.id}
            className="col-lg-3 col-md-6 col-sm-6"
          >
            <div className="product__item">
              <div
                className="product__item__pic set-bg"
                style={{ backgroundImage: `url(${product.image})` }}
              >
                {product.label && <span className="label">{product.label}</span>}
                <ul className="product__hover">
                  <li>
                    <a href="#"><img src="img/icon/heart.png" alt="" /></a>
                  </li>
                  <li>
                    <a href="#"><img src="img/icon/compare.png" alt="" /> <span>Compare</span></a>
                  </li>
                  <li>
                    <a href="#"><img src="img/icon/search.png" alt="" /></a>
                  </li>
                </ul>
              </div>
              <div className="product__item__text">
                <h6>{product.name}</h6>
                <a href="#" className="add-cart">+ Add To Cart</a>
                <div className="rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i key={i} className={i < product.rating ? "fa fa-star" : "fa fa-star-o"} />
                  ))}
                </div>
                <h3>${price}</h3>
                </div>
            </div>
          </div>
          ))}
          </div>
          </div>
        </section>
        {/* Related Section End */}
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
  
  export default ShopDetails;
  