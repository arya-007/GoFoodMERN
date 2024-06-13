import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
export default function Signup() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://gofood-backend-lu06.onrender.com/api/CreateUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });

    const json = await response.json()
    console.log(json);
    if (!json.success) {
      alert("Enter valid credentials");
    }else{
      navigate("/login")
    }
  }
  let [address, setAddress] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    }
    let latlong = await navLocation().then(res => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude]
    })
    // console.log(latlong)
    let [lat, long] = latlong
    console.log(lat, long)
    const response = await fetch("https://gofood-backend-lu06.onrender.com/api/getlocation", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ latlong: { lat, long } })

    });
    const { location } = await response.json()
    console.log(location);
    setAddress(location);
    setcredentials({ ...credentials, [e.target.name]: location })
  }


  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
      <div>
        <Navbar />
      </div>

      <div className='container' >

        <form className='w-50 m-auto mt-5 border bg-white border-success rounded' onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
            <div id="emailHelp" className="form-text" >Password should contains atleast 8 characters.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Location</label>
            
            {/* <input type="text" className="form-control" id="exampleInputPassword1" name='geolocation' value={credentials.geolocation} onChange={onChange} />
          </div> */} 
          <fieldset>
                <input type="text" className="form-control" name='address' value={address} onChange={(e)=>setAddress(e.target.value)} aria-describedby="emailHelp" />
              </fieldset>
              <div id="locationHelp" className="form-text" >Click below for fetching your current location</div>

            </div>
            
            <div className="m-3">
              <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-primary">Click for current Location </button>
            </div>
          <button type="submit" className="m-3 btn btn-success" >Submit</button>
          <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
        </form>

      </div>
    </div>
  )
}
