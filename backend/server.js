import express from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";

dotenv.config();

const PORT = process.env.PORT;
const DATA_PATH = process.env.DATA_PATH;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const API_PREFIX = process.env.API_PREFIX;
const __dirname = path.resolve();
const IMAGE_DIR = path.join(__dirname, "data", "images");
const ORDER_PATH = path.join("data", "orders.json");

// === Kiểm tra ENV ===
if (!PORT || !DATA_PATH || !CORS_ORIGIN || !API_PREFIX) {
  console.error("❌ Thiếu biến môi trường trong .env");
  process.exit(1);
}

// === App setup ===
const app = express();
app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use("/images", express.static(IMAGE_DIR));

// === Tạo thư mục cần thiết ===
if (!fs.existsSync(path.dirname(DATA_PATH)))
  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, "[]", "utf8");
if (!fs.existsSync(ORDER_PATH)) fs.writeFileSync(ORDER_PATH, "[]", "utf8");
if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

// === Upload config ===
const storage = multer.diskStorage({
  destination: IMAGE_DIR,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// === Helpers ===
function readJSON(file) {
  try {
    const raw = fs.readFileSync(file, "utf8");
    return raw.trim() ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}
function computeStatus(stock) {
  if (stock === 0) return "Hết hàng";
  if (stock < 10) return "Hàng còn ít";
  return "Còn hàng";
}

// === PRODUCTS API ===
app.get(`${API_PREFIX}/products`, (req, res) => {
  res.json(readJSON(DATA_PATH));
});

app.post(`${API_PREFIX}/products`, upload.single("image"), (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || !price || !stock)
    return res.status(400).json({ error: "Thiếu thông tin sản phẩm" });

  const products = readJSON(DATA_PATH);
  const file = req.file;
  const newItem = {
    id: crypto.randomUUID(),
    name,
    price: Number(price),
    stock: Number(stock),
    imageUrl: file ? `/images/${file.filename}` : "",
    status: computeStatus(Number(stock)),
    updatedAt: new Date().toISOString(),
  };

  products.unshift(newItem);
  writeJSON(DATA_PATH, products);
  res.status(201).json(newItem);
});
app.put(`${API_PREFIX}/products/:id`, upload.single("image"), (req, res) => {
  const { name, price, stock } = req.body;
  const products = readJSON(DATA_PATH);
  const idx = products.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "Không tìm thấy sản phẩm" });

  const file = req.file;
  const updated = {
    ...products[idx],
    name,
    price: Number(price),
    stock: Number(stock),
    status: computeStatus(Number(stock)),
    updatedAt: new Date().toISOString(),
  };

  if (file) updated.imageUrl = `/images/${file.filename}`;

  products[idx] = updated;
  writeJSON(DATA_PATH, products);
  res.json(updated);
});

// === ORDERS API ===
app.get(`${API_PREFIX}/orders`, (req, res) => {
  const orders = readJSON(ORDER_PATH);
  const { username } = req.query;

  // ✅ Chỉ trả đơn hàng của user nếu có username
if (username) {
  const filtered = orders.filter(
    (o) =>
      o.username &&
      o.username.toLowerCase().trim() === username.toLowerCase().trim()
  );
  return res.json(filtered);
}
  res.json(orders);
});

app.post(`${API_PREFIX}/orders`, (req, res) => {
  console.log(" POST /orders nhận:", req.body);

  const { username, customer, products, total } = req.body;
  if (!username || !customer || !products?.length) {
    console.log(" Thiếu thông tin đơn hàng:", { username, customer, products });
    return res.status(400).json({ error: "Thiếu thông tin đơn hàng" });
  }

  const orders = readJSON(ORDER_PATH);
  const newOrder = {
    id: crypto.randomUUID(),
    username,
    customer,
    products,
    total,
    status: "Đang chờ xử lý",
    createdAt: new Date().toISOString(),
  };

  orders.unshift(newOrder);
  writeJSON(ORDER_PATH, orders);

  console.log("✅ Đã lưu đơn mới:", newOrder);
  res.status(201).json(newOrder);
});



app.put(`${API_PREFIX}/orders/:id`, (req, res) => {
  const orders = readJSON(ORDER_PATH);
  const idx = orders.findIndex((o) => o.id === req.params.id);
  if (idx === -1)
    return res.status(404).json({ error: "Không tìm thấy đơn hàng" });

  const updated = { ...orders[idx], ...req.body, updatedAt: new Date().toISOString() };
  orders[idx] = updated;
  writeJSON(ORDER_PATH, orders);
  res.json(updated);
});

app.delete(`${API_PREFIX}/orders/:id`, (req, res) => {
  const orders = readJSON(ORDER_PATH).filter((o) => o.id !== req.params.id);
  writeJSON(ORDER_PATH, orders);
  res.json({ success: true });
});

// === USER AUTH ===
const USER_PATH = path.join("data", "users.json");
if (!fs.existsSync(USER_PATH)) fs.writeFileSync(USER_PATH, "[]", "utf8");

app.post(`${API_PREFIX}/register`, (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Thiếu thông tin tài khoản" });

  const users = readJSON(USER_PATH);
  if (users.some((u) => u.username === username))
    return res.status(400).json({ error: "Tên đăng nhập đã tồn tại" });

  const newUser = {
    id: crypto.randomUUID(),
    username,
    password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeJSON(USER_PATH, users);
  res.status(201).json({ message: "Đăng ký thành công", user: newUser });
});

app.post(`${API_PREFIX}/login`, (req, res) => {
  const { username, password } = req.body;
  const users = readJSON(USER_PATH);
  const found = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!found)
    return res.status(401).json({ error: "Sai tên đăng nhập hoặc mật khẩu" });

  res.json({
    message: "Đăng nhập thành công",
    user: { id: found.id, username: found.username },
  });
});
  
// === ADMIN AUTH ===
const ADMIN_PATH = path.join("data", "admin.json");
if (!fs.existsSync(ADMIN_PATH)) fs.writeFileSync(ADMIN_PATH, "[]", "utf8");

function readAdmins() {
  try {
    const raw = fs.readFileSync(ADMIN_PATH, "utf8");
    return raw.trim() ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeAdmins(data) {
  fs.writeFileSync(ADMIN_PATH, JSON.stringify(data, null, 2), "utf8");
}

app.post(`${API_PREFIX}/admin/register`, (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Thiếu thông tin admin" });

  const admins = readAdmins();
  if (admins.some((a) => a.username === username))
    return res.status(400).json({ error: "Tên admin đã tồn tại" });

  const newAdmin = {
    id: crypto.randomUUID(),
    username,
    password,
    role: "admin",
    createdAt: new Date().toISOString(),
  };

  admins.push(newAdmin);
  writeAdmins(admins);
  res.status(201).json({ message: "Tạo admin thành công", admin: newAdmin });
});

app.post(`${API_PREFIX}/admin/login`, (req, res) => {
  const { username, password } = req.body;
  const admins = readAdmins();
  const found = admins.find(
    (a) => a.username === username && a.password === password
  );

  if (!found)
    return res.status(401).json({ error: "Sai tên đăng nhập hoặc mật khẩu" });

  res.json({
    message: "Đăng nhập admin thành công",
    admin: { id: found.id, username: found.username, role: found.role },
  });
});

// === RUN SERVER ===
app.listen(PORT, () => {
  console.log(`✅ Server: http://localhost:${PORT}${API_PREFIX}`);
  console.log(`🛒 Products API: ${API_PREFIX}/products`);
  console.log(`📦 Orders API: ${API_PREFIX}/orders`);
});
