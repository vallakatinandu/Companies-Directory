import Input from "../ui/Input";
import Select from "../ui/Select";
import { useAppDispatch } from "../../hooks";
import { setFilter, resetFilters } from "../../store/companiesSlice";

export default function FilterBar({ industries = [], locations = [] }) {
  const dispatch = useAppDispatch();

  return (
<div className="bg-white shadow-xl rounded-3xl p-6 border space-y-6">
  <h2 className="text-xl font-semibold flex items-center gap-2">
    <span className="text-blue-600">⚙️</span> Filter Companies
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* Search */}
    <div className="space-y-1">
      <label className="text-sm font-medium">Search</label>
      <div className="flex items-center gap-2 p-2 border rounded-xl bg-gray-50">
        <span className="text-gray-500">🔍</span>
        <Input
          className="border-none bg-transparent focus:ring-0"
          placeholder="Search companies..."
          onChange={(e) =>
            dispatch(setFilter({ key: "search", value: e.target.value }))
          }
        />
      </div>
    </div>

    {/* Industry */}
    <div className="space-y-1">
      <label className="text-sm font-medium">Industry</label>
      <div className="flex items-center gap-2 p-2 border rounded-xl bg-gray-50">
        <span className="text-gray-500">🏭</span>
        <Select
          options={["", ...industries]}
          className="border-none bg-transparent focus:ring-0"
          placeholder="All Industries"
          onChange={(e) =>
            dispatch(setFilter({ key: "industry", value: e.target.value }))
          }
        />
      </div>
    </div>

    {/* Location */}
    <div className="space-y-1">
      <label className="text-sm font-medium">Location</label>
      <div className="flex items-center gap-2 p-2 border rounded-xl bg-gray-50">
        <span className="text-gray-500">📍</span>
        <Select
          options={["", ...locations]}
          className="border-none bg-transparent focus:ring-0"
          placeholder="All Locations"
          onChange={(e) =>
            dispatch(setFilter({ key: "location", value: e.target.value }))
          }
        />
      </div>
    </div>

  </div>
</div>



  );
}
