import Masonry from "../../../Masonary/Masonry/Masonry"; // Double check this spelling "Masonary" vs "Masonry"
import Navbar from '../../Navbar'; // Check if this path is correct relative to this file
import image1 from "../../assets/events_gallery/prodigy25/1.jpg";
import image2 from "../../assets/events_gallery/prodigy25/2.jpg";
import image3 from "../../assets/events_gallery/prodigy25/3.jpg";
import image4 from "../../assets/events_gallery/prodigy25/4.jpg";
import image5 from "../../assets/events_gallery/prodigy25/5.jpg";
import image6 from "../../assets/events_gallery/prodigy25/6.jpg";


const items = [
    {
      id: "1",
      img: image1,
      url: null,
      height: 600,
    },
    {
      id: "2",
      img: image2,
      url: null,
      height: 400,
    },
    {
      id: "3",
      img: image3,
      url: null,
      height: 600,
    },
    {
      id: "4",
      img: image4,
      url: null,
      height: 350,
    },
    {
      id: "5",
      img: image5,
      url: null,
      height: 900,
    },
    {
      id: "6",
      img: image6,
      url: null,
      height: 700,
    },
];

function Prodigy25() {
    // 👇 ADD THE RETURN HERE
    return (
        <>
            <Navbar />
            <div style={{ paddingTop: '100px' }}> {/* Added a container/padding so content isn't hidden behind Navbar */}
                <Masonry
                  items={items}
                  ease="power3.out"
                  duration={0.6}
                  stagger={0.05}
                  animateFrom="bottom"
                  scaleOnHover={true}
                  hoverScale={0.95}
                  blurToFocus={true}
                  colorShiftOnHover={false}
                />
            </div>
        </>
    );
}

export default Prodigy25;