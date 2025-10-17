// src/pages/user/AboutPage.tsx
export default function AboutPage() {
  const teamMembers = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      position: 'CEO & Founder',
      avatar: '👨‍💼',
      description: '10 năm kinh nghiệm trong lĩnh vực công nghệ'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      position: 'CTO',
      avatar: '👩‍💻',
      description: 'Chuyên gia phát triển phần mềm và hệ thống'
    },
    {
      id: 3,
      name: 'Lê Văn C',
      position: 'Head of Design',
      avatar: '🎨',
      description: 'Nhà thiết kế sáng tạo với 8 năm kinh nghiệm'
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      position: 'Marketing Manager',
      avatar: '📈',
      description: 'Chiến lược gia marketing đầy nhiệt huyết'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Khách hàng hài lòng' },
    { number: '5+', label: 'Năm kinh nghiệm' },
    { number: '100+', label: 'Sản phẩm chất lượng' },
    { number: '24/7', label: 'Hỗ trợ khách hàng' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Về <span className="text-blue-600">Táo Store</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Chúng tôi là đơn vị hàng đầu trong lĩnh vực cung cấp sản phẩm công nghệ 
              với sứ mệnh mang đến trải nghiệm mua sắm tuyệt vời nhất cho khách hàng.
            </p>
            <div className="bg-blue-600 text-white px-6 py-3 rounded-full inline-block font-semibold">
              Khám phá câu chuyện của chúng tôi
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Câu chuyện của chúng tôi</h2>
              <p className="text-lg text-gray-600 mb-6">
                Được thành lập vào năm 2019, YourStore bắt đầu từ một cửa hàng nhỏ 
                với ước mơ lớn: mang công nghệ tiên tiến đến với mọi người dân Việt Nam.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Qua nhiều năm phát triển, chúng tôi đã trở thành đối tác tin cậy 
                của hàng nghìn khách hàng và các thương hiệu công nghệ hàng đầu thế giới.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                  ✓ Chất lượng hàng đầu
                </div>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
                  ✓ Giá cả cạnh tranh
                </div>
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
                  ✓ Bảo hành chính hãng
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-8 text-white">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4">Tầm nhìn & Sứ mệnh</h3>
              <p className="text-blue-100">
                Trở thành địa chỉ mua sắm công nghệ đáng tin cậy nhất Việt Nam, 
                nơi mọi khách hàng đều tìm thấy sản phẩm phù hợp với giá trị tốt nhất.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Đội ngũ của chúng tôi</h2>
            <p className="text-xl text-gray-600">Những người tạo nên sự khác biệt</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sẵn sàng trải nghiệm dịch vụ của chúng tôi?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Khám phá ngay các sản phẩm công nghệ mới nhất với ưu đãi đặc biệt
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/products" 
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
            >
              Mua sắm ngay
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Liên hệ ngay
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}