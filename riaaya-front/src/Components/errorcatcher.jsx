import { Component } from 'react';

class ErrorCatcher extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo: null };
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true, errorInfo: info });
        console.error(error);
    }

    render() {
        if (this.state.hasError) {
            return <pre className="p-4 text-red-600">{this.state.errorInfo?.componentStack}</pre>;
        }

        return this.props.children;
    }
}

export default ErrorCatcher;
