import React, { useEffect, useState } from "react";
import Header from "./components/header/Header";
import Search from "./components/search/Search";
import AddProducts from "./components/addproducts/AddProducts";
import CardBody from "./components/cards/CardBody";
import Button from "./components/button/Button";
import Filter from "./components/filter/Filter";
import UserForm from "./components/login/UserForm";


import "./App.css";
const App = () => {
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [addedItems, setAddedItem] = useState([]);
  const [showAddProducts, setShowAddProducts] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [showUserForm, setShowUserForm] = useState(false);
  

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => setItems(data));
    console.count("hi");
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      // Clear items and added items when logged out
      setItems([]);
      setAddedItem([]);
    } else {
      // Fetch products when logged in
      fetch(`https://fakestoreapi.com/products?sort=${sortOrder}`)
        .then((res) => res.json())
        .then((data) => setItems(data));
    }
  }, [isLoggedIn, sortOrder]);



  useEffect(() => {
    const sortedItems = [...items].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setItems(sortedItems);
  }, [sortOrder]);

  // useEffect(() => {
  //   const sortedItems = [...items].sort((a, b) => {
  //     const priceA = parseFloat(a.price);
  //     const priceB = parseFloat(b.price);
  
  //     if (sortOrder === "asc") {
  //       return priceA - priceB;
  //     } else {
  //       return priceB - priceA;
  //     }
  //   });
  
  //   setItems(sortedItems);
  // }, [sortOrder]);
  

  function changingSrarchData(e) {
    setSearchValue(e.target.value);
  }
  const itmesFilter = items.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );
 
  function addItem(item) {
    item.addNumber = 1;
    const itemArr = addedItems;
    setAddedItem([...itemArr, item]);
  }
  // console.log(addedItems);
  function removeItem(item) {
    const newItems = addedItems.filter((addedItem) => addedItem.id !== item.id);
    setAddedItem(newItems);
    // console.log(addedItems);
  }
  function handleSortChange(selectedSortOrder) {
    setSortOrder(selectedSortOrder);
  }
  
  function handleLogin(username, password) {
    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Login failed. Please check your credentials.");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data); // Log the API response containing the token
        if (data.token) {
          setIsLoggedIn(true);
          fetch(`https://fakestoreapi.com/users/${id}`)
            .then((res) => res.json())
            .then((user) => setUserInfo(user));
        }
      })
      .catch((error) => {
        console.error(error);
      });
      setShowUserForm(false);
  }
  


  function handleLogout() {
    setIsLoggedIn(false);
    setUserInfo(null);
    // setItems([]);
    setAddedItem([]);
  }

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
      const storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUserInfo(storedUserInfo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, [isLoggedIn, userInfo]);

  return (
    <div>
      {/* <Header /> */}

      <div className="body__container">
        <div className="nav">
          <Header />
          <div className="nav-right">
            <Search
              products={items}
              value={searchValue}
              onChangeData={changingSrarchData}
            />
            {/* <Button num={addedItems.length} click={setShowAddProducts} /> */}
            {isLoggedIn ? (
              <Button num={addedItems.length} click={setShowAddProducts} />
            ) : (
              <button className="login" onClick={() => setShowUserForm(true)}>Login</button>
            )}
          </div>
          {isLoggedIn ? (<button className="logout" onClick={handleLogout}>Logout</button>) : null }
          
        </div>
        
        {isLoggedIn && <Filter onChangeSort={handleSortChange} />}
       {/* <Filter onChangeSort={handleSortChange} /> */}


       {isLoggedIn ? (
          <React.Fragment>
            {showAddProducts && (
              <AddProducts
                click={setShowAddProducts}
                items={addedItems}
                removeItem={removeItem}
                setAddedItem={setAddedItem}
              />
            )}

            
            <CardBody
              products={itmesFilter}
              addItem={addItem}
              removeItem={removeItem}
              addedItems={addedItems}
            />
            
            
          </React.Fragment>
        ) : (
          <p className="login-message">Please Login to View the Products</p>
        )}
{userInfo && (
          <div>
            <h3>Welcome, {userInfo.username}!</h3>
            <p>Email: {userInfo.email}</p>
          </div>
        )}
        {/* {showAddProducts && (
          <AddProducts
            click={setShowAddProducts}
            items={addedItems}
            removeItem={removeItem}
            setAddedItem={setAddedItem}
          />
        )}
        <CardBody
          products={itmesFilter}
          addItem={addItem}
          removeItem={removeItem}
          addedItems={addedItems}
        /> */}
        {showUserForm && (
          <UserForm onLogin={handleLogin} onClose={() => setShowUserForm(false)} />
        )}
      </div>
    </div>
  );
};

export default App;
