import { Edu_TAS_Beginner } from "next/font/google";

const edu = Edu_TAS_Beginner({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function isLoading() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <p className={`text-6xl font-semibold ${edu.className}`}>Loading...</p>
    </div>
  );
}
