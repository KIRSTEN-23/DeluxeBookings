export function errorMessage(error, fallback = "Something went wrong. Please try again.") {
  const data = error.response?.data;
  if (typeof data === "string" && data.length < 300 && !data.includes("<")) return data;
  return data?.error || data?.message || fallback;
}
