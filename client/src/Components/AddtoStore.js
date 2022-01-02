import React, {useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddProductForm = (props) =>{
    let { id } = useParams();
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [state, setState] = useState(0);
    const submitHandler = (e) =>{
      e.preventDefault();
      const data={
        productname:  productName,
        startamount: quantity,
      }
      console.log(data);
      axios.post(`http://localhost:3001/store/addStoreproduct/${id}`, data )
      .then((response) => {
        window.location.reload();
        console.log(response);
    }, (error) => {
      console.log(error);
    });
    
      
  }
    return(
       <div class="form-popup" id="myForm">
          <form class="form-container" onSubmit={submitHandler}>
            <div className="form-group">
              <label for="branchName">Product Name</label>
              <input className="form-control" id="branchName"  placeholder="Product Name" required value={productName}
              onChange = { e => setProductName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="">Quantity</label>
              <input  className="form-control" id="exampleInputPassword1" placeholder="Quantity" required value= {quantity}
              onChange = { e => setQuantity(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success" >Submit</button>
            <button type="submit" class="btn btn-dark" onClick={props.handleClose}>Close</button>
          </form>
       </div>
    )
  }

export default AddProductForm;