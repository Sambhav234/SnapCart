'use client'
import { getSocket } from '@/lib/socket'
import axios from 'axios'
import { error } from 'console'
import React, { useEffect, useState } from 'react'

function DeliveryBoyDashboard() {
    const [assignments,setAssignments]=useState<any[]>([])

        
    const fetchAssignments = async () => {
    try {
      const result = await axios.get("/api/delivery/get-assignments")
      setAssignments(result.data.assignments)
      console.log(result.data.assignments)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchAssignments()
  },[])
 
        useEffect(():any=>{
          const socket=getSocket()
          socket?.on("new-assignment",(deliveryassignment)=>{
            setAssignments((prev)=>[deliveryassignment,...prev])
          })
          return ()=>socket.off("new-assignment")
        },[])
    
        
       
  

  return (
 <div className='w-full min-h-screen bg-gray-50 p-4  flex justify-center flex-col items-center'>
   <h2 className='text-2xl font-bold mt-60 pt-10 mb-7.5'>Delivery Assigments</h2>
      <div className="w-full max-w-3xl h-screen overflow-y-auto">
       

        {assignments?.map((a,index) => (
          <div key={index} className='p-5 bg-white rounded-xl shadow mb-4  border'>
            <p ><b>Order Id </b> #{a?.order._id.slice(-6)}</p>
            <p className='text-gray-600'>{a.order.address.fullAddress}</p>
            <p className='text-gray-600'><strong>Order Reciepent :-</strong>{a.order.address.fullName}</p>

            <div className='flex gap-3 mt-4'>
              <button className='flex-1 bg-green-600 text-white py-2 rounded-lg'
                // onClick={() => handleAccept(a._id)}
              >Accept</button>
              <button className='flex-1 bg-red-600 text-white py-2 rounded-lg'>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeliveryBoyDashboard
