"use client";
import NavBar from "./pages/navbar";
import Carosel from "./pages/carosel";
import CategoriesPage from "./pages/cate";
import BestSeller from "./pages/BookByCategory/bestseller";
import NewArrivals from "./pages/BookByCategory/NewArrivals";
import UsedBookSelf from "./pages/UsedBookSelf/useBookSelf";
import WholeSale from "./pages/WholeSale";
import OurPicks from "./pages/ourPicks";
import BestAuthor from "./pages/BestAuthor";
import Footer from "./pages/footer";

const Home = () => {
  return (
    <>
      <NavBar />
      <Carosel />
      <CategoriesPage />
      <BestSeller />
      <UsedBookSelf />
      <NewArrivals />
      <WholeSale />
      <OurPicks />
      <BestAuthor noDesc={false} />
      <Footer />
    </>
  );
};

export default Home;
