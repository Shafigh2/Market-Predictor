import React, { useState } from 'react';
import './PredictorComponent.css';

const PredictorComponent: React.FC = () => {
    const [values, setValues] = useState<number[]>([]);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('csv', file);

            try {
                const response = await fetch('/api/predictor/forecast', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const parsedValues = await response.json();
                    setValues(parsedValues);
                } else {
                    console.error("Erreur lors de l'envoi du fichier au back-end");
                }
            } catch (error) {
                console.error("Erreur lors de l'envoi du fichier:", error);
            }
        }
    };

    return (
        <div className="predictor-container">
            <h1>Prédiction des cours de bourse</h1>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            {values.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>Index</th>
                        <th>Valeur</th>
                    </tr>
                    </thead>
                    <tbody>
                    {values.map((value, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{!isNaN(value) ? value : "Erreur lors de la lecture"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default PredictorComponent;
