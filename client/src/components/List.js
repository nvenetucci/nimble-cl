import React, { useState, useEffect } from "react";

const List = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("/api/cars/bmw");
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, []);

  return (
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
  );
};

export default List;
