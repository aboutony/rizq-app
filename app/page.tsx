export default function Home() {
  return (
    <main style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'40px'}}>
      <div style={{textAlign:'center', maxWidth:420, width:'100%'}}>
        <h1 style={{fontSize:28, marginBottom:24}}>Choose your language</h1>
        <div style={{display:'grid', gap:12}}>
          <a href="/en/login" style={btn}>English</a>
          <a href="/ar/login" style={btn}>العربية</a>
          <a href="/fr/login" style={btn}>Français</a>
        </div>
      </div>
    </main>
  );
}

const btn: React.CSSProperties = {
  display: 'block',
  padding: '14px 18px',
  borderRadius: 10,
  background: '#1f2a44',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 600
};
