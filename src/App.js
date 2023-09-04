import RotateCarousel from "./Carousel";
import DynamicMenu from "./DynamicMenu";
import "./styles.css";

const menuItems = [
  { label: "HOME" },
  { label: "ELECTRONICS" },
  { label: "BOOKS" },
  { label: "MUSIC" },
  { label: "MOVIES" },
  { label: "CLOTHING" },
  { label: "GAMES" },
  { label: "FURNITURE" },
  { label: "ELECTRONICS" },
  { label: "TRAVEL" },
  { label: "BOTANICAL" },
  { label: "CATEGORY NAME" }
];
export default function App() {
  return (
    <div className="App">
      <DynamicMenu menuItems={menuItems} />
      <h1>Featured Products</h1>
      <p>Explore and discover a variety of products</p>
      <RotateCarousel />
    </div>
  );
}
