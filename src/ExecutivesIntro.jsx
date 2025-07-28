import Spline from '@splinetool/react-spline';

export default function SplineViewer() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Spline scene="https://prod.spline.design/w3-p9GYGlW-WIgoR/scene.splinecode" />
    </div>
  );
}