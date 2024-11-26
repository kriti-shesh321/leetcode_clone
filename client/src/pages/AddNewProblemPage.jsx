import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import AuthContext from "../context/AuthContext";

const AddNewProblemPage = () => {
  const { addNewProblem } = useContext(AuthContext);

  // generating a random acceptance from 30 to 100
  const acceptanceVal = (Math.floor(Math.random() * 70) + 30) + "%";
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    sampleInput: "",
    acceptance: acceptanceVal,
    sampleOutput: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await addNewProblem(formData);
      toast.success('Problem added successfully.');
      return navigate('/problems');

    } catch (error) {
      console.log(error);
      toast.error("Error adding new problem!");
    }
  };

  return (
    <section className="bg-gray-100">
      <div className="container m-auto max-w-2xl py-24">
        <div
          className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <form onSubmit={submitForm}>
            <h2 className="text-3xl font-semibold mb-10">Add Problem</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="eg. Max of an array."
                required
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                className="border rounded w-full py-2 px-3"
                rows="4"
                placeholder="Please add all the relevant details..."
                required
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
              >
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                className="border rounded w-full py-2 px-3"
                required
                value={formData.difficulty}
                onChange={handleChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Sample Input
              </label>
              <input
                type='text'
                id='sampleInput'
                name='sampleInput'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. [2000, 30, 40]'
                required
                value={formData.sampleInput}
                onChange={handleChange}
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Sample Output
              </label>
              <input
                type='text'
                id='sampleOutput'
                name='sampleOutput'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg "2000"'
                required
                value={formData.sampleOutput}
                onChange={handleChange}
              />
            </div>

            <div>
              <button
                className="bg-gray-700 hover:bg-green-600 text-white text-lg font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                ADD PROBLEM
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
export default AddNewProblemPage;