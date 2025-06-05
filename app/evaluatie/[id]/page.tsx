"use client";

import { useState } from "react";
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
import { ArrowLeft, X, Check, Download, Send, Bot, User } from "lucide-react";
import Link from "next/link";

export default function WorksheetEvaluationPage({
  params,
}: {
  params: { id: string };
}) {
  const [feedback, setFeedback] = useState("");
  const [grade, setGrade] = useState("");
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
    },
    {
      id: 3,
      question: "Vraag 10: Welke breuk is groter: 2/3 of 5/8?",
      studentAnswer: "5/8",
      correctAnswer: "2/3",
      aiConfidence: 0.92,
      confirmed: null,
      explanation: "2/3 = 16/24 en 5/8 = 15/24, dus 2/3 is groter.",
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
  };

  const confirmError = (errorId: number, isCorrect: boolean) => {
    setAiErrors((prev) =>
      prev.map((error) =>
        error.id === errorId ? { ...error, confirmed: isCorrect } : error
      )
    );
  };

  const generateFeedback = () => {
    const confirmedErrors = aiErrors.filter(
      (error) => error.confirmed === true
    );
    const totalErrors = confirmedErrors.length;
    const score = (
      ((worksheet.totalQuestions - totalErrors) / worksheet.totalQuestions) *
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
  };

  const saveFeedback = () => {
    // Simulate saving feedback
    alert("Feedback opgeslagen en verstuurd naar Emma!");
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
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

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
            <Badge variant="secondary">{aiErrors.length} AI detecties</Badge>
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
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiErrors.map((error) => (
              <div key={error.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{error.question}</h4>
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

            <Button onClick={generateFeedback} className="w-full">
              <Bot className="w-4 h-4 mr-2" />
              Genereer feedback op basis van fouten
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
              />
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button onClick={saveFeedback} className="flex-1">
                <Send className="w-4 h-4 mr-2" />
                Feedback versturen
              </Button>
              <Button variant="outline">Concept opslaan</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
