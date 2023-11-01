import { IUserSignup } from "@/commons/interfaces";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from "@/components/Input";
import AuthService from "@/services/AuthService";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function UserSignupPage() {
  const [form, setForm] = useState({
    displayName: "",
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    displayName: "",
    username: "",
    password: "",
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [userSaved, setUserSaved] = useState("");
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

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
    const userSigup: IUserSignup = {
      displayName: form.displayName,
      username: form.username,
      password: form.password,
    };
    AuthService.signup(userSigup)
      .then((response) => {
        setUserSaved(response.data.message);
        setApiError("");
        navigate("/login");
      })
      .catch((responseError) => {
        if (responseError.response.data.validationErrors) {
          setErrors(responseError.response.data.validationErrors);

          setApiError(responseError.response.data.message);
          setUserSaved("");
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
            <h1 className="h3 mb-3 fw-normal">User Signup Page</h1>
          </div>

          <div className="form-floating mb-3">
            <Input
              label="Informe seu nome"
              name="displayName"
              className="form-control"
              type="text"
              placeholder="Informe seu nome"
              onChange={onChange}
              value={form.displayName}
              hasError={errors.displayName ? true : false}
              error={errors.displayName}
            />
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

          <ButtonWithProgress
            disabled={pendingApiCall}
            className="w-100 btn btn-lg btn-primary mb-3"
            onClick={onClickSignup}
            pendingApiCall={pendingApiCall}
            text="Cadastrar"
          />

          {userSaved && (
            <div className="col-12 mb-3">
              <div className="alert alert-success">{userSaved}</div>
            </div>
          )}
          {apiError && (
            <div className="col-12 mb-3">
              <div className="alert alert-danger">{apiError}</div>
            </div>
          )}
        </form>
        <div className="text-center">
          <span>Já possui cadastro </span>
          <Link to="/login">Autenticar-se</Link>
        </div>
      </main>
    </>
  );
}
