import { useEffect, useRef, useState } from 'react'
import './App.css'
import { IoPrintOutline } from 'react-icons/io5'
import { MdDownload } from 'react-icons/md'
import { LuView } from 'react-icons/lu'

function App() {
  const [orderdata, setOrderData] = useState([])
  const [hidden, setHidden] = useState(false)
  const clieckref = useRef(null)

  useEffect(() => {
    fetch('orders/orderDetials.json')
      .then(res => res.json())
      .then(data => setOrderData(data.orders))
  }, [])

  const hendleClickOutSite = (e) => {
    if (clieckref.current.contains(e.target) === false) {
      setHidden(false)
    }
  }



  return (
    <>
      <section className='relative'>
        <section className='w-[80%] mx-auto'>
          <h1>Resturent Order Table</h1>

          <table className='border P-5 w-full border-gray-300'>
            <thead className='' >
              <tr className='bg-[#e9e8e8]'>
                <th className='border p-2'>Order Id</th>
                <th className='border p-2'>Customer Name</th>
                <th className='border p-2'>Customer Phone</th>
                <th className='border p-2'>Customer Address</th>
                <th className='border p-2'>Orders Item</th>
                <th className='border p-2'>Total Payable</th>
                <th className='border p-2'>Stutus</th>
                <th className='border p-2'></th>
                <th className='border p-2'></th>
                <th className='border p-2'></th>
              </tr>
            </thead>
            <tbody>
              {orderdata.map((order) => {
                order?.item?.map((itm) => setOrderItem(itm))
                return (
                  <tr>
                    <td className='border p-2'>{order.order_id}</td>
                    <td className='border p-2'>{order.customer.name}</td>
                    <td className='border p-2'>{order.customer.phone}</td>
                    <td className='border p-2'>{order.customer.address}</td>
                    <td className='border p-2'>{order.items.map((itm, idx) => (
                      <span key={idx}>
                        {itm.name}{idx !== order.items.length - 1 && ', '}
                      </span>
                    ))}</td>
                    <td className='border p-2'>{order.total_price}</td>
                    <td className='border p-2'>{order.order_status}</td>
                    <td className='border p-2'><button onClick={() => setHidden(true)} className='text-2xl text-center'><LuView /></button></td>
                    <td className='border p-2'><button className='text-2xl text-center'><IoPrintOutline /></button></td>
                    <td className='border p-2'><button className='text-2xl text-center'><MdDownload /></button></td>
                  </tr>
                )
              }
              )}
            </tbody>
          </table>

        </section>
        <section onClick={hendleClickOutSite} className={`bg-gray-300/50 w-screen h-screen absolute top-0 ${!hidden && 'hidden'}`}>

          <div ref={clieckref} className='w-[1748px] hidden-[2480px] bg-white shadow mx-auto flex justify-center items-center p-10 my-10'>

            {/*All Data  */}
            <div className='w-full'>
              <h3 className="text-3xl font-bold text-center underline">Invoice</h3>
              <div className='flex items-center justify-between'>
                <div className='flex gap-3'>
                  <div className='text-right'>
                    <h2 className='text-2xl font-semibold'>Resturent Name: </h2>
                    <p className='text-xl font-semibold'>Address:</p>
                    <p className='text-xl font-semibold'>Phone:</p>
                  </div>
                  <div>
                    <h2 className='text-2xl '>Resturent Name: </h2>
                    <p className='text-xl '>Address:</p>
                    <p className='text-xl '>Phone:</p>
                  </div>
                </div>
                <div className='text-left flex gap-3'>
                  <div className='text-right'>
                    <h2 className='text-2xl font-semibold'>Customer Name: </h2>
                    <p className='text-xl font-semibold'>Phone:</p>
                    <p className='text-xl font-semibold'>Email:</p>
                    <p className='text-xl font-semibold'>Address:</p>
                  </div>
                  <div>
                    <h2 className='text-2xl'>Customer Name: </h2>
                    <p className='text-xl'>Phone:</p>
                    <p className='text-xl'>Email:</p>
                    <p className='text-xl'>Address:</p>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center bg-green-500 inline-block px-2">Stuts:</h3>

              <div>
                
                <table className='w-full mt-5'>
                  <thead>
                    <tr className='bg-gray-300'>
                      <th className='w-[10%] py-2 border-white border-2'>item_id</th>
                      <th className='w-[40%] py-2 border-white border-2'>item name</th>
                      <th className='w-[10%] py-2 border-white border-2'>Quantity</th>
                      <th className='w-[20%] py-2 border-white border-2'>unit_price</th>
                      <th className='w-[20%] py-2 border-white border-2'>total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='w-[10%] py-2 border-white border-2'>item_id</td>
                      <td className='w-[40%] py-2 border-white border-2'>item name</td>
                      <td className='w-[10%] py-2 border-white border-2'>Quantity</td>
                      <td className='w-[20%] py-2 border-white border-2'>unit_price</td>
                      <td className='w-[20%] py-2 border-white border-2'>total</td>
                    </tr>
                  </tbody>
                </table>

              </div>



            </div>

          </div>

        </section>
      </section>

    </>
  )
}

export default App
