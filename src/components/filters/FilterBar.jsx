import Input from "../ui/Input";
import Select from "../ui/Select";
import { useAppDispatch } from "../../hooks";
import { setFilter, resetFilters } from "../../store/companiesSlice";

export default function FilterBar({ industries = [], locations = [] }) {
  const dispatch = useAppDispatch();

  return (
    <div className="card-base mb-10 shadow-xl p-5 bg-white rounded-3xl border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-xl">Filter Companies</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search */}
        <div>
          <label className="text-sm mb-1 font-medium">Search</label>
          <Input
            placeholder="Search companies..."
            className="rounded-xl"
            onChange={(e) =>
              dispatch(setFilter({ key: "search", value: e.target.value }))
            }
          />
        </div>

        {/* Industry */}
        <div>
          <label className="text-sm mb-1 font-medium">Industry</label>
          <Select
            options={["", ...industries]}
            placeholder="All Industries"
            onChange={(e) =>
              dispatch(setFilter({ key: "industry", value: e.target.value }))
            }
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm mb-1 font-medium">Location</label>
          <Select
            options={["", ...locations]}
            placeholder="All Locations"
            onChange={(e) =>
              dispatch(setFilter({ key: "location", value: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
