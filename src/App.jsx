import RedbagPrint from './components/RedbagPrint';

export default function App() {
  return (
    <>
      <RedbagPrint />
      <footer className="app-footer">
        <div>🧧 紅包袋列印工具 · 毫米級精確定位</div>
        <div className="footer-links">
          <span>Port: 3007</span>
          <span>·</span>
          <span>A4 (210×297mm)</span>
          <span>·</span>
          <span>300 DPI Ultra HD</span>
        </div>
      </footer>
    </>
  );
}
