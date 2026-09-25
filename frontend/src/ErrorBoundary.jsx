import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ error: error, errorInfo: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', backgroundColor: '#ffebe9', color: '#ff0000', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>CRITICAL REACT CRASH</h1>
          <p style={{ marginTop: '20px' }}>Something went wrong during rendering. Please take a screenshot of this error:</p>
          <pre style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff', border: '1px solid #ff0000', overflowX: 'auto' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </pre>
          <button 
            onClick={() => { localStorage.clear(); window.location.href='/'; }} 
            style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#ff0000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
            Emergency Reset (Clear LocalStorage & Go Home)
          </button>
        </div>
      );
    }
    return this.props.children; 
  }
}

export default ErrorBoundary;
