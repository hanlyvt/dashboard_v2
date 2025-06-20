import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  ClipboardCheck,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const stats = [
    {
      title: "Te beoordelen",
      value: "12",
      description: "Werkbladen wachten op feedback",
      icon: ClipboardCheck,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Afgerond vandaag",
      value: "8",
      description: "Werkbladen beoordeeld",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Actieve leerlingen",
      value: "24",
      description: "Leerlingen in groep 6A",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Gemiddelde score",
      value: "7.8",
      description: "Deze week",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const recentWorksheets = [
    {
      id: 1,
      student: "Roy de Vries",
      subject: "Rekenen",
      title: "Breuken oefening 3",
      status: "pending",
      submittedAt: "2 uur geleden",
      aiDetected: 3,
    },
    {
      id: 2,
      student: "Lucas van Dam",
      subject: "Taal",
      title: "Werkwoordspelling",
      status: "pending",
      submittedAt: "3 uur geleden",
      aiDetected: 1,
    },
    {
      id: 3,
      student: "Sophie Bakker",
      subject: "Rekenen",
      title: "Vermenigvuldigen",
      status: "completed",
      submittedAt: "1 dag geleden",
      aiDetected: 0,
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">
              Welkom terug, Mevrouw Jansen
            </p>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("nl-NL", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Worksheets */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recente werkbladen</CardTitle>
              <CardDescription>
                Laatst ingediende werkbladen die beoordeling nodig hebben
              </CardDescription>
            </div>
            <Button asChild>
              <Link href="/evaluatie">Alle werkbladen</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentWorksheets.map((worksheet) => (
              <div
                key={worksheet.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {worksheet.student
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{worksheet.student}</h4>
                    <p className="text-sm text-muted-foreground">
                      {worksheet.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {worksheet.subject}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {worksheet.submittedAt}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {worksheet.aiDetected > 0 && (
                    <div className="flex items-center gap-1 text-orange-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">
                        {worksheet.aiDetected} mogelijke fouten
                      </span>
                    </div>
                  )}
                  <Badge
                    variant={
                      worksheet.status === "completed" ? "default" : "secondary"
                    }
                  >
                    {worksheet.status === "completed"
                      ? "Afgerond"
                      : "Te beoordelen"}
                  </Badge>
                  <Button size="sm" asChild>
                    <Link href={`/evaluatie/${worksheet.id}`}>
                      {worksheet.status === "completed"
                        ? "Bekijken"
                        : "Beoordelen"}
                    </Link>
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
