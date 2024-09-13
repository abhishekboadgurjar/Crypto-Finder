import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CryptoFinder = () => {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);
  const [filteredCrypto, setFilteredCrypto] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: {
          vs_currency: "inr",
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      })
      .then((res) => {
        setCrypto(res.data);
        setFilteredCrypto(res.data);
      });
  }, []);

  const handleSearch = () => {
    const filteredData = crypto.filter((data) => {
      return data.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredCrypto(filteredData);
  };

  if (crypto.length === 0) {
    return (
      <div className="loader-box">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="crypto-finder">
      <div className="input-box">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search for a cryptocurrency"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="cards">
        {filteredCrypto.map((val, id) => (
          <div className="card" key={id}>
            <img src={val.image} alt={val.name} />
            <h1>{val.name}</h1>
            <h4>{val.symbol.toUpperCase()}</h4>
            <h4>₹{val.current_price.toFixed(2)}</h4>
            <Link to={`/details/${val.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoFinder;
