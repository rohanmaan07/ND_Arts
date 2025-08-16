import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import Card from "./Card";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button } from "@mui/material";
import { Loader } from "../Pages/Loader";

function HomeSectionCar({ data, sectionName }) {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    if (data && data.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [data]);

  const items = data.map((product) => <Card key={product._id} product={product} />);

  const responsive = {
    0: { items: 1 },
    720: { items: 2 },
    1024: { items: 4 },
  };

  const handlePrev = () => carouselRef.current?.slidePrev();
  const handleNext = () => carouselRef.current?.slideNext();
  const handleSlideChange = ({ item }) => setActiveIndex(item);

  const visibleItems = responsive[1024].items;
  const lastVisibleIndex = items.length - visibleItems;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="px-4 lg:px-8">
      <h2 className="text-2xl font-extrabold text-[#DCE3E9] mb-3">{sectionName}</h2>
      <div className="relative p-5">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          responsive={responsive}
          disableButtonsControls
          disableDotsControls
          mouseTracking
          onSlideChanged={handleSlideChange}
        />

        {/* Left Button */}
        {activeIndex > 0 && (
          <Button
            onClick={handlePrev}
            variant="contained"
            sx={{
              position: "absolute",
              top: "8rem",
              left: 0,
              bgcolor: "white",
              minWidth: "40px",
              height: "40px",
              borderRadius: "50%",
              boxShadow: 3,
              zIndex: 10,
            }}
          >
            <KeyboardArrowLeftIcon sx={{ color: "black" }} />
          </Button>
        )}

        {/* Right Button or View All Button */}
        {activeIndex < lastVisibleIndex ? (
          <Button
            onClick={handleNext}
            variant="contained"
            sx={{
              position: "absolute",
              top: "8rem",
              right: 0,
              bgcolor: "white",
              minWidth: "40px",
              height: "40px",
              borderRadius: "50%",
              boxShadow: 3,
              zIndex: 10,
            }}
          >
            <KeyboardArrowRightIcon sx={{ color: "black" }} />
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/clothing")}
            variant="contained"
            sx={{
              position: "absolute",
              top: "8rem",
              right: 0,
              bgcolor: "#1976d2",
              color: "white",
              minWidth: "100px",
              height: "40px",
              borderRadius: "20px",
              boxShadow: 3,
              zIndex: 10,
            }}
          >
            View All
          </Button>
        )}
      </div>
    </div>
  );
}

export default HomeSectionCar;
