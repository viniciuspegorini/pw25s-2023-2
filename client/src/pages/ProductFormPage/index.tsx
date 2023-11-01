import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ICategory, IProduct } from "@/commons/interfaces";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Input } from "@/components/Input";
import CategoryService from "@/services/CategoryService";
import ProductService from "@/services/ProductService";

export function ProductFormPage() {
  // o objeto form armazena os dados do cadastro do produto no state do componente.
  const [form, setForm] = useState<IProduct>({
    id: undefined,
    name: "",
    price: 0,
    description: "",
    category: { id: undefined, name: "" },
  });
  // o objeto erros armazena o array de erros retornado pelo backend ao tentar cadastrar um produto com dados inválidos nos atributos.
  const [errors, setErrors] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    category: "",
  });
  // controla a situação da requisição HTTP que está sendo realizada ao servidor ao cadastrar um novo produto.
  const [pendingApiCall, setPendingApiCall] = useState(false);
  // apiError controla a exibição das mensagem de erro que ocorrem ao realizar uma requisição HTTP para o servidor.
  const [apiError, setApiError] = useState("");
  // lista de categorias utilizada para carregar o select
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // Executa ao carregar o componente
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Busca a lista de categorias
    await CategoryService.findAll()
      .then((response) => {
        // caso sucesso, adiciona a lista no state
        setCategories(response.data);
        setApiError("");
      })
      .catch(() => {
        setApiError("Falha ao carregar a combo de categorias.");
      });

    if (id) {
      // ao editar um produto, busca ele no back-end e carrega no objeto form que está no state.
      ProductService.findById(parseInt(id))
        .then((response) => {
          if (response.data) {
            setForm({
              id: response.data.id,
              name: response.data.name,
              price: response.data.price,
              description: response.data.description,
              category: { id: response.data.category.id, name: "" },
            });
            setApiError("");
          } else {
            setApiError("Falha ao carregar o produto");
          }
        })
        .catch(() => {
          setApiError("Falha ao carregar o produto");
        });
    } else {
      // ao cadastrar um novo produto, valoriza no objeto form a primeira categoria do select
      setForm((previousForm) => {
        return {
          ...previousForm,
          category: { id: categories[0]?.id, name: "" },
        };
      });
    }
  };

  //Função utilizada para controlar as alterações nos Inputs e TextArea
  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        [name]: undefined,
      };
    });
  };

  //Função utilizada para controlar as alterações no Select (para enviar a categoria ao servidor é necessário enviar o json no formato= categoria: {id: valor} )
  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    setForm((previousForm) => {
      return {
        ...previousForm,
        [name]: { id: value },
      };
    });
    setErrors((previousErrors) => {
      return {
        ...previousErrors,
        [name]: undefined,
      };
    });
  };

  const onSubmit = () => {
    const product: IProduct = {
      id: form.id,
      name: form.name,
      price: form.price!,
      description: form.description,
      category: form.category,
    };
    setPendingApiCall(true);

    ProductService.save(product)
      .then(() => {
        setPendingApiCall(false);
        navigate("/products");
      })
      .catch((error) => {
        if (error.response.data && error.response.data.validationErrors) {
          setErrors(error.response.data.validationErrors);
        }
        setApiError("Falha ao salvar o produto.");
        setPendingApiCall(false);
      });
  };

  return (
    <>
      <main className="container">
        <form>
          <div className="text-center">
            <h1 className="h3 mb-3 fw-normal">Cadastro de Produto</h1>
          </div>
          <div className="form-floating mb-3">
            <Input
              name="name"
              label="Nome"
              type="text"
              className="form-control"
              placeholder="Informe o nome"
              value={form.name}
              onChange={onChange}
              hasError={errors.name ? true : false}
              error={errors.name}
            />
          </div>
          <div className="form-floating mb-3">
            <Input
              name="price"
              label="Preço"
              type="text"
              className="form-control"
              placeholder="Informe o preço"
              value={form.price.toString()}
              onChange={onChange}
              hasError={errors.price ? true : false}
              error={errors.price}
            />
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              name="description"
              placeholder="Informe a descrição"
              value={form.description}
              onChange={onChange}
            ></textarea>
            <label>Descrição</label>
            {errors.description && (
              <div className="invalid-feedback d-block">
                {errors.description}
              </div>
            )}
          </div>
          <div className="form-floating mb-3">
            <select
              className="form-control"
              name="category"
              value={form.category.id}
              onChange={onChangeSelect}
            >
              {/* Monta a lista de options do Select de acordo com a lista de categorias vindas do servidor */}
              {categories.map((category: ICategory) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <label>Categoria</label>
            {errors.category && (
              <div className="invalid-feedback d-block">{errors.category}</div>
            )}
          </div>
          {apiError && <div className="alert alert-danger">{apiError}</div>}
          <div className="text-center mb-3">
            <ButtonWithProgress
              className="btn btn-primary"
              onClick={onSubmit}
              disabled={pendingApiCall ? true : false}
              pendingApiCall={pendingApiCall}
              text="Salvar"
            />
          </div>
          <div className="text-center">
            <Link to="/products" className="nav nav-link">
              Voltar
            </Link>
          </div>
        </form>
      </main>
    </>
  );
}
