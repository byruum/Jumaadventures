import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

export default function CartBox() {
  const { cart, removeFromCart, confirmBooking } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [lastBooking, setLastBooking] = useState<string | null>(null);

  if (cart.length === 0 && !lastBooking) return null;

  const total = cart.reduce((sum, i) => sum + Number(i.price) * i.travelers, 0);

  const handleConfirm = () => {
    const id = confirmBooking();
    if (id) setLastBooking(id);
  };

  const message = encodeURIComponent(
    `Hello Juma Adventures! I want to book:\n` +
    cart.map((i) => `- ${i.name} - $${i.price} x ${i.travelers} travelers`).join("\n") +
    `\nTotal: $${total}`
  );

  return (
    <div className="container-page mt-3">
      <button onClick={() => setOpen(!open)} className="btn-primary !py-2 !px-4 text-sm">
        🛒 Cart ({cart.length}) - ${total} {open ? "▲" : "▼"}
      </button>

      {lastBooking && (
        <p className="mt-2 text-sm text-green-600 font-semibold">
          ✅ Booking Confirmed: {lastBooking}
        </p>
      )}

      {open && cart.length > 0 && (
        <div className="mt-2 rounded-xl border bg-white p-4 shadow-lg">
          {cart.map((i) => (
            <div key={i.id} className="flex justify-between py-1 text-sm">
              <span>{i.name} - {i.travelers} traveler(s)</span>
              <span>
                ${i.price}
                <button onClick={() => removeFromCart(i.id)} className="ml-2 text-red-500">✕</button>
              </span>
            </div>
          ))}
          <div className="mt-3 flex gap-2">
            <a href={`https://wa.me/254746011254?text=${message}`} target="_blank" className="btn-primary flex-1 text-center">
              Book on WhatsApp
            </a>
            <button onClick={handleConfirm} className="btn-ghost">Confirm Booking</button>
          </div>
        </div>
      )}
    </div>
  );
}
