import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ICategory, IProduct } from "@/commons/interfaces";
import CategoryService from "@/services/CategoryService";
import ProductService from "@/services/ProductService";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export function ProductFormPageV2() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IProduct>();
  const [apiError, setApiError] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [entity, setEntity] = useState<IProduct>({
    id: undefined,
    name: "",
    price: 0,
    description: "",
    category: { id: undefined, name: "" },
  });

  // Executa ao carregar o componente
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    reset(entity);
  }, [entity, reset]);

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
            setEntity({
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
      setEntity((previousEntity) => {
        return {
          ...previousEntity,
          category: { id: categories[0]?.id, name: "" },
        };
      });
    }
  };

  const onSubmit = (data: IProduct) => {
    const product: IProduct = {
      ...data,
      id: entity.id,
      category: { id: data.category.id, name: "" },
    };

    ProductService.save(product)
      .then(() => {
        navigate("/products-v2");
      })
      .catch(() => {
        setApiError("Falha ao salvar o produto.");
      });
  };

  return (
    <>
      <div className="container">
        <h1 className="fs-2 text-center">Cadastro de Produto - V2</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name && true}>
            <FormLabel htmlFor="name">Nome</FormLabel>
            <Input
              id="name"
              placeholder="Nome do produto"
              {...register("name", {
                required: "O campo nome é obrigatório",
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.price && true}>
            <FormLabel htmlFor="price">Preço</FormLabel>
            <Input
              id="price"
              placeholder="0.0"
              {...register("price", {
                required: "O campo preço é obrigatório",
                min: {
                  value: 0.01,
                  message: "O valor deve ser maior que zero",
                },
              })}
              type="number"
              step="any"
            />

            <FormErrorMessage>
              {errors.price && errors.price.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.description && true}>
            <FormLabel htmlFor="description">Descrição</FormLabel>
            <Textarea
              id="description"
              maxLength={1024}
              placeholder="Descrição do produto"
              {...register("description", {
                required: "O campo descrição é obrigatório",
                minLength: {
                  value: 2,
                  message: "O tamanho deve ser entre 2 e 1024 caracteres",
                },
                maxLength: {
                  value: 1024,
                  message: "O tamanho deve ser entre 2 e 1024 caracteres",
                },
              })}
              size="sm"
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.category && true}>
            <FormLabel htmlFor="category">Categoria</FormLabel>

            <Select
              id="category"
              {...register("category.id", {
                required: "O campo categoria é obrigatório",
              })}
              size="sm"
            >
              {categories.map((category: ICategory) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>

            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <div className="text-center">
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Salvar
            </Button>
          </div>
        </form>
        {apiError && <div className="alert alert-danger">{apiError}</div>}
        <div className="text-center">
          <Link to="/products-v2">Voltar</Link>
        </div>
      </div>
    </>
  );
}
