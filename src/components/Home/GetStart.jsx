
const GetStart = () => {
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
            <div className="mt-[-600px]">
                <h1 className="text-2xl font-bold ">Get Start</h1>
                <div className="divider bg-black mt-[2px]"></div>
            </div>
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-full flex flex-col gap-5">
                        <h3 className="text-xl font-bold">How to create a blog for free</h3>
                        <h5 className="text-xl font-semibold">Follow these 5 steps to start building your blog today.</h5>
                        <div>
                            <button className="btn bg-green-600 hover:bg-green-400 text-white font-semibold">Start Blog</button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-base font-semibold">1. Sign up for a free blog maker. Choose what kind of blog you want to create.</p>
                        <p className="text-base font-semibold">2. Pick a blog name. Let people know what your blog is all about. </p>
                        <p className="text-base font-semibold">3. Choose your blog template. Customize its design to match your style.</p>
                        <p className="text-base font-semibold">4. Write and publish your first post. Launch with posts you&apos;re passionate about.</p>
                        <p className="text-base font-semibold">5. Share your blog. Gain new readers and promote your blog on social media.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetStart;