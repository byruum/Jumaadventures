import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'

export default function CartBox(){
  const { cart, bookings, removeFromCart, confirmBooking } = useContext(CartContext)
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<'cart'|'history'>('cart')

  return (
    <div className="fixed top-20 right-4 z-[9999]">
      <button onClick={()=>setOpen(!open)} className="bg-green-700 text-white px-5 py-3 rounded-full shadow-lg font-bold text-sm">
        🧳 Cart ({cart.length})
      </button>
      {open && (
        <div className="mt-3 w-[360px] max-w-[90vw] bg-white rounded-2xl shadow-2xl p-5 border text-black">
          <div className="flex gap-2 mb-4">
            <button onClick={()=>setTab('cart')} className={`px-3 py-1 rounded-full text-sm ${tab==='cart'?'bg-green-700 text-white':'bg-gray-100'}`}>My Cart</button>
            <button onClick={()=>setTab('history')} className={`px-3 py-1 rounded-full text-sm ${tab==='history'?'bg-green-700 text-white':'bg-gray-100'}`}>History</button>
            <button onClick={()=>setOpen(false)} className="ml-auto text-gray-500">✕</button>
          </div>
          {tab==='cart' ? <>
            {cart.length===0?<p className="text-gray-500 text-sm">No trips yet.</p>:cart.map((i:any)=>
              <div key={i.id} className="flex justify-between border-b py-3"><div><p className="font-bold text-sm">{i.name}</p><p className="text-xs text-gray-500">{i.price}</p></div><button onClick={()=>removeFromCart(i.id)} className="text-red-500 text-xs">Remove</button></div>
            )}
            {cart.length>0 && <button onClick={()=>{const id=confirmBooking(); alert('Booking Confirmed '+id); setTab('history')}} className="w-full mt-4 bg-green-700 text-white py-3 rounded-xl font-bold">Confirm Booking</button>}
          </> : <>
            {bookings.length===0?<p className="text-gray-500 text-sm">No bookings yet</p>:bookings.map((b:any)=><div key={b.bookingId} className="border p-3 rounded-xl mb-2"><p className="font-bold text-sm">{b.bookingId}</p><p className="text-xs">{b.items.map((x:any)=>x.name).join(', ')}</p></div>)}
          </>}
        </div>
      )}
    </div>
  )
}
