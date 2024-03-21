import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', backgroundColor: 'hsl(240, 3.7%, 8%)' }}>
      <h1 style={{fontWeight: 'bold', fontSize: '2rem', borderRight: '1px solid gray', paddingRight: '0.75rem', marginRight: '0.75rem'}}>404</h1>
      <h2>This page could not be found.</h2>
    </div>
  )
}
