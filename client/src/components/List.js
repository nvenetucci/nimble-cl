import React, { useState, useEffect } from "react";
import CategoryDropdown from "./CategoryDropdown";
import VehicleDropdown from "./VehicleDropdown";

const List = () => {
  const [category, setCategory] = useState("cto");
  const [make, setMake] = useState("bmw");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/${category}/${make}`);
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, [category, make]);

  return (
    <>
      <CategoryDropdown
        category={category}
        changeCategory={(value) => setCategory(value)}
      />

      <VehicleDropdown make={make} changeMake={(value) => setMake(value)} />

      {/* List Results */}
      <ul className="rows">
        {results.map((result, index) => (
          <li className="result-row" key={index}>
            <div className="result-info">
              <time className="result-time">{result.time}</time>
              <h1 className="result-heading">
                <a className="result-link" href={result.link}>
                  {result.title}
                </a>
              </h1>
              <span className="result-meta">
                <span className="result-price">{result.price}</span>
                <span className="result-location">{result.location}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
