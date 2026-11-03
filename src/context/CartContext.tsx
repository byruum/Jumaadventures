import { createContext, useState, useEffect, type ReactNode } from 'react'

export type CartItem = { id:number; name:string; price:string; travelers:number; date:string }
export type Booking = { bookingId:string; items:CartItem[]; status:string; date:string }

type CartCtx = {
  cart: CartItem[]
  bookings: Booking[]
  addToCart: (item: {name:string; price:string}) => void
  removeFromCart: (id:number) => void
  confirmBooking: () => string | undefined
}

export const CartContext = createContext<CartCtx>({
  cart: [], bookings: [], addToCart: ()=>{}, removeFromCart: ()=>{}, confirmBooking: ()=>undefined
})

export function CartProvider({ children }: {children: ReactNode}) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])

  // Load only on client
  useEffect(()=>{
    try {
      const c = localStorage.getItem('juma_cart')
      const b = localStorage.getItem('juma_bookings')
      if(c) setCart(JSON.parse(c))
      if(b) setBookings(JSON.parse(b))
    } catch {}
  }, [])

  useEffect(()=> { try{ localStorage.setItem('juma_cart', JSON.stringify(cart)) }catch{} }, [cart])
  useEffect(()=> { try{ localStorage.setItem('juma_bookings', JSON.stringify(bookings)) }catch{} }, [bookings])

  const addToCart = (item:{name:string; price:string}) => {
    setCart((p)=> [...p, {id:Date.now(), travelers:1, date:'', ...item}])
  }
  const removeFromCart = (id:number) => setCart((p)=> p.filter((i)=>i.id!==id))
  const confirmBooking = () => {
    if(cart.length===0) return
    const b:Booking = { bookingId:'JUMA-'+Date.now(), items:cart, status:'Confirmed', date:new Date().toISOString() }
    setBookings(p=>[b, ...p]); setCart([]); return b.bookingId
  }
  return <CartContext.Provider value={{cart, bookings, addToCart, removeFromCart, confirmBooking}}>{children}</CartContext.Provider>
}
