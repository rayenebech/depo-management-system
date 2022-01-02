//Importing Packages
import React, {useState, useEffect, useContext} from "react";
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
//Importing images
import Plus from "../images/plus.png"
//Importing Components
import Navbar2 from "../Components/Navbar2";
import BackButton from "../Components/BackButton";
import ReactTooltip from 'react-tooltip';
import AddProductForm from "../Components/AddProductForm"
import { AuthContext } from "../helpers/AuthContext";
import NoAccess from "../Components/NoAccess";
import Navbar from "../Components/Navbar";


const Branch = () =>{
    let { id } = useParams();
    const [allproducts, setAllproducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [approvals, setAllapprovals] = useState([]);
    const { authState, setAuthState } = useContext(AuthContext);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const goLogin = () => {
      window.location.href = `http://localhost:3000/login`;
  }
    
    const functionx = async () => {
      axios.get(`http://localhost:3001/products/bybranchid/${ id }`).then((response) => {
          setAllproducts(response.data);
        });
      axios.get(`http://localhost:3001/approvals/byproductid/${ id }`).then((response)=>{
        setAllapprovals(response.data);
      });
      
    }
    const delProduct = (pid) => {
      axios.delete(`http://localhost:3001/products/${pid}`).then((response) => {
            console.log("sildim");
          });
      window.location.reload();
    }
    const approval = (approvalid, productname, productid) => {
      const data = {
        approvalid:approvalid,
        productname:productname,
        productid:productid
      }
      axios.put(`http://localhost:3001/store/approvalcheck/${ id }`, data).then((response) => {
          console.log(response);
          if(response.data.err == "error"){
            alert("Not enough products in store");
            
          }
          else{
            axios.delete(`http://localhost:3001/approvals/byapprovalid/${ approvalid }`).then((response) => {
              console.log("sildim");
            });
            axios.put(`http://localhost:3001/store/statecheck/${ productid }`).then((response)=> {
                console.log("güncelledim");
            });
            window.location.reload();
          }
        });
    }

    const updateProduct = (pid, pname, bid, count) => {
      var quantity = prompt("Please enter the amount to be sold", "?");
      let data2= {};
      const data = {
        saleCount:quantity,
        branchId:bid,
        productname:pname,
        userid: authState.id,
      };
      if(quantity > count){
        alert("Not enough products to sell.");
      }
      else{
        
        axios.put(`http://localhost:3001/products/bypid/${ pid }`, data).then((response) => {
        if((response.data.quantity) < 50){ //burasına bak!!!!!!!!!!!!!!!!!
          console.log("Kritik stoktasınız");
          axios.post(`http://localhost:3001/approvals/byproductid/${pid}`, data2 = {productname: data.productname, state:"Waiting for Approval.",branchId:bid}).then((response) => {
            setAllapprovals(...approvals, response.data);
          });
        };
          window.location.reload();
        });
      }
      
    }

    useEffect(() => {
        functionx();
      }, [])

      useEffect(() => {
        console.log(allproducts);
    }, [allproducts])

    return(
      <div>
      {authState.status ? (<> 
        <header>
                <Navbar></Navbar>
            </header>
          <div className="branches-container row">
              <div className="col-8 mytable">
                  <h1>Branch</h1>
                  <table className="table">
                  <thead>
                      <tr>
                      <th scope="col" className="branch-header">Product Type</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">State</th>
                      </tr>
                  </thead>
                  <tbody>
                  
                  {allproducts.map(item => (
                        <tr key={item.id} >
                            <th scope="row" className="col1">
                                <span className="branch-name">{item.productname}</span> <br/>
                                <span className="onhover" onClick={() => updateProduct(item.id, item.productname, item.BranchId, item.quantity)}>Update</span><span className="onhover" onClick={() => {delProduct(item.id)}}>  -  Delete</span>
                            </th>
          
                            <td>{item.quantity}</td>
                            <td>{item.state}</td>
                        </tr>
                        ))}

                  </tbody>
                  </table>


              </div>
             
              <div className="col-2 adding">
              <button type="button" className="btn btn-light" onClick={togglePopup}> <img className="icon" src={Plus} alt="description"/>    ADD PRODUCT</button>
              {isOpen && <AddProductForm  dataFromParent={id} handleClose={togglePopup}/>} 
              </div>
                       
      
          </div>
          <div className="row">
            <div className="col-8 mytable">
            <h1>Awaiting Approval</h1>
                  <table className="table">
                  <thead>
                      <tr>
                      <th scope="col" className="branch-header">Product Type</th>
                      <th scope="col">Approval</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">State</th>
                      </tr>
                  </thead>
                  <tbody>
                  {approvals.map(item => (
                        <tr key={item.id} >
                            <th scope="row" className="col1">
                                <span className="branch-name">{item.productname}</span> <br/>
                                
                            </th>
                            <td><img className="onhover"  onClick={() => approval(item.id, item.productname, item.ProductId)} className="icon" src={Plus} alt="description"/></td>
          
                            <td>50</td>
                            <td>{item.state}</td>
                        </tr>
                        ))}
                            
                  </tbody>
                  </table>
            </div>
            <div className="col-2 back">
              <BackButton/>
            </div>
          </div>
          
           <ReactTooltip backgroundColor="#F4F4F4" textColor="black"/> 
          
          </>) : (<>
              
              <NoAccess></NoAccess>
              </>)}
         
      </div>



       
      );
      
} 

export default Branch;