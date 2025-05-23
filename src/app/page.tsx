import Home from "./components/home";
import { CartProvider } from "./components/pages/context/CardContext";
export default function Displayer() {
  return (
    <>
      <CartProvider>
        <Home />
        <script
          src="//code.tidio.co/1m35cprpcgh8sd7szuteh43esoyazbqh.js"
          async
        ></script>
      </CartProvider>
    </>
  );
}
