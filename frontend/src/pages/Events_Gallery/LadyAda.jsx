import Masonry from "../../../Masonary/Masonry/Masonry"; // Double check this spelling "Masonary" vs "Masonry"
import Navbar from '../../Navbar'; // Check if this path is correct relative to this file

import image1 from '../../../src/assets/events_gallery/LadyAda/1.jpg';
import image2 from '../../../src/assets/events_gallery/LadyAda/2.jpg';
import image3 from '../../../src/assets/events_gallery/LadyAda/3.jpg';
import image4 from '../../../src/assets/events_gallery/LadyAda/4.jpg';

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