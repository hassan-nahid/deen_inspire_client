
const Accordion = () => {
    return (
        <div className="flex flex-col justify-center items-center my-8">
            <div className="text-center text-3xl font-bold my-8 text-green-600">FAQ</div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    Is is free to start a blog?
                </div>
                <div className="collapse-content">
                    <p>
                        It is completely free to start a blog with Wix. Plus, you will get access to a complete suite of blogging features including; blog title generator, SEO tools, design capabilities, managing and collaboration tools, and analytics.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                   How do blog make money?
                </div>
                <div className="collapse-content">
                    <p>
                        There are lots of ways to make money from blogging. Bloggers can supplement their incomes by offering paid subscriptions to followers for exclusive access to content or features. You can use third-party services like Google AdSense to show ads on your blog and earn commission whenever someone clicks on them. Plus, with Wix Stores, you can sell merchandise and products related to your blog.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    Can you import blog posts from WordPress?
                </div>
                <div className="collapse-content">
                    <p>Yes, you can import your blog posts from a WordPress.com or a WordPress.org site in just a few steps. Check out this article from the Wix Help Center for a step-by-step guide on how to do it.</p>
                </div>
            </div>
        </div>
    );
};

export default Accordion;