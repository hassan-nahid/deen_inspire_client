import Accordion from "../components/Home/Accordion";
import Banner from "../components/Home/Banner";
import GetStart from "../components/Home/GetStart";
import NewBlog from "../components/Home/NewBlog";
import Plan from "../components/Home/Plan";
import Testimonials from "../components/Home/Testimonials";

const Home = () => {
    return (
        <div>
            <Banner/>
            <NewBlog limit={3} />
            <GetStart/>
            <Plan/>
            <Testimonials/>
            <Accordion/>
        </div>
    );
};

export default Home;