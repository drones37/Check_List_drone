
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const defaultChecklist = [
  {
    title: "Avant le Vol",
    color: "bg-blue-200",
    items: [
      "Vérification météo & NOTAM",
      "Vérification des batteries (drone + radiocommande)",
      "Carte SD insérée + mémoire disponible",
      "Inspection du drone (hélices, bras, coque...)",
      "Autorisations requises obtenues",
      "Vol déclaré (si nécessaire)",
    ],
  },
  {
    title: "Prévol - Sur site",
    color: "bg-green-200",
    items: [
      "Calibration compas/IMU si nécessaire",
      "GPS et signal RC OK",
      "Définition zone de vol + périmètre sécurité",
      "Plan de vol validé",
      "Briefing (si vol en équipe ou pro)",
    ],
  },
  {
    title: "Décollage",
    color: "bg-orange-200",
    items: [
      "Zone de décollage dégagée",
      "Altitude RTH (Return to Home) réglée",
      "Dernière vérification visuelle",
      "Début du vol en stationnaire",
    ],
  },
  {
    title: "En Vol",
    color: "bg-green-300",
    items: [
      "Maintenir le drone en vue directe (VLOS)",
      "Respect des zones et altitudes autorisées",
      "Surveillance constante du niveau de batterie",
      "Pas de survol de personnes",
    ],
  },
  {
    title: "Atterrissage",
    color: "bg-red-200",
    items: [
      "Zone d'atterrissage dégagée",
      "Arrêt des moteurs",
      "Coupure des enregistrements",
    ],
  },
  {
    title: "Après le Vol",
    color: "bg-gray-300",
    items: [
      "Enregistrement des logs / données de vol",
      "Rechargement des batteries",
      "Contrôle visuel du drone",
      "Nettoyage si nécessaire",
    ],
  },
];

export default function DroneChecklist() {
  const [checklist, setChecklist] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("checklist");
    if (stored) {
      setChecklist(JSON.parse(stored));
    } else {
      const initial = defaultChecklist.map((section) => ({
        ...section,
        checked: Array(section.items.length).fill(false),
      }));
      setChecklist(initial);
    }
  }, []);

  useEffect(() => {
    if (checklist.length) {
      localStorage.setItem("checklist", JSON.stringify(checklist));
    }
  }, [checklist]);

  const toggleCheck = (sectionIdx, itemIdx) => {
    const newChecklist = [...checklist];
    newChecklist[sectionIdx].checked[itemIdx] = !newChecklist[sectionIdx].checked[itemIdx];
    setChecklist(newChecklist);
  };

  const resetAll = () => {
    const initial = defaultChecklist.map((section) => ({
      ...section,
      checked: Array(section.items.length).fill(false),
    }));
    setChecklist(initial);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
      <div className="flex justify-center">
        <img src="/logo.png" alt="Logo Drones 37" className="h-20" />
      </div>
      <h1 className="text-3xl font-bold text-center">Checklist Drone - Drones 37</h1>
      <Button onClick={resetAll} className="block mx-auto mb-4">Réinitialiser</Button>
      {checklist.map((section, sectionIdx) => (
        <Card key={section.title} className={section.color}>
          <CardContent className="py-4">
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <ul className="space-y-1">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={checklist[sectionIdx].checked[itemIdx]}
                      onChange={() => toggleCheck(sectionIdx, itemIdx)}
                    />
                    <span>{item}</span>
                  </label>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
