import { Link, useParams } from 'react-router-dom';

const ProblemDetails = ({ problem }) => {
    return (
        <>
            <div className="bg-gray-600 text-gray-200 p-6 rounded-lg shadow-md">
                <h3 className="text-gray-100 text-xl font-bold mb-6">{problem.title}</h3>

                <p className="my-2">
                    {problem.description}
                </p>

                <hr className="mb-12" />

                <h3 className="font-bold">Sample Input:</h3>

                <p className="my-2 bg-gray-500 px-2">
                    {problem.sampleInput}
                </p>

                <h3 className="font-bold">Sample Output:</h3>

                <p className="my-2 bg-gray-500 px-2">{problem.sampleOutput}</p>
                <div className='mt-10 text-gray-400 text-sm'>
                    <span className='mr-5'>Difficulty: {problem.difficulty}</span>
                    |
                    <span className='ml-5'>Acceptance: {problem.acceptance}</span>
                    <p className='text-xs mt-2 text-gray-450'>Added By: @{problem.addedBy ? problem.addedBy.username : ""}</p>
                </div>
            </div>
        </>
    )
}
export default ProblemDetails;