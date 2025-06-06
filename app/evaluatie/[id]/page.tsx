"use client";

import { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  X,
  Check,
  Download,
  Send,
  Bot,
  User,
  Loader2,
  CheckCircle,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function WorksheetEvaluationPage({
  params,
}: {
  params: { id: string };
}) {
  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [worksheetViewOpen, setWorksheetViewOpen] = useState(false);
  const [selectedError, setSelectedError] = useState<number | null>(null);
  const [zoom, setZoom] = useState(100);
  const { toast } = useToast();

  const [aiErrors, setAiErrors] = useState([
    {
      id: 1,
      question: "Vraag 3: 3/4 + 1/8 = ?",
      studentAnswer: "4/12",
      correctAnswer: "7/8",
      aiConfidence: 0.95,
      confirmed: null,
      explanation:
        "De leerling heeft de noemers niet gelijkgemaakt voor het optellen van breuken.",
      position: { x: 45, y: 25 }, // Position on worksheet (percentage)
      highlighted: false,
    },
    {
      id: 2,
      question: "Vraag 7: 2/3 × 3/4 = ?",
      studentAnswer: "5/7",
      correctAnswer: "6/12 = 1/2",
      aiConfidence: 0.88,
      confirmed: null,
      explanation:
        "Vermenigvuldiging van breuken: teller × teller en noemer × noemer.",
      position: { x: 45, y: 55 },
      highlighted: false,
    },
    {
      id: 3,
      question: "Vraag 10: Welke breuk is groter: 2/3 of 5/8?",
      studentAnswer: "5/8",
      correctAnswer: "2/3",
      aiConfidence: 0.92,
      confirmed: null,
      explanation: "2/3 = 16/24 en 5/8 = 15/24, dus 2/3 is groter.",
      position: { x: 45, y: 75 },
      highlighted: false,
    },
  ]);

  const worksheet = {
    id: params.id,
    student: "Emma de Vries",
    subject: "Rekenen",
    title: "Breuken oefening 3",
    submittedAt: "2024-01-15T10:30:00",
    totalQuestions: 15,
    class: "Groep 6A",
    imageUrl: "/Werkblad_1.jpg?height=800&width=600", // Placeholder for worksheet image
  };

  const confirmError = (errorId: number, isCorrect: boolean) => {
    setAiErrors((prev) =>
      prev.map((error) =>
        error.id === errorId ? { ...error, confirmed: isCorrect } : error
      )
    );

    toast({
      title: isCorrect ? "Fout bevestigd" : "Fout gemarkeerd als correct",
      description: isCorrect
        ? "Deze fout is toegevoegd aan de feedback."
        : "Deze detectie is gemarkeerd als incorrectly gedetecteerd.",
      duration: 2000,
    });
  };

  const highlightError = (errorId: number) => {
    setAiErrors((prev) =>
      prev.map((error) => ({
        ...error,
        highlighted: error.id === errorId,
      }))
    );
    setSelectedError(errorId);
  };

  const clearHighlight = () => {
    setAiErrors((prev) =>
      prev.map((error) => ({
        ...error,
        highlighted: false,
      }))
    );
    setSelectedError(null);
  };

  const openWorksheetView = () => {
    setWorksheetViewOpen(true);
  };

  const generateFeedback = () => {
    startTransition(() => {
      setTimeout(() => {
        const confirmedErrors = aiErrors.filter(
          (error) => error.confirmed === true
        );
        const totalErrors = confirmedErrors.length;
        const score = (
          ((worksheet.totalQuestions - totalErrors) /
            worksheet.totalQuestions) *
          10
        ).toFixed(1);

        let generatedFeedback = `Hallo Emma,\n\nIk heb je werkblad over breuken bekeken. `;

        if (totalErrors === 0) {
          generatedFeedback += `Geweldig gedaan! Je hebt alle opgaven correct gemaakt. Je begrijpt breuken heel goed.`;
        } else if (totalErrors <= 2) {
          generatedFeedback += `Goed gedaan! Je hebt de meeste opgaven correct gemaakt. `;
          generatedFeedback += `Let vooral op bij het ${confirmedErrors[0]?.explanation.toLowerCase()}`;
        } else {
          generatedFeedback += `Je hebt hard gewerkt aan dit werkblad. Er zijn nog een paar punten waar je op kunt letten:\n\n`;
          confirmedErrors.forEach((error, index) => {
            generatedFeedback += `${index + 1}. ${error.explanation}\n`;
          });
        }

        generatedFeedback += `\n\nBlijf oefenen en vraag gerust om hulp als je iets niet begrijpt!\n\nGroetjes,\nMevrouw Jansen`;

        setFeedback(generatedFeedback);
        setGrade(score);

        toast({
          title: "Feedback gegenereerd",
          description:
            "AI heeft automatisch feedback gemaakt op basis van de gedetecteerde fouten.",
          duration: 3000,
        });
      }, 1500);
    });
  };

  const saveDraft = () => {
    toast({
      title: "Concept opgeslagen",
      description:
        "Je feedback is opgeslagen als concept en kan later worden voltooid.",
      duration: 3000,
    });
  };

  const downloadPDF = () => {
    toast({
      title: "PDF wordt gegenereerd",
      description: "Het feedback rapport wordt voorbereid voor download...",
      duration: 3000,
    });

    setTimeout(() => {
      toast({
        title: "PDF klaar",
        description: "Het feedback rapport is succesvol gedownload.",
        duration: 3000,
      });
    }, 2000);
  };

  const saveFeedback = async () => {
    if (!feedback.trim() || !grade) {
      toast({
        title: "Incomplete gegevens",
        description:
          "Vul zowel een cijfer als feedback in voordat je verstuurt.",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitted(true);

      toast({
        title: "Feedback succesvol verstuurd!",
        description: `Emma de Vries heeft je feedback ontvangen. Cijfer: ${grade}`,
        duration: 5000,
        action: (
          <Button variant="outline" size="sm" onClick={downloadPDF}>
            Download PDF
          </Button>
        ),
      });
    } catch (error) {
      toast({
        title: "Fout bij versturen",
        description:
          "Er ging iets mis bij het versturen van de feedback. Probeer het opnieuw.",
        variant: "destructive",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/evaluatie">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terug naar overzicht
            </Link>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={downloadPDF}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Success State */}
      {isSubmitted && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">
                  Feedback succesvol verstuurd!
                </h3>
                <p className="text-sm text-green-700">
                  Emma de Vries heeft je feedback ontvangen en kan deze nu
                  bekijken in haar leerlingportaal.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Worksheet Info */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {worksheet.student
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                {worksheet.student} - {worksheet.title}
              </CardTitle>
              <CardDescription>
                {worksheet.subject} • {worksheet.class} • Ingediend op{" "}
                {new Date(worksheet.submittedAt).toLocaleDateString("nl-NL")}
              </CardDescription>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">{aiErrors.length} AI detecties</Badge>
              <Dialog
                open={worksheetViewOpen}
                onOpenChange={setWorksheetViewOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={openWorksheetView}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Bekijk werkblad
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle>
                      Werkblad bekijken - {worksheet.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-6 h-[70vh]">
                    {/* Worksheet Image */}
                    <div className="relative border rounded-lg overflow-hidden bg-gray-50">
                      <div className="absolute top-2 right-2 z-10 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setZoom(Math.min(zoom + 25, 200))}
                        >
                          <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setZoom(Math.max(zoom - 25, 50))}
                        >
                          <ZoomOut className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setZoom(100)}
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="relative h-full overflow-auto">
                        <div
                          className="relative transition-transform duration-200"
                          style={{
                            transform: `scale(${zoom / 100})`,
                            transformOrigin: "top left",
                          }}
                        >
                          <img
                            src={worksheet.imageUrl || "/placeholder.svg"}
                            alt="Werkblad"
                            className="w-full h-auto"
                          />
                          {/* Error Highlights */}
                          {aiErrors.map((error) => (
                            <div
                              key={error.id}
                              className={`absolute border-2 rounded transition-all duration-300 cursor-pointer ${
                                error.highlighted
                                  ? "border-red-500 bg-red-500/20 shadow-lg"
                                  : "border-red-400 bg-red-400/10 hover:bg-red-400/20"
                              }`}
                              style={{
                                left: `${error.position.x}%`,
                                top: `${error.position.y}%`,
                                width: "20%",
                                height: "8%",
                              }}
                              onClick={() => highlightError(error.id)}
                            >
                              <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                Fout {error.id}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Error Details */}
                    <div className="space-y-4 overflow-auto">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">AI Foutdetecties</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearHighlight}
                        >
                          Wis selectie
                        </Button>
                      </div>

                      {aiErrors.map((error) => (
                        <Card
                          key={error.id}
                          className={`cursor-pointer transition-all duration-200 ${
                            error.highlighted
                              ? "ring-2 ring-red-500 bg-red-50"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() => highlightError(error.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-sm">
                                {error.question}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {Math.round(error.aiConfidence * 100)}% zeker
                              </Badge>
                            </div>

                            <div className="space-y-1 mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  Antwoord leerling:
                                </span>
                                <span className="text-sm font-medium text-red-600">
                                  {error.studentAnswer}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  Correct antwoord:
                                </span>
                                <span className="text-sm font-medium text-green-600">
                                  {error.correctAnswer}
                                </span>
                              </div>
                            </div>

                            <p className="text-xs text-muted-foreground mb-3">
                              {error.explanation}
                            </p>

                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant={
                                  error.confirmed === true
                                    ? "default"
                                    : "outline"
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmError(error.id, true);
                                }}
                                className="flex-1"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Bevestigen
                              </Button>
                              <Button
                                size="sm"
                                variant={
                                  error.confirmed === false
                                    ? "default"
                                    : "outline"
                                }
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmError(error.id, false);
                                }}
                                className="flex-1"
                              >
                                <X className="w-4 h-4 mr-1" />
                                Afwijzen
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  {/* Nieuwe Opslaan en sluiten knop */}
                  <div className="flex justify-end mt-4 pt-4 border-t">
                    <Button
                      onClick={() => {
                        // Sla eventuele wijzigingen op
                        const confirmedErrors = aiErrors.filter(
                          (e) => e.confirmed !== null
                        );
                        if (confirmedErrors.length > 0) {
                          toast({
                            title: "Wijzigingen opgeslagen",
                            description: `${confirmedErrors.length} fouten zijn beoordeeld.`,
                            duration: 3000,
                          });
                        }
                        // Sluit de dialog
                        setWorksheetViewOpen(false);
                      }}
                    >
                      Opslaan en sluiten
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* AI Error Detection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              AI Foutdetectie
            </CardTitle>
            <CardDescription>
              Controleer de door AI gedetecteerde fouten en bevestig of
              corrigeer ze
              <br />
              <Button
                variant="link"
                size="sm"
                className="p-0 h-auto text-blue-600"
                onClick={openWorksheetView}
              >
                Klik hier om het werkblad naast de fouten te bekijken →
              </Button>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiErrors.map((error) => (
              <div key={error.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-sm">{error.question}</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          highlightError(error.id);
                          openWorksheetView();
                        }}
                        className="ml-auto"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Bekijk op werkblad
                      </Button>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Antwoord leerling:
                        </span>
                        <span className="text-sm font-medium text-red-600">
                          {error.studentAnswer}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Correct antwoord:
                        </span>
                        <span className="text-sm font-medium text-green-600">
                          {error.correctAnswer}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {error.explanation}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(error.aiConfidence * 100)}% zeker
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={error.confirmed === true ? "default" : "outline"}
                    onClick={() => confirmError(error.id, true)}
                    className="flex-1"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Fout bevestigen
                  </Button>
                  <Button
                    size="sm"
                    variant={error.confirmed === false ? "default" : "outline"}
                    onClick={() => confirmError(error.id, false)}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Niet fout
                  </Button>
                </div>
              </div>
            ))}

            <Button
              onClick={generateFeedback}
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  AI genereert feedback...
                </>
              ) : (
                <>
                  <Bot className="w-4 h-4 mr-2" />
                  Genereer feedback op basis van fouten
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Feedback Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              Feedback & Beoordeling
            </CardTitle>
            <CardDescription>
              Geef persoonlijke feedback en een cijfer aan de leerling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Cijfer</Label>
              <Input
                id="grade"
                type="number"
                min="1"
                max="10"
                step="0.1"
                placeholder="Bijv. 7.5"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                disabled={isSubmitted}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Persoonlijke feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Schrijf hier je feedback voor de leerling..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={12}
                disabled={isSubmitted}
              />
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button
                onClick={saveFeedback}
                className="flex-1"
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Feedback versturen...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Feedback verstuurd
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Feedback versturen
                  </>
                )}
              </Button>
              {!isSubmitted && (
                <Button variant="outline" onClick={saveDraft}>
                  Concept opslaan
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
