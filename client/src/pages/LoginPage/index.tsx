import axios from "axios";
import { ChangeEvent, useState } from "react";

export function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [userAuthenticated, setUserAuthenticated] = useState("");
  const [apiError, setApiError] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((previousState) => {
      return {
        ...previousState,
        [name]: value,
      };
    });

    setErrors((previousState) => {
      return {
        ...previousState,
        [name]: undefined,
      };
    });
  };

  const onClickSignup = () => {
    setPendingApiCall(true);
    console.log(form);
    axios
      .post("http://localhost:8025/login", form)
      .then((response) => {
        setUserAuthenticated(response.data.token);
        setApiError("");
      })
      .catch((responseError) => {
        if (responseError.response.data) {          
          setApiError(responseError.response.data.message);
          setUserAuthenticated("");
        }
      })
      .finally(() => {
        setPendingApiCall(false);
      });
  };

  return (
    <>
      <main className="container">
        <form>
          <div className="text-center">
            <h1 className="h3 mb-3 fw-normal">Login</h1>
          </div>

          <div className="form-floating mb-3">
            <input
              name="username"
              className={
                errors.username ? "form-control is-invalid" : "form-control"
              }
              type="text"
              placeholder="Informe seu usuário"
              onChange={onChange}
            />
            <label htmlFor="username">Informe seu usuário</label>
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          <div className="form-floating mb-3">
            <input
              name="password"
              className={
                errors.password ? "form-control is-invalid" : "form-control"
              }
              type="password"
              placeholder="Informe sua senha"
              onChange={onChange}
            />
            <label htmlFor="password">Informe sua senha</label>
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button
            className="w-100 btn btn-lg btn-primary mb-3"
            type="button"
            disabled={pendingApiCall}
            onClick={onClickSignup}
          >
            {pendingApiCall && (
              <div
                className="spinner-border text-light-spinner spinner-border-sm mr-sm-1"
                role="status"
              >
                <span className="visually-hidden">Aguarde...</span>
              </div>
            )}
            Login
          </button>
          {userAuthenticated && (
            <div className="col-12 mb-3">
              <div className="alert alert-success">{userAuthenticated}</div>
            </div>
          )}
          {apiError && (
            <div className="col-12 mb-3">
              <div className="alert alert-danger">{apiError}</div>
            </div>
          )}
        </form>
      </main>
    </>
  );
}
