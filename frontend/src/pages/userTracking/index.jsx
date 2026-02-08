import Footer from "../../components/footer";
import UserTracking from "./foodExerciseTracking/tracking";
import UserNavBar from "../../components/userNavBar";
import "./tracking.css";
export default function Tracking() {
  return (
    <> 
    <UserNavBar />
      <div className="background-track">
        <UserTracking />
      </div>
      <Footer />
    </>
  );
}
