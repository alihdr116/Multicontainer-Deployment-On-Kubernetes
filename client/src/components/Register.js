import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { adddata } from './context/ContextProvider';

const Register = () => {
    const { udata, setUdata } = useContext(adddata);
    const history = useHistory();

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        age: "",
        mobile: "",
        work: "",
        add: "",
        desc: ""
    });

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((preval) => ({
            ...preval,
            [name]: value
        }));
    };

    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, email, work, add, mobile, desc, age } = inpval;

        if (name === "") {
            alert("Name is required");
        } else if (email === "") {
            alert("Email is required");
        } else if (!email.includes("@")) {
            alert("Enter a valid email");
        } else if (work === "") {
            alert("Work is required");
        } else if (add === "") {
            alert("Address is required");
        } else if (mobile === "") {
            alert("Mobile is required");
        } else if (age === "") {
            alert("Age is required");
        } else {
            const res = await fetch("/create", {

                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, work, add, mobile, desc, age
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("Error");
                alert("Error");
            } else {
                history.push("/");
                setUdata(data);
                console.log("Data added");
            }
        }
    };

    return (
        <div className="container">
            <NavLink to="/">Home</NavLink>
            <form className="mt-4">
                <div className="row">
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" value={inpval.name} onChange={setdata} name="name" className="form-control" id="name" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" value={inpval.email} onChange={setdata} name="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="text" value={inpval.age} onChange={setdata} name="age" className="form-control" id="age" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="mobile" className="form-label">Mobile</label>
                        <input type="number" value={inpval.mobile} onChange={setdata} name="mobile" className="form-control" id="mobile" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="work" className="form-label">Work</label>
                        <input type="text" value={inpval.work} onChange={setdata} name="work" className="form-control" id="work" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" value={inpval.add} onChange={setdata} name="add" className="form-control" id="address" />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label htmlFor="desc" className="form-label">Description</label>
                        <textarea name="desc" value={inpval.desc} onChange={setdata} className="form-control" id="desc" cols="30" rows="5"></textarea>
                    </div>
                    <button type="submit" onClick={addinpdata} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
