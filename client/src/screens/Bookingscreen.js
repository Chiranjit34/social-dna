import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { api } from "../api";

function Bookingscreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [room, setRoom] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  const params = useParams();
  console.log(params);
  const fromdate = moment(params.fromdate, "DD-MM-YYYY");
  const todate = moment(params.todate, "DD-MM-YYYY");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      window.location.href = "/login";
    }
    async function fetchMyAPI() {
      try {
        setError("");
        setLoading(true);
        const res = await axios.post(`${api}/api/rooms/getroombyid`, {
          roomid: params.roomid,
        });
        // console.log(res.data);
        setRoom(res.data);
      } catch (error) {
        // console.log(error);
        setError(error);
      }
      setLoading(false);
    }

    fetchMyAPI();
  }, []);

  useEffect(() => {
    const totaldays = moment.duration(todate.diff(fromdate)).asDays() + 1;
    setTotalDays(totaldays);
    setTotalAmount(totalDays * room.rentperday);
  }, [room]);

  const onToken = async (token) => {
    // console.log(token);
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser")).data._id,
      fromdate,
      todate,
      totalAmount,
      totaldays: totalDays,
      token,
    };

    try {
      setLoading(true);
      const result = await axios.post(`${api}/api/bookings/bookroom`, bookingDetails);
      // console.log(result);
      setLoading(false);
      Swal.fire(
        "Congratulations",
        "Your Room Booked Successfully",
        "success"
      ).then((result) => {
        window.location.href = "/home";
      });
    } catch (error) {
      setError(error);
      Swal.fire("Opps", "Error:" + error, "error");
    }
    setLoading(false);
  };

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : error.length > 0 ? (
        <Error msg={error} />
      ) : (
        <div className="row justify-content-center mt-5 bs">
          <div className="col-md-6">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} alt="" className="bigimg" />
          </div>
          <div className="col-md-6">
            <div
            // style={{ textAlign: "right" }}
            >
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>
                  Name :{" "}
                  {JSON.parse(localStorage.getItem("currentUser")).data.name}
                </p>
                <p>
                  Location : {room.locality}
                </p>
                <p>From Date : {params.fromdate}</p>
                <p>To Date : {params.todate}</p>
                <p>Max People Allowed : {room.maxcount}</p>
              </b>
            </div>
            <div
            // style={{ textAlign: "right" }}
            >
              <h1>Amount</h1>
              <hr />
              <b>
                <p>Total Days : {totalDays}</p>
                <p>Rent per day : {room.rentperday}</p>
                <p>Total Amount : {totalAmount}</p>
              </b>
            </div>

            <div style={{ float: "right" }}>
              <StripeCheckout
                amount={totalAmount * 100}
                currency="INR"
                token={onToken}
                stripeKey="pk_test_51LiJiNSFM2DZrNaCXsOJxV9xaaR3rBqrIZ6rQWtIYpOjnJGBwrZQVwwUlQiPmlfGnL2MxJJw8bpeEoJarTxhMLDc00l9sSTsRc"
              >
                <button className="btn btn-primary">Pay Now</button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
