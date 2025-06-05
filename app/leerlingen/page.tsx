import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Search,
  Plus,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function LeerlingenPage() {
  const leerlingen = [
    {
      id: 1,
      name: "Emma de Vries",
      email: "emma.devries@school.nl",
      class: "6A",
      averageGrade: 8.5,
      completedWorksheets: 23,
      pendingWorksheets: 2,
      lastActive: "2 uur geleden",
      trend: "up",
      status: "active",
    },
    {
      id: 2,
      name: "Lucas van Dam",
      email: "lucas.vandam@school.nl",
      class: "6A",
      averageGrade: 7.8,
      completedWorksheets: 19,
      pendingWorksheets: 1,
      lastActive: "1 dag geleden",
      trend: "up",
      status: "active",
    },
    {
      id: 3,
      name: "Sophie Bakker",
      email: "sophie.bakker@school.nl",
      class: "6A",
      averageGrade: 9.2,
      completedWorksheets: 25,
      pendingWorksheets: 0,
      lastActive: "30 min geleden",
      trend: "up",
      status: "active",
    },
    {
      id: 4,
      name: "Daan Visser",
      email: "daan.visser@school.nl",
      class: "6A",
      averageGrade: 6.8,
      completedWorksheets: 15,
      pendingWorksheets: 4,
      lastActive: "3 dagen geleden",
      trend: "down",
      status: "attention",
    },
    {
      id: 5,
      name: "Lisa Hendriks",
      email: "lisa.hendriks@school.nl",
      class: "6A",
      averageGrade: 8.7,
      completedWorksheets: 22,
      pendingWorksheets: 1,
      lastActive: "1 uur geleden",
      trend: "up",
      status: "active",
    },
  ];

  const classStats = {
    totalStudents: 24,
    activeToday: 18,
    averageGrade: 7.8,
    completedThisWeek: 45,
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Leerlingensoftware</h1>
            <p className="text-muted-foreground">
              Beheer leerlingaccounts en volg hun voortgang
            </p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Leerling toevoegen
        </Button>
      </div>

      {/* Class Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Totaal leerlingen
            </CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">In groep 6A</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Actief vandaag
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats.activeToday}</div>
            <p className="text-xs text-muted-foreground">
              Leerlingen online geweest
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gemiddeld cijfer
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats.averageGrade}</div>
            <p className="text-xs text-muted-foreground">Klasse gemiddelde</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deze week</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classStats.completedThisWeek}
            </div>
            <p className="text-xs text-muted-foreground">Werkbladen afgerond</p>
          </CardContent>
        </Card>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Leerlingen overzicht</CardTitle>
              <CardDescription>
                Beheer en volg de voortgang van je leerlingen
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Zoek leerling..." className="pl-10 w-64" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leerlingen.map((leerling) => (
              <div
                key={leerling.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {leerling.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{leerling.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {leerling.email}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        Groep {leerling.class}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {leerling.lastActive}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-sm font-medium">Gemiddelde</div>
                    <div className="flex items-center gap-1">
                      <span className="text-lg font-bold">
                        {leerling.averageGrade}
                      </span>
                      {leerling.trend === "up" ? (
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-600" />
                      )}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm font-medium">Afgerond</div>
                    <div className="text-lg font-bold">
                      {leerling.completedWorksheets}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-sm font-medium">Te doen</div>
                    <div className="text-lg font-bold">
                      {leerling.pendingWorksheets}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {leerling.status === "attention" && (
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                    )}
                    <Badge
                      variant={
                        leerling.status === "active" ? "default" : "secondary"
                      }
                    >
                      {leerling.status === "active" ? "Actief" : "Aandacht"}
                    </Badge>
                  </div>

                  <Button variant="outline" size="sm">
                    Bekijken
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
