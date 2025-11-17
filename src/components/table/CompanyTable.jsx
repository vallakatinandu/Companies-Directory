import CompanyRow from "./CompanyRow";
import { useAppDispatch } from "../../hooks";
import { setSort } from "../../store/companiesSlice";

export default function CompanyTable({
  companies = [],
  sortBy,
  sortDir,
  loading,
}) {
  const dispatch = useAppDispatch();

  const header = (label, key) => (
    <th
      onClick={() => dispatch(setSort({ sortBy: key }))}
      className="
        px-5 py-4 text-left font-semibold text-gray-700 cursor-pointer select-none
        hover:text-blue-600 transition-all
      "
    >
      <div className="flex items-center gap-1">
        {label}
        {sortBy === key && (
          <span className="text-blue-600">{sortDir === "asc" ? "▲" : "▼"}</span>
        )}
      </div>
    </th>
  );

  return (
    <div
      className={`
        overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white/80 backdrop-blur
        transition-opacity duration-200
        ${loading ? "opacity-70" : "opacity-100"}
      `}
    >
      <table className="w-full table-auto">
        <thead className="bg-gray-100/90 backdrop-blur sticky top-0 shadow-sm">
          <tr className="text-gray-700 text-sm uppercase tracking-wide">
            {header("Name", "name")}
            {header("Industry", "industry")}
            {header("Location", "location")}
            {header("Employees", "employees")}
            <th className="px-5 py-4 text-left font-semibold text-gray-700">
              Website
            </th>
          </tr>
        </thead>

        <tbody>
          {/* Smooth loading row (no flicker) */}
          {loading && (
            <tr>
              <td colSpan="5" className="py-6 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          )}

          {/* Data rows */}
          {!loading &&
            companies.map((company, index) => (
              <tr
                key={company._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-blue-50/40 transition-all`}
              >
                <CompanyRow company={company} />
              </tr>
            ))}

          {/* No Data */}
          {!loading && companies.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="py-10 text-center text-gray-500 text-lg font-medium"
              >
                No companies found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
