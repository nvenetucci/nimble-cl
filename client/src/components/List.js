import React, { useState, useEffect } from "react";
import CategoryDropdown from "./CategoryDropdown";

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

      {/* Vehicle Make Dropdown Menu */}
      <select value={make} onChange={(e) => setMake(e.target.value)}>
        <option value="alfa">Alfa Romeo</option>
        <option value="bmw">BMW</option>
        <option value="honda">Honda</option>
        <option value="infiniti">Infiniti</option>
        <option value="lexus">Lexus</option>
        <option value="mazda">Mazda</option>
        <option value="mercedes">Mercedes-Benz</option>
        <option value="nissan">Nissan</option>
        <option value="toyota">Toyota</option>
      </select>

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
