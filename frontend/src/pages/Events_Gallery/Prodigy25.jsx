import Masonry from "../../../Masonary/Masonry/Masonry"; // Double check this spelling "Masonary" vs "Masonry"
import Navbar from '../../Navbar'; // Check if this path is correct relative to this file
import image1 from "../../assets/events_gallery/prodigy25/1.jpg";
import image2 from "../../assets/events_gallery/prodigy25/2.jpg";
import image3 from "../../assets/events_gallery/prodigy25/3.jpg";
import image4 from "../../assets/events_gallery/prodigy25/4.jpg";
import image5 from "../../assets/events_gallery/prodigy25/5.jpg";
import image6 from "../../assets/events_gallery/prodigy25/6.jpg";
import image7 from "../../assets/events_gallery/prodigy25/7.jpg";
import image8 from "../../assets/events_gallery/prodigy25/8.jpg";
import image9 from "../../assets/events_gallery/prodigy25/9.jpg";
import image10 from "../../assets/events_gallery/prodigy25/10.jpg";
import image11 from "../../assets/events_gallery/prodigy25/image11.jpg";
import image12 from "../../assets/events_gallery/prodigy25/12.jpg";
import image13 from "../../assets/events_gallery/prodigy25/13.jpg";
import image14 from "../../assets/events_gallery/prodigy25/14.jpg";
import image15 from "../../assets/events_gallery/prodigy25/15.jpg";
import image16 from "../../assets/events_gallery/prodigy25/16.jpg";


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
    {
      id: "7",
      img: image7,
      url: null,
      height: 300,
    },
    {
      id: "8",
      img: image8,
      url: null,
      height: 180,
    },
    {
      id: "9",
      img: image9,
      url: null,
      height: 700,
    },
    {
      id: "10",
      img: image10,
      url: null,
      height: 500,
    },
    {
      id: "11",
      img: image11,
      url: null,
      height: 500,
    },
    {
      id: "12",
      img: image12,
      url: null,
      height: 400,
    },
    {
      id: "13",
      img: image13,
      url: null,
      height: 650,
    },
    {
      id: "14",
      img: image14,
      url: null,
      height: 500,
    },
    {
      id: "15",
      img: image15,
      url: null,
      height: 420,
    },
    {
      id: "16",
      img: image16,
      url: null,
      height: 400,
    },

];

function Prodigy25() {
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