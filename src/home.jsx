import { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import './Home.css';
import patch from '../src/assets/logo.png'; // Adjust path if needed

function Home() {
  const wrapperRef = useRef(null);

  return (
    <main className="home-container" ref={wrapperRef}>
      <div className="spline-wrapper">
        <Spline
          scene="https://prod.spline.design/C6ZCHkUf6TA8vvX5/scene.splinecode"
          className="spline-scene"
        />
      </div>

      <img
        src={patch}
        alt="Watermark Patch"
        className="watermark-patch"
      />
    </main>
  );
}

export default Home;
