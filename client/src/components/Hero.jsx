import { useContext } from 'react';
import { Link } from "react-router-dom";
import { FaAngleRight } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Hero = () => {
    const { user} = useContext(AuthContext);

    return (
        <>
            <section className="bg-gray-600 h-screen py-20 diagonal-split-background">
                <div
                    className="max-w-7xl mx-auto my-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center"
                >
                    <div className="my-10 text-center">
                        <h1
                            className="text-4xl text-white sm:text-5xl md:text-6xl"
                        >
                            Learn by solving problems
                        </h1>
                        <p className="mt-4 mb-20 text-xl text-white">
                            At your own pace with problems that match your skill.
                        </p>
                        { !user
                        ? (
                            <Link
                            to="/signup"
                            className="bg-gray-800 text-white text-center py-4 px-10 rounded-xl hover:bg-gray-700"
                        >
                            Create an account
                            <FaAngleRight className='inline text-white text-lg mb-1 ml-3'></FaAngleRight>
                        </Link>
                        )
                    :(
                        <Link
                            to="/problems"
                            className="bg-gray-800 text-white text-center py-4 px-10 rounded-xl hover:bg-gray-700"
                        >
                            Explore
                            <FaAngleRight className='inline text-white text-lg mb-1 ml-3'></FaAngleRight>
                        </Link>
                    )}
                    </div>
                </div>
            </section>
        </>
    )
}
export default Hero;