import DBnavbar from "../components/DashBoard/DBnavbar"
import Graph from "../components/DashBoard/Graph"
import SectionOne from "../components/DashBoard/SectionOne"

const DashBoard = () => {
  return (
    <div>
      <div>
        <DBnavbar/>
      </div>

      <div>
        <SectionOne/>
        <Graph/>
      </div>
    </div>

    
  )
}

export default DashBoard