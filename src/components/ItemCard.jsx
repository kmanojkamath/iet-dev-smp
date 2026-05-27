import { Link, useParams } from "react-router-dom";
import items from "../data/items";
import PurchaseButton from "./PurchaseButton";
import RatingWidget from "./RatingWidget";

const ItemCard = ({ id }) => {
  const item = items.find((item) => item.id === Number(id));

  return (
    <article className="item-card">
      <Link to={`/item/${item.id}`} className="item-card-image-link">
        <div className="item-card-image">
          <img src={item.image} alt={item.name}></img>
          <span className="item-card-label">{item.category}</span>
        </div>
      </Link>
      <div className="item-card-body">
        <Link to={`/item/${item.id}`} className="item-name">
          {item.name}
        </Link>
        <p className="item-desc">{item.description}</p>
      </div>
      <div className="item-card-footer">
        <div>
          <span className="item-price">₹{item.price}</span>
          <span className="item-meta">Free Delivery</span>
        </div>
        <div className="item-card-actions">
          <PurchaseButton item={item} />
          <RatingWidget />
        </div>
      </div>
    </article>
  );
};

export default ItemCard;
