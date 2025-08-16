import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeCarousel from "../components/HomeCarousel";
import HomeSectionCar from "../components/HomeSectionCar";
import { Loader } from "./Loader";
import { API_BASE_URL } from "../Config/apiConfig";

function HomePage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/products/homepage`) // 🔁 API call
      .then((res) => {
        setSections(res.data); // 👈 This contains sectionName + products
      })
      .catch((err) => {
        console.error("Error fetching homepage data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader/>;
  }

  return (
    <div>
      <HomeCarousel />
      <div className="space-y-10 py-20 flex-col justify-center px-5 lg:px-10">
        {sections.map((section, index) => (
          <HomeSectionCar
            key={index}
            data={section.products} // ✅ from API
            sectionName={section.sectionName}
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
