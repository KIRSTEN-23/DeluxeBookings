import { Inbox, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AppButton from "./AppButton.jsx";
import "../../styles/ContentState.css";

/** Section/page feedback: icon, heading, explanation, then one useful action. */
export default function ContentState({
  icon: Icon = Inbox,
  heading,
  description,
  actionLabel,
  onAction,
  to,
  href,
  busy = false,
  error = false,
  framed = false,
  headingLevel: Heading = "h6",
}) {
  const StateIcon = busy ? LoaderCircle : Icon;
  return (
    <div className={`content-state${framed ? " content-state--framed" : ""}`} role={error ? "alert" : busy ? "status" : undefined} aria-busy={busy || undefined}>
      <StateIcon className="content-state__icon" size={40} aria-hidden="true" />
      <Heading className="content-state__heading">{heading}</Heading>
      <p className="content-state__description">{description}</p>
      <AppButton as={to ? Link : href ? "a" : "button"} to={to} href={href} onClick={onAction} loading={busy}>
        {actionLabel}
      </AppButton>
    </div>
  );
}
