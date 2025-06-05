import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Filter, AlertCircle, CheckCircle, Clock, Download } from "lucide-react"
import Link from "next/link"

export default function EvaluatiePage() {
  const worksheets = [
    {
      id: 1,
      student: "Emma de Vries",
      subject: "Rekenen",
      title: "Breuken oefening 3",
      status: "pending",
      submittedAt: "2024-01-15T10:30:00",
      aiDetected: 3,
      grade: null,
    },
    {
      id: 2,
      student: "Lucas van Dam",
      subject: "Taal",
      title: "Werkwoordspelling",
      status: "pending",
      submittedAt: "2024-01-15T09:15:00",
      aiDetected: 1,
      grade: null,
    },
    {
      id: 3,
      student: "Sophie Bakker",
      subject: "Rekenen",
      title: "Vermenigvuldigen",
      status: "completed",
      submittedAt: "2024-01-14T14:20:00",
      aiDetected: 0,
      grade: 8.5,
    },
    {
      id: 4,
      student: "Daan Visser",
      subject: "Taal",
      title: "Leestekst begrijpen",
      status: "completed",
      submittedAt: "2024-01-14T11:45:00",
      aiDetected: 2,
      grade: 7.0,
    },
    {
      id: 5,
      student: "Lisa Hendriks",
      subject: "Rekenen",
      title: "Meetkunde basis",
      status: "pending",
      submittedAt: "2024-01-15T08:00:00",
      aiDetected: 0,
      grade: null,
    },
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const pendingCount = worksheets.filter((w) => w.status === "pending").length
  const completedCount = worksheets.filter((w) => w.status === "completed").length

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Evaluatie</h1>
            <p className="text-muted-foreground">Beoordeel werkbladen en geef feedback aan leerlingen</p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Te beoordelen</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Werkbladen wachten op feedback</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Afgerond</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedCount}</div>
            <p className="text-xs text-muted-foreground">Werkbladen beoordeeld</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI detecties</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {worksheets.reduce((sum, w) => sum + w.aiDetected, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Mogelijke fouten gedetecteerd</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Werkbladen overzicht</CardTitle>
          <CardDescription>Bekijk en beoordeel alle ingediende werkbladen</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Zoek op leerling of werkblad..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="space-y-4">
            {worksheets.map((worksheet) => (
              <div
                key={worksheet.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">
                      {worksheet.student
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium">{worksheet.student}</h4>
                    <p className="text-sm text-muted-foreground">{worksheet.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {worksheet.subject}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{formatDate(worksheet.submittedAt)}</span>
                      {worksheet.grade && (
                        <Badge variant="default" className="text-xs">
                          Cijfer: {worksheet.grade}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {worksheet.aiDetected > 0 && (
                    <div className="flex items-center gap-1 text-orange-600">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{worksheet.aiDetected}</span>
                    </div>
                  )}

                  <Badge variant={worksheet.status === "completed" ? "default" : "secondary"}>
                    {worksheet.status === "completed" ? "Afgerond" : "Te beoordelen"}
                  </Badge>

                  <div className="flex gap-2">
                    {worksheet.status === "completed" && (
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                    )}
                    <Button size="sm" asChild>
                      <Link href={`/evaluatie/${worksheet.id}`}>
                        {worksheet.status === "completed" ? "Bekijken" : "Beoordelen"}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
