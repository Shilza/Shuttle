import React from 'react';

import styles from './errorBoundary.module.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  reloadPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h1>Something went wrong</h1>
          <button
            onClick={this.reloadPage}
            className={styles.reloadButton}
          >
            Reload
          </button>
        </div>
      )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
