import Accordion from "../components/Home/Accordion";
import Banner from "../components/Home/Banner";
import GetStart from "../components/Home/GetStart";
import Plan from "../components/Home/Plan";

const Home = () => {
    return (
        <div>
            <Banner/>
            <GetStart/>
            <Plan/>
            <Accordion/>
        </div>
    );
};

export default Home;