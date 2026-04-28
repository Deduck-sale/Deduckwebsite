import LoginForm from "./LoginForm";
import LiquidBackground from "@/components/LiquidBackground";

export const metadata = {
  title: "Admin Login | De Duck Agency",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <LiquidBackground />
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="glass-card p-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="font-bold text-3xl tracking-wider text-white flex items-center justify-center mb-2">
              DE
              <span className="text-deduck-yellow text-4xl leading-none mx-1">
                🦆
              </span>
              UCK
            </div>
            <p className="text-gray-400 text-sm">Admin Dashboard</p>
          </div>
          <LoginForm />
        </div>
      </main>
    </>
  );
}
