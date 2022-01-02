import React,{useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyTable = () =>{
  let {id} = useParams();
  const [storeProducts, setStoreProducts] = useState([]);


  const productUpdate = (pname) => {
    const quantity = prompt("Enter the amount will be added:");
    const data = {
      quantity: quantity,
      pname: pname,
    };
    axios.put(`http://localhost:3001/store/updateq/${id}`, data).then((response) => {
      window.location.href = `http://localhost:3000/store/products/${id}`;
      console.log(response);
    });
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/store/products/${id}`).then((response) => {
      setStoreProducts(response.data);
    });
  }, []);

  return(
    <div className="MyTable">
        <caption>Store</caption>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Product Type</th>
              <th class="alignright" scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {storeProducts.map(item => (
              <tr key={item.id} >
                <td><span className="branch-name">{item.productname}</span><br/>
                <span className="onhover" onClick={() => {productUpdate(item.productname)}}>Update</span></td>
                <td class="alignright">{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
   
}
export default MyTable;