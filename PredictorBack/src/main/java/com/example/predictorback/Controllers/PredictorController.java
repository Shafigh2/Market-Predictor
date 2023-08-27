package com.example.predictorback.Controllers;



import com.example.predictorback.Services.PredictorForecastService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/predictor")
public class PredictorController {

    @Autowired
    private PredictorForecastService forecastService;

    @PostMapping("/forecast")
    public ResponseEntity<List<Double>> forecast(@RequestParam("csv") MultipartFile file) {
        List<Double> values = forecastService.processCSV(file);

        if (values.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(values);
    }
}
