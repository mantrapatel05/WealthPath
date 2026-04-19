import { useNavigate } from "react-router-dom";

import BrandLogo from "../components/BrandLogo";
import { clearAuthSession, getStoredUser } from "../lib/auth";

export default function DashboardPage() {
  const navigate = useNavigate();
  const user = getStoredUser();

  const logout = () => {
    clearAuthSession();
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen px-6 py-8"
      style={{ background: "linear-gradient(180deg, #ffffff 0%, #f7faf9 100%)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <BrandLogo
            iconClassName="h-10 w-10 rounded-xl"
            textClassName="font-body text-[0.98rem] font-semibold"
          />

          <button
            type="button"
            onClick={logout}
            className="rounded-xl border px-4 py-2 font-body text-sm font-medium"
            style={{ borderColor: "var(--border)", color: "var(--ink)" }}
          >
            Log out
          </button>
        </div>

        <div
          className="rounded-[28px] p-8"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <p
            className="mb-2 font-body text-[0.75rem] font-semibold uppercase tracking-[0.24em]"
            style={{ color: "var(--accent-deep)" }}
          >
            Dashboard
          </p>

          <h1
            className="mb-3 font-display text-[2.2rem] tracking-tight"
            style={{ color: "var(--ink)" }}
          >
            Welcome back{user?.name ? `, ${user.name}` : ""}.
          </h1>

          <p
            className="mb-6 max-w-2xl font-body text-[0.95rem] leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            This is a simple placeholder dashboard so login has a real destination.
            You can swap this out later with your actual dashboard UI.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate("/onboarding")}
              className="rounded-xl px-4 py-3 font-body text-sm font-semibold text-white"
              style={{ background: "var(--accent)" }}
            >
              Edit financial profile
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-xl border px-4 py-3 font-body text-sm font-medium"
              style={{ borderColor: "var(--border)", color: "var(--ink)" }}
            >
              Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
