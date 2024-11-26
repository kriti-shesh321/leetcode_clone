import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProblemDetails from "../components/ProblemDetails";
import ViewAllSubmissions from "../components/ViewAllSubmissions";
import Coding from '../components/Coding';
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";

const ProblemPage = () => {
    const { id } = useParams();
    const { getProblemById } = useContext(AuthContext);
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblem = async () => {
            try {
                const data = await getProblemById(id);
                setProblem(data);

            } catch (error) {
                console.log('Error fetching problem.');

            } finally {
                setLoading(false);
            }
        };
        fetchProblem();
    }, []);

    return (
        loading
            ? <Spinner />
            : <section className="bg-gray-700 border-t border-gray-500">
                <div className="container m-auto py-10 px-6">
                    <div className="grid grid-cols-1 md:grid-cols-40/60 w-full gap-8">
                        <div>
                            <ProblemDetails problem={problem} />
                            <ViewAllSubmissions questionId={problem._id}/>
                        </div>
                        <Coding code={""}/>
                    </div>
                </div>
            </section>
    )
}
export default ProblemPage;