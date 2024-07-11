import React, { useState } from "react";
import DataEkskul from "../data/DataEkskul";
import CardEkskul from "../atoms/Card/CardEkskul";
import NavEkskulLayout from "../../layouts/NavEkskulLayout";
import axios from "../../axiosConfig";

const EkskulContainer = () => {
  // const ekskulDesc = await axios.get("/ekskuls");
  // console.log("data ekskul", ekskulDesc.data.data);
  const [item, setItem] = useState(DataEkskul);
  const navItems = [...new Set(DataEkskul.map((val) => val.name))];

  const filterItem = (catagory) => {
    const newItem = DataEkskul.filter((cat) => cat.name === catagory);
    setItem(newItem);
  };

  return (
    <div className="w-full h-full p-5">
      <h1 className="text-center font-bold text-3xl">Ekstrakulikuler</h1>
      <NavEkskulLayout navItems={navItems} filterItem={filterItem} setItem={setItem} />
      <CardEkskul item={item} />
    </div>
  );
};

export default EkskulContainer;
