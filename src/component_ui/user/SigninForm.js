import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../../auth/index";
import "./sing.css";
import googleImg from "../../images/google_icon.svg";
import facebookImg from "../../images/facebook.svg";
import Footer from "../footer/Footer";
const SigninForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (field) => {
    return (event) => {
      setValues({ ...values, error: false, [field]: event.target.value });
    };
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            error: "",
            loading: false,
            redirectToReferrer: true,
          });
        });
      }
    });
  };
  const signInFrom = () => (
    // <form onSubmit={clickSubmit}>
    //   <label className="text-muted">
    //     Email:
    //     <input
    //       onChange={handleChange("email")}
    //       type="email"
    //       className="form-control"
    //       value={email}
    //     />
    //   </label>
    //   <label>
    //     Password:
    //     <input
    //       onChange={handleChange("password")}
    //       type="password"
    //       value={password}
    //     />
    //   </label>

    //   <input type="submit" value="Submit"/>
    // </form>

    <div id="box">
      <div className="soc">
        <div className="soc--btn facebook">
          <img src={facebookImg} alt="facebook" />
          <span>Sign in with Facebook</span>
        </div>
        <div className="soc--btn google">
          <img src={googleImg} alt="google" />
          <span>Sign in with google</span>
        </div>
      </div>

      {/* <div class="block-wrap">
        <div>
          <a class="btn-google" href="">
            <div class="google-content">
              <div class="logo">
                <img src={googleImg} alt="google" />
              </div>
              <p>Sign in with Google</p>
            </div>
          </a>
        </div>

        <div>
          <a class="btn-fb" href="">
            <div class="fb-content">
              <div class="logo">
                <img src={facebookImg} alt="facebook" />
              </div>
              <p>Sign in with Facebook</p>
            </div>
          </a>
        </div>
      </div> */}
      <h3>or sign in using phone</h3>
      <form>
        <input type="text" placeholder="USERNAME" />
        <input type="text" placeholder="PASSWORD" />
      </form>
      <a href="#">forgot ?</a>
      <input type="submit" value="Signin" />

      <div class="signup">
        <p>
          not a member ? <a href="#">sign up</a>
        </p>
      </div>
    </div>
  );

  // const showError = () => (
  //   <div
  //     className="alert alert-danger"
  //     style={{ display: error ? "" : "none" }}
  //   >
  //     {error}
  //   </div>
  // );

  // const showLoading = () =>
  //   loading && (
  //     <div className="alert alert-info">
  //       <h2>Loading...</h2>
  //     </div>
  //   );

  // const redirectUser = () => {
  //   if (redirectToReferrer) {
  //     if (user && user.role === 1) {
  //       return <Redirect to="/admin/dashboard" />;
  //     } else {
  //       return <Redirect to="/user/dashboard" />;
  //     }
  //   }
  // };
  return (
    <div className="">
      {/* {showLoading()}
      {showError()} */}
      {signInFrom()}
      {/* {redirectUser()} */}
      <Footer></Footer>
    </div>
  );
};

export default SigninForm;
