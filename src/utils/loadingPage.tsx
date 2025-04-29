import './loadingPage.css';

function LoadingPage() {
  return (
    <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading...</div>
    </div>
  );
}

export default LoadingPage;
