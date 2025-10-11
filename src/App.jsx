import { useEffect, useRef, useState } from 'react'
import './App.css'
import { IoPrintOutline } from 'react-icons/io5'
import { MdDownload } from 'react-icons/md'
import { LuView } from 'react-icons/lu'
import jsPDF from 'jspdf'
import html2canvas from "html2canvas";

function App() {
  const [orderdata, setOrderData] = useState([])
  const [hidden, setHidden] = useState(false)
  const clieckref = useRef(null)
  const [orderDetails, setOrderDetails] = useState([])

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

  const henldeViewInvoice = (Id) => {
    setHidden(true)
    const OrderDatabyID = orderdata.find(id => id.order_id === Id)

    setOrderDetails(OrderDatabyID);

  }

  const hendlePrintPage = (Id) => {
    const dataByID = orderdata.find(o => o.order_id === Id);
    setOrderDetails(dataByID);
    setTimeout(() => window.print(), 100);
  };


  const handleDownload = async() => {
    
  };


  return (
    <>
      <section className='relative'>
        <section className='w-[80%] mx-auto print:hidden'>
          <h1>Resturent Order Table</h1>

          <table className='border P-5 w-full border-gray-300'>
            <thead className='' >
              <tr className='bg-[#e9e8e8]'>
                <th className='border p-2'>S/N</th>
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
              {orderdata.map((order, idx) => {
                order?.item?.map((itm) => setOrderItem(itm))
                return (
                  <tr key={idx}>
                    <td className='border p-2 text-center'>{idx + 1}</td>
                    <td className='border p-2 text-center'>{order.order_id}</td>
                    <td className='border p-2'>{order.customer.name}</td>
                    <td className='border p-2'>{order.customer.phone}</td>
                    <td className='border p-2'>{order.customer.address}</td>
                    <td className='border p-2'>{order.items.map((itm, idx) => (
                      <span key={idx}>
                        {itm.name}{idx !== order.items.length - 1 && ', '}
                      </span>
                    ))}</td>
                    <td className='border p-2 text-right'>{order.total_price} /-</td>
                    <td className='border p-2'>{order.order_status}</td>
                    <td className='border p-2'><button onClick={() => henldeViewInvoice(order.order_id)} className='text-2xl text-center'><LuView /></button></td>
                    <td className='border p-2'><button onClick={() => hendlePrintPage(order.order_id)} className='text-2xl text-center'><IoPrintOutline /></button></td>
                    <td className='border p-2'><button onClick={handleDownload} className='text-2xl text-center'><MdDownload /></button></td>
                  </tr>
                )
              }
              )}
            </tbody>
          </table>

        </section>
        <section onClick={hendleClickOutSite} className={`bg-gray-300/50 w-screen h-screen fixed overflow-y-auto no-scrollbar print:overflow-visible print:static print:bg-white top-0 ${!hidden && 'hidden'} print:block`}>

          <div id='print-area' ref={clieckref} className='w-[80%] print:w-full hidden-[2480px] bg-white shadow mx-auto flex justify-center items-center p-10 my-10 print:block print:shadow-none  print:min-h-0 print:m-0 print:p-0
             print:rounded-none print:border-0'>

            {/*All Data  */}
            <div className='w-full'>
              <h3 className="text-3xl font-bold text-center underline print:text-amber-500">Invoice</h3>
              <div className='flex items-center justify-between'>
                <div className='flex gap-3'>
                  <div className='text-right'>
                    <h2 className='text-2xl font-semibold'>Resturent Name: </h2>
                    <p className='text-xl font-semibold'>Address:</p>
                    <p className='text-xl font-semibold'>Phone:</p>
                  </div>
                  <div>
                    <h2 className='text-2xl '>{orderDetails?.restaurant?.name}</h2>
                    <p className='text-xl '>{orderDetails?.restaurant?.address}</p>
                    <p className='text-xl '>{orderDetails?.restaurant?.phone}</p>
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
                    <h2 className='text-2xl'>{orderDetails?.customer?.name}</h2>
                    <p className='text-xl'>{orderDetails?.customer?.phone}</p>
                    <p className='text-xl'>{orderDetails?.customer?.email}</p>
                    <p className='text-xl'>{orderDetails?.customer?.address}</p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col'>
                <h3 className="font-bold bg-green-500 inline-block px-2 w-fit">Stuts: {orderDetails.order_status}</h3>
                <h3 className="font-bold px-2">Order ID: {orderDetails.order_id}</h3>
              </div>

              <div>
                <table className='w-full mt-5 print:break-inside-auto'>
                  <thead className="print:table-header-group">
                    <tr className='bg-gray-300 border print:bg-amber-500'>
                      <th className='w-[10%] py-2 border-2'>item_id</th>
                      <th className='w-[40%] py-2 border-2'>item name</th>
                      <th className='w-[10%] py-2 border-2'>Quantity</th>
                      <th className='w-[20%] py-2 border-2'>unit_price</th>
                      <th className='w-[20%] py-2 border-2'>total</th>
                    </tr>
                  </thead>
                  <tbody className="print:table-row-group">
                    {
                      orderDetails?.items?.map((itm) =>
                        <tr>
                          <td className='w-[10%] py-2 border-white border-2'>{itm.item_id}</td>
                          <td className='w-[40%] py-2 border-white border-2'>{itm.name}</td>
                          <td className='w-[10%] py-2 border-white border-2'>{itm.quantity}</td>
                          <td className='w-[20%] py-2 border-white border-2'>{itm.unit_price}/-</td>
                          <td className='w-[20%] py-2 border-white border-2'>{itm.total}/-</td>
                        </tr>
                      )
                    }
                    <tr>
                      <td colSpan="3" rowSpan="3" className='w-[10%] py-2 border-white border-2'>
                        <p className='font-bold'>Payment Method: <span className='text-xl font-semibold text-red-400'>{orderDetails.payment_method}</span></p>
                        <p className='font-bold'>Delivary Person: <span className='font-normal'>{orderDetails?.delivery_person?.name}</span>, Phone: <span className='font-normal'>{orderDetails?.delivery_person?.phone}</span></p>
                        <p className='font-bold'>Order Date: <span className='font-normal'>{orderDetails.ordered_at}</span></p>
                        <p className='font-bold'>Delivary Date: <span className='font-normal'>{orderDetails.delivered_at}</span></p>

                      </td>
                      <td className='w-[20%] py-2 border-white border-2 text-right px-3 bg-gray-100 font-bold uppercase'>Sub Total: </td>
                      <td className='w-[20%] py-2 border-white border-2 text-right px-3 text-xl font-semibold'>{orderDetails.subtotal}</td>
                    </tr>
                    <tr>
                      <td className='w-[20%] py-2 border-white border-2 text-right px-3 bg-gray-100 font-bold uppercase'>delivery fees: </td>
                      <td className='w-[20%] py-2 border-white border-2 text-right px-3 text-xl font-semibold'>{orderDetails.delivery_fee}</td>
                    </tr>
                    <tr>

                      <td className='w-[20%] py-2 border-white border-2 text-right px-3 bg-gray-100 font-bold uppercase'>total price: </td>
                      <td className='w-[20%] py-2 border-white border-2 text-right px-3 text-xl font-semibold'>{orderDetails.total_price}</td>
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
