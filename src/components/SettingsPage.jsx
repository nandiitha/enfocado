// src/components/SettingsPage.jsx
import { paintings } from "../utils/paintings";

export default function SettingsPage({ selectedPainting, setSelectedPainting }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Choose Background Painting</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {paintings.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPainting(p)}
            className={`border-2 rounded-lg overflow-hidden transition-transform transform hover:scale-105 ${
              selectedPainting?.id === p.id ? "border-yellow-400" : "border-transparent"
            }`}
          >
            <img src={p.url} alt={p.name} className="w-full h-32 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
