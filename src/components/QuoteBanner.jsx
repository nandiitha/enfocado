import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function QuoteBanner() {
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [loading, setLoading] = useState(true);

  // Fetch quotes from API
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch("https://dummyjson.com/quotes");
      const data = await response.json(); // data is an array object
console.log("data:", data);
  const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];

setQuote({
  text: randomQuote.quote,
  author: randomQuote.author || "Unknown",
});

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
        setQuote({
          text: "Focus on being productive instead of busy.",
          author: "Default",
        });
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) return null; // or a loader

  return (
    <motion.div
      className="bg-gray-100 dark:bg-gray-800 text-blue-900 dark:text-blue-100 px-6 py-4 rounded-lg shadow-md max-w-xl mx-auto mb-6 text-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-lg font-semibold">"{quote.text}"</p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">- {quote.author}</p>
    </motion.div>
  );
}
