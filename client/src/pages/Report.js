//Importing Packages
import React, {useState, useEffect, useRef, useContext, useLayoutEffect} from "react";
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
//Importing images
import Notes from "../images/notes.png";
//Importing Components
import Navbar from "../Components/Navbar";
import Navbar2 from "../Components/Navbar2";
import BackButton from "../Components/BackButton";
import ReactTooltip from 'react-tooltip';
import { AuthContext } from "../helpers/AuthContext";
import NoAccess from "../Components/NoAccess";




const Report = () =>{


  am4core.useTheme(am4themes_animated);

  const { authState, setAuthState } = useContext(AuthContext);

      let { id } = useParams();
      const [AllProducts, setAllproducts] = useState([]);
      const [isOpen, setIsOpen] = useState(false);
      const [records, setRecords] = useState([]);
      const history = useHistory();
      const togglePopup = () => {
          setIsOpen(!isOpen);
      }
  
      const chart = useRef(null);
  
      const goLogin = () => {
        window.location.href = `http://localhost:3000/login`;
    }

      const bringChart = (xid) => {
          axios.get(`http://localhost:3001/products/reports/${ id }/${ xid }`).then((response) => {
              setRecords(response.data);
          });
  
          var x = am4core.create("chartdiv", am4charts.XYChart);
  
          // Add data
          x.data = records;
  
          // Create axes
  
          var categoryAxis = x.xAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "branchname";
          categoryAxis.renderer.grid.template.location = 0;
          categoryAxis.renderer.minGridDistance = 30;
  
          categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
          if (target.dataItem && target.dataItem.index & 2 == 2) {
              return dy + 25;
          }
          return dy;
          });
  
          var valueAxis = x.yAxes.push(new am4charts.ValueAxis());
  
          // Create series
          var series = x.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueY = "count";
          series.dataFields.categoryX = "branchname";
          series.name = "Visits";
          series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
          series.columns.template.fillOpacity = .8;
  
          var columnTemplate = series.columns.template;
          columnTemplate.strokeWidth = 2;
          columnTemplate.strokeOpacity = 1;
  
          chart.current = x;
          return () => {
              x.dispose();
          };
          }



    useEffect(() => {
      //http://localhost:3001/products/bybranchid/${ id }
        axios.get(`http://localhost:3001/products/byuserid/user/${id}`).then((response) => {
          setAllproducts(response.data);
        });    
    
      }, []);

      useEffect(() => {
        console.log(records);
    }, [records])

    return(
        <div>
{authState.status ? (<>
  <div><header>
                <Navbar></Navbar>
            </header>

            <div className="MyTable">
        <caption>Store</caption>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Product Type</th>
              <th class="alignright" scope="col">Sale Records</th>
            </tr>
          </thead>
          <tbody>
            {AllProducts.map(item => (
              <tr key={item.id} >
                <td>{item.productname}</td>
                <td class="alignright"> <img onClick={() => bringChart(item.productname)} className="icon" src={Notes} alt="description"/> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-8" id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
            <BackButton></BackButton>
        </div>
 </>): (<> 
  <NoAccess></NoAccess>
 </>)}
            
     </div> );
      
} 

export default Report;