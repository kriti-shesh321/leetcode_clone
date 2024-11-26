import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProblemDetails from "../components/ProblemDetails"
import ViewAllSubmissions from "../components/ViewAllSubmissions";
import Coding from "../components/Coding";
import AuthContext from "../context/AuthContext";
import Spinner from "../components/Spinner";

const SubmissionPage = () => {
    const { id } = useParams();
    const { getSubmissionsById } = useContext(AuthContext);
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState(null);
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                const data = await getSubmissionsById(id);
                setProblem(data.question);
                setCode(data.code);
                setUser(data.user.username);

            } catch (error) {
                console.log('Error fetching submission.');

            } finally {
                setLoading(false);
            }
        };
        fetchSubmission();
    }, [getSubmissionsById]);

    return (
        loading
            ?
            <Spinner />
            :
            <section className="bg-gray-700 border-t border-gray-500">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-40/60 w-full gap-8">
                        <div>
                            <ProblemDetails problem={problem} />
                            <ViewAllSubmissions questionId={problem._id} />
                        </div>
                        <Coding code={code} solutionBy={user}/>
                    </div>
                </div>
            </section>
    )
};
export default SubmissionPage;