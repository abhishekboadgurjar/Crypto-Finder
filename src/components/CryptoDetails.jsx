import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CryptoDetails = () => {
  const { id } = useParams();
  const [cryptoDetails, setCryptoDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`, {
        params: {
          localization: false,
        },
      })
      .then((res) => {
        setCryptoDetails(res.data);
      });
  }, [id]);

  if (!cryptoDetails) {
    return (
      <div className="loader-box">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="crypto-details">
      <div className="basic-details-image-box">
        <div className="basic-details">
          <h1>{cryptoDetails.name}</h1>
          <h4>{cryptoDetails.symbol.toUpperCase()}</h4>
          <h4>
            Current Price: ₹
            {cryptoDetails.market_data.current_price.inr.toFixed(2)}
          </h4>
        </div>
        <div className="image-box">
          <img src={cryptoDetails.image.large} alt={cryptoDetails.name} />
        </div>
      </div>
      <div className="detail-desc">
      <h3>Description :</h3>
      <p >{cryptoDetails.description.en}</p>
      </div>


  <div className="market-and-additional">
  <div className="market-data">
        <h2>Market Data</h2>
        <p>
          <b>Market Cap: </b>₹
          {cryptoDetails.market_data.market_cap.inr.toLocaleString()}
        </p>
        <p>
          <b>Total Volume: </b>₹
          {cryptoDetails.market_data.total_volume.inr.toLocaleString()}
        </p>
        <p><b>24h High:</b> ₹{cryptoDetails.market_data.high_24h.inr}</p>
        <p><b>24h Low:</b> ₹{cryptoDetails.market_data.low_24h.inr}</p>
        <p>
         <b> Price Change (24h):</b> ₹
          {cryptoDetails.market_data.price_change_24h.toFixed(2)}
        </p>
        <p>
          <b>Price Change Percentage (24h):</b>{" "}
          {cryptoDetails.market_data.price_change_percentage_24h.toFixed(2)}%
        </p>
      </div>

      <div className="additional-info">
        <h2>Additional Information</h2>
        <p><b>Genesis Date:</b> {cryptoDetails.genesis_date || "N/A"}</p>
        <p>
          <b>Homepage:</b>{" "}
          <a
            href={cryptoDetails.links.homepage[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cryptoDetails.links.homepage[0]}
          </a>
        </p>
        <p>
         <b> Blockchain Site:</b>{" "}
          <a
            href={cryptoDetails.links.blockchain_site[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cryptoDetails.links.blockchain_site[0]}
          </a>
        </p>
      </div>
  </div>
    </div>
  );
};

export default CryptoDetails;
