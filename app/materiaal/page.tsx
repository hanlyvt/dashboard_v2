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
  Filter,
  Download,
  Eye,
  Upload,
  FileText,
  Video,
  Headphones,
  ImageIcon,
} from "lucide-react";

export default function MateriaalPage() {
  const materialen = [
    {
      id: 1,
      title: "Breuken oefenblad niveau 1",
      type: "Werkblad",
      subject: "Rekenen",
      grade: "Groep 6",
      downloads: 45,
      rating: 4.8,
      fileType: "PDF",
      icon: FileText,
      size: "2.3 MB",
    },
    {
      id: 2,
      title: "Werkwoorden video uitleg",
      type: "Video",
      subject: "Taal",
      grade: "Groep 6",
      downloads: 23,
      rating: 4.6,
      fileType: "MP4",
      icon: Video,
      size: "45.2 MB",
    },
    {
      id: 3,
      title: "Luisteroefening sprookjes",
      type: "Audio",
      subject: "Taal",
      grade: "Groep 6",
      downloads: 31,
      rating: 4.9,
      fileType: "MP3",
      icon: Headphones,
      size: "12.1 MB",
    },
    {
      id: 4,
      title: "Meetkunde vormen poster",
      type: "Afbeelding",
      subject: "Rekenen",
      grade: "Groep 6",
      downloads: 67,
      rating: 4.7,
      fileType: "PNG",
      icon: ImageIcon,
      size: "5.8 MB",
    },
    {
      id: 5,
      title: "Spelling regels overzicht",
      type: "Werkblad",
      subject: "Taal",
      grade: "Groep 6",
      downloads: 89,
      rating: 4.9,
      fileType: "PDF",
      icon: FileText,
      size: "1.2 MB",
    },
  ];

  const categories = [
    { name: "Werkbladen", count: 156, icon: FileText },
    { name: "Video's", count: 43, icon: Video },
    { name: "Audio", count: 28, icon: Headphones },
    { name: "Afbeeldingen", count: 91, icon: ImageIcon },
  ];

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Materiaal</h1>
            <p className="text-muted-foreground">
              Beheer en organiseer je lesmateriaal
            </p>
          </div>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Materiaal uploaden
        </Button>
      </div>

      {/* Categories Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        {categories.map((category) => (
          <Card key={category.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {category.name}
              </CardTitle>
              <category.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{category.count}</div>
              <p className="text-xs text-muted-foreground">
                Beschikbare bestanden
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Zoek materiaal..." className="pl-10" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Alle vakken
            </Button>
            <Button variant="outline" size="sm">
              Rekenen
            </Button>
            <Button variant="outline" size="sm">
              Taal
            </Button>
            <Button variant="outline" size="sm">
              Werkbladen
            </Button>
            <Button variant="outline" size="sm">
              Video's
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Materials List */}
      <Card>
        <CardHeader>
          <CardTitle>Materiaal overzicht</CardTitle>
          <CardDescription>Al je lesmateriaal op één plek</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {materialen.map((materiaal) => (
              <div
                key={materiaal.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <materiaal.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{materiaal.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {materiaal.subject}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {materiaal.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {materiaal.size}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{materiaal.downloads} downloads</span>
                      <span>⭐ {materiaal.rating}</span>
                      <span>{materiaal.grade}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Bekijken
                  </Button>
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
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
