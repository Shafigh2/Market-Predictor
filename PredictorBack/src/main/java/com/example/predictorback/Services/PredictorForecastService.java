package com.example.predictorback.Services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
public class PredictorForecastService {

    public List<Double> processCSV(MultipartFile file) {
        List<Double> values = new ArrayList<>();

        try (BufferedReader br = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            br.readLine(); // Ignorer l'en-tête

            while ((line = br.readLine()) != null) {
                String[] columns = line.split(","); // Vous pouvez également gérer d'autres séparateurs ici
                if (columns.length > 1) {
                    values.add(Double.parseDouble(columns[1]));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return values;
    }
}

