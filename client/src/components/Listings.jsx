import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../components/Spinner";
import AuthContext from '../context/AuthContext';

const Listings = ({ problemPage, heading, data, columns, loading }) => {
  const { user } = useContext(AuthContext);

  return (
    loading
      ? <Spinner />
      : (
        <section className="bg-gray-700 min-h-screen py-10 lg:p-20 border-t">
          <div className="container bg-gray-800 mx-auto p-3 sm:p-14 md:w-4/5">
            {!data
              ? <h2 className="text-3xl font-extrabold text-gray-200 pb-3">Problems Not found.</h2>
              : (
                <>
                  <h2 className="text-3xl font-extrabold text-gray-200 pb-5">
                    {heading}
                  </h2>
                  <table className="text-left md:text-lg text-gray-300 w-full">
                    <thead>
                      <tr className="bg-gray-900 border-b border-gray-700">
                        {columns.map((col) => {
                          return (
                            <th
                              className="pt-2 px-2 md:p-2"
                              key={col.key}
                            >
                              {col.label}
                            </th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data.map((entry) => {
                          return (
                            <tr
                              className="border-b border-gray-700"
                              key={entry._id}
                            >
                              {problemPage
                                ? <>
                                  <td className="pt-3 px-2 lg:p-2">
                                    <Link
                                      to={user ? `/problems/${entry._id}` : '/login'}
                                      className="hover:text-white hover:underline"
                                    >
                                      {entry.title}
                                    </Link>
                                  </td>
                                  <td className="pt-3 px-2 lg:p-2">{entry.difficulty}</td>
                                  <td className="pt-3 px-2 lg:p-2">{entry.acceptance}</td>
                                </>
                                : <>
                                  <td className="pt-3 px-2 lg:p-2">
                                    <Link
                                      to={user ? `/submissions/${entry._id}` : '/login'}
                                      className="hover:text-white hover:underline"
                                    >
                                      {entry.question}
                                    </Link>
                                  </td>
                                  <td className="pt-3 px-2 lg:p-2">{entry.difficulty}</td>
                                  <td className="pt-3 px-2 lg:p-2">{entry.submittedAt}</td>
                                </>
                              }
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
  )
};

export default Listings;