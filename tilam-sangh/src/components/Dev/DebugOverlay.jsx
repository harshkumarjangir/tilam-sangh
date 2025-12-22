import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const DebugOverlay = () => {
  const nav = useSelector((s) => s.navigation || {});
  const pages = useSelector((s) => s.pages || {});
  const location = useLocation();

  const currentSlug = location.pathname === '/' ? '' : location.pathname.replace(/^\//, '');
  const pageData = pages.dataBySlug?.[currentSlug] || null;

  return (
    <div style={{position: 'fixed', right: 10, bottom: 10, zIndex: 9999, background: 'rgba(0,0,0,0.8)', color: 'white', padding: 12, fontSize: 12, maxWidth: 420, borderRadius: 6, boxShadow: '0 2px 10px rgba(0,0,0,0.6)'}}>
      <div style={{fontWeight: 'bold', marginBottom: 6}}>DEBUG OVERLAY (dev only)</div>
      <div><strong>Path:</strong> {location.pathname}</div>
      <div><strong>Language:</strong> {nav.language || '—'}</div>
      <div><strong>Nav loading:</strong> {String(nav.loading)}</div>
      <div><strong>Nav error:</strong> {String(nav.error || '—')}</div>
      <div style={{marginTop:6}}><strong>Pages loading:</strong> {String(pages.loading)}</div>
      <div><strong>Pages error:</strong> {String(pages.error || '—')}</div>
      <div style={{marginTop:6}}><strong>Current slug:</strong> {currentSlug || '(home)'}</div>
      <div style={{marginTop:6, maxHeight: 140, overflow: 'auto'}}>
        <strong>Page data:</strong>
        <pre style={{whiteSpace: 'pre-wrap', fontSize: 11, marginTop: 6}}>{JSON.stringify(pageData ? Object.keys(pageData) : null, null, 2)}</pre>
      </div>
    </div>
  )
}

export default DebugOverlay
