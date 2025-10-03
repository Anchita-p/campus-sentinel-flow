import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Users, Car, AlertCircle, Search, 
  Clock, CheckCircle2, XCircle, Activity 
} from "lucide-react";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const kpis = [
    { label: "Total Entries Today", value: "1,247", icon: Activity, color: "text-primary" },
    { label: "Unique Vehicles", value: "892", icon: Car, color: "text-accent" },
    { label: "Denied Access", value: "23", icon: XCircle, color: "text-destructive" },
    { label: "Peak Traffic Hour", value: "09:00", icon: Clock, color: "text-highlight" },
  ];

  const accessLogs = [
    {
      timestamp: "2025-10-03 14:32:15",
      plate: "MH-12-AB-1234",
      name: "Rohan Sharma",
      userId: "STU-2025-001",
      status: "granted" as const,
    },
    {
      timestamp: "2025-10-03 14:28:42",
      plate: "DL-01-XY-5678",
      name: "Priya Verma",
      userId: "STU-2025-042",
      status: "granted" as const,
    },
    {
      timestamp: "2025-10-03 14:25:10",
      plate: "KA-05-CD-9012",
      name: "Unknown",
      userId: "N/A",
      status: "denied" as const,
      reason: "Vehicle Not Registered",
    },
  ];

  const anomalies = [
    {
      id: 1,
      description: "Unrecognized Vehicle: DL-XX-9999 - 3 attempts in 5 minutes",
      severity: "high" as const,
      time: "10 min ago",
    },
    {
      id: 2,
      description: "Access Attempt by Inactive User: Amit Kumar",
      severity: "medium" as const,
      time: "25 min ago",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 left-1/4 w-56 h-56 border border-primary/20 rounded-lg rotate-45 animate-[spin_35s_linear_infinite]" />
        <div className="absolute bottom-32 right-1/3 w-40 h-40 border-2 border-accent/20 animate-[spin_20s_linear_infinite_reverse]" />
        <div className="absolute top-1/2 right-20 w-28 h-28 border border-highlight/20 rounded-full animate-pulse" />
        <div className="absolute top-1/4 left-10 w-px h-48 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-1/3 left-1/2 w-64 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        <div className="absolute top-3/4 right-10 w-36 h-px bg-gradient-to-l from-transparent via-highlight/20 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">System analytics and user management</p>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <Card key={index} className="border-card-border bg-gradient-card shadow-elevated">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{kpi.label}</p>
                    <p className="text-3xl font-bold">{kpi.value}</p>
                  </div>
                  <kpi.icon className={`h-10 w-10 ${kpi.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <Card className="lg:col-span-2 border-card-border bg-gradient-card shadow-elevated">
            <CardHeader>
              <CardTitle>Access Logs & User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="logs" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="logs">Full Access Log</TabsTrigger>
                  <TabsTrigger value="users">User Management</TabsTrigger>
                </TabsList>

                <TabsContent value="logs" className="space-y-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search by plate, name, or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-background/50 border-muted"
                      />
                    </div>
                  </div>

                  <div className="border border-border rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-muted/50 border-b border-border">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold">Timestamp</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold">License Plate</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold">User ID</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {accessLogs.map((log, index) => (
                            <tr key={index} className="hover:bg-muted/30 transition-colors">
                              <td className="px-4 py-3 text-sm font-mono">{log.timestamp}</td>
                              <td className="px-4 py-3 text-sm font-mono font-semibold">{log.plate}</td>
                              <td className="px-4 py-3 text-sm">{log.name}</td>
                              <td className="px-4 py-3 text-sm font-mono">{log.userId}</td>
                              <td className="px-4 py-3">
                                <Badge
                                  variant={log.status === "granted" ? "default" : "destructive"}
                                  className={log.status === "granted" ? "bg-accent" : ""}
                                >
                                  {log.status === "granted" ? (
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                  ) : (
                                    <XCircle className="h-3 w-3 mr-1" />
                                  )}
                                  {log.status.toUpperCase()}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search students or faculty..."
                        className="pl-10 bg-background/50 border-muted"
                      />
                    </div>
                    <Button className="shadow-glow-primary">
                      <Users className="h-4 w-4 mr-2" />
                      Add User
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Card className="border-border bg-muted/30">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="font-semibold">Rohan Sharma</p>
                            <p className="text-sm text-muted-foreground">STU-2025-001 • Student • Active</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">MH-12-AB-1234</Badge>
                              <Badge variant="outline" className="text-xs">MH-12-CD-5678</Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="destructive" size="sm">Deactivate</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Anomalies */}
            <Card className="border-card-border bg-gradient-card shadow-elevated">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  Anomaly Report
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {anomalies.map((anomaly) => (
                  <div
                    key={anomaly.id}
                    className={`p-3 rounded-lg border ${
                      anomaly.severity === "high"
                        ? "bg-destructive/10 border-destructive"
                        : "bg-muted/30 border-border"
                    }`}
                  >
                    <p className="text-sm font-medium">{anomaly.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{anomaly.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Traffic Chart */}
            <Card className="border-card-border bg-gradient-card shadow-elevated">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Traffic Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex items-end justify-between gap-1">
                  {[45, 78, 65, 90, 120, 85, 95, 110, 75, 88, 92, 70].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-primary rounded-t opacity-80 hover:opacity-100 transition-opacity"
                      style={{ height: `${(height / 120) * 100}%` }}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Vehicle Entries - Last 24 Hours
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
