export default function CompanyRow({ company }) {
  return (
    <>
      {/* This <tr> wrapper is handled in CompanyTable now, so only <td> is needed */}
      <td className="px-5 py-4 font-semibold text-gray-800">
        {company.name}
      </td>

      <td className="px-5 py-4 text-gray-600">
        {company.industry}
      </td>

      <td className="px-5 py-4 text-gray-600">
        {company.location}
      </td>

      <td className="px-5 py-4 text-gray-600">
        {company.employees}
      </td>

      <td className="px-5 py-4">
        <a
          href={company.website}
          target="_blank"
          className="
            inline-block px-4 py-1.5 rounded-xl 
            bg-blue-50 text-blue-600 font-medium text-sm
            hover:bg-blue-100 hover:text-blue-700
            transition-all shadow-sm
          "
        >
          Visit →
        </a>
      </td>
    </>
  );
}
