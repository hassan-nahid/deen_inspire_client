import toast from 'react-hot-toast';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xaygvblq', {
        method: 'POST',
        body: JSON.stringify({ name, email, message }),
        headers: { 'Content-Type': 'application/json' }, 
      });

      if (!response.ok) {
        throw new Error(`Error sending email: ${response.statusText}`);
      }

      toast.success('Your message has been sent successfully!');
      event.target.reset(); 
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('There was an error sending your message. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg max-w-screen-xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <div className="flex items-center mb-4">
              <FaPhoneAlt className="text-green-600 mr-4" />
              <span>+123 456 7890</span>
            </div>
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-green-600 mr-4" />
              <span>info@example.com</span>
            </div>
            <div className="flex items-center mb-4">
              <FaMapMarkerAlt className="text-green-600 mr-4" />
              <span>123 Main Street, Anytown, USA</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Name
              </label>
              <input
                className="input input-bordered w-full"
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="input input-bordered w-full"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">
                Message
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                id="message"
                name="message"
                rows="4"
                required
              />
            </div>
            <button className="btn bg-green-600 hover:bg-green-400 border-none text-white font-semibold" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
