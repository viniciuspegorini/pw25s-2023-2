import { IUserLogin } from "@/commons/interfaces";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from "@/components/Input";
import AuthService from "@/services/AuthService";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  const onClickLogin = () => {
    setPendingApiCall(true);
    const userLogin: IUserLogin = {
      username: form.username,
      password: form.password,
    };
    AuthService.login(userLogin)
      .then((response) => {
        setUserAuthenticated(response.data.token);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setApiError("");
        setPendingApiCall(false);
        // direcionar o usuário para a página inicial
        navigate("/");
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
            <Input
              label="Informe seu usuário"
              name="username"
              className="form-control"
              type="text"
              placeholder="Informe seu usuário"
              value={form.username}
              onChange={onChange}
              hasError={false}
              error=""
            />
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
            onClick={onClickLogin}
            pendingApiCall={pendingApiCall}
            text="Entrar"
          />

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
        <div className="text-center">
          <span>Não possui cadastro </span>
          <Link to="/signup">Cadastre-se aqui</Link>
        </div>
      </main>
    </>
  );
}
