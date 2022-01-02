//Importing Packages
import React, {useState, useEffect, useRef, useLayoutEffect, useContext} from "react";
import { useParams, useHistory } from 'react-router-dom';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";
//Importing images
import Notes from "../images/notes.png";
import Bargraph from "../images/bargraph.png";
import Plus from "../images/plus.png"
//Importing Components
import BackButton from "../Components/BackButton";
import AddBranchForm from "../Components/AddBranchForm"
import { AuthContext } from "../helpers/AuthContext";
import NoAccess from "../Components/NoAccess";
import Navbar from "../Components/Navbar";

am4core.useTheme(am4themes_animated);

const Branches = () =>{
    let { id } = useParams();
    let history = useHistory();
    const [Allbranches, setAllbranches] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [records, setRecords] = useState([]);
    const { authState, setAuthState } = useContext(AuthContext);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const goLogin = () => {
        window.location.href = `http://localhost:3000/login`;
    }

    const deleteBranch = (bid) => {
        axios.delete(`http://localhost:3001/branches/${bid}`).then(() => {
            window.location.reload();
        });
    }
    
    const handleRoute = (branchid) =>{
      window.location.href = `http://localhost:3000/branches/bybranchid/${branchid}`;
    }
    const chart = useRef(null);

    const bringChart = (xid) => {
        axios.get(`http://localhost:3001/Salerecords/${xid}`).then((response) => {
            setRecords(response.data);
        });

        var x = am4core.create("chartdiv", am4charts.XYChart);

        // Add data
        x.data = records;

        // Create axes

        var categoryAxis = x.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "productname";
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
        series.dataFields.categoryX = "productname";
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
        axios.get(`http://localhost:3001/branches/byuserid/${ id }`).then((response) => {
          setAllbranches(response.data);
        });    
      }, []);

    return(
        <div>
        {authState.status ? (<> 
            <header>
                <Navbar></Navbar>
            </header>
          <div className="branches-container row">
              <div className="col-8 mytable">
                  <h1>Branches</h1>
                  <table className="table">
                  <thead>
                      <tr>
                      <th scope="col" className="branch-header">Branch Name</th>
                      <th scope="col">Address</th>
                      <th scope="col">Graphical Analysis</th>
                      <th scope="col">Stock Management</th>
                      </tr>
                  </thead>
                  <tbody>
                      
                      {Allbranches.map(item => (
                        <tr key={item.id} >
                            <th scope="row" className="col1">
                                <span className="branch-name">{item.branchname}</span> <br/>
                                <span className="action onhover">Update</span> <span> - </span><span className="action onhover" onClick={() => {deleteBranch(item.id)}}>  Delete</span>
                            </th>
                            <td>{item.address}</td>
                            <td><img onClick={() => bringChart(item.id)} className="icon onhover" src={Notes} alt="description"/></td>
                            <td><img onClick={() => handleRoute(item.id)} className="icon onhover" src={Bargraph} alt="description"/></td>
                        </tr>
                        ))}
                      
                     
                  </tbody>
                  </table>


              </div>
             
              <div className="col-2 adding">
              <button type="button" className="btn btn-light" onClick={togglePopup}> <img className="icon" src={Plus} alt="description"/>    ADD BRANCH</button>
              {isOpen && <AddBranchForm  handleClose={togglePopup}/>} 
              </div>
                       
      
          </div>
          <div className="row">
            <div className="col-8" id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
            <div className="col-2 back">
              <BackButton/>
            </div>
          </div>
                      
            </>) : (<>
                
                <NoAccess></NoAccess>
                </>)}
           
        </div>
      );
      
} 

export default Branches;