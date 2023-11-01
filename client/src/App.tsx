import { BaseRoutes } from "@/routes/BaseRoutes";
import { ChakraProvider } from "@chakra-ui/react";

export function App() {
  return (
    <>
      <ChakraProvider>
        <BaseRoutes />
      </ChakraProvider>
    </>
  );
}
