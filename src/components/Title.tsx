interface TitleProps {
    text: string;
  }

const Title:  React.FC<TitleProps>  = ({text}) => {
  return (
    <h1 
    className="text-2xl font-semibold text-gray-600 capitalize"
    >{text}
    </h1>
  )
}

export default Title