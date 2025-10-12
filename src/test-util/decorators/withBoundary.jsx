import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, info: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        this.setState({ info });
        if (this.props.onError) this.props.onError(error, info);
    }

    componentDidUpdate(prevProps) {
        if (this.props.resetKey !== prevProps.resetKey && this.state.hasError) {
            this.setState({ hasError: false, error: null, info: null });
        }
    }

    reset = () => this.setState({ hasError: false, error: null, info: null });

    render() {
        const { hasError, error, info } = this.state;
        const { fallback, children } = this.props;

        if (hasError) {
            if (typeof fallback === 'function') {
                return fallback({ error, info, reset: this.reset });
            }
            return fallback ?? (
                <div role="alert" style={{ padding: 12 }}>
                    <h2>Something went wrong.</h2>
                    <pre>{String(error)}</pre>
                    <button onClick={this.reset}>Try again</button>
                </div>
            );
        }

        return children;
    }
}

const withBoundary = (Story, context) => {
    return (
        <ErrorBoundary>
            <Story />
        </ErrorBoundary>
    );
};

export default withBoundary;