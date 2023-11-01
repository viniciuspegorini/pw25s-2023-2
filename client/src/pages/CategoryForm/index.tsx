import { ChangeEvent, useState, useEffect } from "react";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from "@/components/Input";
import { ICategory } from "@/commons/interfaces";
import CategoryService from "@/services/CategoryService";
import { useNavigate, useParams } from "react-router-dom";

export function CategoryFormPage() {
  const [form, setForm] = useState<ICategory>({
    id: undefined,
    name: "",
  });
  const [errors, setErrors] = useState({
    id: undefined,
    name: "",
  });
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [apiError, setApiError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => { 
    if (id) {
        CategoryService.findById(parseInt(id))
            .then((response) => {
                if (response.data) {
                    setForm({
                        id: response.data.id,
                        name: response.data.name
                    });                    
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
  }, []);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: value,
      };
    });
    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: "",
      };
    });
  };

  const onSubmit = () => {

    const category: ICategory = {
      id: form.id,
      name: form.name
    };
    setPendingApiCall(true);
    CategoryService.save(category)
      .then((response) => {
        console.log(response);
        setPendingApiCall(false);
        navigate("/categories");
      })
      .catch((responseError) => {
        if (responseError.response.data.validationErrors) {
          setErrors(responseError.response.data.validationErrors);
        }
        setPendingApiCall(false);
        setApiError(true);
      });
  };
  
  return (
    <>
      <main className="container">
        <form>
          <div className="text-center">
            <h1 className="h3 mb-3 fw-normal">Cadastro de Categoria</h1>
          </div>

          <div className="form-floating mb-3">
            <Input
              className="form-control"
              name="name"
              label="Nome"
              placeholder="Informe o nome"
              type="text"
              value={form.name}
              onChange={onChange}
              hasError={errors.name ? true : false}
              error={errors.name}
            />
          </div>
          {apiError && (
            <div className="alert alert-danger">
              Falha ao cadastrar a categoria.
            </div>
          )}

          <ButtonWithProgress
            className="w-100 btn btn-lg btn-primary mb-3"
            onClick={onSubmit}
            disabled={pendingApiCall ? true : false}
            pendingApiCall={pendingApiCall}
            text="Salvar"
          />
        </form>
      </main>
    </>
  );
}
