import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Loader } from "../Pages/Loader";
import ClothingCardd from "./ClothingCardd";

function ClothCards({ data, sectionName }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && data.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="px-4 lg:px-8">
      <h2 className="text-2xl font-extrabold text-[#DCE3E9] mb-3">{sectionName}</h2>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

  {data.map((product) => (
    <ClothingCardd key={product._id} product={product} />
  ))}
</div>

    </div>
  );
}

export default ClothCards;
