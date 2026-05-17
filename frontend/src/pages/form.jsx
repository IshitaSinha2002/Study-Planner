import { useState } from "react";
import axios from "axios";

import "./../styles/form.css";

function Form() {

  // -------------------------------------
  // State Variables
  // -------------------------------------

  const [subjects, setSubjects] = useState("");
  const [hours, setHours] = useState(4);
  const [examDate, setExamDate] = useState("");

  const [studyPlan, setStudyPlan] = useState(null);

  const [loading, setLoading] = useState(false);


  // -------------------------------------
  // API Call
  // -------------------------------------

  const generatePlan = async () => {

    try {

      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/generate-plan",
        {
          subjects: subjects,
          hours: hours.toString(),
          exam_date: examDate
        }
      );

      setStudyPlan(response.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };


  // -------------------------------------
  // UI
  // -------------------------------------

  return (

    <div className="container">

      {/* Header */}

      <div className="header">

        <h1>Design Your Mastery</h1>

        <p>
          Configure your cognitive parameters to optimize flow.
          Establishing a clear academic environment is the first
          step toward deep intellectual achievement.
        </p>

      </div>


      {/* Form Card */}

      <div className="form-card">

        {/* Subject Input */}

        <div className="input-group">

          <label>Subject Name</label>

          <input
            type="text"
            placeholder="e.g. Data Structures, DBMS"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
          />

        </div>


        {/* Hours Slider */}

        <div className="input-group">

          <div className="slider-header">

            <label>Daily Study Hours</label>

            <span>{hours} Hours</span>

          </div>

          <input
            type="range"
            min="1"
            max="12"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="slider"
          />

          <div className="slider-labels">
            <span>1H</span>
            <span>4H</span>
            <span>8H</span>
            <span>12H</span>
          </div>

        </div>


        {/* Exam Date */}

        <div className="input-group">

          <label>Exam Date</label>

          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />

        </div>


        {/* Button */}

        <button
          className="analyze-btn"
          onClick={generatePlan}
        >

          {
            loading
            ? "Analyzing..."
            : "Analyze"
          }

        </button>

      </div>


      {/* Planner Output */}

      {
        studyPlan && (
          <Planner studyPlan={studyPlan} />
        )
      }

    </div>
  );
}

export default Form;