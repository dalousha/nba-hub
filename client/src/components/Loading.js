import { Spinner } from 'react-bootstrap'

const Loading = ({ size = 30 }) => {
  return (
    <div className='spinner'>
      <Spinner
        style={{
          width: size,
          height: size
        }}
        animation="border"
      />
    </div>
  )
}

export default Loading;