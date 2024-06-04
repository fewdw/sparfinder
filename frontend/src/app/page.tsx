import MainPageBanner from "./components/MainPageBanner";
import MainPageSection from "./components/MainPageSection";
import NavBar from "./components/NavBar";
import ShowJWT from "./components/ShowJWT";

export default function Home() {
  return (
    <div>
      <ShowJWT></ShowJWT>
      <MainPageBanner></MainPageBanner>
      <MainPageSection></MainPageSection>
    </div>
  );
}
