
const Banner = () => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://img.freepik.com/free-photo/top-view-islamic-new-year-concept_23-2148611689.jpg?size=626&ext=jpg&ga=GA1.1.2082370165.1716249600&semt=sph)' }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to  Deen Inspire</h1>
                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <button className="btn bg-green-600 hover:bg-green-400 border-none text-white font-semibold">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;