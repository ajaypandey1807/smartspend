import Sidebar from "../components/Sidebar"

function About(){

  return(

    <div className="analytics-layout">

      <Sidebar/>

      <div className="analytics">

        <h2>About SmartSpend</h2>

        <p>

          SmartSpend is a personal expense tracking web application.

          It helps users track daily spending, analyze expenses
          and improve financial habits.

        </p>

        <h3>Tech Stack</h3>

        <ul>

          <li>React JS</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>MongoDB</li>
          <li>Chart.js</li>

        </ul>

        <h3>Developer</h3>

        <p>

          Developed by Ajay Pandey

        </p>

      </div>

    </div>

  )

}

export default About