import React, { useState } from 'react';
import './PredictorComponent.css';

const PredictorComponent: React.FC = () => {
    const [values, setValues] = useState<number[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                const rows = content.split('\n').slice(1); // Ignorer l'en-tête

                const separators = [',', ';', '\t'];
                const parsedValues = rows.map(row => {
                    let columns: string[] = [];
                    for (const sep of separators) {
                        columns = row.split(sep);
                        if (columns.length > 1) break;
                    }
                    return columns[1] ? parseFloat(columns[1]) : NaN;
                }).filter(value => !isNaN(value));

                setValues(parsedValues);
            };
            reader.readAsText(file);
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
