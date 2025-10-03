import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Camera, CheckCircle2, XCircle, AlertTriangle, User, Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AccessEvent {
  id: string;
  timestamp: string;
  plate: string;
  name: string;
  status: "granted" | "denied";
  reason?: string;
}

const SecurityDashboard = () => {
  const { toast } = useToast();
  const [studentId, setStudentId] = useState("");
  const [newPlate, setNewPlate] = useState("");
  const [currentScan, setCurrentScan] = useState({
    plate: "MH-12-AB-5678",
    name: "Rahul Kumar",
    studentId: "STU-2025-042",
    status: "granted" as const,
  });
  
  const [events, setEvents] = useState<AccessEvent[]>([
    {
      id: "1",
      timestamp: new Date().toLocaleTimeString(),
      plate: "MH-12-CD-9012",
      name: "Priya Sharma",
      status: "granted",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 300000).toLocaleTimeString(),
      plate: "DL-01-XY-3456",
      name: "Unknown",
      status: "denied",
      reason: "Vehicle Not Registered",
    },
  ]);

  const handleRegisterVehicle = () => {
    if (studentId && newPlate) {
      toast({
        title: "Vehicle Registered",
        description: `Vehicle ${newPlate} registered for student ${studentId}`,
      });
      setStudentId("");
      setNewPlate("");
    }
  };

  // Simulate new events
  useEffect(() => {
    const interval = setInterval(() => {
      // Random simulation logic can be added here
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Security Operations</h1>
            <p className="text-muted-foreground">Real-time vehicle access monitoring</p>
          </div>
          <Badge variant="outline" className="text-accent border-accent shadow-glow-accent">
            <div className="h-2 w-2 rounded-full bg-accent mr-2 animate-pulse" />
            LIVE
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Camera Feed */}
          <Card className="lg:col-span-2 border-card-border bg-gradient-card shadow-elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                Live Gate Camera
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video bg-muted/30 rounded-lg overflow-hidden border border-primary/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Camera className="h-16 w-16 text-muted-foreground mx-auto animate-pulse" />
                    <p className="text-sm text-muted-foreground">Camera Feed Simulation</p>
                  </div>
                </div>
                {/* AI Detection Overlay */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="bg-background/90 backdrop-blur p-3 rounded border border-accent shadow-glow-accent">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-accent font-semibold">AI DETECTION ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Status */}
          <Card className="border-card-border bg-gradient-card shadow-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Latest Scan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Car className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">License Plate</p>
                    <p className="font-mono font-semibold">{currentScan.plate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Student</p>
                    <p className="font-semibold">{currentScan.name}</p>
                    <p className="text-xs text-muted-foreground">{currentScan.studentId}</p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border-2 ${
                currentScan.status === "granted" 
                  ? "bg-accent/10 border-accent shadow-glow-accent" 
                  : "bg-destructive/10 border-destructive shadow-glow-destructive"
              }`}>
                <div className="flex items-center justify-center gap-2">
                  {currentScan.status === "granted" ? (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-accent" />
                      <span className="font-bold text-lg text-accent">ACCESS GRANTED</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-6 w-6 text-destructive" />
                      <span className="font-bold text-lg text-destructive">ACCESS DENIED</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Log */}
          <Card className="lg:col-span-2 border-card-border bg-gradient-card shadow-elevated">
            <CardHeader>
              <CardTitle>Access Event Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-xs text-muted-foreground font-mono">{event.timestamp}</span>
                      <span className="font-mono font-semibold">{event.plate}</span>
                      <span className="text-sm">{event.name}</span>
                    </div>
                    <Badge
                      variant={event.status === "granted" ? "default" : "destructive"}
                      className={event.status === "granted" ? "bg-accent" : ""}
                    >
                      {event.status === "granted" ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {event.status.toUpperCase()}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Manual Registration */}
          <Card className="border-card-border bg-gradient-card shadow-elevated">
            <CardHeader>
              <CardTitle className="text-lg">Manual Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Student/Faculty ID</label>
                <Input
                  placeholder="Enter ID..."
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="bg-background/50 border-muted"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">License Plate Number</label>
                <Input
                  placeholder="XX-00-XX-0000"
                  value={newPlate}
                  onChange={(e) => setNewPlate(e.target.value)}
                  className="bg-background/50 border-muted"
                />
              </div>

              <Button 
                onClick={handleRegisterVehicle}
                className="w-full shadow-glow-primary"
              >
                Register Vehicle
              </Button>

              {/* Alert Section */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="font-semibold">Active Alerts</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  No unauthorized attempts detected
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;
