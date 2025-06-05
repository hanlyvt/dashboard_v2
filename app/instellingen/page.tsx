import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User, Bell, Shield, Palette, Download, Upload } from "lucide-react";

export default function InstellingenPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-3xl font-bold">Instellingen</h1>
            <p className="text-muted-foreground">
              Beheer je account en voorkeuren
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profiel instellingen
            </CardTitle>
            <CardDescription>Beheer je persoonlijke informatie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Voornaam</Label>
                <Input id="firstName" defaultValue="Mevrouw" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Achternaam</Label>
                <Input id="lastName" defaultValue="Jansen" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <Input
                id="email"
                type="email"
                defaultValue="m.jansen@school.nl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Klas</Label>
              <Input id="class" defaultValue="Groep 6A" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school">School</Label>
              <Input id="school" defaultValue="Basisschool De Regenboog" />
            </div>
            <Button>Profiel bijwerken</Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Snelle acties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Data exporteren
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Backup importeren
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Shield className="w-4 h-4 mr-2" />
                Wachtwoord wijzigen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificatie instellingen
          </CardTitle>
          <CardDescription>
            Kies welke notificaties je wilt ontvangen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="newWorksheet">Nieuwe werkbladen</Label>
              <p className="text-sm text-muted-foreground">
                Ontvang een melding als er nieuwe werkbladen worden ingediend
              </p>
            </div>
            <Switch id="newWorksheet" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="aiDetection">AI foutdetectie</Label>
              <p className="text-sm text-muted-foreground">
                Ontvang meldingen van AI gedetecteerde fouten
              </p>
            </div>
            <Switch id="aiDetection" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="weeklyReport">Wekelijks rapport</Label>
              <p className="text-sm text-muted-foreground">
                Ontvang een wekelijkse samenvatting van klasstatistieken
              </p>
            </div>
            <Switch id="weeklyReport" defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotifications">E-mail notificaties</Label>
              <p className="text-sm text-muted-foreground">
                Ontvang notificaties via e-mail
              </p>
            </div>
            <Switch id="emailNotifications" />
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Weergave instellingen
          </CardTitle>
          <CardDescription>
            Personaliseer het uiterlijk van het dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="darkMode">Donkere modus</Label>
              <p className="text-sm text-muted-foreground">
                Gebruik een donker kleurenschema
              </p>
            </div>
            <Switch id="darkMode" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="compactView">Compacte weergave</Label>
              <p className="text-sm text-muted-foreground">
                Toon meer informatie op het scherm
              </p>
            </div>
            <Switch id="compactView" />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="animations">Animaties</Label>
              <p className="text-sm text-muted-foreground">
                Schakel UI animaties in
              </p>
            </div>
            <Switch id="animations" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
