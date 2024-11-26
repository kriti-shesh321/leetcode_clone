import { useContext, useState, useEffect } from "react";
import Listings from "../components/Listings";
import AuthContext from "../context/AuthContext";

const UserSubmissionsListingPage = () => {
  const problemPage = false;
  const { getAllUserSubmissions } = useContext(AuthContext);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const heading = 'Your Submissions';
  const columns = [
    { key: 'question', label: 'Question' },
    { key: 'difficulty', label: 'Difficulty' },
    { key: 'updatedAt', label: 'Submitted On' },
  ];

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const data = await getAllUserSubmissions();
        const submissionData = data.map((e) => {
          const date = new Date(e.updatedAt);
          return {
            _id: e._id,
            question: e.question.title,
            difficulty: e.question.difficulty,
            submittedAt: date.toLocaleString()
          }
        }
        );
        setSubmissions(submissionData);

      } catch (error) {
        console.log('Error fetching data.');

      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();

  }, [getAllUserSubmissions]);

  return (
    <Listings problemPage={problemPage} heading={heading} data={submissions} columns={columns} loading={loading} />
  )
}
export default UserSubmissionsListingPage;