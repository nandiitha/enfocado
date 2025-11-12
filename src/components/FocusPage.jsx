import QuoteBanner from "./QuoteBanner";
import FocusTimer from "./FocusTimer";

export default function FocusPage() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 pt-16 mt-8">
      <QuoteBanner />
      <FocusTimer />
    </div>
  );
}
