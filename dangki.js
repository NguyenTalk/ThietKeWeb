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
  // 🧁 Xử lý đăng ký API
  // ========================
  const form = document.getElementById("registerForm");
  const msg = document.getElementById("errorMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msg.textContent = "";

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const full_name = document.getElementById("fullname").value.trim();
    const avatar = document.getElementById("avatar").value.trim() || "https://via.placeholder.com/150";
    const password = document.getElementById("password").value.trim();
    const confirm = document.getElementById("confirm").value.trim();

    if (!username || !email || !password || !confirm || !full_name) {
      msg.textContent = "⚠️ Vui lòng điền đầy đủ thông tin!";
      return;
    }

    if (password !== confirm) {
      msg.textContent = "⚠️ Mật khẩu nhập lại không khớp!";
      return;
    }

    try {
      const res = await fetch("https://banhngot.fitlhu.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, full_name, avatar }),
      });

      const data = await res.json();
      console.log("📩 Response:", data);

      if (!res.ok || !data.success) {
        msg.textContent = data.message || "❌ Đăng ký thất bại!";
        return;
      }

      msg.style.color = "#22c55e";
      msg.textContent = "🎉 Đăng ký thành công!";

      // 👉 Chuyển về trang đăng nhập
      setTimeout(() => (window.location.href = "index.html"), 1500);
    } catch (error) {
      console.error("❌ Lỗi:", error);
      msg.textContent = "Không thể kết nối đến server!";
    }
  });
});
