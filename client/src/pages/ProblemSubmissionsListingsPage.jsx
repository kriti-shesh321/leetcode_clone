import { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SubmissionListingByQuestion from '../components/SubmissionListingByQuestion';
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";

const ProblemSubmissionsListingsPage = () => {
    const { id } = useParams();
    const { getSubmissionsByQuestion } = useContext(AuthContext);
    const [submissions, setSubmissions] = useState([]);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const data = await getSubmissionsByQuestion(id);
                if (data.length !== 0) {
                    setQuestion(data[0].question);

                    const submissionData = data.map((e) => {
                        const date = new Date(e.updatedAt);
                        return {
                            _id: e._id,
                            code: e.code,
                            user: e.user ? e.user.username : null,
                            submittedAt: date.toLocaleString()
                        }
                    });
                    setSubmissions(submissionData);
                }
            } catch (error) {
                console.log('Error fetching data.', Error);

            } finally {
                setLoading(false);
            }
        };
        fetchSubmissions();

    }, [getSubmissionsByQuestion]);

    return (
        loading
            ? <Spinner />
            : <SubmissionListingByQuestion question={question} submissions={submissions} />
    )
}
export default ProblemSubmissionsListingsPage;