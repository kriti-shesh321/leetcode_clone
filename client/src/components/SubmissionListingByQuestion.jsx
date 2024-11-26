import { Link } from "react-router-dom";

const SubmissionListingByQuestion = ({ question, submissions }) => {
    return (
        <section className="bg-gray-700 h-screen p-20 border-t">
            <div className="container bg-gray-800 m-auto p-2 sm:p-10 md:w-4/5">
                {submissions.length === 0
                    ? <h2 className="text-3xl font-extrabold text-gray-200 pb-3">No Submissions Found.</h2>
                    : (
                        <>
                            <p className="text-xl font-extrabold text-gray-300 pb-5">
                                <span>Problem: </span>
                                <Link
                                    className="text-indigo-300 font-bold italic hover:text-gray-100 hover:underline"
                                    to={`/problems/${question._id}`}
                                >
                                     {question.title}
                                </Link>
                            </p>
                            <table className="text-left text-lg text-gray-300 w-full">
                                <thead>
                                    <tr className="bg-gray-900 border-b border-gray-700">
                                        <th className="pt-2 px-2 md:p-2">Code Preview</th>
                                        <th className="pt-2 px-2 md:p-2">Submitted By</th>
                                        <th className="pt-2 px-2 md:p-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.map(submission => {
                                        return (
                                            <tr
                                                className="border-b border-gray-700"
                                                key={submission._id}
                                            >
                                                <td className="pt-2 px-2 md:p-2">
                                                    <Link
                                                        to={`/submissions/${submission._id}`}
                                                        className="hover:text-white hover:underline"
                                                    >
                                                        {submission.code.substring(0, 6) + " ..."}
                                                    </Link>
                                                </td>
                                                <td className="pt-2 px-2 md:p-2">{submission.user}</td>
                                                <td className="pt-2 px-2 md:p-2">{submission.submittedAt}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </>
                    )}
            </div>
        </section >
    )
}
export default SubmissionListingByQuestion;