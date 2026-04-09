import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public props: Props;
  public state: State;

  constructor(props: Props) {
    super(props);
    this.props = props;
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#000', 
          color: '#fff', 
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace'
        }}>
          <h1 style={{ color: '#06b6d4' }}>SYSTEM ERROR</h1>
          <p>The application encountered a critical error.</p>
          <pre style={{ 
            backgroundColor: '#111', 
            padding: '10px', 
            border: '1px solid #333',
            maxWidth: '80%',
            overflow: 'auto'
          }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#fff',
              color: '#000',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            RELOAD APP
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
