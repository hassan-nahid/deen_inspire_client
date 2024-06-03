
const About = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-4 text-green-600">About Us</h1>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <img src="https://png.pngtree.com/thumb_back/fh260/background/20220926/pngtree-green-and-gold-islamic-background-image_1465898.jpg" alt="About Us" className="w-full h-64 object-cover object-center" />
                    <div className="p-6">
                        <p className="text-gray-700 text-lg mb-4">
                            Welcome to our Islamic Blogging website! We aim to provide valuable insights and resources on various aspects of Islam, including practices, teachings, history, and lifestyle. Our mission is to promote understanding, tolerance, and unity within the Muslim community and beyond.
                        </p>
                        <p className="text-gray-700 text-lg">
                            Our team of passionate writers and researchers work tirelessly to deliver high-quality content that educates, inspires, and empowers our readers. We believe in the power of knowledge and strive to make a positive impact through our platform.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
