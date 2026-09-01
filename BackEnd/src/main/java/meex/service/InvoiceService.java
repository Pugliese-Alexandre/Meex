package meex.service;

import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import meex.dto.InvoiceDTO;
import meex.model.Invoice;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.List;

@Service
public class InvoiceService {

    private final SpringTemplateEngine templateEngine;
    private final JavaMailSender mailSender;

    public InvoiceService(SpringTemplateEngine templateEngine, JavaMailSender mailSender) {
        this.templateEngine = templateEngine;
        this.mailSender = mailSender;
    }

    public InvoiceDTO mapToDTO(Invoice invoice) {
        InvoiceDTO dto = new InvoiceDTO();
        dto.setNumber(invoice.getNumber());
        dto.setDateEmission(invoice.getDate());
        dto.setDateEcheance(invoice.getDate().plusDays(30)); // ou autre logique
        dto.setClientName("Client inconnu"); // Remplacer si tu as une entité Client
        dto.setClientEmail(invoice.getClientEmail());
        dto.setTotal(invoice.getTotalTTC());
        dto.setArticles(List.of()); // Ajouter les articles réels ici si tu les as
        return dto;
    }

    public byte[] renderPdf(InvoiceDTO invoiceDTO) {
        try {
            Context ctx = new Context();
            ctx.setVariable("invoice", invoiceDTO);
            String html = templateEngine.process("invoice", ctx);

            try (ByteArrayOutputStream baos = new ByteArrayOutputStream()) {
                PdfRendererBuilder builder = new PdfRendererBuilder();
                builder.withHtmlContent(html, "file:src/main/resources/static/");
                builder.toStream(baos);
                builder.run();
                return baos.toByteArray();
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Erreur génération PDF", e);
        }
    }

    public void sendByEmail(InvoiceDTO invoiceDTO) {
        byte[] pdfBytes = renderPdf(invoiceDTO);
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(invoiceDTO.getClientEmail());
            helper.setSubject("Facture n°" + invoiceDTO.getNumber());
            helper.setText("Bonjour,\n\nVeuillez trouver votre facture en pièce jointe.\n\nCordialement.");
            helper.addAttachment("facture-" + invoiceDTO.getNumber() + ".pdf", new ByteArrayResource(pdfBytes));
            mailSender.send(message);
        } catch (MessagingException ex) {
            throw new RuntimeException("Erreur envoi e-mail", ex);
        }
    }
}
