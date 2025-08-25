import { useEffect, useState } from "react"

export default function Home () {

    const [data,setData] = useState([])
    const [pageData,setPageData] = useState([])
    const [start,setStart] = useState(0)
    const [end , setEnd] = useState(10)
    const [page ,setPage] = useState(1)

    useEffect(() => {
        try {
            const loadData = async() => {
            const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
            const result = await response.json()
            setData(result)
            }
            loadData()
            
        }catch (error) {
            console.error("failed to fetch data")
        }
        
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

        <div style={{display:"flex" , justifyContent:"center", alignItems:"center", textAlign:"center", flexDirection:"column" }}>
            <h1> Employee Data Table</h1>
                <table cellPadding="10" style={{borderSpacing:"100px 20px"}} >
                    <thead style={{background:"green"}}>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Email</td>
                        <td>Role</td>
                    </thead>

            { pageData.map((item) => (

                    <tbody > 
                        <td>
                            {item.id} 
                        </td>

                        <td>
                            {item.name}
                        </td>

                        <td>
                            {item.email}
                        </td>

                        <td>
                            {item.role}
                        </td>
                     
                    </tbody>

                ))}

                </table>
             <div style={{display:"flex", justifyContent:"center"}}>
                <button onClick={()=>handlePrev()}>prev</button>
                <button disabled >{page}</button>
                <button onClick={()=>handleNext()}>next</button>
            </div>  
            
        </div>

    )
}