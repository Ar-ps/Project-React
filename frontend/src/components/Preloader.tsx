// src/components/Preloader.tsx
import { useEffect, useState } from "react";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi loading selesai (misalnya setelah 2 detik)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // ganti sesuai kebutuhan

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div id="preloder">
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;
