import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PropertyForm } from "./components/PropertyForm";
import "./types/property.d"; // Import the Property interface

export default function App() {
  const [userRole, setUserRole] = useState(null);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const [properties, setProperties] = useState<Property[]>([]);

  const handlePropertySubmit = (newProperty: Property) => {
    if (editingProperty) {
      setProperties(properties.map(p => p === editingProperty ? newProperty : p));
      setEditingProperty(null);
    } else {
      setProperties([...properties, newProperty]);
    }
    setShowPropertyForm(false);
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowPropertyForm(true);
  };

  const renderDashboard = () => {
    if (!userRole) return (
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center">Choisissez votre portail</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="secondary" onClick={() => setUserRole('proprietaire')}>Propriétaire</Button>
            <Button variant="secondary" onClick={() => setUserRole('admin')}>Administrateur</Button>
          </div>
        </CardContent>
      </Card>
    );

    return (
      <>
        {(userRole === 'admin' || userRole === 'proprietaire') && (
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="text-2xl font-semibold">🏢 Gérer les immeubles</h2>
              <Button onClick={() => { setShowPropertyForm(true); setEditingProperty(null); }}>Ajouter une propriété</Button>
              {showPropertyForm && (
                <PropertyForm onSubmit={handlePropertySubmit} initialData={editingProperty} />
              )}
              <div className="space-y-2">
                {properties.length === 0 ? (
                  <p className="text-muted-foreground">Aucune propriété ajoutée pour le moment.</p>
                ) : (
                  properties.map((property, index) => (
                    <Card key={index} className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900" onClick={() => handleEditProperty(property)}>
                      <CardContent className="p-0">
                        <h3 className="font-semibold">{property.name}</h3>
                        <p className="text-sm text-muted-foreground">{property.address}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold">🔒 Sécurité & Confidentialité</h2>
            <p className="text-sm text-muted-foreground">
              Toutes les données sont protégées par chiffrement, accessibles uniquement aux utilisateurs autorisés selon leur portail respectif. Consultez nos conditions pour plus de détails.
            </p>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-center">LocaPilot - Tableau de bord</h1>
      {renderDashboard()}
    </div>
  );
}
