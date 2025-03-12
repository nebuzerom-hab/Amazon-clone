import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContent } from "../DataProvider/DataProvider";
import { useContext } from "react";
import Cart from "../../Pages/Cart/Cart";
import { auth } from "../../Utility/Firebase";

function Header() {
  const [{ user, basket }, dispatch] = useContext(DataContent);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            {/* logo */}
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon logo"
              />
            </Link>
            {/* delivery */}
            <div className={classes.delivery}>
              <span>
                <IoLocationOutline />
              </span>
              <div>
                <p>Delivery to</p>
                <span>Ethiopai</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            {/*search*/}
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="Search product" />
            <IoIosSearch size={40} />
          </div>
          {/* right side */}

          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Flag_of_the_United_States_%281777%E2%80%931795%29.svg/640px-Flag_of_the_United_States_%281777%E2%80%931795%29.svg.png"
                alt="american flg"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            {/* 3 elements */}

            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello ,{user?.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello,Sign In</p>
                    <span>Account & List</span>
                  </>
                )}
              </div>
            </Link>
            {/* order */}
            <Link to="/orders">
              <p>return</p>
              <span>& orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={55} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
}

export default Header;
