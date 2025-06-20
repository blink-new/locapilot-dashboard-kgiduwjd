import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertyFormProps {
  onSubmit: (property: Property) => void;
  initialData?: Property;
}

export const PropertyForm: React.FC<PropertyFormProps> = ({ onSubmit, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [type, setType] = useState(initialData?.type || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [year, setYear] = useState(initialData?.year || '');
  const [units, setUnits] = useState(initialData?.units || '');
  const [floors, setFloors] = useState(initialData?.floors || '');
  const [area, setArea] = useState(initialData?.area || '');
  const [lotNumber, setLotNumber] = useState(initialData?.lotNumber || '');
  const [owner, setOwner] = useState(initialData?.owner || '');
  const [manager, setManager] = useState(initialData?.manager || '');
  const [fiscalType, setFiscalType] = useState(initialData?.fiscalType || '');
  const [municipalValue, setMunicipalValue] = useState(initialData?.municipalValue || '');
  const [lastMaintenance, setLastMaintenance] = useState(initialData?.lastMaintenance || '');
  const [renovations, setRenovations] = useState(initialData?.renovations || '');
  const [diagnostics, setDiagnostics] = useState(initialData?.diagnostics || '');
  const [certificates, setCertificates] = useState(initialData?.certificates || '');
  const [heatingType, setHeatingType] = useState(initialData?.heatingType || '');
  const [roofType, setRoofType] = useState(initialData?.roofType || '');
  const [mortgage, setMortgage] = useState(initialData?.mortgage || '');
  const [estimatedRevenue, setEstimatedRevenue] = useState(initialData?.estimatedRevenue || '');
  const [estimatedExpenses, setEstimatedExpenses] = useState(initialData?.estimatedExpenses || '');
  const [purchaseValue, setPurchaseValue] = useState(initialData?.purchaseValue || '');
  const [currentValue, setCurrentValue] = useState(initialData?.currentValue || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name, type, address, year, units, floors, area,
      lotNumber, owner, manager, fiscalType, municipalValue,
      lastMaintenance, renovations, diagnostics, certificates, heatingType, roofType,
      // File inputs are not directly managed by state in this way
      purchaseAct: '', // Placeholder
      locationCertificate: '', // Placeholder
      inspectionReport: '', // Placeholder
      maintenanceContracts: '', // Placeholder
      plans: '', // Placeholder
      mortgage, estimatedRevenue, estimatedExpenses, purchaseValue, currentValue,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{initialData ? 'Modifier la propriété' : 'Ajouter une nouvelle propriété'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="space-y-4">
            <h3 className="text-xl font-semibold">Informations générales</h3>
            <Input placeholder="Nom de l'immeuble" value={name} onChange={(e) => setName(e.target.value)} required />
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger>
                <SelectValue placeholder="Type de propriété" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multilogement">Multilogement</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="mixte">Mixte</SelectItem>
                <SelectItem value="residentielle">Résidentielle</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="Adresse complète" value={address} onChange={(e) => setAddress(e.target.value)} required />
            <Input type="number" placeholder="Année de construction" value={year} onChange={(e) => setYear(e.target.value)} />
            <Input type="number" placeholder="Nombre d'unités locatives" value={units} onChange={(e) => setUnits(e.target.value)} />
            <Input type="number" placeholder="Nombre d'étages" value={floors} onChange={(e) => setFloors(e.target.value)} />
            <Input placeholder="Superficie totale (pi² ou m²)" value={area} onChange={(e) => setArea(e.target.value)} />
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">📸 Médias</h3>
            <Input type="file" multiple placeholder="Photos de l'immeuble" />
            <Input type="file" multiple placeholder="Plans d'étage (PDF ou image)" />
            <Input placeholder="Lien vidéo (optionnel)" />
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">🧾 Données administratives</h3>
            <Input placeholder="Numéro de lot / Cadastre" value={lotNumber} onChange={(e) => setLotNumber(e.target.value)} />
            <Input placeholder="Propriétaire(s) inscrit(s)" value={owner} onChange={(e) => setOwner(e.target.value)} />
            <Input placeholder="Gestionnaire associé" value={manager} onChange={(e) => setManager(e.target.value)} />
            <Select value={fiscalType} onValueChange={setFiscalType}>
              <SelectTrigger>
                <SelectValue placeholder="Type de propriété fiscale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="residentielle">Résidentielle</SelectItem>
                <SelectItem value="commerciale">Commerciale</SelectItem>
              </SelectContent>
            </Select>
            <Input type="number" placeholder="Valeur municipale" value={municipalValue} onChange={(e) => setMunicipalValue(e.target.value)} />
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">🛠️ Dossier technique</h3>
            <Input type="date" placeholder="Date du dernier entretien majeur" value={lastMaintenance} onChange={(e) => setLastMaintenance(e.target.value)} />
            <Textarea placeholder="Liste des rénovations / travaux avec dates" value={renovations} onChange={(e) => setRenovations(e.target.value)} />
            <Textarea placeholder="Diagnostics (amiante, plomb, électricité, plomberie, etc.)" value={diagnostics} onChange={(e) => setDiagnostics(e.target.value)} />
            <Textarea placeholder="Certificats (assurance, conformité, etc.)" value={certificates} onChange={(e) => setCertificates(e.target.value)} />
            <Input placeholder="Type de chauffage / énergie" value={heatingType} onChange={(e) => setHeatingType(e.target.value)} />
            <Input placeholder="Type de toiture (et date de réfection)" value={roofType} onChange={(e) => setRoofType(e.target.value)} />
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">📄 Documents téléversables</h3>
            <Input type="file" placeholder="Acte d'achat" />
            <Input type="file" placeholder="Certificat de localisation" />
            <Input type="file" placeholder="Rapport d'inspection" />
            <Input type="file" placeholder="Contrats d'entretien" />
            <Input type="file" multiple placeholder="Plans, devis, soumissions, etc." />
          </section>

          <section className="space-y-4">
            <h3 className="text-xl font-semibold">💵 Informations financières (facultatives)</h3>
            <Input placeholder="Hypothèque en cours (montant, taux, échéance)" value={mortgage} onChange={(e) => setMortgage(e.target.value)} />
            <Input type="number" placeholder="Revenus bruts annuels estimés" value={estimatedRevenue} onChange={(e) => setEstimatedRevenue(e.target.value)} />
            <Input type="number" placeholder="Dépenses annuelles estimées" value={estimatedExpenses} onChange={(e) => setEstimatedExpenses(e.target.value)} />
            <Input type="number" placeholder="Valeur d'achat" value={purchaseValue} onChange={(e) => setPurchaseValue(e.target.value)} />
            <Input type="number" placeholder="Valeur actuelle estimée" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} />
          </section>

          <Button type="submit" className="w-full">
            {initialData ? 'Mettre à jour la propriété' : 'Créer la propriété'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};