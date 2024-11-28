import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const Coding = ({ code = "", solutionBy = "" }) => {
    const { id } = useParams();
    const { addNewSubmission } = useContext(AuthContext);
    const [codeText, setCodeText] = useState(code);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const submitCodeHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addNewSubmission({ questionId: id, code: codeText });
            toast.success('Code submitted successfully!');
            navigate(`/submissions/${data.submission._id}`);

        } catch (error) {
            console.log(Error);
        }
    };

    return (
        <>
            <div>
                <div className="bg-gray-600 p-6 rounded-lg shadow-md">
                    <h3 className="text-gray-900 text-lg font-bold mb-6">
                        {
                            solutionBy
                                ? <p className="text-gray-300">
                                    Solution:: 
                                    <span className="text-indigo-200">
                                        @{solutionBy}
                                    </span>
                                </p>
                                : 'Code...'
                        }
                    </h3>
                    <form className='text-center '>
                        <div className="mb-4">
                            <textarea
                                className="h-[25rem] w-full bg-gray-50"
                                name="codeText"
                                placeholder="Type your code here..."
                                value={codeText || ""}
                                disabled={code && true}
                                onChange={(e) => setCodeText(e.target.value)}
                            ></textarea>
                        </div>
                        <div className={`text-right ${code ? 'hidden' : ''}`}>
                            <button
                                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 w-1/5 rounded focus:outline-none focus:shadow-outline ${!codeText || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={!codeText || isSubmitting}
                                onClick={submitCodeHandler}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}
export default Coding;