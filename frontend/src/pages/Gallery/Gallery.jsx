import InfiniteMenu from './GalleryMenu'
import Navbar from '../../Navbar'; 

import prodigyimg from '../../assets/gallery_ball/prodigy.png';
import ladyadaimg from '../../assets/gallery_ball/Lady_Ada.jpeg';
import aicwicimg from '../../assets/gallery_ball/AICWiC.JPG';
import HOAIimg from '../../assets/gallery_ball/HOAI.JPG';

function Gallery() {

  const items = [
    {
      image: prodigyimg,
      link: '/prodigy25', 
      title:"Prodigy' 25",
      description: 'The ACM tech fest'
    },
    {
      image: ladyadaimg,
      link: '/ladyada',
      title: 'Lady Ada',
      description: 'Innovation powered by women.'
    },
    {
      image: aicwicimg,
      link: '/aicwic',
      title: "AICWiC' 25",
      description: 'Celebrating Women in Technology'
    },
    {
      image: HOAIimg,
      link: '/hoai',
      title: "HOAI",
      description: 'AI For Social Good'
    },
    
  ];

  return (
    <>
    <Navbar />
    <div style={{ height: '100%', position: 'relative' }}>
      <InfiniteMenu items={items} />
    </div>
    </>
  );
}

export default Gallery;