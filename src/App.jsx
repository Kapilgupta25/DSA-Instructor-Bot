import { useState } from "react";
import {
  Home,
  History,
  Code2,
  Settings,
  Send,
  Loader2,
  Brain,
} from "lucide-react";

import "./App.css";


export default function App() {
  const [active, setActive] = useState("dashboard");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);


  const handleAsk = async () => {
  if (!question.trim()) return;
  setLoading(true);
  setAnswer("");

  const body = {
    system_instruction: {
      parts: [
        {
          text: `You are a DSA (Data Structures and Algorithms) instructor bot.
Your purpose is to help users understand DSA concepts clearly and effectively.

If the question is related to DSA topics like:
- Arrays, Linked Lists, Stacks, Queues
- Trees, Graphs, Heaps, Hashing
- Recursion, Sorting, Searching
- Dynamic Programming, Greedy, Divide and Conquer
- Time and Space Complexity
- and many more DSA concepts

Then:
- Give the simplest, polite, and beginner-friendly explanation.
- Keep your tone helpful, calm, and respectful.

If the question is NOT related to DSA:
- Reply in a rude tone.
- Example: "Are you dumb? This is a DSA Instructor Bot. Ask DSA questions only."
(The above is just an example — you can reply in other rude ways too.)`
        }
      ]
    },
    contents: [
      {
        role: "user",
        parts: [{ text: question }]
      }
    ]
  };

  try {
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": import.meta.env.VITE_GEMINI_API_KEY,
        },
        body: JSON.stringify(body),
      }
    );
    
    const data = await res.json();
    console.log("Full API Response:", JSON.stringify(data, null, 2));

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received.";

      setAnswer(text);
      console.log(text);

    } catch (error) {
      console.error(error);
      setAnswer("Error fetching response.");
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0d1117] text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#161b22] p-6 border-r border-gray-800 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <Brain className="text-blue-500" size={28} />
          <h1 className="text-xl font-bold text-white">DSA Mentor AI</h1>
        </div>

        <nav className="space-y-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition ${
                active === item.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-blue-400">
            DSA Coding Instructor AI
          </h2>
          <button className="bg-gray-800 px-4 py-2 rounded-xl text-sm hover:bg-gray-700">
            Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-gray-400 font-semibold text-lg mb-1">What is DSA Instructor Bot? </h3>
            <p className="text-s text-400">The DSA Instructor Bot is an intelligent assistant designed to help users understand Data Structures and Algorithms (DSA) concepts in the simplest possible way. It answers only DSA-related questions — such as those about arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, recursion, and dynamic programming — using clear, beginner-friendly explanations.
              If a user asks a question outside the scope of DSA, the bot reminds them to stick to DSA topics.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-gray-400 font-semibold text-lg mb-1">Popular Topics</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>→ Array and Linked List</li>
              <li>→ Binary Search</li>
              <li>→ Dynamic Programming</li>
              <li>→ Graph Traversal</li>
              <li>→ Recursion</li>
              <li>→ Hashing</li>
              <li>→ Sorting Algorithms</li>
              <li>→ Space and Time Complexity</li>
              <li>→ Many More</li>
            </ul>
          </div>
        </div>

        {/* Ask Section */}
        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">
            Ask a DSA Question
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Ask any DSA-related question. The AI will explain it clearly. For
            non-DSA questions, the AI will not respond. 
          </p>

          <textarea
            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="e.g. Explain binary search tree..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button
            onClick={handleAsk}
            disabled={loading}
            className="mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 w-full font-semibold py-2 rounded-xl transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Thinking...
              </>
            ) : (
              <>
                <Send size={18} /> Ask
              </>
            )}
          </button>

          {answer && (
            <div className="mt-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
              <h2 className="font-semibold text-blue-400 mb-2">Response:</h2>
              <p className="whitespace-pre-wrap text-gray-200">{answer}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
