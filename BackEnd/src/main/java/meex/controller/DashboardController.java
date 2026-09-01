package meex.controller;

import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping("/profits")
    public Map<String, Object> getMonthlyProfits(@RequestParam int year) {
        Map<String, Object> response = new HashMap<>();
        response.put("labels", List.of("Jan", "Fév", "Mars", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"));
        response.put("values", List.of(1200, 950, 800, 1500, 1800, 1600, 1400, 2000, 1700, 1900, 2100, 2200));
        return response;
    }

    @GetMapping("/sales")
    public Map<String, Object> getSalesData() {
        Map<String, Object> response = new HashMap<>();
        response.put("labels", List.of("Bagues", "Bracelets", "Colliers"));
        response.put("values", List.of(45, 25, 30));
        return response;
    }

    @GetMapping("/invoices/status")
    public Map<String, Object> getInvoiceStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("labels", List.of("Payées", "En attente", "Annulées"));
        response.put("values", List.of(70, 20, 10));
        return response;
    }
}
