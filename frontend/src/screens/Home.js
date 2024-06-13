import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
//import Carousel from "../components/Carousel";

export default function Home() {
  const [search, setSearch] = useState(' ');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("https://gofood-backend-lu06.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    // console.log(response);
    //console.log(response.food_items, response.foodCategory);
    setFoodItem(response.food_items);
    setFoodCat(response.foodCategory);

  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}} >
  <div className="carousel-inner" id="carousel">
    <div className="carousel-caption" style={{zIndex:10}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" style={{ borderRadius: '20px' }} type="search" placeholder='Search' aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success bg-success text-white" type="submit">Search</button> */}
    </div>
    </div>
    <div className="carousel-item active" >
      <img src="https://images.pexels.com/photos/140831/pexels-photo-140831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item active">
      <img src="https://images.pexels.com/photos/14731635/pexels-photo-14731635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item active">
      <img src="https://images.pexels.com/photos/365459/pexels-photo-365459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item active">
      <img src="https://images.pexels.com/photos/18803174/pexels-photo-18803174/free-photo-of-momos-dumplings-with-sauces.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
    </div>
    <div className="carousel-item active">
      <img src="https://images.pexels.com/photos/1482803/pexels-photo-1482803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
      {/* https://source.unsplash.com/random/900x700/?pastry */}
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
      </div>
      <div className="container">
        {foodCat ? (
          foodCat.map((data) => (
            <div className="row mb-3">
              <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItem ? foodItem
                .filter((item) => item.CategoryName === data.CategoryName && (item.name.toLowerCase().includes(search.toLowerCase())))
                .map((filterItems) => (
                  <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                    <Card foodItem={filterItems}
                    options={filterItems.options[0]}
                    
                    />
                  </div>
                ))
                : <div>No Such Data</div>}
            </div>
          ))
        ) : (
          <div>""""""""""""</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
