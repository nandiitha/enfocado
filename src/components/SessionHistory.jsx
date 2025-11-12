// import  useSessions  from "../hooks/useSessions";

// const SessionHistory = () => {
//   const { sessions, clearSessions } = useSessions();

//   return (
//     <div className="text-white p-4">
//       <h2 className="text-2xl mb-4">Session History</h2>
//       <ul>
//         {sessions.map((s) => (
//           <li key={s.id}>
//             🕒 {new Date(s.startTime).toLocaleTimeString()} → {new Date(s.endTime).toLocaleTimeString()} ({s.duration}s)
//           </li>
//         ))}
//       </ul>
//       <button className="mt-4 px-4 py-2 bg-red-600 rounded" onClick={clearSessions}>
//         Clear History
//       </button>
//     </div>
//   );
// };

// export default SessionHistory;
