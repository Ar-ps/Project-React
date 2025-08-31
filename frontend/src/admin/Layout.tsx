import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white h-screen shadow-md fixed">
        <div className="p-4 font-bold text-lg border-b">Male-Fashion Admin</div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link to="/admin" className="block p-2 hover:bg-gray-200 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className="block p-2 hover:bg-gray-200 rounded">
                Products
              </Link>
            </li>
            <li>
              <Link to="/admin/blogs" className="block p-2 hover:bg-gray-200 rounded">
                Blogs
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
