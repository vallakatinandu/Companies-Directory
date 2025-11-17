import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  fetchCompanies,
  fetchCompanyFilters,
  setPage,
  setPageSize,
} from "./store/companiesSlice";

import Loader from "./components/Loader";
import FilterBar from "./components/filters/FilterBar";
import CompanyTable from "./components/table/CompanyTable";
import Card from "./components/ui/Card";
import Pagination from "./components/pagination/Pagination";

export default function App() {
  const dispatch = useAppDispatch();

  const {
    items = [],
    loading,
    error,
    filters = {},
    filtersList = { industries: [], locations: [] },
    sortBy,
    sortDir,
    page,
    pageSize,
    totalPages,
  } = useAppSelector((s) => s.companies);

  // Load filters and default data
  useEffect(() => {
    dispatch(fetchCompanyFilters());
    dispatch(fetchCompanies());
  }, [dispatch]);

  // Fetch whenever filters/sorting/pagination change
  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch, page, pageSize, filters, sortBy, sortDir]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="p-10 rounded-3xl shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-md">
            Company Directory
          </h1>
          <p className="mt-3 text-lg opacity-90">
            Filter, sort, and browse companies with ease.
          </p>
        </div>

        <FilterBar
          industries={filtersList.industries}
          locations={filtersList.locations}
        />

        <Card>
          {!error && (
            <CompanyTable
              companies={items}
              sortBy={sortBy}
              sortDir={sortDir}
              loading={loading}
            />
          )}

          {error && (
            <p className="text-red-500 text-lg font-medium text-center py-4">
              {error}
            </p>
          )}

          <Pagination
            page={page}
            pageSize={pageSize}
            totalPages={totalPages}
            onPrev={() => dispatch(setPage(page - 1))}
            onNext={() => dispatch(setPage(page + 1))}
            onPageChange={(num) => dispatch(setPage(num))}
            onPageSizeChange={(num) => dispatch(setPageSize(num))}
          />
        </Card>
      </div>
    </div>
  );
}
