import React, { useEffect, useRef, useState } from "react";
import { usecartdispatch, usecart } from "./Contextreducer";
const Card = props => {
  let dispatch = usecartdispatch();
  let data = usecart();
  let priceref = useRef();
  let options = props.options;
  let priceoptions = Object.keys(options);
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState(" ");

  const handleaddtocart = async () => {
    await dispatch({
      type: "ADD",
      id: props.food._id,
      name: props.food.name,
      price: finalprice,
      qty: qty,
      size: size,
    });

    console.log(data);
  };

  let finalprice = qty * parseInt(options[size]);

  useEffect(() => {
    setsize(priceref.current.value);
  }, []);

  return (
    <div>
      <div>
        <div
          className="card mt-4 "
          style={{ width: "25rem", maxHeight: "40rem" }}>
          <img
            src={props.food.img}
            className="card-img-top h-5"
            style={{ height: "300px", objectFit: "fill" }}
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{props.food.name}</h5>
            <p className="card-text">{props.food.description}</p>

            <div className="container w-100">
              <select
                className="m-3 h-100 bg-success rounded"
                onChange={e => {
                  setqty(e.target.value);
                }}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <>
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    </>
                  );
                })}
              </select>

              <select
                className="m-3 h-100  bg-success rounded"
                ref={priceref}
                onChange={e => {
                  setsize(e.target.value);
                }}>
                {priceoptions.map(data => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-5 mx-4 btn btn-danger">
                {finalprice}/-
              </div>
            </div>
            <hr />
            <button
              className="btn btn-light text-white fs-5  justify-center ms-4"
              onClick={handleaddtocart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
