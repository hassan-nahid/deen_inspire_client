import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const testimonialsData = [
    {
        quote: "This is the best service I've ever used! Highly recommend to everyone.",
        author: "John Doe",
        role: "CEO, Example Co.",
        picture: "https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fHww"
    },
    {
        quote: "Amazing experience! Will definitely come back again.",
        author: "Jane Smith",
        role: "Marketing Director, Another Co.",
        picture: "https://img.freepik.com/free-photo/portrait-happy-businessman-with-digital-tablet_1262-12831.jpg"
    },
    {
        quote: "A top-notch service from start to finish. Five stars!",
        author: "Sam Wilson",
        role: "Freelancer",
        picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_THtn1rAgDwPk7--vjd0QOc3AWU4e1rqur46MgxMKsJb7ziCcx7-9HsEaH7Bm2dawhFw&usqp=CAU"
    }
];

const Testimonials = () => {
    return (
        <div>
            <div className="bg-base-200 py-12">
                <div className="max-w-screen-xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8 text-green-600">What Our Users Say</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonialsData.map((testimonial, index) => (
                            <div key={index} className="bg-white shadow-xl rounded-lg p-6 mx-3">
                                <FaQuoteLeft className="text-green-600 text-2xl mb-4" />
                                <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                                <FaQuoteRight className="text-green-600 text-2xl mb-4" />
                                <div className="flex items-center justify-center mt-4">
                                    <img src={testimonial.picture} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
                                    <div className="text-left">
                                        <h4 className="text-lg font-semibold">{testimonial.author}</h4>
                                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
