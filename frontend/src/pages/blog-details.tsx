import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;        // bisa URL backend atau path relatif
  createdAt: string;
  updatedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  // Normalisasi & fallback image
  const resolveImage = (img?: string) => {
    // fallback
    if (!img || img.trim() === '') return '/assets/img/default.jpg';

    // ubah backslash -> slash
    const clean = img.replace(/\\/g, '/');

    // jika sudah absolute (http/https/data)
    if (/^https?:\/\//i.test(clean) || /^data:image\//i.test(clean)) return clean;

    // jika mulai dengan /assets atau /img, anggap dari public
    if (clean.startsWith('/assets') || clean.startsWith('/img')) return clean;

    // jika mulai dengan assets atau img (tanpa slash), tambahkan slash
    if (clean.startsWith('assets') || clean.startsWith('img')) return `/${clean}`;

    // jika path relatif dari backend (mis. uploads/xxx.jpg), build pakai API_URL
    return `${API_URL}/${clean}`;
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Blog>(`${API_URL}/api/blogs/${id}`);
        const data = res.data;
        // simpan setelah normalisasi image (opsional)
        setBlog({
          ...data,
          image: data?.image ? data.image.replace(/\\/g, '/') : '',
        });
      } catch (e) {
        console.error('Gagal mengambil detail blog:', e);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

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
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/shop">Shop</Link></li>
                  <li>
                    <Link to="/about">Pages</Link>
                    <ul className="dropdown">
                      <li><Link to="/about">About Us</Link></li>
                      <li><Link to="/shop-details">Shop Details</Link></li>
                      <li><Link to="/shopping-cart">Shopping Cart</Link></li>
                      <li><Link to="/checkout">Check Out</Link></li>
                      <li><Link to={`/blog-details`}>Blog Details</Link></li>
                    </ul>
                  </li>
                  <li className="active"><Link to="/blog">Blog</Link></li>
                  <li><Link to="/contact">Contacts</Link></li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="header__nav__option">
                <a href="#" className="search-switch"><img src="img/icon/search.png" alt="" /></a>
                <a href="#"><img src="img/icon/heart.png" alt="" /></a>
                <a href="#"><img src="img/icon/cart.png" alt="" /> <span>0</span></a>
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

      {/* Blog Details Hero Begin */}
      <section className="blog-hero spad">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-9 text-center">
              <div className="blog__hero__text">
                <h2>
                  {loading ? 'Loading...' : (blog?.title || 'Judul tidak ditemukan')}
                </h2>
                <ul>
                  <li>By Admin</li>
                  <li>
                    {blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-GB') : ''}
                  </li>
                  <li>&nbsp;</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Details Hero End */}

      {/* Blog Details Section Begin */}
      <section className="blog-details spad">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-12">
              <div className="blog__details__pic">
                {/* Tetap pakai markup asli, hanya src yang dibuat dinamis */}
                <img
                  src={resolveImage(blog?.image)}
                  alt={blog?.title || 'blog image'}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="blog__details__content">
                <div className="blog__details__share">
                  <span>share</span>
                  <ul>
                    <li><a href="#"><i className="fa fa-facebook" /></a></li>
                    <li><a href="#" className="twitter"><i className="fa fa-twitter" /></a></li>
                    <li><a href="#" className="youtube"><i className="fa fa-youtube-play" /></a></li>
                    <li><a href="#" className="linkedin"><i className="fa fa-linkedin" /></a></li>
                  </ul>
                </div>

                <div className="blog__details__text">
                  {loading ? (
                    <p>Loading content...</p>
                  ) : blog?.content ? (
                    <div
                      // jika konten HTML dari backend
                      dangerouslySetInnerHTML={{ __html: blog.content }}
                      // agar media di dalam content tidak “meledak” keluar kolom
                      style={{ overflowWrap: 'break-word' }}
                    />
                  ) : (
                    <p>Tidak ada konten.</p>
                  )}
                </div>

                {/* Sisanya biarkan sesuai template asli */}
                <div className="blog__details__quote">
                  <i className="fa fa-quote-left" />
                  <p>
                    “When designing an advertisement for a particular product many
                    things should be researched like where it should be displayed.”
                  </p>
                  <h6>_ John Smith _</h6>
                </div>

                <div className="blog__details__text">
                  <p>
                    Vyo-Serum along with tightening the skin also reduces the fine lines indicating aging of skin...
                  </p>
                  <p>
                    Hydroderm is a multi-functional product that helps in reducing the cellulite...
                  </p>
                </div>

                <div className="blog__details__option">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="blog__details__author">
                        <div className="blog__details__author__pic">
                          <img src="img/blog/details/blog-author.jpg" alt="" />
                        </div>
                        <div className="blog__details__author__text">
                          <h5>Aiden Blair</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <div className="blog__details__tags">
                        <a href="#">#Fashion</a>
                        <a href="#">#Trending</a>
                        <a href="#">#2020</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="blog__details__btns">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <a href="" className="blog__details__btns__item">
                        <p><span className="arrow_left" /> Previous Pod</p>
                        <h5>It S Classified How To Utilize Free Classified Ad Sites</h5>
                      </a>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                      <a href="" className="blog__details__btns__item blog__details__btns__item--next">
                        <p>Next Pod <span className="arrow_right" /></p>
                        <h5>Tips For Choosing The Perfect Gloss For Your Lips</h5>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="blog__details__comment">
                  <h4>Leave A Comment</h4>
                  <form action="#">
                    <div className="row">
                      <div className="col-lg-4 col-md-4">
                        <input type="text" placeholder="Name" />
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <input type="text" placeholder="Email" />
                      </div>
                      <div className="col-lg-4 col-md-4">
                        <input type="text" placeholder="Phone" />
                      </div>
                      <div className="col-lg-12 text-center">
                        <textarea placeholder="Comment" defaultValue={''} />
                        <button type="submit" className="site-btn">Post Comment</button>
                      </div>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Details Section End */}

      {/* Footer Section Begin */}
      <footer className="footer">
        <div className="container">
          {/* ... sisakan persis seperti template-mu ... */}
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
    </>
  );
};

export default BlogDetails;
