export default function DataTable({ columns, data }) {
    return (
        <div className="overflow-x-auto">

            <table className="min-w-full">

                <thead className="bg-gray-50">

                    <tr>

                        {columns.map((column) => (
                            <th
                                key={column.title}
                                className="px-4 py-4 text-left text-sm font-semibold text-gray-500"
                            >
                                {column.title}
                            </th>
                        ))}

                    </tr>

                </thead>

                <tbody>

                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-t border-gray-100"
                        >

                            {columns.map((column) => (
                                <td
                                    key={column.title}
                                    className="px-4 py-4"
                                >

                                    {column.render
                                        ? column.render(
                                            row[column.dataIndex],
                                            row
                                        )
                                        : row[column.dataIndex]}

                                </td>
                            ))}

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}