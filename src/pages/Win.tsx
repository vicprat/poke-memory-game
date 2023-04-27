import { Link } from "react-router-dom"

const Win = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="block text-center">
        <h1 className="text-2xl font-semibold">You won</h1>
        <Link to="/">
        <button className="mt-4 rounded-md bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Play again</button>
        </Link>
        </div>
    </div>
  )
}

export default Win