import React, {useRef, useLayoutEffect, useState, useEffect }  from 'react';
import Navbar from "../Components/Navbar"
import MyTable from "../Components/MyTable"
import BackButton from "../Components/BackButton"
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios"
import { useParams, useHistory } from 'react-router-dom';
import AddProductForm from "../Components/AddtoStore"
import Plus from "../images/plus.png"

am4core.useTheme(am4themes_animated);

function Store(props) {
  let { id } = useParams();
  const togglePopup = () => {
    setIsOpen(!isOpen);
}
const [isOpen, setIsOpen] = useState(false);
  
  const [storeProducts, setStoreProducts] = useState([]);
  const capacity = useRef(0);
  let count = 0;
  let empty = 0;

  const chart = useRef(null);
  
  useEffect(() => {
    axios.get(`http://localhost:3001/store/products/${id}`).then((response) => {
      setStoreProducts(response.data);
    });

    axios.get(`http://localhost:3001/store/capacity/${id}`).then((response) =>{
      capacity.current = response.data.capacity;
    });
    

  }, []);

  useLayoutEffect(() => {
    var x = am4core.create("chartdiv", am4charts.PieChart);

    x.data = storeProducts;
    
    // Set inner radius
    x.innerRadius = am4core.percent(50);
    
    // Add and configure Series
    var pieSeries = x.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "quantity";
    pieSeries.dataFields.category = "productname";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;
    
    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;
    
    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [storeProducts]);

  return (
    <div>
    
      <header className="header">
        <Navbar></Navbar>
      </header>
      <div className="Content">
        <div className="row">
          <div className="col-xl">
             <MyTable></MyTable>
             <div id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
        
        <div class="empty-storage">{storeProducts.map(item => {
      count = count + item.quantity;})}You have {100*((capacity.current-count)/capacity.current).toFixed(2)}% empty storage left.</div>
             
             </div>
          <div  className="col- rightbar">
            <div className="adding">
              <button type="button" className="btn btn-light" onClick={togglePopup}> <img className="icon" src={Plus} alt="description"/>    ADD PRODUCT</button>
              {isOpen && <AddProductForm  dataFromParent={id} handleClose={togglePopup}/>} 
              </div>
             
        </div>
        </div>
       
       
        
        
   
        
      </div>
      
  
    </div>
  );
}
export default Store;