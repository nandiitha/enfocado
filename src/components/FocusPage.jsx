import QuoteBanner from "./QuoteBanner";
import FocusTimer from "./FocusTimer";

export default function FocusPage(selectedPainting) {
  return (
    <div className="flex flex-col items-center justify-center space-y-12 pt-16 mt-8">
      <QuoteBanner />
      <FocusTimer selectedPainting={selectedPainting} />
    </div>
  );
}
