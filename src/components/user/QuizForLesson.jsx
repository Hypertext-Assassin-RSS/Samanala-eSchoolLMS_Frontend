import React, { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';

const QuizForLesson = ({ isOpen, onClose, quizzes }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [check, setCheck] = useState(false);

    useEffect(() => {
        console.log(quizzes);
        setSelectedAnswers({ })
    }, [quizzes]);

    const handleAnswerChange = (questionId, answerId) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerId,
        });
    };

    const handleSubmit = () => {
        let correctCount = 0;
        let qui = Object.keys(selectedAnswers);
        qui.forEach((quize) => {
            quizzes.forEach((quiz) => {
                if (quiz.question == quize && selectedAnswers[quiz.question] == quiz.correctAnswerIndex){
                    correctCount = correctCount + 1
                }
            });
        })

        console.log('Selected Answers:', selectedAnswers);
        console.log('Correct Answers:', correctCount);
        //alert(`You got ${correctCount} out of ${quizzes.length} correct!`);
        onClose();
    };

    return (
        <div
            className={`${
                isOpen ? 'fixed' : 'hidden'
            } inset-0 overflow-y-auto`}
            aria-labelledby="quiz-modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center block">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    aria-hidden="true"
                    onClick={onClose}
                ></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-labelledby="modal-headline"
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h2 className="text-lg font-bold mb-4" id="quiz-modal-title">
                            Complete Quiz
                        </h2>
                        <span className="text-sm font-thin text-gray-500">
                            Select Only One Answer Per Quiz
                        </span>
                        <div>
                            {quizzes ? quizzes.map((quiz, index) => (
                                <Disclosure key={quiz.id}>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex justify-between w-full px-4 py-3 text-left text-sm font-medium text-purple-900 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        <span>
                          {index + 1}. {quiz.question}
                        </span>
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="px-4 py-2 text-sm text-gray-500 flex justify-between hover:text-blue-500 hover:cursor-alias">
                                                <ul className="space-y-2">
                                                    {quiz.answers.map((answer, idx) => (
                                                        <li key={`${quiz.id}-${idx}`} className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`answer-${quiz.id}-${answer.id}`}
                                                                name={`answer-${quiz.id}`}
                                                                onChange={() => handleAnswerChange(quiz.question, idx)}
                                                                checked={setCheck(true)}
                                                                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                                                            />
                                                            <label
                                                                htmlFor={`answer-${quiz.id}-${answer.id}`}
                                                                className="block text-sm leading-5 cursor-pointer"
                                                            >
                                                                {answer}
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            )) : <p>No quizzes available</p>}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-blue-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition ease-in-out duration-150 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:mt-0 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuizForLesson;
