import React,{useState,useEffect} from 'react';
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core';
import InfoBox from './Components/InfoBox';
import Map from './Components/Map.js';
import Table from './Components/Table.js';
import {sortData, prettyPrintStat} from './utils.js'
// import LineGraph from './Components/LineGraph.js';
import "leaflet/dist/leaflet.css";


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat:34.80746, lng:-40.4976
  })
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const[casesType, setCasesType] = useState('cases');
  useEffect(()=> {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response=> response.json())
    .then(data=> {
      setCountryInfo(data);
    })
  },[])  

  useEffect(()=> {
    const getCountrieSData = async() => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then(data=> {
        const countries = data.map(country => (
          {
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag
          }
        ))
        setCountries(countries);
        const sortedData = sortData(data)
        setTableData(sortedData);

        setMapCountries(data);
      })
    }
    getCountrieSData();
  },[])
  
  async function handleCountryChange(event) {
    const countryCode= event.target.value;

    const url = countryCode === 'worldwide'? 'https://disease.sh/v3/covid-19/all':
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data=> {
      setCountry(countryCode);
      setCountryInfo(data);

      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    })
  };

  return (
    <div className="App">
      <div className="App_left">
        <div className="App_header">
          <h1 className="App_title">Covid-19 Tracker</h1>
          <FormControl className="App_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={handleCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map(country=> (
                <MenuItem value={country.value}>{country.name} <img alt="{country.name}" src={country.flag} className="App_dropdown_img"/></MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>
       {/* Flex Box with three columns */}
        <div className="Stats_box">
              <InfoBox 
              isRed
              active={casesType === 'cases'}
              onClick={e=> setCasesType('cases')}
              title="CoronaVirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>
              
              <InfoBox
              isGreen
              active={casesType === 'recovered'}
              onClick={e=> setCasesType('recovered')}
               title="Recoveries" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>
              
              <InfoBox 
              isRed
              active={casesType === 'deaths'}
              onClick={e=> setCasesType('deaths')}
              title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>
        </div>
      {/* Maps of the cases */}
      <Map casesType ={casesType} countries ={mapCountries} center={mapCenter} zoom={mapZoom} />
       
      </div>
      {/* Left CLoses Here  */}

      <Card className="App_right"> 
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}></Table>
          {/* <h3>Cases Bar Chart</h3>
          <LineGraph className="App_graph"/> */}
        </CardContent>

      </Card>
      
    </div>
  );
}

export default App;
