import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const MPESA_NUMBER = "0746 011 254";
const DEPOSIT_PERCENT = 0.30;
const PAYPAL_EMAIL = "Jumaadventuresandsafaris@gmail.com";

export default function CartBox() {
  const { cart, removeFromCart, confirmBooking } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [lastBooking, setLastBooking] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [payType, setPayType] = useState<"full" | "partial">("full");
  const [payMethod, setPayMethod] = useState<"mpesa" | "paypal">("paypal");
  const [mpesaCode, setMpesaCode] = useState("");

  const total = cart.reduce((sum, i) => sum + Number(i.price) * (i.travelers || 1), 0);
  const amountToPay = payType === "full" ? total : Math.round(total * DEPOSIT_PERCENT);
  const balance = total - amountToPay;

  const handleConfirm = () => {
    const id = confirmBooking();
    if (id) setLastBooking(id);
    setShowPayment(false);
  };

  const message = encodeURIComponent(
    `Hello Juma Adventures! I want to book:\n` +
    cart.map((i) => `- ${i.name} - $${i.price} x ${i.travelers || 1} travelers`).join("\n") +
    `\nTotal: $${total}`
  );

  const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(PAYPAL_EMAIL)}&currency_code=USD&amount=${amountToPay}&item_name=${encodeURIComponent("Juma Adventures Booking")}`;

  return (
    <div className="container-page mt-3">
      <button onClick={() => setOpen(!open)} className="btn-primary !py-2 !px-4 text-sm">
        🛒 Cart ({cart.length}) - ${total} {open ? "▲" : "▼"}
      </button>

      {lastBooking && (
        <p className="mt-2 text-sm text-green-600 font-semibold">
          ✅ Booking Confirmed: {lastBooking} - Paid ${amountToPay} via {payMethod === "mpesa" ? `M-PESA (${mpesaCode})` : "PayPal"} {balance > 0 ? `• Balance $${balance}` : ""}
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
                    Book on WhatsApp
                  </a>
                  <button onClick={() => setShowPayment(true)} className="btn-ghost">Confirm Booking</button>
                </div>
              ) : (
                <div className="mt-3 rounded-xl bg-muted/50 p-3">
                  <h4 className="font-bold text-sm">Choose Payment Method</h4>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button onClick={() => setPayType("full")} className={`rounded-xl border p-2 text-sm font-semibold ${payType === "full" ? "border-primary bg-primary text-white" : "bg-white"}`}>
                      Pay in Full<br />${total}
                    </button>
                    <button onClick={() => setPayType("partial")} className={`rounded-xl border p-2 text-sm font-semibold ${payType === "partial" ? "border-primary bg-primary text-white" : "bg-white"}`}>
                      Reserve with 30% Deposit<br />${amountToPay} <span className="block text-xs font-normal">Balance ${balance} due before trip</span>
                    </button>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button onClick={() => setPayMethod("mpesa")} className={`rounded-xl border p-2 text-sm font-semibold ${payMethod === "mpesa" ? "border-green-600 bg-green-600 text-white" : "bg-white"}`}>M-PESA</button>
                    <button onClick={() => setPayMethod("paypal")} className={`rounded-xl border p-2 text-sm font-semibold ${payMethod === "paypal" ? "border-primary bg-primary text-white" : "bg-white"}`}>PayPal / Card</button>
                  </div>

                  {payMethod === "mpesa" ? (
                    <div className="mt-3 rounded-xl bg-white p-3 text-sm">
                      <p className="font-semibold">M-PESA Secure Payment</p>
                      <p className="mt-1 text-xs text-muted-foreground">Fast, secure payment via M-PESA to Juma Adventures & Safaris.</p>
                      <div className="mt-3 space-y-1 rounded-lg bg-green-50 p-3">
                        <p>Recipient: <b>Juma Adventures & Safaris</b></p>
                        <p>Number: <b>{MPESA_NUMBER}</b></p>
                        <p>Amount: <b>${amountToPay}</b></p>
                      </div>
                      <p className="mt-2 text-xs">1. Open M-PESA on your phone<br />2. Complete payment to the number above<br />3. Enter your M-PESA confirmation code below</p>
                      <input value={mpesaCode} onChange={(e) => setMpesaCode(e.target.value)} placeholder="Enter M-PESA confirmation code e.g. QK123ABCDEF" className="mt-2 w-full rounded-lg border px-3 py-2" />
                    </div>
                  ) : (
                    <div className="mt-3 rounded-xl bg-white p-3 text-sm">
                      <p className="font-semibold">Pay with PayPal / Card</p>
                      <p className="mt-1 text-xs text-muted-foreground">Secure international payment. You don't need a PayPal account. On PayPal page choose "Pay with Debit / Credit Card".</p>
                      <p className="mt-2">Amount: <b>${amountToPay}</b></p>
                      <a href={paypalUrl} target="_blank" rel="noreferrer" className="mt-2 block rounded-full bg-[#0070BA] py-2.5 text-center font-bold text-white">
                        Pay ${amountToPay} with PayPal / Card
                      </a>
                      <p className="mt-1 text-[11px] text-center">After paying, come back and tap "I Have Paid" below.</p>
                    </div>
                  )}

                  <button
                    disabled={payMethod === "mpesa" && mpesaCode.trim().length < 5}
                    onClick={handleConfirm}
                    className="btn-primary mt-3 w-full disabled:opacity-50"
                  >
                    I Have Paid ${amountToPay} - Confirm Booking
                  </button>
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
