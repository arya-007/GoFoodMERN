import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from 'axios';

export default function MyOrder() {
  const [orderData, setorderData] = useState(null);
  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    
    let body = {
            email: localStorage.getItem("userEmail"),
          
    }
    let headers = {
        "Content-Type": "application/json",
      }
   await axios.post("https://gofood-backend-lu06.onrender.com/api/myOrderData",body, {headers})
   .then( async (response)=> {
        console.log(response)
        // const resp = response.data.orderData.order_data;
        setorderData(response.data.orderData.order_data);
    //console.log("this",orderData);
      })
    // let response = await r.json();
    // await 
  };

  useEffect(() => {
    fetchMyOrder();
  },[orderData]);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
        {orderData ? (
            orderData.map((data) => {
              return (
                <>
                  <div className="m-auto mt-5">
                    {data.Order_Date}
                    <hr />
                  
                  {data.data?data.data.map((item) => {
                   return(
                    <div className="d-flex">
                    <div className="col-12 col-md-6 col-lg-3 d-flex">
                      <div
                        className="card mt-3"
                        style={{ width: "16rem", maxHeight: "360px" }}
                      >
                    
                        <div className="card-body shadow">
                          <h5 className="card-title" style={{ textShadow: '0px 1px 1px rgba(0, 0, 0, 0.5)' }}>{item.name}</h5>
                          <div
                            className="container w-100 p-0"
                            style={{ height: "38px" }}
                          >
                            <span className="m-1">{item.qty}</span>
                            <span className="m-1">{item.size}</span>
                            <span className="m-1">{item.Order_Date}</span>
                            <div className=" d-inline ms-2 h-100 w-20 fs-5">
                              ₹{item.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                   );
                  }):"hello"}
                  </div>
                </>
              );
            })
          ) : (
            <div> Order to karo pehle </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
