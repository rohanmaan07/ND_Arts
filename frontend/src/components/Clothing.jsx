import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../Pages/Loader";
import ClothingSection from "./ClothingSection";
import { API_BASE_URL } from "../Config/apiConfig";

function Clothing() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
    .get(`${API_BASE_URL}/api/products/clothing`)
      .then((res) => {
        const products = res.data || [];
        // console.log("Products fetched:", products);

        // Group by thirdLevelCategory instead of category id
        const groups = products.reduce((acc, product) => {
          const category = product.thirdLevelCategory || "Others";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});

        const groupedSections = Object.entries(groups).map(([sectionName, products]) => ({
          sectionName,
          products,
        }));

        // console.log("Grouped sections:", groupedSections);
        setSections(groupedSections);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="py-20 px-5 lg:px-10">
      {sections.length === 0 && <p>No products found</p>}
      <ClothingSection sections={sections} />
    </div>
  );
}

export default Clothing;
