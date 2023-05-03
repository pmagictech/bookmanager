import { useMemo } from "react";
import { useTable, CellProps } from "react-table";

export default function Table({ books }: any) {
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "coverImage",
        Cell: ({ value }: CellProps<any, string>) => <img src={`uploads/${value}`} width={100} />,
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Author",
        accessor: "author",
      },
      {
        Header: "Date",
        accessor: "date",
      },
    ],
    []
  );

  const data = useMemo(() => books, [books]);

  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    // apply the table props
    <table
      className="border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm"
      {...getTableProps()}
    >
      <thead className="bg-slate-50 dark:bg-slate-700">
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th
                    className="border border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left"
                    {...column.getHeaderProps()}
                  >
                    {
                      // Render the header
                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td
                        className="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400"
                        {...cell.getCellProps()}
                      >
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
}
