import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../redux/campersSlice";
import CamperCard from "../components/CamperCard/CamperCard";
import Filters from "../components/Filters/Filters";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import "./Catalog.css";

const ITEMS_PER_PAGE = 8;

const Catalog = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.campers);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [filters, setFilters] = useState(null);

  useEffect(() => {
    dispatch(fetchCampers(filters || {}));
  }, [dispatch, filters]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const filteredCampers = Array.isArray(list)
    ? list.filter((camper) => {
        return (
          (!filters?.location ||
            camper.location
              .toLowerCase()
              .includes(filters.location.toLowerCase())) &&
          (!filters?.type || camper.form === filters.type) &&
          (!filters?.features ||
            filters.features.every((f) =>
              f === "transmission"
                ? camper.transmission === "automatic"
                : camper[f] === true
            ))
        );
      })
    : [];

  const visibleCampers = filteredCampers.slice(0, visibleCount);

  return (
    <div className="catalog-wrapper">
      <div className="catalog-container">
        <Filters onSearch={handleSearch} />
        <div className="camper-list">
          {status === "loading" && <LoadingSpinner />}
          {status === "failed" && <p>Error: {error}</p>}

          {status === "succeeded" && filteredCampers.length === 0 && (
            <p className="no-results-message">
              No campers found matching the selected filters.
            </p>
          )}

          {status === "succeeded" &&
            visibleCampers.map((camper) => (
              <CamperCard key={camper.id} camper={camper} />
            ))}

          {status === "succeeded" && visibleCount < filteredCampers.length && (
            <button onClick={handleLoadMore} className="load-more">
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
