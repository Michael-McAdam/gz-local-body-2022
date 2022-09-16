import React from "react";

export class GenericErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError(error) {
    return {hasError: true}
  }

  componentDidCatch(error, errorInfo) {
    console.log("Caught error in GenericErrorBoundary:", error)
    // Could log to analytics if we want?
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorContent()
    }

    return this.props.children
  }
}