import React from "react";

export default function AptitudeTestOnboarding() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-blue-700">
            Aptitude Test for Collage Students
          </h1>
          <p className="text-gray-600">
            We will issue you a free certificate of achievement if you score in
            the top 25%.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-600">Duration</h2>
            <p className="text-gray-600">
              40 minutes (You can pause between questions; You cannot return to
              previous questions)
            </p>

            <h2 className="text-xl font-semibold text-blue-600">Do</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Use help files or a calculator</li>
              <li>Practice with similar questions before the test</li>
            </ul>

            <h2 className="text-xl font-semibold text-blue-600">Don't</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>No external help or solutions from others</li>
              <li>Do not copy or share any test content</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-600">Test Format</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Multiple Choice</li>
              <li>Multiple Correct Answers</li>
              <li>Number Picker</li>
              <li>Legal Questions</li>
            </ul>

            {/* <h2 className="text-xl font-semibold text-blue-600">
              Introduction
            </h2>
            <p className="text-gray-600">
              This is a mixed aptitude test with 15 questions in 12 minutes.
              Skip and return to questions freely.
            </p>
            <p className="text-gray-600">
              Click on any image to enlarge it. Use the navigation bar to track
              unanswered questions.
            </p> */}
          </div>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl space-y-2">
          <h2 className="text-lg font-semibold text-blue-700">Important:</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>
              Duration: <strong>40 minutes</strong>
            </li>
            <li>
              Number of Sections: <strong>1</strong>
            </li>
            <li>Tests are automatically submitted after time ends</li>
            <li>No negative marking for unattempted questions</li>
            <li>Submit the test to see and review your score</li>
          </ul>
        </div>
        <div className="text-sm text-gray-500 text-center">
          Astronix is our online skills testing platform using real-world
          problem-solving evaluation.
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="terms" className="w-5 h-5" />
          <label htmlFor="terms" className="text-gray-700">
            I have read all of the above and I agree with the terms of use and
            the privacy policy.
          </label>
        </div>

        <div className="flex justify-center">
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition">
            Begin Test
          </button>
        </div>
      </div>
    </div>
  );
}
