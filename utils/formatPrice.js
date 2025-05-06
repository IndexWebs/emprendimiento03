export function formatPrice(value) {
  if (typeof value !== "number") value = Number(value);
  if (isNaN(value)) return "$0";
  return value.toLocaleString("es-CO");
} 