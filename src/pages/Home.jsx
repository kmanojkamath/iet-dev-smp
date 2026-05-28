import { Link } from "react-router-dom";
import items from "../data/items";
import { useState } from "react";
import { searchItems, countItems } from "../utils/searchItems";
import PurchaseButton from "../components/PurchaseButton";
import ItemCard from "../components/ItemCard";

const categories = [
  "Furniture",
  "Apparel",
  "Kitchen",
  "Electronics",
  "Outdoors",
  "Fitness",
];

function Home() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const visibleItems = searchItems(items, searchText, selectedCategory, selectedPrice);

  return (
    <main className="page home-page">
      <section className="home-hero">
        <div>
          <p className="hero-eyebrow">Curated marketplace</p>
          <h1 className="hero-title">
            Discover premium products that feel made for you.
          </h1>
          <p className="hero-copy">
            Shop everyday favorites across home, tech, fitness, and lifestyle.
            Every item is selected for quality, value, and real usefulness.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <div className="search-bar-wrapper">
        <div className="filter-row">
          <input
            className="search-bar"
            type="text"
            placeholder="Search products by name or category or description..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <div className="filter-controls">
            <label className="filter-field">
              <span>Category</span>
              <select
                className="filter-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label className="filter-field">
              <span>Price</span>
              <select
                className="filter-select"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                <option value="all">All prices</option>
                <option value="-20">Under ₹20</option>
                <option value="20-40">₹20 - ₹40</option>
                <option value="40-">Over ₹40</option>
              </select>
            </label>
          </div>
        </div>
        <div className="results-count">
          {countItems(items, searchText, selectedCategory, selectedPrice)} products found
        </div>
      </div>

      <section className="item-grid">
        {visibleItems.map((item) => (
          <ItemCard id={item.id} key={item.id} />
        ))}
      </section>
    </main>
  );
}

export default Home;
