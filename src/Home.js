import { useEffect, useState } from "react"
import './Home.css'

export default function Home () {

    const [data,setData] = useState([])
    const [pageData,setPageData] = useState([])
    const [start,setStart] = useState(0)
    const [end , setEnd] = useState(10)
    const [page ,setPage] = useState(1)

    useEffect(() => {
       
            const loadData = async() => {
                try {
                    const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
                    const result = await response.json()
                    setData(result)
                    }
                 catch (error) {
                    alert("failed to fetch data")
                    }
                }
            loadData()
    },[])

    useEffect(()=> {

        setPageData(data.slice(start,end))

    },[data,start,end] )
    


    function handlePrev() {

        if(end>10) {
            setStart(start-10)
            setEnd(end-10)
            setPage(page-1)
        }
    
         
    }

    function handleNext() {

        if(end<data.length) {
            setStart(start+10)
            setEnd(end+10)
            setPage(page+1)
        }

       
    }

    return(

        <div style={{textAlign:"center" , display:"flex" , flexDirection:"column"}} >
            <h1> Employee Data Table</h1>
                <table cellPadding="10"  >
                    <thead style={{background:"green"}}>

                        <tr>
                           <td>ID</td> 
                           <td>Name</td>
                           <td>Email</td>
                           <td>Role</td>
                        </tr>

                    </thead>

            { pageData.map((item) => (

                    <tbody > 

                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                        </tr>
                     
                    </tbody>

                ))}

                </table>
             <div style={{display:"flex", justifyContent:"center"}}>
                <button className="btn" onClick={()=>handlePrev()}>Previous</button>
                <button className="btn" disabled >{page}</button>
                <button className="btn" onClick={()=>handleNext()}>Next</button>
            </div>  
            
        </div>

    )
}