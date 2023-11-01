import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IProduct } from "@/commons/interfaces";
import ProductService from "@/services/ProductService";
import {
  BsPlusCircle,
  BsThreeDotsVertical,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

export function ProductListPageV2() {
  const [data, setData] = useState<IProduct[]>([]);
  const [apiError, setApiError] = useState("");
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    ProductService.findAll()
      .then((response) => {
        setData(response.data);
        setApiError("");
      })
      .catch(() => {
        setApiError("Falha ao carregar a lista de produtos");
      });
  };

  const onEdit = (path: string) => {
    navigate(path);
  };

  const onRemove = (id: number) => {
    ProductService.remove(id)
      .then(() => {
        setShowDeleteMessage(true);
        loadData();
        setTimeout(() => {
          setShowDeleteMessage(false);
        }, 1500);
        setApiError("");
      })
      .catch(() => {
        setApiError("Falha ao remover o produto");
      });
  };

  return (
    <>
      <div className="container">
        <h1 className="fs-2 mb-4 text-center">Lista de Produtos V2</h1>
        <div className="text-center">
          <Link
            className="btn btn-success btn-icon mb-3"
            to="/products-v2/new"
            title="Novo Produto"
            style={{ display: "inline-block" }}
          >
            <BsPlusCircle style={{ display: "inline-block" }} /> Novo Produto
          </Link>
        </div>
        <TableContainer>
          <Table>
            <TableCaption>Lista de Produtos</TableCaption>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Nome</Th>
                <Th isNumeric>Preço</Th>
                <Th>Categoria</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((product: IProduct) => (
                <Tr
                  key={product.id}
                  _hover={{ cursor: "pointer", background: "#eee" }}
                >
                  <Td>{product.id}</Td>
                  <Td>{product.name}</Td>
                  <Td isNumeric>{product.price}</Td>
                  <Td>{product.category?.name}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Actions"
                        icon={<BsThreeDotsVertical size={20} />}
                        variant="ghost"
                      />
                      <MenuList>
                        <MenuItem
                          icon={<BsPencilSquare />}
                          onClick={() => onEdit(`/products-v2/${product.id}`)}
                        >
                          Editar
                        </MenuItem>
                        <MenuItem
                          icon={<BsTrash />}
                          onClick={() => onRemove(product.id!)}
                        >
                          Remover
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {apiError && <div className="alert alert-danger">{apiError}</div>}
        {showDeleteMessage && <div className="alert alert-success">Produto removido com sucesso!</div>}
      </div>
    </>
  );
}
