import { Link } from 'react-router-dom';

const ViewAllSubmissions = ({questionId}) => {
    return (
        <>
            <div className="bg-gray-600 p-7 rounded-lg shadow-md mt-14">
                <Link
                    to={`/submissions/question/${questionId}`}
                    className="bg-gray-700 hover:bg-gray-800 text-gray-300 text-center text-sm py-1 px-2 rounded-full focus:outline-none focus:shadow-outline mt-2 block"
                >
                    View All Submissions
                </Link>
                <Link
                    to='/problems'
                    className="bg-gray-900 hover:bg-gray-800 text-gray-300 text-center text-sm py-1 px-2 rounded-full focus:outline-none focus:shadow-outline mt-4 block w-full"
                >
                    Back to Problem List
                </Link>
            </div>
        </>
    )
}
export default ViewAllSubmissions;