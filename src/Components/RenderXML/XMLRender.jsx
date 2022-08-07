import React from "react";
import XMLData from "./products.xml";
import axios from "axios";
import { useState } from "react";
import XMLParser from "react-xml-parser";

const XMLRender = () => {

  const [data, setData] = useState({});
  const [names, setNames] = useState({})

  React.useEffect(() => {
    axios
      .get(XMLData, {
        "Content-Type": "application/xml; charset=utf-8"
      })
      .then((response) => {
        setData(new XMLParser().parseFromString(response.data));
      });
  }, []);

  if (data.children) { 
    const info = data.children[0].children.map((items) => {  
      console.log(items.attributes.name);
      return {
        totalItems: items.children.length, 
        name: items.attributes.name,
      }
    }) 
    console.log(info) 
  }


  return (
    <div>
      
    </div>
  )
};
export default XMLRender;