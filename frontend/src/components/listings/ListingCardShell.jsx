import "../../styles/ListingCards.css";

export default function ListingCardShell({
  variant = "default",
  selected = false,
  image,
  imageAlt = "Listing image",
  badge,
  children,
  actions,
}) {
  return (
    <article
      className={`listing-card-shell listing-card-shell--${variant} ${
        selected ? "is-selected" : ""
      }`}
    >
      <div className="listing-card-shell__image-wrap">
        {badge && <div className="listing-card-shell__badge">{badge}</div>}

        <img
          className="listing-card-shell__image"
          src={image}
          alt={imageAlt}
        />
      </div>

      <div className="listing-card-shell__body">
        <div className="listing-card-shell__content">
          {children}
        </div>

        {actions && (
          <div className="listing-card-shell__actions">
            {actions}
          </div>
        )}
      </div>
    </article>
  );
}