import { MapPinOff } from "lucide-react";
import ContentState from "../../components/common/ContentState.jsx";

export default function NotFound() {
  return <main className="container py-4"><ContentState framed icon={MapPinOff} heading="Page not found" headingLevel="h1" description="This address doesn’t lead to a page. Return home to find your way around Deluxe Bookings." actionLabel="Return home" to="/" /></main>;
}
