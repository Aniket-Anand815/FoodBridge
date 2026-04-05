export default function StatsCard({title,value}){

 return(

  <div style={{
    background:"#f1f5f9",
    padding:"20px",
    borderRadius:"10px",
    width:"200px"
  }}>

   <h3>{title}</h3>

   <h2>{value}</h2>

  </div>

 )
}