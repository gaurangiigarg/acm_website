import LaserFlow from '../LaserFlow/LaserFlow';
import './Home.css'; // CSS MOVED HERE

function LaserFlowBoxExample() {
  return (
    <div className="laserflow-container">
      
      {/* FULLSCREEN LASERFLOW */}
      <LaserFlow
        style={{
          position: 'absolute',
          inset: 0,
          height: '100%',
          width: '100%',
        }}
        LaserFlowBoxExample={false}
        horizontalSizing={2}
        verticalSizing={5}
        wispDensity={1}
        wispSpeed={15}
        wispIntensity={5}
        flowSpeed={0.35}
        flowStrength={0.25}
        fogIntensity={0.45}
        fogScale={0.39}
        fogFallSpeed={0.6}
        decay={1.45}
        falloffStart={1.2}
        horizontalBeamOffset={0.2}
        verticalBeamOffset={-0.5}
        color="#3d52f0"
      />

      {/* TEXT BLOCK (LEFT SIDE, CENTERED VERTICALLY) */}
      <div className="laserflow-text-block">
        <h1 className="laserflow-title">UPES ACM STUDENT CHAPTERS</h1>
        <p className="laserflow-subtitle">
          The Largest Computing Society, now at UPES
        </p>
        <div className="button-row">
  <a 
    href="https://www.upesacmw.org"
    className="text-button"
  >
    Visit ACM-W
  </a>

  <div className="text-button">
    Register Now
  </div>
</div>
      </div>

    </div>
  );
}

export default LaserFlowBoxExample;
