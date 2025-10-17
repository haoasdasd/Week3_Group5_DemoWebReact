export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t text-gray-600 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <p>© {new Date().getFullYear()} MyStore — All rights reserved.</p>
        <p className="text-xs">
          Built with by <span className="font-semibold text-blue-600">Group5</span>
        </p>
      </div>
    </footer>
  );
}
