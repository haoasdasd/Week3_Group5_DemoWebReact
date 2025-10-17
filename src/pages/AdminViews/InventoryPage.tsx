import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Biểu tưởng svg ---
const FiPackage = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.2"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);
const FiCheckCircle = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
const FiXCircle = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);
const FiDollarSign = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);
const FiTrash2 = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);
const FiPlus = ({ size = 18, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
const FiEdit = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);
// --- type ---
type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  createdAt: string;
};

// mock data sản phẩm
const mockProducts: Product[] = [
  { id: 1, name: "Casio MTP-1374D", price: 1590000, quantity: 10, category: "Nam", createdAt: "2025-01-10" },
  { id: 2, name: "Orient RA-AA0B02R", price: 5120000, quantity: 5, category: "Nam", createdAt: "2025-02-15" },
  { id: 3, name: "Seiko 5 SNKL23K1", price: 3200000, quantity: 0, category: "Nữ", createdAt: "2025-03-20" },
  { id: 4, name: "Casio F91W", price: 500000, quantity: 20, category: "Unisex", createdAt: "2025-01-05" },
  { id: 5, name: "Citizen Eco-Drive", price: 4500000, quantity: 2, category: "Nam", createdAt: "2025-02-28" },
  { id: 6, name: "Tissot PR100", price: 7500000, quantity: 3, category: "Nữ", createdAt: "2025-03-10" },
  { id: 7, name: "Daniel Wellington Classic", price: 2800000, quantity: 8, category: "Nữ", createdAt: "2025-04-01" },
  { id: 8, name: "G-Shock GA-2100", price: 2500000, quantity: 15, category: "Unisex", createdAt: "2025-04-05" },
];

// component chính
const InventoryPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // trạng thái Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // mở,đóng Modal
  const openModal = (mode: "add" | "edit" | "delete", product?: Product) => {
    setModalMode(mode);
    setSelectedProduct(product || null);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMode(null);
    setSelectedProduct(null);
  };

  //theo tác với sản phẩm
  const handleSave = (newProductData: Omit<Product, 'id' | 'createdAt'>) => {
    if (modalMode === "add") {
      setProducts([
        ...products,
        {
          ...newProductData,
          id: Math.max(...products.map(p => p.id), 0) + 1,
          createdAt: new Date().toISOString().split('T')[0],
        },
      ]);
    } else if (modalMode === "edit" && selectedProduct) {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...newProductData } : p
        )
      );
    }
    closeModal();
  };
  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
    setSelectedProducts(selectedProducts.filter((x) => x !== id));
    closeModal();
  };
  const handleDeleteMultiple = () => {
    setProducts(products.filter((p) => !selectedProducts.includes(p.id)));
    setSelectedProducts([]);
  };

  // Lọc sản phẩm
  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    const matchesDate = !dateFilter || p.createdAt === dateFilter;
    return matchesSearch && matchesCategory && matchesDate;
  });

  // Phân trang
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentProducts = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const paginate = (n: number) => setCurrentPage(n);

  // chọn sản phẩm (checkbox)
  const toggleSelect = (id: number) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProducts(currentProducts.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  // data thống kê biểu đồ
  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.quantity > 0).length,
    outStock: products.filter((p) => p.quantity === 0).length,
    value: products.reduce((sum, p) => sum + p.price * p.quantity, 0),
  };
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const chartData = categories.map(category => ({
    name: category,
    'Số lượng': products.filter(p => p.category === category).length,
  }));

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Quản lý sản phẩm</h1>
            <p className="text-sm text-gray-500 mt-1">Tổng quan kho hàng và danh sách chi tiết.</p>
          </div>
          <div className="flex space-x-2">
            {selectedProducts.length > 0 && (
              <button onClick={handleDeleteMultiple} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 shadow-sm transition">
                <FiTrash2 size={16} /> Xóa ({selectedProducts.length})
              </button>
            )}
            <button onClick={() => openModal("add")} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition">
              <FiPlus size={18} /> Thêm sản phẩm
            </button>
          </div>
        </div>

        {/* tổng quan*/}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1 space-y-6">
              <StatCard icon={<FiPackage size={24} />} title="Tổng sản phẩm" value={stats.total} color="blue" />
              <StatCard icon={<FiCheckCircle size={24} />} title="Còn hàng" value={stats.inStock} color="green" />
              <StatCard icon={<FiXCircle size={24} />} title="Hết hàng" value={stats.outStock} color="red" />
              <StatCard icon={<FiDollarSign size={24} />} title="Giá trị kho" value={`${stats.value.toLocaleString()} ₫`} color="yellow" />
          </div>

          {/* biểu đồ */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sản phẩm theo danh mục</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '0.5rem' }} />
                        <Legend wrapperStyle={{ fontSize: '14px' }} />
                        <Bar dataKey="Số lượng" fill="#3B82F6" barSize={40} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* bảng sản phẩm */}
        <div className="bg-white rounded-lg shadow-md">
            {/*lọc sản phẩm */}
            <div className="p-4 border-b grid grid-cols-1 md:grid-cols-4 gap-4">
                <input type="text" placeholder="Tìm kiếm sản phẩm..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50" />
                <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50">
                    <option value="all">Tất cả danh mục</option>
                    {categories.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
                <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50" />
                <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50">
                    <option value={5}>5 / trang</option>
                    <option value={10}>10 / trang</option>
                    <option value={20}>20 / trang</option>
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3 w-12 text-center"><input type="checkbox" onChange={toggleSelectAll}
                                checked={selectedProducts.length === currentProducts.length && currentProducts.length > 0}
                                className="rounded" />
                            </th>
                            <th className="px-6 py-3 text-left">Mã</th>
                            <th className="px-6 py-3 text-left">Tên sản phẩm</th>
                            <th className="px-6 py-3 text-left">Danh mục</th>
                            <th className="px-6 py-3 text-right">Giá</th>
                            <th className="px-6 py-3 text-center">Số lượng</th>
                            <th className="px-6 py-3 text-center">Ngày tạo</th>
                            <th className="px-6 py-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {currentProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50 transition">
                            <td className="px-4 py-3 text-center"><input type="checkbox" checked={selectedProducts.includes(p.id)} onChange={() => toggleSelect(p.id)} className="rounded" /></td>
                            <td className="px-6 py-3 font-mono text-gray-500">{String(p.id).padStart(4, '0')}</td>
                            <td className="px-6 py-3 font-semibold">{p.name}</td>
                            <td className="px-6 py-3"><span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{p.category}</span></td>
                            <td className="px-6 py-3 text-right">{p.price.toLocaleString()} ₫</td>
                            <td className="px-6 py-3 text-center">{p.quantity}</td>
                            <td className="px-6 py-3 text-center">{formatDate(p.createdAt)}</td>
                            <td className="px-6 py-3">
                                <div className="flex justify-center gap-2">
                                    <button onClick={() => openModal("edit", p)} className="p-2 text-yellow-600 rounded hover:bg-yellow-100 transition" title="Sửa"><FiEdit size={16} /></button>
                                    <button onClick={() => openModal("delete", p)} className="p-2 text-red-600 rounded hover:bg-red-100 transition" title="Xóa"><FiTrash2 size={16} /></button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* phân trang*/}
            {totalPages > 1 && (
                <div className="flex justify-center items-center p-4 border-t space-x-1">
                    <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition">←</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <button key={n} onClick={() => paginate(n)} className={`px-3 py-1 border rounded-md ${currentPage === n ? "bg-blue-600 text-white" : "hover:bg-gray-100"} transition`}>{n}</button>
                    ))}
                    <button onClick={nextPage} disabled={currentPage === totalPages} className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100 transition">→</button>
                </div>
            )}
        </div>

        {isModalOpen && modalMode && (
          <ProductModal mode={modalMode} product={selectedProduct} onSave={handleSave} onCancel={closeModal} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
};
// thống kê
type StatCardProps = {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    color: 'blue' | 'green' | 'red' | 'yellow';
}
const StatCard: React.FC<StatCardProps> = ({ icon, title, value, color }) => {
    const colorClasses = {
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        red: 'bg-red-100 text-red-600',
        yellow: 'bg-yellow-100 text-yellow-600',
    };
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <div className={`p-3 rounded-full mr-4 ${colorClasses[color]}`}>
                {icon}
            </div>
            <div>
                <div className="text-sm text-gray-500">{title}</div>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
            </div>
        </div>
    );
};


// component thêm/sửa/xóa
type ProductModalProps = {
  mode: "add" | "edit" | "delete";
  product: Product | null;
  onSave: (p: Omit<Product, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
};
const ProductModal: React.FC<ProductModalProps> = ({ mode, product, onSave, onCancel, onDelete }) => {
  const [form, setForm] = useState(
    product || { name: "", price: 0, quantity: 0, category: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "price" || name === "quantity" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  if (mode === "delete") {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Xác nhận xóa</h2>
          <p className="text-gray-700 mb-6">Bạn có chắc chắn muốn xóa sản phẩm <span className="font-semibold text-red-600">{product?.name}</span>? Hành động này không thể hoàn tác.</p>
          <div className="flex justify-end gap-3">
            <button onClick={onCancel} className="px-4 py-2 border rounded-md hover:bg-gray-100 transition">Hủy</button>
            <button onClick={() => product && onDelete(product.id)} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">Xóa</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 m-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">{mode === "add" ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Tên sản phẩm" name="name" value={form.name} onChange={handleChange} placeholder="VD: Casio MTP-1374D" required />
          <InputField label="Danh mục" name="category" value={form.category} onChange={handleChange} placeholder="VD: Nam" required />
          <InputField label="Giá" name="price" type="number" value={form.price} onChange={handleChange} placeholder="0" required />
          <InputField label="Số lượng" name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="0" required />
          <div className="flex justify-end space-x-3 pt-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition">Hủy</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">{mode === "add" ? "Thêm" : "Lưu thay đổi"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

type InputFieldProps = {
    label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => (
    <div>
        <label className="text-sm font-medium text-gray-600 mb-1 block">{label}</label>
        <input {...props} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
    </div>
);


export default InventoryPage;