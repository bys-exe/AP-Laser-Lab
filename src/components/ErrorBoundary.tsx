
import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[CRITICAL] ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-lab-bg flex items-center justify-center p-8 font-mono">
          <div className="max-w-2xl w-full border border-red-500/30 bg-red-500/5 p-8 md:p-12 space-y-6">
            <div className="flex items-center gap-4 text-red-500">
              <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-red-500 flex items-center justify-center font-black text-xl md:text-2xl">!</div>
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-tighter">System Failure</h1>
            </div>
            
            <div className="space-y-4">
              <p className="text-[var(--text-muted)] text-xs md:text-sm leading-relaxed">
                The application encountered a critical runtime exception. This may be due to a rendering conflict or an unhandled state transition.
              </p>
              
              <div className="bg-lab-surface p-4 border border-lab-border overflow-x-auto">
                <code className="text-red-400 text-[10px] md:text-xs">
                  {this.state.error?.toString()}
                </code>
              </div>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-red-500 text-black font-black py-4 uppercase tracking-widest hover:bg-red-400 transition-colors text-xs md:text-sm"
            >
              Reboot System
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
