export default function Select({ options = [], className = "", ...props }) {
  return (
    <select
      className={`w-full px-3 py-2 border rounded-xl bg-white text-gray-700 ${className}`}
      {...props}
    >
      {options.map((opt, index) => {
        // If option is a primitive (string/number) → use it directly
        if (typeof opt === "string" || typeof opt === "number") {
          const label = opt === "" ? (props.placeholder ?? "All") : opt;
          return (
            <option key={index} value={opt}>
              {label}
            </option>
          );
        }

        // If option is an object { label, value } → render label/value
        if (opt && typeof opt === "object") {
          return (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          );
        }

        // fallback for null/undefined
        return (
          <option key={index} value="">
            {props.placeholder ?? "All"}
          </option>
        );
      })}
    </select>
  );
}
