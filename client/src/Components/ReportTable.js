import React,{useState, useEffect, useRef} from "react";
import info from "../images/info.png"
import { useParams, useHistory } from 'react-router-dom';
import axios from "axios"
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const ReportTable = () =>{

  let { id } = useParams();
  const [productNames, setProductNames] = useState([]);
  const [records, setRecords] = useState([]);


  const chart = useRef(null);

  const bringChart = async (xid) => {
      await axios.get(`http://localhost:3001/products/reports/9/${xid}`).then((response) => {
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
    axios.get(`http://localhost:3001/products/byuserid/user/${ id }`).then((response) => {
      setProductNames(response.data);
    });

  }, []);

  return(
    <div className="MyTable">
        <caption>Reports</caption>
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="alignleft">Product Type</th>
              <th class="alignright" scope="col">Sale Records</th>
            </tr>
          </thead>
          <tbody>
              {productNames.map(item => (
                <tr>
                  <td class="alignleft">{item.productname}</td>
                  <td class="alignright"> <img className="icon" src={info} onClick={() => bringChart(item.productname)} alt="description"/> </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="col-8" id="chartdiv" style={{ width: "100%", height: "300px" }}></div>
      </div>
  )
   
}
export default ReportTable;