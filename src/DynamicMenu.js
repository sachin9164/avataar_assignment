import React, { useState, useEffect } from "react";
import Intersect from "./assets/Intersect.svg";
import { FaSearch, FaAngleDown } from "react-icons/fa";

const DynamicMenu = ({ menuItems }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);

  useEffect(() => {
    const updateMenuItems = () => {
      const menu = document.getElementById("dynamic-menu");
      let availableSpace = menu.offsetWidth;

      let tempVisibleItems = [];
      let tempHiddenItems = [...menuItems];

      for (const item of menuItems) {
        const itemWidth = item.label.length * 23;
        if (availableSpace - itemWidth >= 0) {
          tempVisibleItems.push(item);
          tempHiddenItems.shift();
          availableSpace -= itemWidth;
        } else {
          break;
        }
      }

      setVisibleItems(tempVisibleItems);
      setHiddenItems(tempHiddenItems);
    };

    updateMenuItems();
    window.addEventListener("resize", updateMenuItems);

    return () => {
      window.removeEventListener("resize", updateMenuItems);
    };
  }, [menuItems]);

  return (
    <div id="dynamic-menu" className="dynamic-menu">
      <div className="logo">
        <img src={Intersect} alt="Logo" />
        <h2>ECOMM</h2>
      </div>

      <ul>
        {visibleItems.map((item, index) => (
          <li key={index}>{item.label}</li>
        ))}
        {hiddenItems.length > 0 && (
          <li className="more">
            <div className="more-item">
              {" "}
              More <FaAngleDown />
            </div>
            <ul id="more-menu">
              {hiddenItems.map((item, index) => (
                <li key={index}>{item.label}</li>
              ))}
            </ul>
          </li>
        )}
      </ul>
      <div className="search-bar">
        <FaSearch />
        <input type="text" placeholder=" Search Something"></input>
      </div>
    </div>
  );
};

export default DynamicMenu;
