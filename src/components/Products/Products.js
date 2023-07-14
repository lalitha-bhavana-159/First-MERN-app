import React,{useState} from 'react'
import './Products.css'
import axios from 'axios'
import { Link } from "react-router-dom";


function Products() {

  let[data, setData]=useState(null)
  let [loginErr,setLoginErr]=useState("")

  let getdata=()=>{
    //console.log('Button clicked!')
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3500/user-api/test',{params: {data: token}})
    .then((response)=>{
      setData(response.data.message)
      //console.log(data);
    })
    .catch(err=>{
      //console.log(err);
      setLoginErr(err.message)
    })
  }

  return (
    <div>
    <div className='display-3 text-center'>Products</div>
    <button className="btn btn-danger" onClick={getdata} >Get Private data</button>
    {data && <div>{data}</div>}
    {loginErr && <div>{loginErr}</div>}
    </div>
  )
}

export default Products