import './index.css'

const FailureView = props => {
  const {tryAgain} = props
  const onTryAgain = () => {
    tryAgain()
  }

  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dtjcxf7z5/image/upload/v1650297174/Mini%20Project%20Netflix%20Clone/Background-Complete_t8c6zl.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-description">
        Something went wrong. Please try again
      </p>
      <button type="button" className="try-again-button" onClick={onTryAgain}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
