import Masonry from "../../../Masonary/Masonry/Masonry"; // Double check this spelling "Masonary" vs "Masonry"
import Navbar from '../../Navbar'; // Check if this path is correct relative to this file

import image1 from '../../../src/assets/events_gallery/LadyAda/1.JPG';
import image2 from '../../../src/assets/events_gallery/LadyAda/2.JPG';
import image3 from '../../../src/assets/events_gallery/LadyAda/3.JPG';
import image4 from '../../../src/assets/events_gallery/LadyAda/4.JPG';
import image5 from '../../../src/assets/events_gallery/LadyAda/5.JPG';
import image6 from '../../../src/assets/events_gallery/LadyAda/6.JPG';
import image7 from '../../../src/assets/events_gallery/LadyAda/7.JPG';
import image8 from '../../../src/assets/events_gallery/LadyAda/8.JPG';
import image9 from '../../../src/assets/events_gallery/LadyAda/9.JPG';
import image10 from '../../../src/assets/events_gallery/LadyAda/10.jpeg';
import image11 from '../../../src/assets/events_gallery/LadyAda/11.jpeg';
import image12 from '../../../src/assets/events_gallery/LadyAda/12.jpeg';
import image13 from '../../../src/assets/events_gallery/LadyAda/13.jpeg';
import image14 from '../../../src/assets/events_gallery/LadyAda/14.JPG';
import image15 from '../../../src/assets/events_gallery/LadyAda/15.JPG';

const items = [
    {
      id: "1",
      img: image1,
      url: null,
      height: 400,
    },
    {
      id: "2",
      img: image2,
      url: null,
      height: 550,
    },
    {
      id: "3",
      img: image3,
      url: null,
      height: 500,
    },
    {
      id: "4",
      img: image4,
      url: null,
      height: 570,
    },
    {
      id: "5",
      img: image5,
      url: null,
      height: 500,
    },
    {
      id: "6",
      img: image6,
      url: null,
      height: 650,
    },
    {
      id: "7",
      img: image7,
      url: null,
      height: 800,
    },
    {
      id: "8",
      img: image8,
      url: null,
      height: 500,
    },
    {
      id: "9",
      img: image9,
      url: null,
      height: 500,
    },
    {
      id: "10",
      img: image10,
      url: null,
      height: 700,
    },
    {
      id: "11",
      img: image11,
      url: null,
      height: 700,
    },
    {
      id: "12",
      img: image12,
      url: null,
      height: 650,
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
      height: 425,
    },
    {
      id: "15",
      img: image15,
      url: null,
      height: 400,
    },

];

function LadyAda() {
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

export default LadyAda;