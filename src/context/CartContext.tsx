import { createContext, useState, useEffect, ReactNode } from 'react'

export type CartItem = { id:number; name:string; price:string; travelers:number; date:string }
export type Booking = { bookingId:string; items:CartItem[]; status:string; date:string }

export const CartContext = createContext<any>(null)

export function CartProvider({ children }: {children: ReactNode}) {
  const [cart, setCart] = useState<CartItem[]>(()=> JSON.parse(localStorage.getItem('juma_cart')||'[]'))
  const [bookings, setBookings] = useState<Booking[]>(()=> JSON.parse(localStorage.getItem('juma_bookings')||'[]'))

  useEffect(()=> localStorage.setItem('juma_cart', JSON.stringify(cart)), [cart])
  useEffect(()=> localStorage.setItem('juma_bookings', JSON.stringify(bookings)), [bookings])

  const addToCart = (item:any) => setCart((p:any)=> [...p, {id:Date.now(), travelers:1, date:'', ...item}])
  const removeFromCart = (id:number) => setCart((p:any)=> p.filter((i:any)=>i.id!==id))
  const confirmBooking = () => {
    const b:Booking = { bookingId:'JUMA-'+Date.now(), items:cart, status:'Confirmed', date:new Date().toISOString() }
    setBookings(p=>[b, ...p]); setCart([]); return b.bookingId
  }
  return <CartContext.Provider value={{cart, bookings, addToCart, removeFromCart, confirmBooking}}>{children}</CartContext.Provider>
}
