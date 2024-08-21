import React from "react";

// const Summary = ({ formData }) => {
//   return (
//     <div className="form-section border border-gray-500 p-8 rounded-[12px] gap-4">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
//         Summary of Your Information
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {Object.entries(formData).map(([key, value]) => (
//           <div
//             key={key}
//             className="summary-item bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
//           >
//             <div className="flex flex-col">
//               <span className="font-semibold text-gray-700 mb-1">
//                 {key
//                   .replace(/([A-Z])/g, " $1")
//                   .replace(/^./, (str) => str.toUpperCase())}
//               </span>
//               {/* <span className="text-gray-900 truncate">{value || "N/A"}</span> */}
//               <small>{value || "N/A"}</small>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

const Summary = ({ formData }) => {
  return (
    <div className="form-section border border-gray-500 p-8 rounded-[12px] gap-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Summary of Your Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Object.entries(formData).map(([key, value]) => (
          <div
            key={key}
            className="summary-item bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700 mb-1">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </span>
              <small>{value || "N/A"}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
