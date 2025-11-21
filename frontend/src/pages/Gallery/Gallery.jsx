import InfiniteMenu from './GalleryMenu'
import Navbar from '../../Navbar'; 

import prodigyimg from '../../../src/assets/gallery_ball/1.jpg';

function Gallery() {

  const items = [
    {
      image: prodigyimg,
      link: '/prodigy25', 
      title: 'Prodigy 25',
      description: 'The ACM tech fest'
    },
    {
      image: 'https://picsum.photos/400/400?grayscale',
      link: 'https://google.com/',
      title: 'Item 2',
      description: 'This is pretty cool, right?'
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
    <div style={{ height: '100vh', position: 'relative' }}>
      <InfiniteMenu items={items} />
    </div>
    </>
  );
}

export default Gallery;