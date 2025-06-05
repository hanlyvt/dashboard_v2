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
import { Search, Plus, BookOpen, Clock, Users, Star } from "lucide-react";

export default function LesVoorbereidenPage() {
  const lesMateriaal = [
    {
      id: 1,
      title: "Breuken - Introductie",
      subject: "Rekenen",
      duration: "45 min",
      difficulty: "Basis",
      students: 24,
      rating: 4.8,
      description: "Kennismaking met breuken, delen van gehelen",
      materials: ["Werkblad", "Digitale oefening", "Video"],
    },
    {
      id: 2,
      title: "Werkwoordspelling",
      subject: "Taal",
      duration: "30 min",
      difficulty: "Gemiddeld",
      students: 20,
      rating: 4.6,
      description: "Oefenen met regelmatige en onregelmatige werkwoorden",
      materials: ["Werkblad", "Audio fragment"],
    },
    {
      id: 3,
      title: "Meetkunde - Vormen herkennen",
      subject: "Rekenen",
      duration: "40 min",
      difficulty: "Basis",
      students: 24,
      rating: 4.9,
      description: "Herkennen en benoemen van 2D en 3D vormen",
      materials: ["Hands-on materiaal", "Werkblad", "Digitale oefening"],
    },
  ];

  const recenteLessen = [
    {
      title: "Vermenigvuldigen tot 100",
      subject: "Rekenen",
      date: "Gisteren",
      status: "Afgerond",
    },
    {
      title: "Leestekst begrijpen",
      subject: "Taal",
      date: "2 dagen geleden",
      status: "Afgerond",
    },
    {
      title: "Breuken vergelijken",
      subject: "Rekenen",
      date: "3 dagen geleden",
      status: "In voorbereiding",
    },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Les voorbereiden</h1>
            <p className="text-muted-foreground">
              Zoek en selecteer lesmateriaal voor je klassen
            </p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nieuwe les maken
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Zoek lesmateriaal..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline">Rekenen</Button>
            <Button variant="outline">Taal</Button>
            <Button variant="outline">Alle vakken</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Available Lessons */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Beschikbaar lesmateriaal</CardTitle>
              <CardDescription>
                Kies uit onze collectie van lesmateriaal voor groep 6
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lesMateriaal.map((les) => (
                  <div
                    key={les.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold">{les.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {les.description}
                        </p>
                      </div>
                      <Badge variant="secondary">{les.subject}</Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {les.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {les.students} leerlingen
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {les.rating}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {les.difficulty}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {les.materials.map((material, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {material}
                          </Badge>
                        ))}
                      </div>
                      <Button size="sm">
                        <BookOpen className="w-4 h-4 mr-1" />
                        Gebruik les
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Lessons */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recente lessen</CardTitle>
              <CardDescription>Je laatst voorbereide lessen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recenteLessen.map((les, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <h4 className="font-medium text-sm">{les.title}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs mr-2">
                          {les.subject}
                        </Badge>
                        {les.date}
                      </div>
                      <Badge
                        variant={
                          les.status === "Afgerond" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {les.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Snelle acties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Nieuwe les maken
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-2" />
                Lesplan importeren
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Search className="w-4 h-4 mr-2" />
                Materiaal zoeken
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
