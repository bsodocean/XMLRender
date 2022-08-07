import React, { useState } from "react";
import XMLData from "./products.xml";
import XMLParser from "react-xml-parser";

const XMLRender = () => {
  const [data, setData] = useState([]);

  React.useEffect(() => { 
    fetch(XMLData, {
      "Content-Type": "application/xml"
    })
      .then((response) => response.text())
      .then((response) => {
        const parsedData = new XMLParser().parseFromString(response); 

        setData(parsedData.getElementsByTagName("item")); 
      })
      .catch((error) => {
        console.log("Error fetching/parsing XML data", error);  
      });
  }, []);

  const renderRow = React.useCallback(  
    ({ attributes }) => (
      <div 
        className="info-display__item"
        key={`${attributes.code}_${attributes.name}`} 
      >
        {attributes.name} 
      </div>
    ),
    []
  );

  return (
    <div className="info-display">
      <strong>{`Results total: ${data.length}`}</strong>  
      {data.length !== 0 && data.map(renderRow)} 
    </div>
  );
};
export default XMLRender;
