import {
  MapPin,
  Users,
  Bed,
  Bath,
  Ruler,
  Wifi,
  Tv,
  Coffee,
  Dumbbell,
  Waves,
} from "lucide-react";

import "../../styles/components/listings/ListingItems.css";


export function ListingGallery({ images = [], title }) {
  if (!images.length) return null;

  const [coverImage, ...galleryImages] = images;

  return (
    <div className="listing-gallery">
      <img
        className="listing-gallery-main"
        src={coverImage.url}
        alt={coverImage.alt || title}
      />

      <div className="listing-gallery-stack">
        {galleryImages.slice(0, 4).map((image, index) => (
          <img
            key={image.url || index}
            src={image.url}
            alt={image.alt || `${title} gallery image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ListingTitle({ title, level = "h3" }) {
  if (!title) return null;

  const Heading = level;

  return <Heading className="listing-title">{title}</Heading>;
}

export function ListingTags({ tags = [] }) {
  if (!tags.length) return null;

  return (
    <div className="listing-tags">
      {tags.map((tag) => (
        <span key={tag} className="listing-tag">
          {tag}
        </span>
      ))}
    </div>
  );
}

export function ListingRating({ rating, reviewCount }) {
  if (!rating) return null;

  return (
    <span className="listing-rating">
      <Star size={18} />
      {rating}
      {reviewCount && (
        <span>({reviewCount} reviews)</span>
      )}
    </span>
  );
}

export function ListingPrice({ price, oldPrice }) {
  return (
    <div className="listing-price">
      <span>Starting From</span>
      <strong>ZAR {price}</strong>
      {oldPrice && <small>ZAR {oldPrice}</small>}
      <span>/night</span>
    </div>
  );
}

export function ListingStatus({ status }) {
  return <span className={`listing-status ${status}`}>{status}</span>;
}


export function ListingLocation({ location }) {
  if (!location) return null;

  return (
    <span className="listing-location">
      <MapPin size={18} />

      {location}
    </span>
  );
}

export function ListingHostInfo({
  hostName,
  hostAvatar,
  isVerified,
  responseTime,
  responseRate,
  yearsHosting,
}) {
  if (!hostName) return null;

  return (
    <section className="listing-host-card">
      <div className="listing-host-main">
        {hostAvatar && (
          <img
            src={hostAvatar}
            alt={hostName}
            className="listing-host-avatar"
          />
        )}

        <div>
          <h3 className="listing-host-name">{hostName}</h3>

          {isVerified && (
            <span className="listing-host-verified">
              Verified host
            </span>
          )}
        </div>
      </div>

      <div className="listing-host-stats">
        {responseTime && (
          <div>
            <strong>{responseTime}</strong>
            <span>Response time</span>
          </div>
        )}

        {responseRate && (
          <div>
            <strong>{responseRate}</strong>
            <span>Response rate</span>
          </div>
        )}

        {yearsHosting && (
          <div>
            <strong>{yearsHosting}</strong>
            <span>Years hosting</span>
          </div>
        )}
      </div>
    </section>
  );
}

export function ListingPropertyType({ propertyType }) {
  if (!propertyType) return null;

  return <span className="listing-property-type">{propertyType}</span>;
}

export function ListingFacts({ guests, bedrooms, bathrooms, size }) {
  return (
    <div className="listing-facts-row">
      <span>
        <Users size={18} /> {guests} guests
      </span>
      <span>
        <Bed size={18} /> {bedrooms} bedrooms
      </span>
      <span>
        <Bath size={18} /> {bathrooms} bathrooms
      </span>
      <span>
        <Ruler size={18} /> {size}m²
      </span>
    </div>
  );
}

export function ListingDescription({
  description,
  truncate = false,
  lines = 2,
}) {
  if (!description) return null;

  return (
    <p
      className={`listing-description ${
        truncate ? "listing-description-truncated" : ""
      }`}
      style={
        truncate
          ? {
              WebkitLineClamp: lines,
            }
          : undefined
      }
    >
      {description}
    </p>
  );
}

export function ListingAmenities({ amenities = [] }) {
  return (
    <div className="listing-amenity-row">
      {amenities.map((amenity) => (
        <span key={amenity} className="listing-chip">
          {amenity}
        </span>
      ))}
    </div>
  );
}

export function ListingHouseRules({
  rules = [],
}) {
  if (!rules.length) return null;

  return (
    <ul className="listing-house-rules">
      {rules.map((rule) => (
        <li key={rule}>
          {rule}
        </li>
      ))}
    </ul>
  );
}
