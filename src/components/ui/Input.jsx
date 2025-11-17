export default function Input({ label, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm text-gray-600 font-medium">{label}</label>}
      <input {...props} className={`input-base ${className}`} />
    </div>
  );
}
