import { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import './Home.css';

function Home() {
  const wrapperRef = useRef(null);

  return (
    <main className="home-container" ref={wrapperRef}>
      {/* Spline 3D scene */}
      <div className="spline-wrapper">
        <Spline
          scene="https://prod.spline.design/C6ZCHkUf6TA8vvX5/scene.splinecode"
          className="spline-scene"
        />
      </div>

      {/* ACM-W Button */}
      <a
        href="https://upesacmw.org" 
        className="acmw-button"
        target="_blank"
        rel="noopener noreferrer"
      >
      Visit ACM-W
      </a>

    </main>
  );
}

export default Home;
