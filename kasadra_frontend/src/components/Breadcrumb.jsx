import { Link } from "react-router-dom";
import "../styles/components/Breadcrumb.css"; // CSS file

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb-container">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {item.path ? (
            <Link to={item.path} className="breadcrumb-link">
              {item.label}
            </Link>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="breadcrumb-separator"> &gt; </span>
          )}
        </span>
      ))}
    </nav>
  );
}
