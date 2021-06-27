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
          {result}
        </li>
      ))}
    </ul>
  );
};

export default List;
