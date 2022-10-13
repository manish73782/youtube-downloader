import React from "react";

function contact_us() {
  return (
    <div
      className="p-5"
      style={{
        backgroundColor: "#e2e8f0",
      }}
    >
      <div className="bg-white p-5 rounded">
        <h1>Contact us</h1>
        <div>
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Message</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter Message"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default contact_us;
