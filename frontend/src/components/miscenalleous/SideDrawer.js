import React, { useState } from 'react'

const SideDrawer = () => {
  const [search,useSearch]=useState("")
  const [searchResult, setSearchResult] = useState([])
  const[loading,setLoading]=useState(false)
  const[loadingChat,setLoadingChat]=useState()

  return (
    <div>
        Side Drawer
    </div>
  )
}

export default SideDrawer