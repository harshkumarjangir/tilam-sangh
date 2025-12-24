import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Table from '../components/resusable_components/Table'
// import tenders from '../data/tenderTable.json'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPageBySlug } from '../redux/slices/pagesSlice' 

export default function Tenders() {
  // console.log("Tenders Json Data", tenders)

  const dispatch = useDispatch();
  const location = useLocation();
  const slug = location.pathname === "/" ? "" : location.pathname.replace(/^\//, "");

  const pageData = useSelector((s) => s.pages.dataBySlug?.[slug] || null);
  const loading = useSelector((s) => s.pages.loading);


  // console.log("tenderData bg Api", pageData)
  
const tenders = pageData

  // Fetch page data on mount
  useEffect(() => {
    dispatch(fetchPageBySlug(slug));
  }, [dispatch, slug]);

  // Loading and error UI
  if (loading && !pageData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          <div className="mt-3 text-gray-700">Loading page content…</div>
        </div>
      </div>
    );
  }

  if (!loading && !pageData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold">No content available.</p>
          <p className="mt-2 text-sm text-gray-600">If this persists, please check the API or click retry.</p>
          <div className="mt-4">
            <button
              onClick={() => dispatch(fetchPageBySlug(slug))}
              className="px-4 py-2 bg-[#C64827] text-white rounded"
            >Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Table data={tenders} />
    </div>
  )
}
