package meex.controller;

import jakarta.servlet.http.HttpServletResponse;
import meex.dto.InvoiceDTO;
import meex.model.Invoice;
import meex.repository.InvoiceRepository;
import meex.service.InvoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    private final InvoiceRepository repo;
    private final InvoiceService service;

    public InvoiceController(InvoiceRepository repo, InvoiceService service) {
        this.repo = repo;
        this.service = service;
    }

    @GetMapping("/{id}/download")
    public void download(@PathVariable Long id, HttpServletResponse resp) throws Exception {
        System.out.println("➡️ Demande de téléchargement pour facture ID : " + id);
        Invoice inv = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invoice not found: id = " + id));

        InvoiceDTO dto = service.mapToDTO(inv);

        System.out.println("➡️ Génération PDF pour facture : " + dto.getNumber());

        byte[] pdf = service.renderPdf(dto); // <- ici peut planter

        resp.setContentType("application/pdf");
        resp.setHeader("Content-Disposition", "attachment; filename=facture-" + dto.getNumber() + ".pdf");
        resp.getOutputStream().write(pdf);

        System.out.println("✅ PDF généré et transmis");
    }


    @GetMapping("/{id}/print")
    public void print(@PathVariable Long id, HttpServletResponse resp) throws Exception {
        Invoice inv = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invoice not found: id = " + id));
        InvoiceDTO dto = service.mapToDTO(inv);
        byte[] pdf = service.renderPdf(dto);
        resp.setContentType("application/pdf");
        resp.setHeader("Content-Disposition", "inline; filename=facture-" + dto.getNumber() + ".pdf");
        resp.getOutputStream().write(pdf);
    }

    @PostMapping("/{id}/email")
    public ResponseEntity<?> sendEmail(@PathVariable Long id) {
        Invoice inv = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invoice not found: id = " + id));
        InvoiceDTO dto = service.mapToDTO(inv);
        service.sendByEmail(dto);
        return ResponseEntity.ok().build();
    }
}
