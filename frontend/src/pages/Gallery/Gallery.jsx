import InfiniteMenu from './GalleryMenu'
import Navbar from '../../Navbar'; 

import prodigyimg from '../../assets/gallery_ball/prodigy.png';
import ladyadaimg from '../../assets/gallery_ball/Lady_Ada.png';

function Gallery() {

  const items = [
    {
      image: prodigyimg,
      link: '/prodigy25', 
      title: 'Prodigy 25',
      description: 'The ACM tech fest'
    },
    {
      image: ladyadaimg,
      link: 'https://google.com/',
      title: 'Lady Ada',
      description: 'Innovation powered by women.'
    },
    {
      image: 'https://picsum.photos/500/500?grayscale',
      link: 'https://google.com/',
      title: 'Item 3',
      description: 'This is pretty cool, right?'
    },
    {
      image: 'https://picsum.photos/600/600?grayscale',
      link: 'https://google.com/',
      title: 'Item 4',
      description: 'This is pretty cool, right?'
    }
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