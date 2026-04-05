export default function KPICard({title,value}){

 return(

  <div style={{
   background:"white",
   padding:"20px",
   borderRadius:"10px",
   boxShadow:"0px 2px 6px rgba(0,0,0,0.1)",
   border:"1px solid #e0e0e0",
   transition:"all 0.3s ease",
   cursor:"pointer"
  }}
  onMouseEnter={(e) => {
   e.currentTarget.style.boxShadow = "0px 4px 12px rgba(0,0,0,0.15)"
   e.currentTarget.style.transform = "translateY(-2px)"
  }}
  onMouseLeave={(e) => {
   e.currentTarget.style.boxShadow = "0px 2px 6px rgba(0,0,0,0.1)"
   e.currentTarget.style.transform = "translateY(0)"
  }}
  >

   <h4 style={{color:"#666",fontSize:"14px",margin:"0 0 10px 0",textTransform:"uppercase",letterSpacing:"0.5px"}}>{title}</h4>
   <h2 style={{margin:0,color:"#2196F3",fontSize:"32px"}}>{value}</h2>

  </div>

 )
}