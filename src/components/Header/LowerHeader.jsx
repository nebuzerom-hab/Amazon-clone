import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./Header.module.css";
function LowerHeader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <AiOutlineMenu />
          <p>All</p>
        </li>
        <li>
          <select name="" id="">
            <option value="">All</option>
          </select>
        </li>
        <li>
          <p>Best Sellers</p>
        </li>
        <li>
          <select name="" id="">
            <option value="">Prime</option>
          </select>
        </li>
        <li>
          <p>Amazon Basics</p>
        </li>
        <li>
          <p>Cell Phones</p>
        </li>
        <li>
          <p>New Releases</p>
        </li>
        <li>
          <p>Music</p>
        </li>
        <li>Todays Deals</li>
        <li>
          <p>Amazon Home</p>
        </li>
        <li>
          <select name="" id="">
            <option value="">Groceries</option>
          </select>
        </li>
        <li>
          <p>Customer Service</p>
        </li>
        <li>
          <p>Pharmacy</p>
        </li>
        <li>
          <p>Registry</p>
        </li>
        <li>
          <p>Books</p>
        </li>
        <li>
          <select name="" id="">
            <option value="">Gift Cards</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default LowerHeader
