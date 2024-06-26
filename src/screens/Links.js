import React, { useState, useEffect } from "react"
// import Sidebar from 'react-sidebar'
// import SlidingPanel from 'react-sliding-side-panel'
import IconButton from "@material-ui/core/IconButton"
import ClearIcon from "@material-ui/icons/Clear"
import DeleteIcon from "@material-ui/icons/Delete"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import CircularProgress from "@material-ui/core/CircularProgress"

import AddIcon from "@material-ui/icons/Add"
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat"
import ImportExport from "@material-ui/icons/ImportExport"
import "react-toastify/dist/ReactToastify.css"
import Select from "@material-ui/core/Select"
import { ToastContainer, toast } from "react-toastify"

import {
  Grid,
  Container,
  Modal,
  TextField,
  Button,
  Fab,
} from "@material-ui/core"
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles"

// import DeleteIcon from '@material-ui/icons/Delete'
import { useDispatch, useSelector } from "react-redux"
import { OauthLogout } from "../actions/oauthAction"
import { Link } from "react-router-dom"
import TagsInput from "react-tagsinput"
import "./home.css"
import "react-tagsinput/react-tagsinput.css" // If using WebPack and style-loader.
import {
  NodeAdd,
  Nodefetch,
  EdgeAdd,
  Edgefetch,
  EdgeUpdate,
  NodeUpdate,
  NodeDeletion,
  EdgeDeletion,
  NodeAdded,
  EdgeAdded,
  NodeEdgefetch,
} from "../actions/nodeAction"
import { Graph } from "react-d3-graph"
import Navbar from "../components/Navbar"
import axios from "axios"
import Sidebar from "../components/Sidebar"
import { NewReleases } from "@material-ui/icons"
import { baseURL } from "../utils/api"
let apidata = []
let checkingnodes
let meetingid
const Links = ({ history }) => {
  // const [hid, setHid] = useState(false)
  const [open, setOpen] = useState(false)
  const [openViewNode, setOpenViewNode] = useState(false)
  const [openViewEdge, setOpenViewEdge] = useState(false)
  const [openAddEdge, setOpenAddEdge] = useState(false)
  const [haveupdateedge, setHaveupdateedge] = useState(false)
  const [haveupdatenode, setHaveupdatenode] = useState(false)
  const [openimportview, setOpenimportview] = useState(false)
  const [tags, setTags] = useState([])
  const [msggggg, setMsggggg] = useState("")

  // const [visi, setVisi] = useState(false)
  const [visible, setVisiblity] = useState(false)
  const [payvisi, setPayvisi] = useState(false)
  const [showgraph, setShowgraph] = useState(false)

  const [id, setId] = useState("")
  let abcd
  const [updatenodeid, setUpdatenodeid] = useState("")
  const [author_data, setAuthor_data] = useState("")
  const [institution_data, setInstitution_data] = useState("")
  const [limit_dataa, setLimit_dataa] = useState(-1)
  const [pubs_dataa, setPubs_dataa] = useState(-1)
  const [co_author_dataa, setCo_author_dataa] = useState(-1)

  const [updatenodetype, setUpdatenodetype] = useState("")
  const [updatenodetags, setUpdatenodetags] = useState([])
  const [selectimport, setSelectimport] = useState([])
  const [updateinputfields, setUpdateinputfields] = useState([])

  const [vissible, setVissiblity] = useState(false)
  const [apigraph, setApigraph] = useState([])
  const [haveedgedetails, setHaveedgedetails] = useState([])
  const [type, setType] = useState("")
  const [inputfields, setInputfields] = useState([])
  // const [openPanel, setOpenPanel] = useState(false)
  const [popup, setPopup] = useState(false)
  // const [update, setUpdate] = useState(false)
  const [popdown, setPopdown] = useState(false)
  const [newnode, setNewnode] = useState([])
  const [newedge, setNewedge] = useState([])
  const [attributes, setAttributes] = useState([])
  const [updateattributes, setUpdateattributes] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [apiloader, setApiloader] = useState(false)

  const [source, setSource] = useState("")
  const [target, setTarget] = useState("")
  const [edgetags, setEdgetags] = useState([])
  const [searchdata, setSearchdata] = useState([])
  const [searchvalue, setSearchvalue] = useState("")
  // const [name, setName] = useState('')
  const [filtereddata, setFiltereddata] = useState([])
  const [apilabel, setApilabel] = useState([
    "Google Scholar",
    "Imdb",
    "Twitter",
    "Facebook",
  ])
  let colorarr = [
    "#16A085",
    "#27AE60",
    "#2980B9",
    "#8E44AD",
    "#2C3E50",
    "#FFBF00",
    "#F39C12",
    "#D35400",
    "#C0392B",
    "#BDC3C7",
    "#7F8C8D",
    "#43A047",
    "#7B1FA2",
  ]
  const [randomcolor, setRandomcolor] = useState([])

  const [updatesource, setUpdatesource] = useState("")
  const [updatetarget, setUpdatetarget] = useState("")
  const [updateedgetags, setUpdateedgetags] = useState([])
  const [sendinggraphdata, setSendinggraphdata] = useState([])

  const [nodepopup, setNodepopup] = useState([])
  const [nodefilterss, setNodefilterss] = useState([])
  const [nodefiltersss, setNodefiltersss] = useState([])
  const [nodefilterssss, setNodefilterssss] = useState([])
  const [nodefiltersssss, setNodefiltersssss] = useState([])
  // const [mydata, setMydata] = useState({ nodes: [], links: [] })

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle)
  const dispatch = useDispatch()
  let nodefilt
  let nodefilts
  let nodefiltss
  let nodefiltsss

  const getOauth = useSelector((state) => state.getOauth)
  const { loading: oauthloading, oauth, error: oautherror } = getOauth

  // const putNode = useSelector((state) => state.putNode)
  // const { loading, node, error: noderror } = putNode
  const getNode = useSelector((state) => state.getNode)
  const {
    loading: nodeloading,
    filterednode,
    filterededge,
    messssage,
    nodde,
    error: errror,
  } = getNode
  // const deleteNode = useSelector((state) => state.deleteNode)
  // const { loading: deletenodeloading, nodedelete, error: errrror } = deleteNode

  useEffect(() => {
    if (oauth?._id) {
      dispatch(Nodefetch(oauth._id))
      console.log("oauth", oauth, nodde)
    }
  }, [])

  useEffect(() => {
    console.log("source updated")
    if (source !== "") {
      nodefilt = nodde?.nodes?.filter((item) => item._id !== source)
      setNodefilterss(nodefilt)
      console.log("nodefilt", nodefilt, nodefilterss)
    }
  }, [source])

  useEffect(() => {
    console.log("source updated")
    if (target !== "") {
      nodefilts = nodde?.nodes?.filter((item) => item._id !== target)
      setNodefiltersss(nodefilts)
      console.log("nodefilt", nodefilts, nodefiltersss)
    }
  }, [target])
  useEffect(() => {
    console.log("source updated")
    if (updatesource !== "") {
      nodefiltss = nodde?.nodes?.filter((item) => item._id !== updatesource)
      setNodefilterssss(nodefiltss)
      console.log("nodefilt", nodefiltss, nodefilterssss)
    }
  }, [updatesource])
  useEffect(() => {
    console.log("source updated")
    if (updatetarget !== "") {
      nodefiltsss = nodde?.nodes?.filter((item) => item._id !== updatetarget)
      setNodefiltersssss(nodefiltsss)
      console.log("nodefilt", nodefiltsss, nodefiltersssss)
    }
  }, [updatetarget])
  // useEffect(() => {
  //   const apires = async () => {
  //     const { data } = await axios.get(
  //       'https://smart-vampirebat-89.loca.lt/api'
  //     )
  //   }
  //   console.log('apidata', data)
  //   apires()
  // })
  useEffect(() => {
    console.log("selectimport:", selectimport)
  }, [selectimport])

  // useEffect(() => {
  //   const arr = colorarr.sort(() => Math.random() - 0.5)[0]
  //   console.log('arr', arr)
  //   setRandomcolor(arr)
  // }, [])

  // useEffect(() => {
  //  const abc=nodde?.nodes.filter(xi=>(

  //   ))
  //   filterednodes(nodde?.nodes)
  // }, [])
  useEffect(() => {
    console.log("searchednode:", filterednode)
  }, [filterednode])
  useEffect(() => {
    console.log("apigraph", apigraph)
  }, [apigraph])
  useEffect(() => {
    console.log("apigraphs", apigraph?.nodes, apigraph?.edges)
  }, [apigraph])

  useEffect(() => {
    setUpdatenodeid(nodepopup?.id)
    setUpdatenodetype(nodepopup?.type)
    setUpdatenodetags(nodepopup?.tags)

    let sourceNode = nodde?.nodes?.filter(
      (node) => node.id === haveedgedetails?.source
    )[0]
    let targetNode = nodde?.nodes?.filter(
      (node) => node.id === haveedgedetails?.target
    )[0]

    setUpdatesource(sourceNode?._id)
    setUpdatetarget(targetNode?._id)
    setUpdateedgetags(haveedgedetails?.tags)
    // setUpdatenodetags(nodepopup?.tags)

    // setUpdateedgetags(haveedgedetails?.tags)
  }, [haveedgedetails, nodepopup])

  const handleOpen = () => {
    setOpen(true)
  }
  const updatetheedge = () => {
    setHaveupdateedge(true)
  }
  const showimportview = () => {
    apidata = []
    setApigraph([])
    setOpenimportview(true)
    setOpen(false)
  }
  const updatethenode = () => {
    setHaveupdatenode(true)
  }
  const handleOpenViewNode = () => {
    setOpenViewNode(true)
  }
  const handlepayvisi = () => {
    setPayvisi(true)
  }
  const handleOpenAddEdge = () => {
    setOpenAddEdge(true)
  }
  const handleOpenViewEdge = () => {
    setOpenViewEdge(true)
  }

  const handleClose = () => {
    setOpen(false)
    setOpenViewNode(false)
    setOpenAddEdge(false)
    setOpenViewEdge(false)
    setHaveupdateedge(false)
    setHaveupdatenode(false)
    setOpenimportview(false)
    setPayvisi(false)
  }

  function rand() {
    return Math.round(Math.random() * 20) - 10
  }
  const { innerWidth, innerHeight } = window

  function getModalStyle() {
    const { innerWidth, innerHeight } = window

    let top = 50,
      left = innerWidth < 600 ? 0 : 50
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${left}%, -${top}%)`,
    }
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      width: innerWidth > 600 ? 600 : "100%",

      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxHeight: "calc(100vh - 200px)",
      overflow: "auto !important",
      top: "50%",
    },
    paperss: {
      position: "absolute",
      width: innerWidth > 600 ? 500 : "100%",

      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxHeight: "calc(100vh - 100px)",
      overflow: "auto !important",
      top: "50%",
    },
    papper: {
      position: "absolute",
      width: innerWidth > 600 ? 450 : "100%",

      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      maxHeight: "calc(100vh - 200px)",
      overflow: "auto !important",
      top: "50%",
    },
    multilineColor: {
      color: "white",
    },
    formControl: {
      // margin: theme.spacing(1),
      minWidth: 120,
      width: "100%",
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
    rooot: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  }))
  const classes = useStyles()

  const deleteanode = () => {
    dispatch(NodeDeletion(nodepopup?._id))

    handleClose()
  }

  const deleteaedge = () => {
    dispatch(EdgeDeletion(haveedgedetails?._id))
    // dispatch(Nodefetch(oauth._id))
    handleClose()
  }

  const handlesearchchange = (event) => {
    const { value } = event.target
    setSearchvalue(value)
    console.log("ji", searchvalue)
  }

  const handleChange = (tags) => {
    setTags(tags)
  }
  const handlenodeChange = (updatenodetags) => {
    setUpdatenodetags(updatenodetags)
  }
  const handleChanges = (edgetags) => {
    setEdgetags(edgetags)
  }
  const handleupdateChanges = (updateedgetags) => {
    setUpdateedgetags(updateedgetags)
  }

  const handlechangeinput = (index, event) => {
    const values = [...inputfields]
    console.log("value", values)
    values[index][event.target.name] = event.target.value
    console.log("values", values)
    setInputfields(values)
    setAttributes(inputfields)
  }
  const handlechangeupdateinput = (index, event) => {
    const values = [...updateinputfields]
    values[index][event.target.name] = event.target.value
    setUpdateinputfields(values)
    setUpdateattributes(updateinputfields)
  }

  // if (msggggg) {
  //   toast.error('You entered the same node name', {
  //     position: 'bottom-center',
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   })
  //   setMsggggg('')
  //   console.log('messssage', messssage)
  // }

  const handleclickfields = () => {
    let zb = [
      ...inputfields,
      { attributeName: "", attributeValue: "", attributeType: "" },
    ]
    setInputfields([
      ...inputfields,
      { attributeName: "", attributeValue: "", attributeType: "" },
    ])
    console.log("setInputfields", zb)
  }
  const handleclickupdatefields = () => {
    setUpdateinputfields([
      ...updateinputfields,
      { attributeName: "", attributeValue: "", attributeType: "" },
    ])
  }
  const handlgeupdateedge = () => {
    updatetheedge()
  }
  const handleupdatenode = () => {
    updatethenode()
  }

  const inputfieldsremove = (index) => {
    const values = [...inputfields]
    values.splice(index, 1)
    setInputfields(values)
  }
  const updateinputfieldsremove = (index) => {
    const values = [...updateinputfields]
    values.splice(index, 1)
    setUpdateinputfields(values)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log("ab", nodde?.nodes?.length, oauth?.packageid?.Nodes)
    if (nodde?.nodes?.length < oauth?.packageid?.Nodes) {
      let color = colorarr.sort(() => Math.random() - 0.5)[0]
      nodde.nodes.filter((node) => {
        if (node.type === type && node.color) {
          return (color = node.color)
        }
      })
      dispatch(NodeAdd(oauth?._id, id, type, tags, attributes, color))

      // dispatch(Nodefetch(oauth?._id))

      handleClose()
      setId("")
      setType("")
      setTags([])
      setInputfields([])
    } else {
      handlepayvisi()

      setId("")
      setType("")
      setTags([])
      setInputfields([])
    }
  }
  const submitupdatenodehandler = (e) => {
    e.preventDefault()

    dispatch(
      NodeUpdate(
        nodepopup?._id,
        oauth._id,
        updatenodeid,
        updatenodetype,
        updatenodetags,
        updateattributes
      )
    )
    // dispatch(Nodefetch(oauth._id))
    handleClose()
    setUpdatenodeid("")
    setUpdatenodetype("")
    setUpdatenodetags([])
    setUpdateinputfields([])
  }

  const submitedgehandler = (e) => {
    e.preventDefault()
    if (nodde?.links?.length < oauth?.packageid?.Edges) {
      dispatch(EdgeAdd(oauth._id, source, target, edgetags))
      // dispatch(Nodefetch(oauth._id))
      handleClose()
      setSource("")
      setTarget("")
      setEdgetags([])
      setNodefilterss([])
      setNodefiltersss([])
    } else {
      handlepayvisi()
      // handleClose()
      setSource("")
      setTarget("")
      setEdgetags([])
    }
  }
  const importviewHandler = async (e) => {
    e.preventDefault()

    setApiloader(true)

    let limit_data
    let co_author_data
    let pubs_data
    limit_data = Number(limit_dataa)
    pubs_data = Number(pubs_dataa)
    co_author_data = Number(co_author_dataa)
    console.log(
      "respone",
      author_data,
      institution_data,
      limit_data,
      pubs_data,
      co_author_data,
      typeof author_data,
      typeof institution_data,
      typeof limit_data,
      typeof pubs_data,
      typeof co_author_data
    )
    const config = {
      headers: {
        "Content-Type": "application/json",
        // 'Access-Control-Allow-Origin': '*',
      },
    }
    const { data } = await axios.post(
      "http://192.168.1.178:5000/api/gs_search",
      {
        author_data,
        institution_data,
        limit_data,
        pubs_data,
        co_author_data,
      },
      config
    )
    if (data?.msg === "faliure" || data?.nodes?.length <= 0) {
      setApiloader(false)
      toast.error("You typed wrong information", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    if (data?.nodes) {
      setApiloader(false)
    }
    if (data?.nodes?.length > 0) {
      setShowgraph(true)
      console.log("setting data in graph 1", data, apiloader)
      // setApigraph(data)
      apidata = data
      console.log("api graph nodes", data.nodes)
      let newArr = data?.nodes?.map((importedNode) => {
        let color = colorarr.sort(() => Math.random() - 0.5)[0]
        for (let node of nodde?.nodes) {
          if (node.type === importedNode.type && node.color) {
            color = node.color
          }
        }
        importedNode.color = color
        let nodeid = oauth?._id
        importedNode.nodeid = nodeid
        let tags = []
        importedNode.tags = tags
        console.log("new node", importedNode)
        return importedNode
      })
      let newedd = data?.edges?.map((importededge) => {
        let edgeid = oauth?._id
        importededge.edgeid = edgeid
        console.log("new edge", importededge)
        return importededge
      })
      // // console.log('importview api res', data, limit_data, apigraph)
      // // console.log('new array ==>', data.edges)
      abcd = { edges: newedd, nodes: newArr }
      // setSendinggraphdata(abcd)
      // setMydata({  nodes: apigraph?.nodes, links: apigraph?.edges })
      // console.log('abcd', abcd)
      console.log("setting data in graph 2", abcd)
      // setApigraph(abcd)
      apidata = abcd
      setApigraph(abcd)
      console.log("view", apigraph, apidata?.nodes, apidata?.edges)
      checkingnodes = apidata?.nodes?.filter((xd) => {
        let flag = true
        for (let node of nodde?.nodes) {
          if (node.id === xd.id) {
            // console.log('newdatsa', node.id, xd.id)
            flag = false
          }
        }
        return flag
      })
      console.log("newdata", checkingnodes)
    }
    // const {
    //   data,
    // } = await axios.post('https://yellow-termite-80.loca.lt/api/none', { name })
    // console.log('apireps', data)
  }
  useEffect(() => {
    console.log("abcd", abcd)
  }, [abcd])

  const mydata = {
    nodes: apidata ? apidata.nodes : [],

    links: apidata ? apidata.edges : [],
  }

  const myConfigs = {
    nodeHighlightBehavior: true,
    directed: true,
    node: {
      color: "#3A4A57",
      size: 550,
      highlightStrokeColor: "blue",
      fontSize: 18,
    },
    link: {
      highlightColor: "lightblue",
      size: 1500,
      strokeWidth: 2.4,
      color: "#6F93B0",
    },
  }

  const sendingapidata = () => {
    setShowgraph(false)
    let newernodes
    let neweredges
    let edgges
    setApiloader(true)

    console.log("newdatas", apidata?.nodes, apidata?.edges)
    if (
      nodde?.nodes?.length < oauth?.packageid?.Nodes &&
      checkingnodes?.length > 0
    ) {
      ;(async () => {
        console.log("newdata", apidata?.nodes, apidata?.edges)
        const config = {
          headers: {
            "Content-Type": "application/json",
            // 'Access-Control-Allow-Origin': '*',
          },
        }
        const { data } = await axios.post(
          `${baseURL}/nodes/many`,
          apidata?.nodes,
          config
        )
        newernodes = data
        console.log("data", data, newernodes)
        // setNewnode(data)
        edgges = apidata?.edges?.map((edge) => {
          console.log("newnodees", newnode)
          for (let node of data) {
            if (edge.source === node.id) {
              console.log("nodeid", edge?.source, node?.id)
              edge.source = node._id
            }
            if (edge.target === node.id) {
              edge.target = node._id
            }
          }
          console.log("edgggge", edge)
          return edge
        })

        if (nodde?.links?.length < oauth?.packageid?.Edges) {
          console.log("eddge", edgges)
          const config = {
            headers: {
              "Content-Type": "application/json",
              // 'Access-Control-Allow-Origin': '*',
            },
          }
          const { data } = await axios.post(
            `${baseURL}/edges/many`,
            edgges,
            config
          )
          neweredges = data
          console.log("data2", data, neweredges)
          // setNewedge(data)
        }
        console.log("abbbc")
        dispatch(NodeEdgefetch(newernodes, neweredges))
      })()
    }
    setApiloader(false)

    setSelectimport([])
    setAuthor_data("")
    setInstitution_data("")
    handleClose()

    console.log("newedges", edgges)
  }

  const submitupdateedgehandler = (e) => {
    e.preventDefault()
    dispatch(
      EdgeUpdate(
        haveedgedetails?._id,
        oauth._id,
        updatesource,
        updatetarget,
        updateedgetags
      )
    )
    // dispatch(Nodefetch(oauth._id))
    handleClose()
    setNodefilterssss([])
    setNodefiltersssss([])
  }

  const blackTheme = createMuiTheme({
    palette: { primary: { main: "#000000" } },
  })

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 id="simple-modal-title">Add Node</h2>
        <IconButton
          onClick={handleClose}
          color="inherit"
          aria-label="open drawer"
          style={{ marginTop: -10, marginBottom: 10 }}
        >
          <ClearIcon style={{ color: "grey" }} />
        </IconButton>
      </div>

      <form onSubmit={submitHandler}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              style={{ color: "black", width: "100%", marginTop: 9 }}
              id="outlined-basic"
              size="small"
              label="Name"
              value={id}
              onChange={(e) => setId(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{ width: "100%", marginTop: 9 }}
              id="outlined-basic"
              label="Type"
              size="small"
              value={type}
              onChange={(e) => setType(e.target.value)}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <div style={{ height: 9 }}></div>
        <TagsInput
          style={{ color: "black" }}
          value={tags}
          onChange={handleChange}
        />
        <div style={{ height: 9 }}></div>
        {inputfields.map((inputfield, index) => (
          <div
            style={{ width: "100%", display: "flex", marginBottom: 8 }}
            key={index}
          >
            <Grid container spacing={1} style={{ flex: 1 }}>
              <Grid item xs={4}>
                <TextField
                  name="attributeName"
                  label="Type"
                  size="small"
                  variant="outlined"
                  value={inputfield.attributeName}
                  onChange={(event) => handlechangeinput(index, event)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="attributeValue"
                  label="Type"
                  size="small"
                  variant="outlined"
                  value={inputfield.attributeValue}
                  onChange={(event) => handlechangeinput(index, event)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="attributeType"
                  label="Type"
                  size="small"
                  variant="outlined"
                  value={inputfield.attributeType}
                  onChange={(event) => handlechangeinput(index, event)}
                />
              </Grid>
            </Grid>
            <IconButton
              size="small"
              type="button"
              onClick={() => inputfieldsremove(index)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button type="button" onClick={handleclickfields} color="primary">
          Add Attribute
        </Button>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={id === "" || type === ""}
          >
            <div>Add Node</div>
          </Button>
        </div>
      </form>
    </div>
  )
  const boddy = (
    <div style={modalStyle} className={classes.papper}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 id="simple-modal-title">View Node</h2>
        <IconButton
          onClick={handleClose}
          color="inherit"
          aria-label="open drawer"
          style={{ marginTop: -10, marginBottom: 10 }}
        >
          <ClearIcon style={{ color: "grey" }} />
        </IconButton>
      </div>
      <Grid container>
        <Grid item xs={6}>
          <p style={{ fontSize: 15 }}>
            Name:
            <span style={{ fontSize: 17, fontWeight: 500 }}>
              {" "}
              {nodepopup?.id}
            </span>
          </p>
        </Grid>
        <Grid item xs={6}>
          <p style={{ fontSize: 14 }}>
            Type:{" "}
            <span style={{ fontSize: 17, fontWeight: 500 }}>
              {" "}
              {nodepopup?.type}
            </span>
          </p>
        </Grid>
      </Grid>
      {nodepopup?.tags?.length > 0 ? (
        <>
          <div style={{ height: 17 }}></div>
          <p>
            <span style={{ fontSize: 15 }}>Tags:</span>{" "}
            {nodepopup?.tags?.map((tagg, index) => (
              <>
                <span
                  key={index}
                  style={{
                    display: "inline !important",
                    backgroundColor: "black",
                    color: "white",
                    padding: 3.1,
                    paddingLeft: 9,
                    paddingRight: 9,
                    minWidth: 400,
                    marginRight: 3.8,
                    borderRadius: 3.3,
                    textAlign: "center",
                  }}
                >
                  {tagg}
                </span>
              </>
            ))}
          </p>
        </>
      ) : null}

      <div style={{ height: 17 }}></div>
      {nodepopup?.attributes?.length > 0 ? (
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ fontWeight: 400, textAlign: "left", fontSize: 16 }}>
                Attribute Name
              </th>
              <th style={{ fontWeight: 400, textAlign: "left", fontSize: 16 }}>
                Attribute Value
              </th>
              <th style={{ fontWeight: 400, textAlign: "left", fontSize: 16 }}>
                Attribute Type
              </th>
            </tr>
            <div style={{ height: 8 }}></div>
          </thead>
          <tbody>
            {nodepopup?.attributes?.map((att) => (
              <>
                <tr>
                  <td style={{ fontSize: 22 }}>{att.attributeName}</td>
                  <td style={{ fontSize: 22 }}>{att.attributeType}</td>
                  <td style={{ fontSize: 22 }}>{att.attributeValue}</td>
                </tr>

                {/* <Grid
              style={{ display: 'flex', justifyContent: 'space-between' }}
              container
            >
              <Grid item xs={4}>
                <p style={{ fontSize: 20 }}>
                  Attribute Name:
                  <span style={{ fontWeight: 500 }}> {att.attributeName} </span>
                </p>
              </Grid>
              <Grid item xs={4}>
                <p style={{ fontSize: 20 }}>
                  Attribute Type:
                  <span style={{ fontWeight: 500 }}> {att.attributeType}</span>
                </p>
              </Grid>
              <Grid item xs={4}>
                <p style={{ fontSize: 20 }}>
                  Attribute Value:
                  <span style={{ fontWeight: 500 }}> {att.attributeValue}</span>
                </p>
              </Grid>
            </Grid> */}
                <div style={{ height: 12 }}></div>
              </>
            ))}
          </tbody>
        </table>
      ) : null}
      <Button type="button" onClick={handleupdatenode}>
        Edit Node
      </Button>
      <Button type="button" onClick={deleteanode}>
        Delete Node
      </Button>
    </div>
  )
  const boddddy = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 id="simple-modal-title">View Edge</h2>
        <IconButton
          onClick={handleClose}
          color="inherit"
          aria-label="open drawer"
          style={{ marginTop: -10, marginBottom: 10 }}
        >
          <ClearIcon style={{ color: "grey" }} />
        </IconButton>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <p style={{ fontSize: 15 }}>
            Source:
            <span style={{ fontSize: 17, fontWeight: 500 }}>
              {" "}
              {haveedgedetails?.source}
            </span>
          </p>
        </Grid>
        <Grid item xs={6}>
          <p style={{ fontSize: 14 }}>
            Target:{" "}
            <span style={{ fontSize: 17, fontWeight: 500 }}>
              {" "}
              {haveedgedetails?.target}
            </span>
          </p>
        </Grid>
      </Grid>
      {haveedgedetails?.tags?.length > 0 ? (
        <>
          <div style={{ height: 17 }}></div>
          <p>
            <span style={{ fontSize: 15 }}>Tags:</span>{" "}
            {haveedgedetails?.tags?.map((tagg) => (
              <>
                <span
                  style={{
                    display: "inline !important",
                    backgroundColor: "black",
                    color: "white",
                    padding: 3.1,

                    paddingLeft: 9,
                    paddingRight: 9,
                    minWidth: 400,
                    marginRight: 3.8,
                    borderRadius: 3.3,
                    textAlign: "center",
                  }}
                >
                  {tagg}
                </span>
              </>
            ))}
          </p>
        </>
      ) : null}

      <div style={{ height: 17 }}></div>
      <Button type="button" onClick={handlgeupdateedge}>
        Edit Edge
      </Button>
      <Button type="button" onClick={deleteaedge}>
        Delete Edge
      </Button>
    </div>
  )
  const bodddy = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 id="simple-modal-title">Add Edge</h2>
        <IconButton
          onClick={handleClose}
          color="inherit"
          aria-label="open drawer"
          style={{ marginTop: -10, marginBottom: 10 }}
        >
          <ClearIcon style={{ color: "grey" }} />
        </IconButton>
      </div>
      <form onSubmit={submitedgehandler}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Source</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                {nodefiltersss?.length > 0
                  ? nodefiltersss.map((iddd) => (
                      <MenuItem value={iddd._id}>{iddd.id}</MenuItem>
                    ))
                  : nodde?.nodes?.map((idd) => (
                      <MenuItem value={idd._id}>{idd.id}</MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Target</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              >
                {nodefilterss?.length > 0
                  ? nodefilterss.map((iddd) => (
                      <MenuItem value={iddd._id}>{iddd.id}</MenuItem>
                    ))
                  : nodde?.nodes?.map((idd) => (
                      <MenuItem value={idd._id}>{idd.id}</MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div style={{ height: 9 }}></div>
        <TagsInput
          style={{ color: "black" }}
          value={edgetags}
          onChange={handleChanges}
        />
        <div
          style={{
            display: "flex",
            marginTop: 13,
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={source === "" || target === "" || edgetags?.length <= 0}
          >
            <div>Add Edge</div>
          </Button>
        </div>
      </form>
    </div>
  )
  const bodddddy = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 id="simple-modal-title">Update Edge</h2>
        <IconButton
          onClick={handleClose}
          color="inherit"
          aria-label="open drawer"
        >
          <ClearIcon style={{ color: "grey" }} />
        </IconButton>
      </div>
      <form onSubmit={submitupdateedgehandler}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Edit Source</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={updatesource}
                onChange={(e) => setUpdatesource(e.target.value)}
              >
                {nodefiltersssss?.length > 0
                  ? nodefiltersssss.map((iddd) => (
                      <MenuItem value={iddd._id}>{iddd.id}</MenuItem>
                    ))
                  : nodde?.nodes?.map((idd) => (
                      <MenuItem value={idd._id}>{idd.id}</MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              className={classes.formControl}
              variant="outlined"
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Edit Target</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={updatetarget}
                onChange={(e) => setUpdatetarget(e.target.value)}
              >
                {nodefilterssss?.length > 0
                  ? nodefilterssss.map((iddd) => (
                      <MenuItem value={iddd._id}>{iddd.id}</MenuItem>
                    ))
                  : nodde?.nodes?.map((idd) => (
                      <MenuItem value={idd._id}>{idd.id}</MenuItem>
                    ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div style={{ height: 9 }}></div>
        <TagsInput
          style={{ color: "black" }}
          value={updateedgetags}
          onChange={handleupdateChanges}
        />
        <Button
          type="submit"
          disabled={
            updatesource === "" ||
            updatetarget === "" ||
            updateedgetags?.length <= 0
          }
        >
          <div>Edit Edge</div>
        </Button>
      </form>
    </div>
  )
  const bodddddddy = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 id="simple-modal-title">Update Node</h2>
        <IconButton
          onClick={handleClose}
          color="inherit"
          aria-label="open drawer"
        >
          <ClearIcon style={{ color: "grey" }} />
        </IconButton>
      </div>
      <form onSubmit={submitupdatenodehandler}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              style={{ color: "black", width: "100%", marginTop: 9 }}
              id="outlined-basic"
              size="small"
              label="Name"
              value={updatenodeid}
              onChange={(e) => setUpdatenodeid(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              style={{ width: "100%", marginTop: 9 }}
              id="outlined-basic"
              label="Type"
              size="small"
              value={updatenodetype}
              onChange={(e) => setUpdatenodetype(e.target.value)}
              variant="outlined"
            />
          </Grid>
        </Grid>
        <div style={{ height: 9 }}></div>
        <TagsInput
          style={{ color: "black" }}
          value={updatenodetags ? updatenodetags : null}
          onChange={handlenodeChange}
        />
        <div style={{ height: 9 }}></div>
        {updateinputfields?.map((updateinputfield, index) => (
          <div
            style={{ width: "100%", display: "flex", marginBottom: 8 }}
            key={index}
          >
            <Grid container spacing={1} style={{ flex: 1 }}>
              <Grid item xs={4}>
                <TextField
                  name="attributeName"
                  label="Type"
                  size="small"
                  variant="outlined"
                  value={updateinputfield.attributeName}
                  onChange={(event) => handlechangeupdateinput(index, event)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="attributeValue"
                  label="Type"
                  size="small"
                  variant="outlined"
                  value={updateinputfield.attributeValue}
                  onChange={(event) => handlechangeupdateinput(index, event)}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="attributeType"
                  label="Type"
                  size="small"
                  variant="outlined"
                  value={updateinputfield.attributeType}
                  onChange={(event) => handlechangeupdateinput(index, event)}
                />
              </Grid>
            </Grid>
            <IconButton
              size="small"
              type="button"
              onClick={() => updateinputfieldsremove(index)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <Button type="button" onClick={handleclickupdatefields} color="primary">
          Update Attribute
        </Button>
        <Button
          type="submit"
          disabled={updatenodeid === "" || updatenodetype === ""}
        >
          <div>Edit Node</div>
        </Button>
      </form>
    </div>
  )

  const boddddddddy = (
    <div style={modalStyle} className={classes.paper}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 id="simple-modal-title">Import View</h2>
        <IconButton
          onClick={handleClose}
          color="inherit"
          aria-label="open drawer"
          style={{ marginTop: -10, marginBottom: 10 }}
        >
          <ClearIcon style={{ color: "grey" }} />
        </IconButton>
      </div>
      {apiloader ? (
        <div className={classes.rooot}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {!apigraph?.nodes?.length > 0 && (
            <form onSubmit={importviewHandler}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <FormControl
                    className={classes.formControl}
                    variant="outlined"
                    size="small"
                  >
                    <InputLabel id="demo-simple-select-label">
                      Select import
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={selectimport}
                      onChange={(e) => setSelectimport(e.target.value)}
                    >
                      {apilabel?.map((apilab) => (
                        <MenuItem value={apilab}>{apilab}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {selectimport === "Google Scholar" && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        style={{ color: "black", width: "100%", marginTop: 9 }}
                        id="outlined-basic"
                        size="small"
                        label="Author"
                        value={author_data}
                        onChange={(e) => setAuthor_data(e.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                <TextField
                  style={{ color: 'black', width: '100%', marginTop: 9 }}
                  id='outlined-basic'
                  size='small'
                  label='Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant='outlined'
                />
              </Grid> */}
                    <Grid item xs={12}>
                      <TextField
                        style={{ color: "black", width: "100%", marginTop: 9 }}
                        id="outlined-basic"
                        size="small"
                        label="Institution"
                        value={institution_data}
                        onChange={(e) => setInstitution_data(e.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ color: "black", width: "100%", marginTop: 9 }}
                        id="outlined-basic"
                        size="small"
                        label="Limit"
                        type="number"
                        value={limit_dataa}
                        onChange={(e) => setLimit_dataa(e.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ color: "black", width: "100%", marginTop: 9 }}
                        id="outlined-basic"
                        size="small"
                        label="Publications"
                        type="number"
                        value={pubs_dataa}
                        onChange={(e) => setPubs_dataa(e.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        style={{ color: "black", width: "100%", marginTop: 9 }}
                        id="outlined-basic"
                        size="small"
                        label="Coauthor"
                        type="number"
                        value={co_author_dataa}
                        onChange={(e) => setCo_author_dataa(e.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                      item
                      xs={12}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={author_data === "" || institution_data === ""}
                      >
                        <div>Submit</div>
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
              <div style={{ height: 9 }}></div>

              <div style={{ height: 9 }}></div>
            </form>
          )}
          <div className="graph1">
            {showgraph && (
              <>
                <Graph
                  id="graph-id"
                  data={mydata}
                  config={myConfigs}
                  // onClickNode={onClickNode}
                  // onClickLink={onClickLink}
                />
                <Button
                  type="button"
                  onClick={sendingapidata}
                  variant="contained"
                  color="primary"
                >
                  Save Graph
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
  const paymentbody = (
    <div style={modalStyle} className={classes.paperss}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ textAlign: "center" }} id="simple-modal-title">
          Limit Reached
        </h2>
        <IconButton
          onClick={handleClose}
          color="inherit"
          aria-label="open drawer"
          style={{ marginTop: -10, marginBottom: 10 }}
        >
          <ClearIcon style={{ color: "grey" }} />
        </IconButton>
      </div>
      <p style={{ fontWeight: 400, fontSize: 19 }}>
        Please upgrade your subsciption limit has been reached,please upgrade or
        wait for your quota limit to be refreshed
      </p>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        <Link to="/payment">
          <Button
            style={{ backgroundColor: "rgb(32, 32, 32)", color: "white" }}
          >
            Upgrade
          </Button>
        </Link>
        <Button
          onClick={handleClose}
          style={{
            backgroundColor: "rgb(32, 32, 32)",
            color: "white",
            marginLeft: "18px",
          }}
        >
          Close
        </Button>
      </div>
    </div>
  )

  console.log(
    "data in nodes -->",
    filterednode ? filterednode : nodde?.nodes ? nodde?.nodes : []
  )

  const data = {
    nodes: filterednode ? filterednode : nodde?.nodes ? nodde?.nodes : [],
    links: filterededge ? filterededge : nodde?.links ? nodde?.links : [],
    // { source: 'Harry', target: 'Sally' },
    // { source: 'Harry', target: 'Alice' },
    // links: [],
  }

  const myConfig = {
    nodeHighlightBehavior: true,
    directed: true,
    node: {
      color: "#3A4A57",
      size: 550,
      highlightStrokeColor: "blue",
      fontSize: 18,
    },
    link: {
      highlightColor: "lightblue",
      size: 1500,
      strokeWidth: 2.4,
      color: "#6F93B0",
    },
  }

  const onClickNode = (nodeId) => {
    handleOpenViewNode()
    setPopup(true)
    const nodedetails = nodde?.nodes?.filter((node) => node.id === nodeId)[0]
    console.log("ab", nodedetails)

    setNodepopup(nodedetails)
  }

  const onClickLink = (source, target) => {
    console.log("source and target", source, target)
    handleOpenViewEdge()
    const edgedetails = nodde?.links?.filter(
      (link) => link.target === target && link.source === source
    )[0]
    setHaveedgedetails(edgedetails)
  }

  // const showtheVisiblity = () => {
  //   setHid(true)
  // }

  const onSetSidebarOpen = () => {
    setSidebarOpen(true)
  }

  const showmodal = () => {
    handleOpen()
    setPopup(false)
  }
  const addedgemodal = () => {
    handleOpenAddEdge()
    setPopdown(true)
  }

  const logout = () => {
    dispatch(OauthLogout())
    history.push("/")
  }
  return (
    <>
      <Navbar
        setVisiblity={setVisiblity}
        logout={logout}
        vissible={vissible}
        setVissiblity={setVissiblity}
        page={"Links"}
      />
      <div
        className={
          vissible ? "graph-actions-expanded graph-actions" : "graph-actions"
        }
      >
        <div className="web">
          <Button onClick={handleOpen} variant="contained" color="primary">
            Add Node
          </Button>
          {nodde?.nodes?.length > 1 ? (
            <Button
              onClick={handleOpenAddEdge}
              style={{ marginLeft: 10 }}
              variant="contained"
              color="primary"
            >
              Add Edge
            </Button>
          ) : null}
          {/* <Button
            onClick={showimportview}
            color="primary"
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            Import View
          </Button> */}
        </div>
        <div className="mobile">
          <div>
            <Fab onClick={handleOpen} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
          {nodde?.nodes?.length > 1 ? (
            <div>
              <Fab
                onClick={handleOpenAddEdge}
                style={{ marginTop: 10 }}
                color="primary"
                aria-label="add"
              >
                <TrendingFlatIcon />
              </Fab>
            </div>
          ) : null}
          <div>
            <Fab
              onClick={showimportview}
              style={{ marginTop: 10 }}
              color="primary"
              aria-label="add"
            >
              <ImportExport />
            </Fab>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "calc(100vh - 70px)",
          backgroundColor: "rgba(230, 230, 230,1)",
        }}
      >
        <Sidebar
          visible={visible}
          showimportview={showimportview}
          vissible={vissible}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
        >
          {body}
        </Modal>
        <Modal
          open={openViewNode}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
        >
          {boddy}
        </Modal>
        <Modal
          open={openAddEdge}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
        >
          {bodddy}
        </Modal>
        <Modal
          open={openViewEdge}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
        >
          {boddddy}
        </Modal>
        <Modal
          open={haveupdateedge}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
        >
          {bodddddy}
        </Modal>
        <Modal
          open={openimportview}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
        >
          {boddddddddy}
        </Modal>

        <Modal
          open={haveupdatenode}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
        >
          {bodddddddy}
        </Modal>
        <Modal
          open={payvisi}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
        >
          {paymentbody}
        </Modal>
        {nodeloading ? (
          <div className={classes.rooot}>
            <CircularProgress />
          </div>
        ) : (
          <div className="graph1">
            <Graph
              id="graph-id1"
              data={data}
              config={myConfig}
              onClickNode={onClickNode}
              onClickLink={onClickLink}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Links
