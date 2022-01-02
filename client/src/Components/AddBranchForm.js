import React, {useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddBranchForm = (props) =>{
    let {id} = useParams();
    const [branchName, setBranchName] = useState('');
    const [address, setAddress] = useState('');
    const submitHandler = (e) =>{
      e.preventDefault();
      const data={
        branchname:  branchName,
        address: address,
      }
      console.log(data);
      axios.post(`http://localhost:3001/branches/byuserid/${id}`, data )
      .then((response) => {
        window.location.reload();
    }, (error) => {
      console.log(error);
    });
    
      
  }
    return(
       <div class="form-popup" id="myForm">
          <form class="form-container" onSubmit={submitHandler}>
            <div className="form-group">
              <label for="branchName">Branch Name</label>
              <input className="form-control" id="branchName"  placeholder="Branch Name" required value={branchName}
              onChange = { e => setBranchName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="">Address</label>
              <input  className="form-control" id="exampleInputPassword1" placeholder="Address" required value= {address}
              onChange = { e => setAddress(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success" >Submit</button>
            <button type="submit" class="btn btn-dark" onClick={props.handleClose}>Close</button>
          </form>
       </div>
    )
  }

export default AddBranchForm;
