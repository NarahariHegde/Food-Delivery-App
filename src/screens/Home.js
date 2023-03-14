import React, { useEffect, useState } from "react";
import Card from "../components/Card";
// import Crousel from "../components/Crousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// import { Link } from "react-router-dom";

const Home = () => {
  const [search, setsearch] = useState(" ");
  const [foodcat, setfoodcat] = useState([]);

  const [food_item, setfood_item] = useState([]);

  const localData = async () => {
    let response = await fetch("http://localhost:3001/api/foodData", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });

    response = await response.json();
    setfood_item(response[0]);
    setfoodcat(response[1]);
    console.log(response[0], response[1]);
  };
  useEffect(() => {
    localData();
  }, []);
  return (
    <>
      <div>
        {" "}
        <Navbar></Navbar>{" "}
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner">
            <div className="carousel-caption" style={{ zIndex: 5 }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2 fs-4"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={e => {
                    setsearch(e.target.value);
                  }}
                />
                {/* <button
                  className="btn btn-outline-success text-white"
                  type="submit">
                  Search
                </button> */}
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/900x400?burger"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x400?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x400?dosa"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev">
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next">
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="m-3 container" style={{ minWidth: "300px" }}>
        {foodcat !== [] ? (
          foodcat.map(data => {
            return (
              <div className="row mb-3 ">
                <div key={data._id} className="fs-4 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {food_item
                  .filter(
                    item =>
                      item.CategoryName === data.CategoryName &&
                      item.name
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                  )
                  .map(filterdata => {
                    return (
                      <div
                        key={filterdata._id}
                        className="col-12 col-md-4 lg-6">
                        {" "}
                        <Card
                          food={filterdata}
                          options={filterdata.options[0]}
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })
        ) : (
          <div>ssss</div>
        )}
      </div>
      <div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default Home;
