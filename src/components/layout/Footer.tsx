import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhone, FaEnvelope, FaRegHeart, FaUniversity } from 'react-icons/fa';

export default function Footer() {
  const bankLinks = [
    { name: 'Vietcombank', url: 'https://vcb.com.vn/', icon: <FaUniversity /> },
    { name: 'Techcombank', url: 'https://techcombank.com/', icon: <FaUniversity /> },
    { name: 'VPBank', url: 'https://vpbank.com.vn/', icon: <FaUniversity /> },
  ];

  const address = "Đỗ Mười/331A-331B An Phú Đông 10, An Phú Đông, Quận 12, TP.HCM";
  const phone = "(+84) 123 456 789";
  const email = "support@mystore.com";
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <footer className="bg-gray-800 text-gray-300 mt-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Grid 4 cột */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left pb-8 border-b border-gray-700">
          
          {/* Cột 1: Thông tin cửa hàng */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center text-xl font-extrabold text-white">
              <FaRegHeart className="text-indigo-400 mr-2" size={24} />
              MyStore
            </div>
            <p className="text-sm">
              Chuyên cung cấp các sản phẩm chất lượng cao với dịch vụ tận tâm. Cam kết mang lại trải nghiệm mua sắm tuyệt vời nhất.
            </p>
                        <br/>
            <p className="text-sm flex items-center"><FaMapMarkerAlt className="text-indigo-400 mr-2" /> {address}</p>
            <p className="text-sm flex items-center"><FaPhone className="text-indigo-400 mr-2" /> {phone}</p>
            <p className="text-sm flex items-center"><FaEnvelope className="text-indigo-400 mr-2" /> {email}</p>
          </div>

          {/* Cột 2: Chính sách & Ngân hàng */}
          <div className="flex flex-col space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-indigo-500 pb-1 inline-block">Chính sách & Hỗ trợ</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/policy/warranty" className="hover:text-indigo-400 transition-colors">Chính sách Bảo hành</a></li>
                <li><a href="/contact" className="hover:text-indigo-400 transition-colors">Liên hệ Hỗ trợ</a></li>
                <li><a href="/policy/return" className="hover:text-indigo-400 transition-colors">Chính sách Đổi trả</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-indigo-500 pb-1 inline-block">Ngân hàng liên kết</h3>
              <ul className="space-y-2 text-sm">
                {bankLinks.map((bank, index) => (
                  <li key={index} className="flex items-center">
                    <a href={bank.url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-indigo-400 transition-colors">
                      {bank.icon} <span className="ml-2">{bank.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cột 3: Bản đồ + Mạng xã hội */}
          <div className="flex flex-col space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-indigo-500 pb-1 inline-block">Tìm chúng tôi trên bản đồ</h3>
              <div className="h-56 w-full rounded-lg overflow-hidden shadow-lg mb-4">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ MyStore"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Cột 4: Về chúng tôi */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-indigo-500 pb-1 inline-block">Về chúng tôi</h3>
            <p className="text-sm">
              MyStore là dự án nhóm 5 trong môn học lập trình web. Chúng tôi phát triển hệ thống bán hàng trực tuyến với giao diện hiện đại, thân thiện người dùng.
            </p>
            <p className="text-sm">Đội ngũ: 5 thành viên nhiệt huyết, đam mê công nghệ.</p>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-indigo-500 pb-1 inline-block">Mạng xã hội</h3>
              <div className="flex space-x-4 justify-start">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors"><FaFacebook size={24} /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors"><FaInstagram size={24} /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><FaTwitter size={24} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} MyStore — All rights reserved.</p>
          <p>
            Built with <span className="text-red-500">❤️</span> by <span className="font-semibold text-indigo-400 ml-1">Group5</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
