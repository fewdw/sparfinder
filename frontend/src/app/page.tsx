import MainPageBanner from "./components/MainPageBanner";
import MainPageSection from "./components/MainPageSection";
import NavBar from "./components/NotLoggedNavBar";


export default function Home() {
  return (
    <div>
      <MainPageBanner></MainPageBanner>
      <MainPageSection></MainPageSection>
    </div>
  );
}
