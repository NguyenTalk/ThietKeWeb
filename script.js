document.addEventListener("DOMContentLoaded", () => {
  // ========================
  // 🎈 Hiệu ứng bong bóng nền
  // ========================
  const bubblesContainer = document.getElementById("bubbles");
  if (bubblesContainer) {
    const colors = ["#6366f1", "#8b5cf6", "#3b82f6", "#ec4899", "#facc15", "#22c55e"];
    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      const size = Math.random() * 80 + 40;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
      bubble.style.background = colors[Math.floor(Math.random() * colors.length)] + "33";
      bubblesContainer.appendChild(bubble);
    }
  }

  // ========================
  // 🔐 Xử lý đăng nhập API
  // ========================
  const form = document.getElementById("loginForm");
  const msg = document.getElementById("errorMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
      msg.textContent = "⚠️ Vui lòng nhập đầy đủ thông tin!";
      return;
    }

    try {
      const res = await fetch("https://banhngot.fitlhu.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("📩 Response:", data);

      if (!res.ok || !data.success) {
        msg.textContent = data.message || "❌ Đăng nhập thất bại!";
        return;
      }

      // ✅ Lưu thông tin vào LocalStorage
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("username", data.data.username);
      localStorage.setItem("loggedIn", "true");

      msg.style.color = "#22c55e";
      msg.textContent = "🎉 Đăng nhập thành công!";

      // 👉 Chuyển sang trang chính
      setTimeout(() => {
        window.location.href = "TrangWeb.html";
      }, 1200);
    } catch (error) {
      console.error("❌ Lỗi:", error);
      msg.textContent = "Không thể kết nối đến server!";
    }
  });
});
