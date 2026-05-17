import "./../styles/planner.css";

function Planner({ studyPlan }) {

  // -------------------------------------
  // Dummy Metrics
  // -------------------------------------

  const syllabusCoverage = 68;
  const focusEfficiency = 84;

  return (

    <div className="planner-page">

      {/* -------------------------------- */}
      {/* Navbar */}
      {/* -------------------------------- */}

      <div className="planner-navbar">

        <h1>DeepFocus AI</h1>

      </div>


      {/* -------------------------------- */}
      {/* AI Overview Card */}
      {/* -------------------------------- */}

      <div className="overview-card">

        <div className="overview-tag">
          AI PROGRESS REPORT
        </div>

        <h2>
          You're in the Flow State.
        </h2>

        <p>
          Your study consistency has improved significantly this week.
          DeepFocus AI recommends prioritizing high-focus subjects
          during your peak cognitive hours for maximum retention.
        </p>

      </div>


      {/* -------------------------------- */}
      {/* Main Content */}
      {/* -------------------------------- */}

      <div className="planner-layout">

        {/* LEFT SECTION */}

        <div className="left-panel">

          {/* Weekly Plan */}

          <div className="weekly-plan-card">

            <div className="card-header">

              <h3>Weekly Plan</h3>

            </div>


            <div className="week-days">

              <div className="day-box">
                <span>MON</span>
                <h4>12</h4>
              </div>

              <div className="day-box">
                <span>TUE</span>
                <h4>13</h4>
              </div>

              <div className="day-box active-day">
                <span>WED</span>
                <h4>14</h4>
              </div>

              <div className="day-box">
                <span>THU</span>
                <h4>15</h4>
              </div>

              <div className="day-box">
                <span>FRI</span>
                <h4>16</h4>
              </div>

              <div className="day-box">
                <span>SAT</span>
                <h4>17</h4>
              </div>

              <div className="day-box">
                <span>SUN</span>
                <h4>18</h4>
              </div>

            </div>

          </div>


          {/* Today's Schedule */}

          <div className="schedule-card">

            <h3>Today's Schedule</h3>


            {/* Timeline */}

            <div className="timeline">


              {/* TASKS FROM API */}

              {
                studyPlan &&
                Object.entries(studyPlan.schedule).map(
                  ([day, tasks]) => (

                    tasks.map((task, index) => (

                      <div
                        className={
                          index === 1
                          ? "timeline-item active-task"
                          : "timeline-item"
                        }

                        key={index}
                      >

                        <div className="timeline-dot"></div>

                        <div className="task-content">

                          <div className="task-time">
                            09:00 AM - 11:00 AM
                          </div>

                          <h4>{task.subject}</h4>

                          <p>{task.topic}</p>

                          <div className="task-footer">

                            <span>
                              {task.duration}
                            </span>

                            {
                              index === 0 &&
                              <div className="completed-badge">
                                Completed
                              </div>
                            }

                            {
                              index === 1 &&
                              <div className="active-badge">
                                Active Now
                              </div>
                            }

                          </div>

                        </div>

                      </div>
                    ))
                  )
                )
              }

            </div>

          </div>

        </div>


        {/* RIGHT PANEL */}

        <div className="right-panel">


          {/* Insights Card */}

          <div className="insights-card">

            <h3>Learning Insights</h3>


            {/* Coverage */}

            <div className="metric">

              <div className="metric-header">

                <span>Syllabus Coverage</span>

                <span>{syllabusCoverage}%</span>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{ width: `${syllabusCoverage}%` }}
                ></div>

              </div>

              <p>2 chapters ahead of schedule</p>

            </div>


            {/* Focus */}

            <div className="metric">

              <div className="metric-header">

                <span>Focus Efficiency</span>

                <span>{focusEfficiency}%</span>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill secondary-fill"
                  style={{ width: `${focusEfficiency}%` }}
                ></div>

              </div>

              <p>Peak performance at 10:00 AM</p>

            </div>


            {/* AI Tip */}

            <div className="tip-box">

              <h4>AI TIP</h4>

              <p>
                Your retention is highest during focused
                25-minute study bursts. Prioritize difficult
                subjects in early sessions.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Planner;