import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const DEPOSIT_PERCENT = 0.20; // Dennis: 20% deposit
const PAYPAL_EMAIL = "Jumaadventuresandsafaris@gmail.com";

export default function CartBox() {
  const { cart, removeFromCart, confirmBooking } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [lastBooking, setLastBooking] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [payType, setPayType] = useState<"full" | "partial">("partial");

  const total = cart.reduce((sum, i) => sum + Number(i.price) * (i.travelers || 1), 0);
  // 20% deposit, rounded
  const amountToPay = payType === "full" ? total : Math.round(total * DEPOSIT_PERCENT);
  const balance = total - amountToPay;

  // Only called AFTER PayPal payment is verified
  // In production, call this from PayPal onApprove / webhook, not from a button
  const handlePayPalSuccess = () => {
    const id = confirmBooking();
    if (id) setLastBooking(id);
    setShowPayment(false);
  };

  const message = encodeURIComponent(
    `Hello Juma Adventures! I want to enquire about:\n` +
    cart.map((i) => `- ${i.name} - $${i.price} x ${i.travelers || 1} travelers`).join("\n") +
    `\nTotal: $${total} | I want to pay: $${amountToPay} via PayPal | Balance: $${balance}`
  );

  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(PAYPAL_EMAIL)}&currency_code=USD&amount=${amountToPay}&item_name=${encodeURIComponent("Juma Adventures Booking - " + (payType === "full" ? "Full Payment" : "20% Deposit"))}`;

  return (
    <div className="container-page mt-3">
      <button onClick={() => setOpen(!open)} className="btn-primary !py-2 !px-4 text-sm">
        🛒 Cart ({cart.length}) - ${total} {open ? "▲" : "▼"}
      </button>

      {lastBooking && (
        <p className="mt-2 text-sm text-green-600 font-semibold">
          ✅ Booking Confirmed: {lastBooking} - Paid ${amountToPay} via PayPal {balance > 0 ? `• Balance $${balance} due before trip` : "• Paid in Full"}
        </p>
      )}

      {open && (
        <div className="mt-2 rounded-xl border bg-white p-4 shadow-lg">
          {cart.length === 0 ? (
            <div className="text-center text-sm py-3">
              <p className="font-semibold">Your cart is empty</p>
              <p className="text-muted-foreground mt-1">Browse packages and tap Add to Cart to book.</p>
              <a href="/packages" className="btn-primary inline-block mt-3 !py-2 !px-4 text-sm">Browse Packages</a>
            </div>
          ) : (
            <>
              {cart.map((i) => (
                <div key={i.id} className="flex justify-between py-1 text-sm">
                  <span>{i.name} - {i.travelers || 1} traveler(s)</span>
                  <span>
                    ${Number(i.price) * (i.travelers || 1)}
                    <button onClick={() => removeFromCart(i.id)} className="ml-2 text-red-500">✕</button>
                  </span>
                </div>
              ))}

              <div className="mt-3 flex justify-between border-t pt-2 font-bold text-sm">
                <span>Total</span><span>${total}</span>
              </div>

              {!showPayment ? (
                <div className="mt-3 flex gap-2">
                  <a href={`https://wa.me/254746011254?text=${message}`} target="_blank" className="btn-primary flex-1 text-center">
                    Enquire on WhatsApp
                  </a>
                  {/* FIX: This button now OPENS payment options, it does NOT confirm */}
                  <button onClick={() => setShowPayment(true)} className="btn-ghost">
                    Confirm Booking
                  </button>
                </div>
              ) : (
                <div className="mt-3 rounded-xl bg-muted/50 p-3">
                  <h4 className="font-bold text-sm">Confirm Booking — Choose Payment</h4>
                  <p className="text-xs text-muted-foreground mt-1">A booking is only confirmed after payment. Choose Full or 20% Deposit.</p>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button onClick={() => setPayType("full")} className={`rounded-xl border p-2 text-sm font-semibold ${payType === "full" ? "border-primary bg-primary text-white" : "bg-white"}`}>
                      Pay in Full<br />${total}
                    </button>
                    <button onClick={() => setPayType("partial")} className={`rounded-xl border p-2 text-sm font-semibold ${payType === "partial" ? "border-primary bg-primary text-white" : "bg-white"}`}>
                      Pay 20% Deposit<br />${amountToPay} <span className="block text-xs font-normal">Balance ${balance} due before trip</span>
                    </button>
                  </div>

                  <div className="mt-3 rounded-xl bg-white p-3 text-sm">
                    <p className="font-semibold">Pay with PayPal / Card</p>
                    <p className="mt-1 text-xs text-muted-foreground">Secure payment. You don't need a PayPal account. On PayPal page choose "Pay with Debit / Credit Card".</p>
                    <p className="mt-2">Amount to pay now: <b>${amountToPay}</b></p>
                    <a href={paypalUrl} target="_blank" rel="noreferrer" className="mt-2 block rounded-full bg-[#0070BA] py-2.5 text-center font-bold text-white">
                      Pay ${amountToPay} with PayPal / Card
                    </a>
                    <p className="mt-2 text-[11px] text-center text-muted-foreground">Your booking will be confirmed automatically after PayPal confirms payment. No payment = No confirmed booking.</p>
                  </div>

                  {/* REMOVED: "I Have Paid" fake button. No booking without real payment. */}
                  <button onClick={() => setShowPayment(false)} className="mt-2 w-full text-center text-sm underline">Back</button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
