// const options = [
//   { value: "react", label: "React" },
//   { value: "vue", label: "Vue.js" },
//   { value: "angular", label: "Angular" },
// ];

// export default function AnimationsExample() {
//   return (
//     <div className="space-y-6">
//       {/* Bounce Animation */}
//       <div>
//         <label className="text-sm font-medium mb-2 block">
//           Bounce Animation
//         </label>
//         <MultiSelect
//           options={options}
//           placeholder="Bouncy interactions..."
//           animationConfig={{
//             badgeAnimation: "bounce",
//             popoverAnimation: "scale",
//             optionHoverAnimation: "glow",
//           }}
//         />
//       </div>

//       {/* Pulse Animation */}
//       <div>
//         <label className="text-sm font-medium mb-2 block">
//           Pulse Animation
//         </label>
//         <MultiSelect
//           options={options}
//           placeholder="Pulsing effects..."
//           animationConfig={{
//             badgeAnimation: "pulse",
//             popoverAnimation: "fade",
//             optionHoverAnimation: "highlight",
//           }}
//         />
//       </div>

//       {/* No Animation - Performance Mode */}
//       <div>
//         <label className="text-sm font-medium mb-2 block">No Animations</label>
//         <MultiSelect
//           options={options}
//           placeholder="Fast performance..."
//           animationConfig={{
//             badgeAnimation: "none",
//             popoverAnimation: "none",
//             optionHoverAnimation: "none",
//           }}
//         />
//       </div>
//     </div>
//   );
// }
