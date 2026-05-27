import { Link, useParams } from "react-router-dom";
import items from "../data/items";
import PurchaseButton from "../components/PurchaseButton";
import RatingWidget from "../components/RatingWidget";

function ItemPage() {
  const { id } = useParams();

  const item = items.find((item) => item.id === Number(id));

  if (!item) {
    return <div className="page empty-state">Item not found.</div>;
  }

  return (
    <main className="page detail-page">
      <Link to="/" className="back-link">
        ← Back to shop
      </Link>

      <div className="detail-card">
        <div className="detail-header">
          <div>
            <span className="item-card-label">{item.category}</span>
            <h1 className="detail-name">{item.name}</h1>
            <p className="detail-desc">{item.description}</p>
          </div>

          <div className="detail-price">₹{item.price}</div>
        </div>

        <hr className="detail-divider" />

        <div className="detail-actions">
          <div className="detail-action-group">
            <PurchaseButton />
            <RatingWidget />
          </div>
          <span className="item-meta">Fast shipping · 30-day returns</span>
        </div>
      </div>
    </main>
  );
}

export default ItemPage;
