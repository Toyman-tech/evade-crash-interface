
"use client"

import { useState, useEffect } from "react"
import { X, Heart, Car, Wifi, WifiOff, AlertTriangle, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import toast, { Toaster } from "react-hot-toast"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"

interface DeviceDetails {
    device_id: string
    status: "online" | "offline"
    owner_name: string
    vehicle_name: string
    vehicle_plate_number: string
    [key: string]: any
}

interface AccidentReport {
    id: number
    deviceid: string
    accident_type: string
    nature_of_request: string
    date: string
    time: string
    lat: string | null
    log: string | null
    created_at: string
    closed_status: number
}

export default function Component() {
    const [deviceId, setDeviceId] = useState("ZB_EVD_0009")
    const [heartbeat, setHeartbeat] = useState({
        isOnline: false,
        lastHeartbeat: "",
        deviceId: "",
    })
    const [accidentIdToClose, setAccidentIdToClose] = useState("")

    const [reports, setReports] = useState<AccidentReport[]>([])
    const [selectedReport, setSelectedReport] = useState<AccidentReport | null>(null)
    const [latestReport, setLatestReport] = useState<any | null>(null)

    const handleCloseCase = async () => {
        if (!accidentIdToClose) {
            toast.error("Please enter an Accident ID")
            return
        }
        const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8venViaXRlY2hub2xvZ2llcy5jb20vYWRzX2FwaXMvYXBpL2xvZ2luIiwiaWF0IjoxNzUwMDAzNTY3LCJleHAiOjE3NTAyMTk1NjcsIm5iZiI6MTc1MDAwMzU2NywianRpIjoiMWMxdXdFVmt0TmhvMGJYTSIsInN1YiI6IjEiLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5IiwibmFtZSI6IkFEUyBBZG1pbiIsInJvbGUiOiJhZG1pbiIsImlkIjoxfQ.y2sp-ztqivuRsdzv3Bl52uzv91pUmRFiT5WZ7h93yLg"
        const loadingToast = toast.loading("Closing case...")

        try {
            const formData = new FormData()
            formData.append("accident_id", accidentIdToClose)

            const response = await axios.post(
                `https://zubitechnologies.com/ads_apis/api/close_case`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data' 
                    },
                },
            )

            toast.success("Case closed successfully", { id: loadingToast })
            fetchDeviceData(deviceId)
            setAccidentIdToClose("")
        } catch (error) {
            console.error("Error closing case:", error)
            toast.error("Failed to close case", { id: loadingToast })
        }
    }
    const handleCloseCaseAuto = async (accidentId: string) => {
        if (!accidentId) {
          toast.error('No accident ID provided');
          return;
        }
        console.log(accidentId)
        const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8venViaXRlY2hub2xvZ2llcy5jb20vYWRzX2FwaXMvYXBpL2xvZ2luIiwiaWF0IjoxNzUwMDAzNTY3LCJleHAiOjE3NTAyMTk1NjcsIm5iZiI6MTc1MDAwMzU2NywianRpIjoiMWMxdXdFVmt0TmhvMGJYTSIsInN1YiI6IjEiLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5IiwibmFtZSI6IkFEUyBBZG1pbiIsInJvbGUiOiJhZG1pbiIsImlkIjoxfQ.y2sp-ztqivuRsdzv3Bl52uzv91pUmRFiT5WZ7h93yLg"

        const loadingToast = toast.loading('Closing case...');
      
        try {
          const formData = new FormData();
          formData.append('accident_id', accidentId);
      
          const response = await axios.post(
            `https://zubitechnologies.com/ads_apis/api/close_case`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' 
                },
            },
        )
      
          toast.success('Case closed successfully', { id: loadingToast });
          fetchDeviceData(deviceId); // Refresh the data
        } catch (error) {
          console.error('Error closing case:', error);
          toast.error('Failed to close case', { id: loadingToast });
        }
      };

    const fetchDeviceData = async (id: string) => {
        const token =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8venViaXRlY2hub2xvZ2llcy5jb20vYWRzX2FwaXMvYXBpL2xvZ2luIiwiaWF0IjoxNzUwMDAzNTY3LCJleHAiOjE3NTAyMTk1NjcsIm5iZiI6MTc1MDAwMzU2NywianRpIjoiMWMxdXdFVmt0TmhvMGJYTSIsInN1YiI6IjEiLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5IiwibmFtZSI6IkFEUyBBZG1pbiIsInJvbGUiOiJhZG1pbiIsImlkIjoxfQ.y2sp-ztqivuRsdzv3Bl52uzv91pUmRFiT5WZ7h93yLg"

        try {
            const res = await axios.get(
                `https://zubitechnologies.com/ads_apis/api/get_device_details?device_id=${encodeURIComponent(id)}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            )

            const data = res.data

            if (data.devicedetails) {
                setHeartbeat({
                    isOnline: data.devicedetails.status === "online",
                    lastHeartbeat: new Date().toLocaleString(),
                    deviceId: data.devicedetails.device_id,
                })
            }

            if (data.accident_detected && data.accident_detected.id) {
                setLatestReport(data.accident_detected)
                console.log(data)
            } else {
                setLatestReport(null)
            }

            if (Array.isArray(data.accident_history)) {
                setReports(data.accident_history.reverse().slice(0, 3)) // show latest first
            }
        } catch (err) {
            console.error("Failed to fetch data:", err)
        }
    }

    useEffect(() => {
        fetchDeviceData(deviceId)

        const interval = setInterval(() => {
            fetchDeviceData(deviceId)
        }, 10000) // refresh every 10s

        return () => clearInterval(interval)
    }, [deviceId])

    const handleDeviceIdChange = (newId: string) => {
        setDeviceId(newId)
        fetchDeviceData(newId)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        background: "#fff",
                        color: "#374151",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                        borderRadius: "0.375rem",
                        padding: "0.75rem 1rem",
                    },
                }}
            />

            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3 gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">E</span>
                        </div>
                        <h1 className="text-lg lg:text-xl font-semibold text-gray-900">Evade Production Test Kit</h1>
                    </div>
                    <div className="flex items-center gap-2 max-sm:hidden">
                        <div className={`w-2 h-2 rounded-full ${heartbeat.isOnline ? "bg-green-500" : "bg-red-500"}`} />
                        <span className="text-sm text-gray-600">{heartbeat.isOnline ? "Online" : "Offline"}</span>
                    </div>
                </div>

                {/* Device ID Input */}
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex items-center gap-3 flex-1">
                        <label htmlFor="deviceId" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                            Device ID:
                        </label>
                        <input
                            id="deviceId"
                            type="text"
                            value={deviceId}
                            onChange={(e) => setDeviceId(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleDeviceIdChange(deviceId)
                                }
                            }}
                            onBlur={(e) => handleDeviceIdChange(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter Evade device ID"
                        />
                        <Button
                            onClick={() => handleDeviceIdChange(deviceId)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap"
                        >
                            Fetch
                        </Button>
                    </div>

                    <div className="flex items-center gap-3 flex-1">
                        <input
                            type="text"
                            value={accidentIdToClose}
                            onChange={(e) => setAccidentIdToClose(e.target.value)}
                            placeholder="Enter Accident ID to close"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <Button
                            onClick={handleCloseCase}
                            size="sm"
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700 whitespace-nowrap"
                        >
                            Close Case
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex flex-col gap-7 px-4 py-6 space-y-7 h-full  max-w-7xl mx-auto">
                {/* Heartbeat and Latest Emergency Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-6 ">
                    {/* Heartbeat Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Last Heartbeat</h2>
                        <Card className="bg-white h-full">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                                        {heartbeat.isOnline ? (
                                            <Heart className="h-6 w-6 text-red-500 fill-current animate-pulse" />
                                        ) : (
                                            <Heart className="h-6 w-6 text-gray-400" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-gray-900">
                                                {heartbeat.isOnline ? "Device Online" : "Device Offline"}
                                            </span>
                                            {heartbeat.isOnline ? (
                                                <Wifi className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <WifiOff className="h-4 w-4 text-red-500" />
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">{heartbeat.lastHeartbeat}</p>
                                        <p className="text-xs text-gray-400">Device ID: {heartbeat.deviceId}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Latest Emergency Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 ">Latest Emergency</h2>
                        {latestReport ? (
                            <Card className="bg-white border-red-200 h-full hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <AlertTriangle className="h-6 w-6 text-red-600" />
                                        </div>
                                        <div className="flex-1 cursor-pointer" onClick={() => setSelectedReport(latestReport)}>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-medium text-gray-900">Emergency</span>
                                                <Badge
                                                    className={
                                                        latestReport.closed_status === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                    }
                                                >
                                                    {latestReport.closed_status === 1 ? "Closed" : "Open"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-gray-500 mb-1">{latestReport.created_at}</p>
                                            <p className="text-xs text-gray-400">Nature: {latestReport.nature_of_request || "N/A"}</p>
                                            <p className="text-xs text-gray-400">
                                                Location: {latestReport.lat || "N/A"}, {latestReport.log || "N/A"}
                                            </p>
                                        </div>
                                        {latestReport.closed_status === 0 && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleCloseCaseAuto(latestReport?.id.toString())
                                                }}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="bg-white h-full">
                                <CardContent className="p-8 text-center">
                                    <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No Latest Emergency</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Crash Reports */}
                <div className="mt-3 space-y-3 h-full ">
                    <h2 className="ftext-lg font-semibold text-gray-900 mb-2">Crash Reports</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {reports.length === 0 ? (
                            <div className="col-span-full">
                                <Card className="bg-white">
                                    <CardContent className="p-8 text-center">
                                        <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-500">No crash reports</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            reports.map((report) => (
                                <Card
                                    key={report.id}
                                    className="bg-white cursor-pointer hover:shadow-md transition-shadow"
                                    onClick={() => setSelectedReport(report)}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Car className="h-6 w-6 text-gray-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium text-gray-900">Crash</span>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {report.nature_of_request || "Unknown"}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-500 mb-1 truncate">{report.created_at}</p>
                                                <p className="text-xs text-gray-400 truncate">Type: {report.accident_type || "N/A"}</p>
                                                <p className="text-xs text-gray-400 truncate">
                                                    Location: {report.lat || "N/A"}, {report.log || "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Modal for Report Details */}
            {selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {selectedReport.nature_of_request ? "Emergency Details" : "Crash Details"}
                                </h3>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedReport(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    {selectedReport.nature_of_request ? (
                                        <AlertTriangle className="h-8 w-8 text-red-600" />
                                    ) : (
                                        <Car className="h-8 w-8 text-gray-600" />
                                    )}
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {selectedReport.nature_of_request ? "Emergency Detected" : "Vehicle Crash Detected"}
                                        </p>
                                        <p className="text-sm text-gray-500">Report ID: {selectedReport.id}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Timestamp</label>
                                    <p className="text-sm text-gray-900">{selectedReport.created_at}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Nature of Request</label>
                                    <p className="text-sm text-gray-900">{selectedReport.nature_of_request || "Unknown"}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Location</label>
                                    <p className="text-sm text-gray-900">
                                        Lat: {selectedReport.lat || "N/A"}, Long: {selectedReport.log || "N/A"}
                                    </p>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-gray-700">Status</label>
                                    <p className="text-sm text-gray-900">
                                        {selectedReport.closed_status === 0
                                            ? "Case Open - Emergency services notified"
                                            : "Case Closed - Issue resolved"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button onClick={() => setSelectedReport(null)} variant="outline" className="flex-1">
                                    Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
// "use client"

// import { useState, useEffect } from "react"
// import { X, Heart, Car, Trash2, Wifi, WifiOff } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import toast, { Toaster } from 'react-hot-toast'
// import { Card, CardContent } from "@/components/ui/card"
// import axios from "axios"

// interface DeviceDetails {
//     device_id: string
//     status: "online" | "offline"
//     owner_name: string
//     vehicle_name: string
//     vehicle_plate_number: string
//     [key: string]: any
// }

// interface AccidentReport {
//     id: number
//     deviceid: string
//     accident_type: string
//     nature_of_request: string
//     date: string
//     time: string
//     lat: string | null
//     log: string | null
//     created_at: string
//     closed_status: number
// }

// export default function Component() {
//     const [deviceId, setDeviceId] = useState("ZB_EVD_0009")
//     const [heartbeat, setHeartbeat] = useState({
//         isOnline: false,
//         lastHeartbeat: "",
//         deviceId: "",
//     })
//     const [accidentIdToClose, setAccidentIdToClose] = useState("")

//     const [reports, setReports] = useState<AccidentReport[]>([])
//     const [selectedReport, setSelectedReport] = useState<AccidentReport | null>(null)
//     const [latestReport, setLatestReport] = useState<any | null>(null)

//     const handleCloseCase = async () => {
//         if (!accidentIdToClose) {
//             toast.error('Please enter an Accident ID')
//             return
//         }

//         const token = "your_token_here"
//         const loadingToast = toast.loading('Closing case...')

//         try {
//             const formData = new FormData()
//             formData.append('accident_id', accidentIdToClose)

//             const response = await axios.post(
//                 `https://zubitechnologies.com/ads_apis/api/close_case?=${encodeURIComponent(accidentIdToClose)}`,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 }
//             )

//             toast.success('Case closed successfully', { id: loadingToast })
//             fetchDeviceData(deviceId)
//             setAccidentIdToClose("")
//         } catch (error) {
//             console.error('Error closing case:', error)
//             toast.error('Failed to close case', { id: loadingToast })
//         }
//     }

//     const fetchDeviceData = async (id: string) => {
//         const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8venViaXRlY2hub2xvZ2llcy5jb20vYWRzX2FwaXMvYXBpL2xvZ2luIiwiaWF0IjoxNzUwMDAzNTY3LCJleHAiOjE3NTAyMTk1NjcsIm5iZiI6MTc1MDAwMzU2NywianRpIjoiMWMxdXdFVmt0TmhvMGJYTSIsInN1YiI6IjEiLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5IiwibmFtZSI6IkFEUyBBZG1pbiIsInJvbGUiOiJhZG1pbiIsImlkIjoxfQ.y2sp-ztqivuRsdzv3Bl52uzv91pUmRFiT5WZ7h93yLg"

//         try {
//             const res = await axios.get(
//                 `https://zubitechnologies.com/ads_apis/api/get_device_details?device_id=${encodeURIComponent(id)}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             )

//             const data = res.data

//             if (data.devicedetails) {
//                 setHeartbeat({
//                     isOnline: data.devicedetails.status === "online",
//                     lastHeartbeat: new Date().toLocaleString(),
//                     deviceId: data.devicedetails.device_id,
//                 })
//             }

//             if (data.accident_detected && data.accident_detected.id) {
//                 setLatestReport(data.accident_detected)
//             } else {
//                 setLatestReport(null)
//             }


//             if (Array.isArray(data.accident_history)) {
//                 setReports((data.accident_history.reverse()).slice(0, 3)) // show latest first
//             }
//         } catch (err) {
//             console.error("Failed to fetch data:", err)
//         }
//     }

//     useEffect(() => {
//         fetchDeviceData(deviceId)

//         const interval = setInterval(() => {
//             fetchDeviceData(deviceId)
//         }, 10000) // refresh every 10s

//         return () => clearInterval(interval)
//     }, [deviceId])

//     const handleDeviceIdChange = (newId: string) => {
//         setDeviceId(newId)
//         fetchDeviceData(newId)
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <div className="">
//                 <Toaster position="top-right"
//                     toastOptions={{
//                         style: {
//                             background: '#fff',
//                             color: '#374151',
//                             boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//                             borderRadius: '0.375rem',
//                             padding: '0.75rem 1rem',
//                         },
//                     }} />
//                 {/* Rest of your existing code */}
//             </div>
//             {/* Navbar */}
//             <nav className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
//                 <div className="flex items-center justify-between mb-3">
//                     <div className="flex items-center gap-3">
//                         <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//                             <span className="text-white font-bold text-sm">E</span>
//                         </div>
//                         <h1 className="text-xl font-semibold text-gray-900">Evade Production Test Kit</h1>
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <div className={`w-2 h-2 rounded-full ${heartbeat.isOnline ? "bg-green-500" : "bg-red-500"}`} />
//                         <span className="text-sm text-gray-600">{heartbeat.isOnline ? "Online" : "Offline"}</span>
//                     </div>
//                 </div>

//                 {/* Device ID Input */}
//                 <div className="flex justify-between container w-full  max-sm:flex-col mx-auto">
//                     <div className="flex w-full ">
//                         <div className="flex items-center justify-center w-full max-w-2xl gap-3">
//                             <label htmlFor="deviceId" className="text-sm font-medium text-gray-700 whitespace-nowrap">
//                                 Device ID:
//                             </label>
//                             <input
//                                 id="deviceId"
//                                 type="text"
//                                 value={deviceId}
//                                 onChange={(e) => setDeviceId(e.target.value)}
//                                 onKeyDown={(e) => {
//                                     if (e.key === "Enter") {
//                                         handleDeviceIdChange(deviceId)
//                                     }
//                                 }}
//                                 onBlur={(e) => handleDeviceIdChange(e.target.value)}
//                                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 placeholder="Enter Evade device ID"
//                             />
//                             <Button
//                                 onClick={() => handleDeviceIdChange(deviceId)}
//                                 size="sm"
//                                 className="bg-blue-600 hover:bg-blue-700"
//                             >
//                                 Fetch
//                             </Button>
//                         </div>
//                     </div>
//                     <div className="flex items-center justify-center w-full max-w-2xl gap-3 mt-4 mx-auto">
//                         <input
//                             type="text"
//                             value={accidentIdToClose}
//                             onChange={(e) => setAccidentIdToClose(e.target.value)}
//                             placeholder="Enter Accident ID to close"
//                             className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         />
//                         <Button
//                             onClick={handleCloseCase}
//                             size="sm"
//                             variant="destructive"
//                             className="bg-red-600 hover:bg-red-700"
//                         >
//                             Close Case
//                         </Button>
//                     </div>
//                 </div>
//             </nav>

//             {/* Main Content */}
//             <div className="px-4 py-6 space-y-6 container mx-auto">
//                 {/* Heartbeat Section */}
//                 <div className="flex flex-col md:flex-row  w-full md:gap-2">
//                     <div className="md:w-[50%]">
//                         <h2 className="text-lg font-semibold  text-gray-900 mb-4">Last Heartbeat</h2>
//                         <Card className="bg-white md:pb-20">
//                             <CardContent className="p-4">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//                                         {heartbeat.isOnline ? (
//                                             <Heart className="h-6 w-6 text-red-500 fill-current animate-pulse" />
//                                         ) : (
//                                             <Heart className="h-6 w-6 text-gray-400" />
//                                         )}
//                                     </div>
//                                     <div className="flex-1">
//                                         <div className="flex items-center gap-2 mb-1">
//                                             <span className="font-medium text-gray-900">
//                                                 {heartbeat.isOnline ? "Device Online" : "Device Offline"}
//                                             </span>
//                                             {heartbeat.isOnline ? (
//                                                 <Wifi className="h-4 w-4 text-green-500" />
//                                             ) : (
//                                                 <WifiOff className="h-4 w-4 text-red-500" />
//                                             )}
//                                         </div>
//                                         <p className="text-sm text-gray-500">{heartbeat.lastHeartbeat}</p>
//                                         <p className="text-xs text-gray-400">Device ID: {heartbeat.deviceId}</p>
//                                     </div>
//                                 </div>
//                             </CardContent>
//                         </Card>
//                     </div>

//                     {/* Latest Report (accident_detected) latest emergency */}
//                     <div className="md:w-[50%]">
//                         <h2 className="text-lg font-semibold text-gray-900 mb-4 max-sm:pt-3">Latest Emergency</h2>
//                         {latestReport && (
//                             <section className="mb-6">
//                                 {/* <h2 className="text-lg font-semibold mb-2">Latest Emergency</h2> */}
//                                 <div className="p-4 bg-white rounded shadow-sm border border-blue-300">
//                                     <p>
//                                         <strong>Nature:</strong>{" "}
//                                         {latestReport.nature_of_request || "N/A"}
//                                     </p>
//                                     <p>
//                                         <strong>Date:</strong> {latestReport.created_at}
//                                     </p>
//                                     <p>
//                                         <strong>Location:</strong> {latestReport.lat},{" "}
//                                         {latestReport.log}
//                                     </p>
//                                     <p>
//                                         <strong>Status:</strong>{" "}
//                                         {latestReport.closed_status === 1 ? "Closed" : "Open"}
//                                     </p>
//                                 </div>
//                             </section>
//                         )}
//                         {!latestReport && (<Card className="bg-white">
//                             <CardContent className="p-8 text-center">
//                                 <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                                 <p className="text-gray-500">No Latestest Emergency</p>
//                             </CardContent>
//                         </Card>)}
//                     </div>
//                 </div>

//                 {/* Crash Reports */}
//                 <div>
//                     <h2 className="text-lg font-semibold text-gray-900 mb-4">Crash Reports</h2>
//                     <div className="space-y-3">
//                         {reports.length === 0 ? (
//                             <Card className="bg-white">
//                                 <CardContent className="p-8 text-center">
//                                     <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                                     <p className="text-gray-500">No crash reports</p>
//                                 </CardContent>
//                             </Card>
//                         ) : (
//                             reports.map((report) => (
//                                 <Card
//                                     key={report.id}
//                                     className="bg-white cursor-pointer hover:shadow-md transition-shadow"
//                                     onClick={() => setSelectedReport(report)}
//                                 >
//                                     <CardContent className="p-4">
//                                         <div className="flex items-center gap-4">
//                                             <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//                                                 <Car className="h-6 w-6 text-gray-600" />
//                                             </div>
//                                             <div className="flex-1">
//                                                 <div className="flex items-center gap-2 mb-1">
//                                                     <span className="font-medium text-gray-900">Crash</span>
//                                                     <Badge variant="secondary">
//                                                         {report.nature_of_request || "Unknown"}
//                                                     </Badge>
//                                                 </div>
//                                                 <p className="text-sm text-gray-500 mb-1">{report.created_at}</p>
//                                                 <p className="text-xs text-gray-400">Accident Type: {report.accident_type || "N/A"}</p>
//                                                 <p className="text-xs text-gray-400">Location: {report.lat}, {report.log}</p>
//                                             </div>
//                                         </div>
//                                     </CardContent>
//                                 </Card>
//                             ))
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Modal for Report Details */}
//             {selectedReport && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//                     <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
//                         <div className="p-6">
//                             <div className="flex items-center justify-between mb-4">
//                                 <h3 className="text-lg font-semibold text-gray-900">Crash Details</h3>
//                                 <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     onClick={() => setSelectedReport(null)}
//                                     className="text-gray-400 hover:text-gray-600"
//                                 >
//                                     <X className="h-5 w-5" />
//                                 </Button>
//                             </div>

//                             <div className="space-y-4">
//                                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                                     <Car className="h-8 w-8 text-gray-600" />
//                                     <div>
//                                         <p className="font-medium text-gray-900">Vehicle Crash Detected</p>
//                                         <p className="text-sm text-gray-500">Report ID: {selectedReport.id}</p>
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <label className="text-sm font-medium text-gray-700">Timestamp</label>
//                                     <p className="text-sm text-gray-900">{selectedReport.created_at}</p>
//                                 </div>

//                                 <div>
//                                     <label className="text-sm font-medium text-gray-700">Nature of Request</label>
//                                     <p className="text-sm text-gray-900">{selectedReport.nature_of_request || "Unknown"}</p>
//                                 </div>

//                                 <div>
//                                     <label className="text-sm font-medium text-gray-700">Location</label>
//                                     <p className="text-sm text-gray-900">
//                                         Lat: {selectedReport.lat || "N/A"}, Long: {selectedReport.log || "N/A"}
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <label className="text-sm font-medium text-gray-700">Emergency Response</label>
//                                     <p className="text-sm text-gray-900">
//                                         {selectedReport.closed_status === 0
//                                             ? "Emergency services notified"
//                                             : "Issue resolved"}
//                                     </p>
//                                 </div>
//                             </div>

//                             <div className="flex gap-3 mt-6">
//                                 <Button onClick={() => setSelectedReport(null)} variant="outline" className="flex-1">
//                                     Close
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { X, Heart, Car, Trash2, Wifi, WifiOff } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"

// interface CrashReport {
//   id: string
//   timestamp: string
//   type: "front-left" | "front-right" | "back-left" | "back-right" | "somersault" | "submersion"
//   severity: "minor" | "moderate" | "severe" | "fatal"
//   location?: string
// }

// interface HeartbeatStatus {
//   isOnline: boolean
//   lastHeartbeat: string
//   deviceId: string
// }

// export default function Component() {
//   const [reports, setReports] = useState<CrashReport[]>([
//     {
//       id: "1",
//       timestamp: "2024-01-19 09:00 AM",
//       type: "front-left",
//       severity: "minor",
//       location: "Highway 101",
//     },
//     {
//       id: "2",
//       timestamp: "2024-01-18 08:00 AM",
//       type: "back-right",
//       severity: "severe",
//       location: "Main Street",
//     },
//     {
//       id: "3",
//       timestamp: "2024-01-17 07:00 AM",
//       type: "somersault",
//       severity: "moderate",
//       location: "Interstate 95",
//     },
//     {
//       id: "4",
//       timestamp: "2024-01-16 06:30 AM",
//       type: "submersion",
//       severity: "fatal",
//       location: "River Bridge",
//     },
//   ])

//   const [heartbeat, setHeartbeat] = useState<HeartbeatStatus>({
//     isOnline: true,
//     lastHeartbeat: new Date().toLocaleString(),
//     deviceId: "ZB_EVD_0009",
//   })

//   const [selectedReport, setSelectedReport] = useState<CrashReport | null>(null)
//   const [currentDeviceId, setCurrentDeviceId] = useState("ZB_EVD_0009")

//   // Simulate heartbeat updates every 5 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setHeartbeat((prev) => ({
//         ...prev,
//         lastHeartbeat: new Date().toLocaleString(),
//         isOnline: Math.random() > 0.1, // 90% chance of being online
//       }))
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [])

//   const deleteReport = (id: string) => {
//     setReports((prev) => prev.filter((report) => report.id !== id))
//   }

//   const getCrashTypeDisplay = (type: string) => {
//     const typeMap = {
//       "front-left": "Front Left Impact",
//       "front-right": "Front Right Impact",
//       "back-left": "Back Left Impact",
//       "back-right": "Back Right Impact",
//       somersault: "Somersault",
//       submersion: "Water Submersion",
//     }
//     return typeMap[type as keyof typeof typeMap] || "Unknown"
//   }

//   const getSeverityColor = (severity: string) => {
//     const colorMap = {
//       minor: "bg-green-100 text-green-800",
//       moderate: "bg-yellow-100 text-yellow-800",
//       severe: "bg-orange-100 text-orange-800",
//       fatal: "bg-red-100 text-red-800",
//     }
//     return colorMap[severity as keyof typeof colorMap] || "bg-gray-100 text-gray-800"
//   }

//   const handleDeviceIdChange = (newDeviceId: string) => {
//     setCurrentDeviceId(newDeviceId)
//     // Update heartbeat with new device ID
//     setHeartbeat((prev) => ({
//       ...prev,
//       deviceId: newDeviceId,
//       lastHeartbeat: new Date().toLocaleString(),
//       isOnline: Math.random() > 0.2, // Simulate connection check
//     }))
//     // In a real app, you would fetch new reports for this device ID here
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <nav className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <span className="text-white font-bold text-sm">E</span>
//             </div>
//             <h1 className="text-xl font-semibold text-gray-900">Evade Dashboard</h1>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className={`w-2 h-2 rounded-full ${heartbeat.isOnline ? "bg-green-500" : "bg-red-500"}`} />
//             <span className="text-sm text-gray-600">{heartbeat.isOnline ? "Online" : "Offline"}</span>
//           </div>
//         </div>

//         {/* Device ID Input */}
//         <div className="flex w-full justify-center">
//         <div className="flex items-center  justify-center w-full max-w-2xl  gap-3">
//           <label htmlFor="deviceId" className="text-sm font-medium text-gray-700 whitespace-nowrap">
//             Device ID:
//           </label>
//           <input
//             id="deviceId"
//             type="text"
//             value={currentDeviceId}
//             onChange={(e) => setCurrentDeviceId(e.target.value)}
//             onBlur={(e) => handleDeviceIdChange(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 handleDeviceIdChange(currentDeviceId)
//               }
//             }}
//             className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="Enter Evade device ID"
//           />
//           <Button
//             onClick={() => handleDeviceIdChange(currentDeviceId)}
//             size="sm"
//             className="bg-blue-600 hover:bg-blue-700"
//           >
//             Connect
//           </Button>
//         </div>
//         </div>
//       </nav>

//       <div className="px-4 py-6 space-y-6 pb-6 container mx-auto">
//         {/* Last Heartbeat Section */}
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Last Heartbeat</h2>
//           <Card className="bg-white">
//             <CardContent className="p-4">
//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//                   {heartbeat.isOnline ? (
//                     <Heart className="h-6 w-6 text-red-500 fill-current animate-pulse" />
//                   ) : (
//                     <Heart className="h-6 w-6 text-gray-400" />
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <span className="font-medium text-gray-900">
//                       {heartbeat.isOnline ? "Device Online" : "Device Offline"}
//                     </span>
//                     {heartbeat.isOnline ? (
//                       <Wifi className="h-4 w-4 text-green-500" />
//                     ) : (
//                       <WifiOff className="h-4 w-4 text-red-500" />
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-500">{heartbeat.lastHeartbeat}</p>
//                   <p className="text-xs text-gray-400">Device ID: {heartbeat.deviceId}</p>
//                 </div>
//                 <div className={`w-3 h-3 rounded-full ${heartbeat.isOnline ? "bg-green-500" : "bg-red-500"}`} />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Reports Section */}
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Reports</h2>
//           <div className="space-y-3">
//             {reports.length === 0 ? (
//               <Card className="bg-white">
//                 <CardContent className="p-8 text-center">
//                   <Car className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                   <p className="text-gray-500">No crash reports</p>
//                 </CardContent>
//               </Card>
//             ) : (
//               reports.map((report) => (
//                 <Card key={report.id} className="bg-white cursor-pointer hover:shadow-md transition-shadow">
//                   <CardContent className="p-4" onClick={() => setSelectedReport(report)}>
//                     <div className="flex items-center gap-4">
//                       <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
//                         <Car className="h-6 w-6 text-gray-600" />
//                       </div>
//                       <div className="flex-1">
//                         <div className="flex items-center gap-2 mb-1">
//                           <span className="font-medium text-gray-900">Crash</span>
//                           <Badge className={getSeverityColor(report.severity)}>
//                             {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
//                           </Badge>
//                         </div>
//                         <p className="text-sm text-gray-500 mb-1">{report.timestamp}</p>
//                         <p className="text-xs text-gray-400">{getCrashTypeDisplay(report.type)}</p>
//                         {report.location && <p className="text-xs text-gray-400">Location: {report.location}</p>}
//                       </div>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => deleteReport(report.id)}
//                         className="text-gray-400 hover:text-red-500"
//                       >
//                         <Trash2 className="h-5 w-5" />
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Crash Details Modal */}
//       {selectedReport && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-semibold text-gray-900">Crash Details</h3>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setSelectedReport(null)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <X className="h-5 w-5" />
//                 </Button>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                   <Car className="h-8 w-8 text-gray-600" />
//                   <div>
//                     <p className="font-medium text-gray-900">Vehicle Crash Detected</p>
//                     <p className="text-sm text-gray-500">Report ID: {selectedReport.id}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-medium text-gray-700">Timestamp</label>
//                     <p className="text-sm text-gray-900">{selectedReport.timestamp}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm font-medium text-gray-700">Severity</label>
//                     <Badge className={getSeverityColor(selectedReport.severity)}>
//                       {selectedReport.severity.charAt(0).toUpperCase() + selectedReport.severity.slice(1)}
//                     </Badge>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Crash Type</label>
//                   <p className="text-sm text-gray-900">{getCrashTypeDisplay(selectedReport.type)}</p>
//                 </div>

//                 {selectedReport.location && (
//                   <div>
//                     <label className="text-sm font-medium text-gray-700">Location</label>
//                     <p className="text-sm text-gray-900">{selectedReport.location}</p>
//                   </div>
//                 )}

//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Emergency Response</label>
//                   <p className="text-sm text-gray-900">
//                     {selectedReport.severity === "fatal" || selectedReport.severity === "severe"
//                       ? "Emergency services notified"
//                       : "No emergency response required"}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="text-sm font-medium text-gray-700">Device Status</label>
//                   <p className="text-sm text-gray-900">Signal transmitted successfully</p>
//                 </div>
//               </div>

//               <div className="flex gap-3 mt-6">
//                 <Button onClick={() => deleteReport(selectedReport.id)} variant="destructive" className="flex-1">
//                   Delete Report
//                 </Button>
//                 <Button onClick={() => setSelectedReport(null)} variant="outline" className="flex-1">
//                   Close
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
