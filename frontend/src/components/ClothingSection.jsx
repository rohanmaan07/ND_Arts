import React from "react";
import HomeSectionCar from "./HomeSectionCar";
import ClothCards from "./ClothCards";

function ClothingSection({ sections }) {
  if (!sections || sections.length === 0) return <div>No sections to display</div>;

  return (
    <div className="clothing-section">
      {sections.map(({ sectionName, products }) => (
        <ClothCards key={sectionName} sectionName={sectionName} data={products} />
      ))}
    </div>
  );
}

export default ClothingSection;
