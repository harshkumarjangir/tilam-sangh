import React, { useEffect, useState } from 'react'
import Table from '../components/resusable_components/Table'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPageBySlug } from '../redux/slices/pagesSlice'

export default function Tenders() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Use pages slice instead of tenders slice
  const pageData = useSelector((s) => s.pages.dataBySlug?.['tenders'] || null);
  const loading = useSelector((s) => s.pages.loading);
  const error = useSelector((s) => s.pages.error);

  const allTenders = pageData?.tenders || [];

  // Fetch page data on mount
  useEffect(() => {
    dispatch(fetchPageBySlug('tenders'));
  }, [dispatch]);

  // Loading UI
  if (loading && !pageData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          <div className="mt-3 text-gray-700">Loading tenders…</div>
        </div>
      </div>
    );
  }

  // Error UI
  if (error && !pageData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-600">Error loading tenders</p>
          <p className="mt-2 text-sm text-gray-600">Please check the connection or try again.</p>
          <div className="mt-4">
            <button
              onClick={() => dispatch(fetchPageBySlug('tenders'))}
              className="px-4 py-2 bg-[#C64827] text-white rounded hover:bg-[#a53a1f] transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No data UI
  if (!loading && allTenders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold">No tenders available.</p>
          <p className="mt-2 text-sm text-gray-600">Please check back later.</p>
        </div>
      </div>
    );
  }

  // Client-side pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTenders = allTenders.slice(indexOfFirstItem, indexOfLastItem);

  // Format data for Table component
  const tableData = {
    heading: pageData?.heading || "Tender Document Download Section",
    tenders: currentTenders,
    pagination: {
      total: allTenders.length,
      limit: itemsPerPage
    },
    currentPage: currentPage,
    onPageChange: setCurrentPage
  };

  return (
    <div>
      <Table data={tableData} />
    </div>
  )
}
