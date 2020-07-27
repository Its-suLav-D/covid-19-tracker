// import React,{useState,useEffect} from 'react';
// import {Line} from 'react-chartjs-2';
// import numeral from 'numeral';

// // https://disease.sh/v3/covid-19/historical/all?lastdays=150

// const options ={
//     legend:{
//         display:false,
//     },
//     elements: {
//         points: {
//             radius:0,
//         },
//     },
//     maintainAspectRatio: false,
//     tooltips: {
//         mode:"index",
//         intersect:false,
//         callbacks: {
//             label:function (tooltipItem, data) {
//                 return numeral(tooltipItem.value).format("+0.0");
//             },
//         },
//     },
//     scales:{
//         xAxes:[
//             {
//                 type:"time",
//                 time: {
//                     format:"MM/DD/YY",
//                     tooltipFormat:"ll",
//                 },
//             },
//         ],
//         yAxse: [
//             {
//                 gridLines: {
//                     display:false,
//                 },
//                 ticks: {
//                     callback: function(value,index, values) {
//                         return numeral(value).format("0a");
//                     },
//                 },
//             },
//         ],
//     },
// }

// function LineGraph(props) {
//     const[data, setData] = useState({});


//     const buildChartData = data => {
//         const charData=[];
//         let lastDataPoint;
//         for(let date in data.cases) {
//             if(lastDataPoint) {
//                 const newDataPoint ={
//                     x:date,
//                     y:data['cases'][date] - lastDataPoint
//                 }
//                 charData.push(newDataPoint);
//             }   
//             lastDataPoint = data['cases'][date];         
//         };
//         return charData;
//     }

//     useEffect(() => {
//         const fetchData = async () => {
//             await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=150')
//             .then(response=> response.json())
//             .then(data => {
//                 const chartData = buildChartData(data)
//                 setData(chartData);
//             })
//         }
//         fetchData();
//       }, [])
     
//     return (
//         <div className={props.className}>
//             {data?.length > 0 && (
//                   <Line
//                   options={options}
//                   data={{
//                       datasets:[{
//                           backgroundColor: 'rgba(255, 99, 132, 0.2)',
//                           borderColor: '#CC1034',
//                           data:data
//                       }]
//                   }}
//               >
  
//               </Line>
//             )}
          
//         </div>
//     )
// }

// export default LineGraph
