export const Footer = () => (
  <footer className="bg-gray-800 p-4">
    <div className="mx-auto flex justify-end items-center">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-white font-semibold px-3 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 transition duration-300">Back to Top</button>
    </div>
    <div className="text-center text-gray-400 mt-4">© 2024 Movie App. All rights reserved.</div>
  </footer>
);
