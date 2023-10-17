import axios from "axios";
import { ChangeEvent, useState } from "react";

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
    console.log("Salvar um novo usuário");
    // JSON com os dados do usuário { displayName, username, password}
    console.log(form);
    // Chamada ao endpoint de cadastro de usuário
    console.log("TESTE Antes");
    axios.post("http://localhost:8025/users", form)
        .then((response) => {
            console.log("TESTE Sucesso");
            //console.log("Usuário salvo com sucesso");
            //console.log(response.data);
        })
        .catch((responseError) => {
            if (responseError.response.data.validationErrors) {
                setErrors(responseError.response.data.validationErrors);
            } 
        })
        .finally(() => {
            console.log("TESTE Final");
            //console.log("Sempre executa");
        });
    console.log("TESTE Depois do Axios");
  };

  return (
    <>
      <main className="container">
        <form>
          <div className="text-center">
            <h1 className="h3 mb-3 fw-normal">User Signup Page</h1>
          </div>

          <div className="form-floating mb-3">
            <input
              name="displayName"
              className={errors.displayName ? "form-control is-invalid" : "form-control"}
              type="text"
              placeholder="Informe seu nome"
              onChange={onChange}
            />
            <label htmlFor="displayName">Informe seu nome</label>
            {errors.displayName && <div className="invalid-feedback">{errors.displayName}</div>}
          </div>

          <div className="form-floating mb-3">
            <input
              name="username"
              className={errors.username ? "form-control is-invalid" : "form-control"}
              type="text"
              placeholder="Informe seu usuário"
              onChange={onChange}
            />
            <label htmlFor="username">Informe seu usuário</label>
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
          </div>

          <div className="form-floating mb-3">
            <input
              name="password"
              className={errors.password ? "form-control is-invalid" : "form-control"}
              type="password"
              placeholder="Informe sua senha"
              onChange={onChange}
            />
            <label htmlFor="password">Informe sua senha</label>
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button
            className="w-100 btn btn-lg btn-primary mb-3"
            type="button"
            onClick={onClickSignup}
          >
            Cadastrar
          </button>
          <h2>{form.displayName}</h2>
        </form>
      </main>
    </>
  );
}
