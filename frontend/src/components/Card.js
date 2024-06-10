import React, { useState ,useRef, useEffect} from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let navigate = useNavigate()
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const priceRef = useRef();
  let data = useCart();
  const [isHovered, setIsHovered] = useState(false); // Define isHovered state

  const handleClick = () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login")
    }
  }

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice , qty: qty, size: size, description: props.foodItem.description})
  }

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div>
        <div
          className={`card mt-3 rounded ${isHovered ? 'shadow-lg' : ''}`}
          style={{ width: "16rem", maxHeight: "400px" }}
          onMouseEnter={() => setIsHovered(true)} // Set isHovered to true on mouse enter
          onMouseLeave={() => setIsHovered(false)} // Set isHovered to false on mouse leave
        >
          <img style={{  height: "120px",objectFit: "fill" }}
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title" style={{ textShadow: '0px 1px 1px rgba(0, 0, 0, 0.5)' }} >{props.foodItem.name}</h5>
            <p className="card-text">{props.foodItem.description}</p>
            <div className="container w-200 p-0">
              <select className="m-2 h-100 rounded "  onClick={handleClick} onChange={(e)=>setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 rounded" ref={priceRef} onClick={handleClick} onChange={(e)=>setSize(e.target.value)}>
                {priceOptions.map((data)=>{
                  return(
                    <option key={data} value={data}>{data}</option>
                  )
                })}
              </select>
              <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            </div>
            <hr></hr>
            <button className="btn btn-success justify-center ms-2 mb-2" onClick={handleAddToCart}>Add to Cart</button> 
          </div>
        </div>
      </div>
    </div>
  );
}

