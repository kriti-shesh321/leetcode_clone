import { useContext, useState, useEffect } from "react";
import Listings from "../components/Listings";
import AuthContext from "../context/AuthContext";

const ProblemsListingPage = () => {
  const problemPage = true;
  const { getAllProblems } = useContext(AuthContext);
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const heading = 'Explore Problems';
  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'difficulty', label: 'Difficulty' },
    { key: 'acceptance', label: 'Acceptance Rate' },
  ];

  useEffect(() => {
    const fetchAllProblems = async () => {
      try {
        const data = await getAllProblems();
        setProblems(data);

      } catch (error) {
        console.log('Error fetching data.');

      } finally {
        setLoading(false);
      }
    };
    fetchAllProblems();

  }, [getAllProblems]);
  return (
    <>
      <Listings problemPage={problemPage} heading={heading} data={problems} columns={columns} loading={loading} />
    </>
  );
};

export default ProblemsListingPage;