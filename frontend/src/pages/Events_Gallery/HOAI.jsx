import Masonry from "../../../Masonary/Masonry/Masonry"; // Double check this spelling "Masonary" vs "Masonry"
import Navbar from '../../Navbar'; // Check if this path is correct relative to this file

import image1 from '../../../src/assets/events_gallery/HOAI/1.jpeg';
import image2 from '../../../src/assets/events_gallery/HOAI/2.JPG';
import image3 from '../../../src/assets/events_gallery/HOAI/3.JPG';
import image4 from '../../../src/assets/events_gallery/HOAI/4.JPG';
import image5 from '../../../src/assets/events_gallery/HOAI/5.JPG';
import image6 from '../../../src/assets/events_gallery/HOAI/6.JPG';
import image7 from '../../../src/assets/events_gallery/HOAI/7.JPG';
import image8 from '../../../src/assets/events_gallery/HOAI/8.JPG';
import image9 from '../../../src/assets/events_gallery/HOAI/9.JPG';
import image10 from '../../../src/assets/events_gallery/HOAI/10.JPG';
import image11 from '../../../src/assets/events_gallery/HOAI/11.JPG';
import image12 from '../../../src/assets/events_gallery/HOAI/12.JPG';
import image13 from '../../../src/assets/events_gallery/HOAI/13.JPG';
import image14 from '../../../src/assets/events_gallery/HOAI/14.jpg';
import image15 from '../../../src/assets/events_gallery/HOAI/15.jpg';
import image16 from '../../../src/assets/events_gallery/HOAI/16.jpg';
import image17 from '../../../src/assets/events_gallery/HOAI/17.jpg';
import image18 from '../../../src/assets/events_gallery/HOAI/18.jpg';
import image19 from '../../../src/assets/events_gallery/HOAI/19.JPG';
import image20 from '../../../src/assets/events_gallery/HOAI/20.JPG';
import image21 from '../../../src/assets/events_gallery/HOAI/21.JPG';
import image22 from '../../../src/assets/events_gallery/HOAI/22.JPG';
import image23 from '../../../src/assets/events_gallery/HOAI/23.JPG';
import image24 from '../../../src/assets/events_gallery/HOAI/24.JPG';
import image25 from '../../../src/assets/events_gallery/HOAI/25.JPG';
import image26 from '../../../src/assets/events_gallery/HOAI/26.JPG';
import image27 from '../../../src/assets/events_gallery/HOAI/27.JPG';
import image28 from '../../../src/assets/events_gallery/HOAI/28.JPG';


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
      height: 300,
    },
    {
      id: "3",
      img: image3,
      url: null,
      height: 400,
    },
    {
      id: "4",
      img: image4,
      url: null,
      height: 500,
    },
    {
      id: "5",
      img: image5,
      url: null,
      height: 600,
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
      height: 500,
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
      height: 400,
    },
    {
      id: "10",
      img: image10,
      url: null,
      height: 600,
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
      height: 500,
    },
    {
      id: "13",
      img: image13,
      url: null,
      height: 600,
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
      height: 700,
    },
    {
      id: "16",
      img: image16,
      url: null,
      height: 500,
    },
    {
      id: "17",
      img: image17,
      url: null,
      height: 500,
    },
    {
      id: "18",
      img: image18,
      url: null,
      height: 400,
    },
    {
      id: "19",
      img: image19,
      url: null,
      height: 600,
    },
    {
      id: "20",
      img: image20,
      url: null,
      height: 600,
    },
    {
      id: "21",
      img: image21,
      url: null,
      height: 400,
    },
    {
      id: "22",
      img: image22,
      url: null,
      height: 600,
    },
    {
      id: "23",
      img: image23,
      url: null,
      height: 900,
    },
    {
      id: "24",
      img: image24,
      url: null,
      height: 400,
    },
    {
      id: "25",
      img: image25,
      url: null,
      height: 500,
    },
    {
      id: "26",
      img: image26,
      url: null,
      height: 300,
    },
    {
      id: "27",
      img: image27,
      url: null,
      height: 300,
    },
    {
      id: "28",
      img: image28,
      url: null,
      height: 300,
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