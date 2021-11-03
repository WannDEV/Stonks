import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useExpanded, useSortBy } from "react-table";

const TableComponent = ({
  columns,
  data,
  fetchData,
  pageCount: controlledPageCount,
  loading,
  isPaginated = true,
  ...props
}) => {
  const defaultColumn = useMemo(
    () => ({
      // minWidth: 20,
      // maxWidth: 115
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setHiddenColumns,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: {
        pageIndex: 0,
        pageSize: 15,
        hiddenColumns: columns
          .filter((column) => !column.show)
          .map((column) => column.id),
      },
      manualPagination: true,
      manualSortBy: true,
      autoResetPage: false,
      pageCount: controlledPageCount,
    },
    useSortBy,
    useExpanded,
    usePagination
  );

  useEffect(() => {
    fetchData && fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <Fragment>
      {loading ? (
        <div>
          {" "}
        </div>
      ) : (
        <div>
          <div>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {Boolean(isPaginated) && (
              <div>
                <div>
                  page {pageIndex + 1} of {pageOptions.length}
                </div>{" "}
                <div>
                  {canPreviousPage ? (
                    <div onClick={() => previousPage()}>
                      <span>
                        <i />
                      </span>
                      Back
                    </div>
                  ) : null}
                  {canNextPage ? (
                    <div onClick={() => nextPage()}>
                      Next{" "}
                      <span>
                        <i />
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TableComponent;