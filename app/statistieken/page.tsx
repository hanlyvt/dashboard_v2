"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { BarChart3, TrendingUp, TrendingDown, Users, Target, Clock } from "lucide-react"

export default function StatistiekenPage() {
  const classStats = {
    totalStudents: 24,
    averageGrade: 7.8,
    completedWorksheets: 156,
    pendingWorksheets: 12,
    weeklyProgress: 15.2,
  }

  const subjectStats = [
    { subject: "Rekenen", average: 8.1, completed: 45, trend: "up" },
    { subject: "Taal", average: 7.6, completed: 38, trend: "up" },
    { subject: "Begrijpend lezen", average: 7.9, completed: 32, trend: "down" },
    { subject: "Spelling", average: 7.4, completed: 28, trend: "up" },
  ]

  const topPerformers = [
    { name: "Sophie Bakker", average: 9.2, completed: 8 },
    { name: "Daan Visser", average: 8.9, completed: 7 },
    { name: "Lisa Hendriks", average: 8.7, completed: 8 },
    { name: "Emma de Vries", average: 8.5, completed: 6 },
    { name: "Lucas van Dam", average: 8.3, completed: 7 },
  ]

  const needsAttention = [
    { name: "Tim de Jong", average: 6.2, completed: 4, issue: "Lage scores rekenen" },
    { name: "Mila Jansen", average: 6.8, completed: 3, issue: "Weinig werkbladen ingeleverd" },
    { name: "Noah Peters", average: 6.5, completed: 5, issue: "Spelling problemen" },
  ]

  const weeklyData = [
    { week: "Week 1", completed: 18, average: 7.2 },
    { week: "Week 2", completed: 22, average: 7.5 },
    { week: "Week 3", completed: 25, average: 7.8 },
    { week: "Week 4", completed: 28, average: 8.1 },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Statistieken</h1>
            <p className="text-muted-foreground">Inzicht in de prestaties van groep 6A</p>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leerlingen</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Actieve leerlingen</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gemiddeld cijfer</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats.averageGrade}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{classStats.weeklyProgress}%</span> deze week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Afgerond</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats.completedWorksheets}</div>
            <p className="text-xs text-muted-foreground">Werkbladen deze maand</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Te beoordelen</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classStats.pendingWorksheets}</div>
            <p className="text-xs text-muted-foreground">Wachten op feedback</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voortgang</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{classStats.weeklyProgress}%</div>
            <p className="text-xs text-muted-foreground">Ten opzichte van vorige week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Prestaties per vak</CardTitle>
            <CardDescription>Gemiddelde cijfers en trends per onderwerp</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjectStats.map((subject) => (
                <div key={subject.subject} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{subject.subject}</h4>
                    <p className="text-sm text-muted-foreground">{subject.completed} werkbladen afgerond</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-lg">{subject.average}</div>
                      <div className="flex items-center gap-1">
                        {subject.trend === "up" ? (
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-600" />
                        )}
                        <span className={`text-xs ${subject.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                          {subject.trend === "up" ? "Stijgend" : "Dalend"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Wekelijkse voortgang</CardTitle>
            <CardDescription>Aantal afgeronde werkbladen en gemiddelde cijfers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyData.map((week, index) => (
                <div key={week.week} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{week.week}</h4>
                    <p className="text-sm text-muted-foreground">{week.completed} werkbladen</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{week.average}</div>
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all"
                        style={{ width: `${(week.completed / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Beste presteerders
            </CardTitle>
            <CardDescription>Leerlingen met de hoogste gemiddelde cijfers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPerformers.map((student, index) => (
                <div key={student.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-green-600">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{student.name}</h4>
                      <p className="text-sm text-muted-foreground">{student.completed} werkbladen afgerond</p>
                    </div>
                  </div>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    {student.average}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Needs Attention */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-orange-600" />
              Extra aandacht nodig
            </CardTitle>
            <CardDescription>Leerlingen die mogelijk extra ondersteuning kunnen gebruiken</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {needsAttention.map((student) => (
                <div key={student.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">{student.issue}</p>
                    <p className="text-xs text-muted-foreground">{student.completed} werkbladen afgerond</p>
                  </div>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {student.average}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
